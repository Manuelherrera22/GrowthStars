import psycopg2
import sys

# Connection string provided by user
DB_URL = "postgresql://postgres.iycvqpcswixzvnqylmph:Herrera123Musfelcrow@aws-0-us-west-2.pooler.supabase.com:5432/postgres"

def run_migration():
    try:
        print("Connecting to Supabase...")
        conn = psycopg2.connect(DB_URL)
        cur = conn.cursor()
        
        print("Reading schema.sql...")
        with open("schema.sql", "r") as f:
            sql = f.read()
            
        print("Executing SQL...")
        cur.execute(sql)
        conn.commit()
        
        print("Migration Successful! Tables created.")
        cur.close()
        conn.close()
        
    except Exception as e:
        print(f"Error: {e}")
        sys.exit(1)

if __name__ == "__main__":
    run_migration()
