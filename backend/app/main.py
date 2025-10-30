from typing import Annotated
from fastapi import FastAPI, Depends, UploadFile, Form
from sqlmodel import Session, Field, SQLModel, create_engine
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from pathlib import Path
import os
import psycopg2
import datetime
import shutil

app = FastAPI()

postgres_url = "postgresql://changeme:changeme@db:5432/db"
engine = create_engine(postgres_url, echo=True)

# Voor CORS
origins = [
    "https://10.1.0.40",
    "https://10.1.0.40:3000",
    "http://localhost",
    "*",
]

# Voor CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


def save_upload_file(upload_file: UploadFile, destination: Path) -> None:
    try:
        with destination.open("wb") as buffer:
            shutil.copyfileobj(upload_file.file, buffer)
            print("upload succesful.")
    finally:
        upload_file.file.close()


def save_mix_sql(
    mix_title: str,
    mix_creator: str,
    mix_audio_location: str,
    mix_picture_location: str,
) -> None:
    try:
        connection = psycopg2.connect(
            dbname="db",
            user="changeme",
            password="changeme",
            host="10.1.0.20",
            port="5432",
        )

        cur = connection.cursor()
        cur.execute(
            """
            INSERT INTO mix (mix_title, mix_creator, mix_audio_location, mix_picture_location)
            VALUES (%s, %s, %s, %s)
             RETURNING id;
        """,
            (
                mix_title,
                mix_creator,
                mix_audio_location,
                mix_picture_location,
            ),
        )
        connection.commit()
        print("Info: SQL Row Inserted")
    except Exception as e:
        print(f"Error: {e}")


# https://fastapi.tiangolo.com/tutorial/sql-databases/?h=sessiondep#create-a-session-dependency
def get_session():
    with Session(engine) as session:
        yield session


SessionDep = Annotated[Session, Depends(get_session)]


def create_db_and_tables():
    SQLModel.metadata.create_all(engine)


class Mix(SQLModel, table=True):
    id: int | None = Field(default=None, primary_key=True)
    mixTitle: str
    mixCreator: str
    mixAudioLocation: str
    mixPictureLocation: str


class MixUpload(BaseModel):
    mixTitle: str
    mixCreator: str


@app.on_event("startup")
def on_startup():
    create_db_and_tables()


@app.get("/")
def read_root():
    return {}


# https://fastapi.tiangolo.com/tutorial/request-forms/#import-form
# https://fastapi.tiangolo.com/tutorial/request-files/#file-parameters-with-uploadfile
@app.post("/")
def uploadmix(
    mixTitle: Annotated[str, Form()],
    mixCreator: Annotated[str, Form()],
    audioFile: UploadFile,
    imageFile: UploadFile,
):
    if audioFile.content_type.startswith(
        "audio/"
    ) and imageFile.content_type.startswith("image/"):
        date_object = datetime.datetime.now()

        mix_folder = (
            f"/storage/{date_object.year}/{date_object.month}/{mixCreator}/{mixTitle}"
        )

        save_mix_sql(
            mixTitle,
            mixCreator,
            mix_folder + f"/{audioFile.filename}",
            mix_folder + f"/{audioFile.filename}",
        )

        try:
            os.makedirs(mix_folder)
            print(f"Directory '{mix_folder}' created successfully.")
        except FileExistsError:
            print(f"Directory '{mix_folder}' already exists.")
            return f"Directory '{mix_folder}' already exists."
        except PermissionError:
            print(f"Permission denied: Unable to create '{mix_folder}'.")
            return f"Permission denied: Unable to create '{mix_folder}'."
        except Exception as e:
            print(f"An error occurred: {e}")
            return e

        try:
            save_upload_file(audioFile, Path(mix_folder + f"/{audioFile.filename}"))
            save_upload_file(imageFile, Path(mix_folder + f"/{imageFile.filename}"))
            print("Upload success.")
        except Exception as e:
            print(f"An error occured: {e}")
            return e

        return {
            "": mixTitle,
            "mixCreator": mixCreator,
            "audioFile": f"/storage/{mixCreator}/{mixTitle}/{audioFile.filename}",
            "imageFile": f"/storage/{mixCreator}/{mixTitle}/{audioFile.filename}",
        }
    else:
        return {"Error": "Wrong Format"}


@app.post("/addMix")
def read_item(mix: Mix, session: SessionDep):
    session.add(mix)
    session.commit()
    session.refresh(mix)
    return mix
