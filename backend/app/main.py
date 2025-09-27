from typing import Union
from fastapi import FastAPI
from sqlmodel import Field, SQLModel, create_engine

app = FastAPI()

postgres_url = "postgresql://changeme:changeme@db:5432/db"
engine = create_engine(postgres_url, echo=True)

SQLModel.metadata.create_all(engine)


@app.get("/")
def read_root():
    return {"Hello": "World!!!"}


@app.get("/items/{item_id}")
def read_item(item_id: int, q: Union[str, None] = None):
    return {"item_id": item_id, "q100": q}
