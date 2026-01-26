import requests
import time
import sys
import os

BASE_URL = "http://127.0.0.1:8000"
EMAIL = "admin@growthstars.com"
PASSWORD = "adminpassword"

def wait_for_server():
    print("Waiting for server...")
    for _ in range(10):
        try:
            r = requests.get(f"{BASE_URL}/health")
            if r.status_code == 200:
                print("Server is up!")
                return True
        except requests.exceptions.ConnectionError:
            pass
        time.sleep(1)
    print("Server failed to start.")
    return False

def test_flow():
    # 1. Register Admin User
    print("\n1. Registering Admin User...")
    payload = {
        "email": EMAIL,
        "password": PASSWORD,
        "full_name": "Admin User",
        "role": "admin"
    }
    r = requests.post(f"{BASE_URL}/api/v1/users/", json=payload)
    if r.status_code == 200:
        print("Admin created successfully.")
    elif r.status_code == 400 and "already registered" in r.text:
        print("Admin already exists.")
    else:
        print(f"Failed to create admin: {r.text}")
        return

    # 2. Login
    print("\n2. Logging in...")
    login_data = {"username": EMAIL, "password": PASSWORD}
    r = requests.post(f"{BASE_URL}/api/v1/login/access-token", data=login_data)
    if r.status_code != 200:
        print(f"Login failed: {r.text}")
        return
    token = r.json()["access_token"]
    headers = {"Authorization": f"Bearer {token}"}
    print("Login successful. Token obtained.")

    # 3. Create Mission
    print("\n3. Creating Mission...")
    # First get an artist ID (we'll use the admin ID for simplicity or create a new user if needed, 
    # but let's just create a quick artist)
    artist_payload = {
        "email": "artist@growthstars.com", 
        "password": "artistpass", 
        "full_name": "Artist Test", 
        "role": "artist"
    }
    r_artist = requests.post(f"{BASE_URL}/api/v1/users/", json=artist_payload)
    if r_artist.status_code == 200:
        artist_id = r_artist.json()["id"]
    elif r_artist.status_code == 400:
        # Assuming artist exists, let's login as artist to get ID? 
        # Or just use ID 2 safely if this is a fresh run. 
        # Actually proper way is to just assume ID 1 (Admin) or skip if we can't get ID.
        # Let's try to get user by ID 1.
         r_me = requests.get(f"{BASE_URL}/api/v1/users/1", headers=headers) # Using admin token to read user 1
         if r_me.status_code == 200:
             artist_id = 1 # Self-assign for test
         else:
             print("Could not find user.")
             return

    mission_payload = {
        "title": "Test Mission",
        "description": "Upload a test song",
        "artist_id": artist_id,
        "status": "pending"
    }
    r = requests.post(f"{BASE_URL}/api/v1/missions/", json=mission_payload, headers=headers)
    print(f"Create Mission Status: {r.status_code}")
    print(f"Response: {r.text}")

    # 4. Audio Analysis
    print("\n4. Testing Audio Analysis (Mock File)...")
    # Create dummy wav file
    with open("test_audio.wav", "wb") as f:
        f.write(os.urandom(1024)) # Garbage data, Librosa might fail but endpoint should work
    
    files = {'file': ('test_audio.wav', open('test_audio.wav', 'rb'), 'audio/wav')}
    # Expecting 400 probably from Librosa failing on garbage data, or 200 if robust.
    # But endpoint connectivity is what matters.
    r = requests.post(f"{BASE_URL}/api/v1/audio/analyze", files=files, headers=headers)
    print(f"Audio Analysis Status: {r.status_code}")
    print(f"Response: {r.text}")
    
    if os.path.exists("test_audio.wav"):
        os.remove("test_audio.wav")

if __name__ == "__main__":
    if wait_for_server():
        test_flow()
    else:
        sys.exit(1)
