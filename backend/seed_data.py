import psycopg2
import sys
import uuid

# Connection string provided by user
DB_URL = "postgresql://postgres.iycvqpcswixzvnqylmph:Herrera123Musfelcrow@aws-0-us-west-2.pooler.supabase.com:5432/postgres"

def seed_data():
    try:
        print("Connecting to Supabase...")
        conn = psycopg2.connect(DB_URL)
        cur = conn.cursor()
        
        # 1. Create a Demo Artist if not exists
        print("Seeding Artist...")
        artist_id = str(uuid.uuid4())
        cur.execute("""
            INSERT INTO public.artists (id, name, genre, status, monthly_listeners, total_streams)
            VALUES (%s, 'Luna Eclipse (Real)', 'Synthwave', 'Rising', 450000, 1200000)
            ON CONFLICT DO NOTHING
            RETURNING id;
        """, (artist_id,))
        
        # If we inserted, great. If not (conflict), we should maybe fetch one, but for now assuming clean seed or just add one.
        
        # 2. Add Transactions
        print("Seeding Transactions...")
        cur.execute("""
            INSERT INTO public.transactions (description, amount, type, category, status, related_artist_id)
            VALUES 
            ('Spotify Royalties (Q1)', 12500.00, 'credit', 'Royalties', 'Completed', %s),
            ('Video Production Advance', 4500.00, 'debit', 'Marketing', 'Pending', %s),
            ('Merch Store Payout', 3200.50, 'credit', 'Merch', 'Completed', %s)
        """, (artist_id, artist_id, artist_id))

        # 3. Add Fans
        print("Seeding Fans...")
        cur.execute("""
            INSERT INTO public.fans (email, name, status, score, platform)
            VALUES 
            ('fan1@demo.com', 'Super Fan 1', 'Super Fan', 95, 'Spotify'),
            ('fan2@demo.com', 'Casual Listener', 'Casual', 30, 'Apple Music')
        """)

        conn.commit()
        print("Seeding Complete!")
        cur.close()
        conn.close()
        
    except Exception as e:
        print(f"Error: {e}")
        # Don't exit 1, just print error (e.g. duplicate key)

if __name__ == "__main__":
    seed_data()
