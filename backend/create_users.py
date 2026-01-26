import requests
import json

# Configuration
SUPABASE_URL = "https://iycvqpcswixzvnqylmph.supabase.co"
# SERVICE ROLE KEY (Privileged Access)
SERVICE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml5Y3ZxcGNzd2l4enZucXlsbXBoIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2OTQzOTE5NCwiZXhwIjoyMDg1MDE1MTk0fQ.fh7IJcTu8YxQKe2qXyUC1jV4Ib4t3z4Qa7XPTjDA4hg"

def create_user(email, password, role):
    url = f"{SUPABASE_URL}/auth/v1/admin/users"
    headers = {
        "apikey": SERVICE_KEY,
        "Authorization": f"Bearer {SERVICE_KEY}",
        "Content-Type": "application/json"
    }
    data = {
        "email": email,
        "password": password,
        "email_confirm": True,
        "user_metadata": {
            "role": role,
            "full_name": f"{role.capitalize()} User"
        }
    }
    
    response = requests.post(url, headers=headers, json=data)
    
    if response.status_code == 200:
        print(f"[SUCCESS] Created user: {email}")
        return response.json()
    else:
        print(f"[ERROR] Failed to create {email}: {response.text}")
        return None

if __name__ == "__main__":
    print("Creating System Users...")
    
    # 1. Admin / Manager
    create_user("admin@growthstars.com", "admin123", "manager")
    
    # 2. Investor
    create_user("investor@capital.com", "investor123", "investor")
    
    print("Done.")
