from fastapi import FastAPI

app = FastAPI()

@app.get('/')
def read_root():
    return {'Ping': 'Pong'}

@app.post('/pipelines/parse')
def parse_pipeline():
    return {'status': 'parsed'}