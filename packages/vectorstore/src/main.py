from typing import Literal
from pydantic import BaseModel, conlist, Field


class Vector(BaseModel):
    id: str
    vector: conlist(float, min_items=1536, max_items=1536)
    metadata: dict


class Query(BaseModel):
    command: Literal["query"]
    vector: conlist(float, min_items=1536, max_items=1536)


class Upsert(BaseModel):
    command: Literal["upsert"]
    vectors: list[Vector]


class Event(BaseModel):
    evt: Upsert | Query = Field(..., discriminator="command")


def handler(event, context):
    evt = Event(evt=event)

    print("Hello from vectorstore!")
