from typing import Literal
from pydantic import BaseModel, conlist, Field
import vecs
import os
from dataclasses import dataclass, field

vx = vecs.create_client(os.environ["DB_URL"])


@dataclass
class VectorStore:
    vx: vecs.Client
    collection_name: str = field(init=False, default="vectorstore")

    def __get_collection(self):
        try:
            return self.vx.get_collection(self.collection_name)
        except vecs.exc.CollectionNotFound:
            return self.vx.create_collection(self.collection_name)


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

    client = VectorStore(vx)

    print("Hello from vectorstore!")
