'''
Handles data for people who dont know how to use Excel
'''
from fastapi import FastAPI, UploadFile, File, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
import json
import os
import uuid
import io
import util.process_data as datify

BASE_URL = 'http://localhost:8000'

app = FastAPI()

UPLOAD_DIR = "./uploads"
os.makedirs(UPLOAD_DIR, exist_ok=True)

file_registry = {} # store files with session id (session: file)
columns_registry = {} # session: columns
config_registry = {} # session: config
data_registry = {} # if needed

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/process-file")
async def process_file(file: UploadFile = File(...)):
    '''Process the file, extract all columns'''
    # make and store file w session id
    session_id = str(uuid.uuid4())
    file_path = os.path.join(UPLOAD_DIR, f'{session_id}_{file.filename}')
    content = await file.read() # prep file to be used for writing/pandas
    # write original file contents onto new file with session id name
    with open(file_path, "wb") as f:
        f.write(content)

    # store it to be used on other pages
    file_registry[session_id] = file_path # file stored
    columns_registry[session_id] = datify.get_columns(io.BytesIO(content), file.filename) # columns stored

    return {"session_id": session_id} # endpoint data to be used in other pages

@app.get("/columns/available")
async def get_columns(session_id: str):
    '''Extract only desired columns to be used'''
    try:
        if session_id not in columns_registry:
            return {"error": "Session not found"}
        return {"columns": columns_registry[session_id]}
    
    except Exception as e:
        return JSONResponse(status_code=400, content={"error": str(e)})
    
@app.post("/columns/config")
async def save_config(session_id: str, config: dict):
    config_registry[session_id] = config
    return {"message": "Config saved."}

@app.get("/data")
async def process_data(session_id: str):
    '''Final data pull to be used for display/copy'''
    # process file with configurations
    try:
        file = file_registry[session_id]
        config = config_registry[session_id]

        data = datify.datify(file, config)

    finally:
        os.remove(file)
        file_registry.pop(session_id, None)
        config_registry.pop(session_id, None)

    return data
