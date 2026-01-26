import librosa
import numpy as np
import os

class AudioEngine:
    def __init__(self):
        pass

    def analyze_track(self, file_path: str):
        """
        Extracts BPM, Key, and Energy from an audio file.
        """
        if not os.path.exists(file_path):
            return {"error": "File not found"}

        try:
            # Load audio (load up to 60s for speed)
            y, sr = librosa.load(file_path, duration=60)

            # 1. BPM (Tempo)
            onset_env = librosa.onset.onset_strength(y=y, sr=sr)
            tempo, _ = librosa.beat.beat_track(onset_envelope=onset_env, sr=sr)
            bpm = float(tempo)

            # 2. Key (Chromagram) - Simple estimation
            chroma = librosa.feature.chroma_cqt(y=y, sr=sr)
            key_idx = np.argmax(np.mean(chroma, axis=1))
            keys = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B']
            key = keys[key_idx]

            # 3. Energy (RMS)
            rms = librosa.feature.rms(y=y)
            energy = float(np.mean(rms))

            return {
                "bpm": round(bpm, 2),
                "key": key,
                "energy_score": round(energy, 4),
                "duration_analyzed": "60s"
            }
        except Exception as e:
            return {"error": str(e)}

audio_engine = AudioEngine()
