from typing import Annotated
from fastapi import FastAPI, Depends, File, UploadFile, Form
from sqlmodel import Session, Field, SQLModel, create_engine
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

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
    return {"Hello": "World!"}


# https://fastapi.tiangolo.com/tutorial/request-forms/#import-form
@app.post("/")
def uploadmix(
    mixTitle: Annotated[str, Form()],
    mixCreator: Annotated[str, Form()],
    audioFile: Annotated[bytes, File()],
    imageFile: Annotated[bytes, File()],
):
    return {
        "mixTitle": mixTitle,
        "mixCreator": mixCreator,
        "audioFile": len(audioFile),
        "imageFile": len(imageFile),
    }


@app.post("/addMix")
def read_item(mix: Mix, session: SessionDep):
    session.add(mix)
    session.commit()
    session.refresh(mix)
    return mix
