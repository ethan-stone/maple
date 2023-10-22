from fastapi import FastAPI
import jwt

app = FastAPI()


@app.get("/")
def read_root():
    return {"Hello": "World"}


@app.get('/token')
def get_token():
    encoded = jwt.encode({"some": "payload"}, "secret", algorithm="HS256")

    return {"token": encoded}
