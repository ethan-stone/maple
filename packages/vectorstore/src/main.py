from ast import List, Tuple
from typing import Iterable, Literal, Optional, Dict, Union
from pydantic import BaseModel, conlist, Field
import vecs
from vecs.collection import Numeric, Metadata, MetadataValues, Record, IndexMeasure
import os
from aws_lambda_powertools.utilities import parameters
import openai


COLLECTION_NAME = 'vectorstore'

openai_api_key = None


def set_openai_api_key():
    if openai_api_key is None:
        openai_api_key = parameters.get_parameter(
            os.environ['OPENAI_API_KEY_PARAMETER_NAME']
        )
        openai.api_key = openai_api_key


vx = None


def get_client():
    if vx is None:
        db_url: str = parameters.get_parameter(
            os.environ['VECTOR_STORE_URL_PARAMETER_NAME'])
        vx = vecs.create_client(db_url)
    return vx


def get_collection(vx: vecs.Client, collection_name: str):
    try:
        return vx.get_collection(collection_name)
    except vecs.exc.CollectionNotFound:
        return vx.create_collection(collection_name, dimension=1536)


class Entry(BaseModel):
    id: str
    content: str
    metadata: dict


class Query(BaseModel):
    command: Literal["query"]
    query_string: str
    limit: int = 10
    filters: Optional[Dict] = None


class Upsert(BaseModel):
    command: Literal["upsert"]
    entries: list[Entry]


class Event(BaseModel):
    evt: Upsert | Query = Field(..., discriminator="command")


def handler(event, _):
    evt = Event(evt=event).evt

    set_openai_api_key()

    client = get_client()

    coll = get_collection(client, COLLECTION_NAME)

    if evt.command == "upsert":
        vectors: Iterable[Tuple[str, Iterable[Numeric], Metadata]] = []

        for entry in evt.entries:
            entry_vector = openai.Embedding.create(
                model="text-embedding-ada-002",
                input=[entry.content]
            )

            vectors.append(
                (entry.id, entry_vector["data"][0]["embedding"], entry.metadata))

        coll.upsert(vectors)

        return None
    elif evt.command == "query":
        query_vector = openai.Embedding.create(
            model="text-embedding-ada-002",
            input=[evt.query_string]
        )

        res: List[str] = coll.query(query_vector["data"][0]["embedding"], limit=evt.limit,
                                    filters=evt.filters, include_value=False, include_metadata=False)
        return res
