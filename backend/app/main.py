from typing import Annotated
from fastapi import FastAPI, Depends
from sqlmodel import Session, Field, SQLModel, create_engine

app = FastAPI()

postgres_url = "postgresql://changeme:changeme@db:5432/db"
engine = create_engine(postgres_url, echo=True)


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


@app.on_event("startup")
def on_startup():
    create_db_and_tables()


@app.get("/")
def read_root():
    return {"Hello": "World!"}


@app.post("/addMix")
def read_item(mix: Mix, session: SessionDep):
    session.add(mix)
    session.commit()
    session.refresh(mix)
    return mix
