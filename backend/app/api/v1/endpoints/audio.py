from fastapi import APIRouter, File, UploadFile, HTTPException, Depends
from app.services.audio_engine import audio_engine
import shutil
import os
import uuid
from app.api import deps
from app.models.user import User

router = APIRouter()

@router.post("/analyze")
def analyze_audio(
    file: UploadFile = File(...),
    current_user: User = Depends(deps.get_current_active_user)
):
    """
    Upload an audio file (.wav/.mp3) to extract intelligence (BPM, Key, Energy).
    """
    # Create temp file
    file_id = str(uuid.uuid4())
    file_ext = file.filename.split(".")[-1]
    temp_file_path = f"acc_temp_{file_id}.{file_ext}"

    try:
        with open(temp_file_path, "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)
        
        # Analyze
        result = audio_engine.analyze_track(temp_file_path)
        
        # Cleanup
        if os.path.exists(temp_file_path):
            os.remove(temp_file_path)

        if "error" in result:
             raise HTTPException(status_code=400, detail=result["error"])
        
        return result

    except Exception as e:
        if os.path.exists(temp_file_path):
            os.remove(temp_file_path)
        raise HTTPException(status_code=500, detail=str(e))
