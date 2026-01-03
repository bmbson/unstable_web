from typing import Annotated
from fastapi import FastAPI, Depends, UploadFile, Form
from sqlmodel import Session, Field, SQLModel, create_engine, select
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
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
    "https://10.1.0.40/*",
    "https://10.1.0.40:3000",
    "https://10.1.0.40:3000/*",
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

app.mount("/static", StaticFiles(directory="static"), name="static")


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
    description: str,
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
            INSERT INTO mix (mix_title, mix_creator, mix_audio_location, mix_picture_location, description)
            VALUES (%s, %s, %s, %s, %s)
             RETURNING id;
        """,
            (
                mix_title,
                mix_creator,
                mix_audio_location,
                mix_picture_location,
                description,
            ),
        )
        connection.commit()
        print("Info: SQL Row Inserted")
    except Exception as e:
        print(f"Error: {e}")


def save_carousel_sql(select_mix_link: str, img_src: str) -> None:
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
            INSERT INTO carousel (select_mix_link, img_src)
            VALUES (%s, %s)
            RETURNING id;
            """,
            (select_mix_link, img_src),
        )
        connection.commit()
        print("Info: SQL Row Inserted")

    except Exception as e:
        print(f"An Error Occured: {e}")
        return e


# https://fastapi.tiangolo.com/tutorial/sql-databases/?h=sessiondep#create-a-session-dependency
def get_session():
    with Session(engine) as session:
        yield session


SessionDep = Annotated[Session, Depends(get_session)]


def create_db_and_tables():
    SQLModel.metadata.create_all(engine)


class Mix(SQLModel, table=True):
    id: int | None = Field(default=None, primary_key=True)
    mix_title: str
    mix_creator: str
    mix_audio_location: str
    mix_picture_location: str
    description: str


class Carousel(SQLModel, table=True):
    id: int | None = Field(default=None, primary_key=True)
    select_mix_link: str
    img_src: str


class MixUpload(BaseModel):
    mix_title: str
    mix_creator: str


@app.on_event("startup")
def on_startup():
    create_db_and_tables()


@app.get("/")
def read_root():
    return {}


# https://fastapi.tiangolo.com/tutorial/request-forms/#import-form
# https://fastapi.tiangolo.com/tutorial/request-files/#file-parameters-with-uploadfile
@app.post("/uploadmix")
def uploadmix(
    mix_title: Annotated[str, Form()],
    mix_creator: Annotated[str, Form()],
    audio_file: UploadFile,
    image_file: UploadFile,
    description: Annotated[str, Form()],
):
    if audio_file.content_type.startswith(
        "audio/"
    ) and image_file.content_type.startswith("image/"):
        date_object = datetime.datetime.now()

        mix_folder = (
            f"/static/{date_object.year}/{date_object.month}/{mix_creator}/{mix_title}"
        )
        app_mix_folder = Path(
            f"/app/static/{date_object.year}/{date_object.month}/{mix_creator}/{mix_title}"
        )

        save_mix_sql(
            mix_title,
            mix_creator,
            mix_folder + f"/{audio_file.filename}",  # audio
            mix_folder + f"/{image_file.filename}",  # image
            description,
        )

        try:
            os.makedirs(app_mix_folder)
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
            app_mix_folder = Path(
                f"/app/static/{date_object.year}/{date_object.month}/{mix_creator}/{mix_title}"
            )

            save_upload_file(audio_file, app_mix_folder / audio_file.filename)
            save_upload_file(image_file, app_mix_folder / image_file.filename)

            print("Upload success.")
        except Exception as e:
            print(f"An error occured: {e}")
            return e

        return {
            "": mix_title,
            "mix_creator": mix_creator,
            "audio_file": f"/static/{mix_creator}/{mix_title}/{audio_file.filename}",
            "image_file": f"/static/{mix_creator}/{mix_title}/{audio_file.filename}",
        }
    else:
        return {"Error": "Wrong Format"}


@app.post("/addMix")
def read_item(mix: Mix, session: SessionDep):
    session.add(mix)
    session.commit()
    session.refresh(mix)
    return mix


@app.get("/getmix/{mix_title}")
def get_mix(mix_title: str, session: SessionDep):
    print("ROUTE HIT:", mix_title)
    statement = select(Mix).where(Mix.mix_title == mix_title)
    result = session.execute(statement).scalars().all()
    return result


@app.get("/getmixes/")
def get_mixes(session: SessionDep):
    statement = select(Mix)
    result = session.execute(statement).scalars().all()
    return result


@app.get("/getaudiofile/{filename}")
def get_file(session: SessionDep, filename: str):
    return FileResponse(f"/app/static/{filename}")


@app.get("/getimagefile/{filename}")
def get_file(session: SessionDep, filename: str):
    return FileResponse(f"/app/static/{filename}")


@app.post("/uploadcarousel")
def uploadcarousel(
    session: SessionDep, select_mix_link: Annotated[str, Form()], image_file: UploadFile
):
    carousel_folder = Path(f"/app/static/carousel/{select_mix_link}")
    sql_carousel_folder = Path(f"/static/carousel/{select_mix_link}")

    path = carousel_folder / image_file.filename
    save_carousel_sql(
        select_mix_link, str(sql_carousel_folder) + f"/{image_file.filename}"
    )

    try:
        os.makedirs(carousel_folder)
        print(f"Directory '{carousel_folder}' created successfully.")
    except FileExistsError:
        print(f"Directory '{carousel_folder}' already exists.")
        return f"Directory '{carousel_folder}' already exists."
    except PermissionError:
        print(f"Permission denied: Unable to create '{carousel_folder}'.")
        return f"Permission denied: Unable to create '{carousel_folder}'."
    except Exception as e:
        print(f"An error occurred: {e}")
        return e

    try:
        save_upload_file(image_file, carousel_folder / image_file.filename)
        print("Upload Success.")
    except Exception as e:
        print(f"An Error Occured: {e}")
        return e


@app.get("/getcarousel")
def getcarousel(session: SessionDep):
    statement = select(Carousel)
    result = session.execute(statement).scalars().all()
    return result
