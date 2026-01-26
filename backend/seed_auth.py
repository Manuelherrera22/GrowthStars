import psycopg2
import uuid

# Connection string from seed_data.py
DB_URL = "postgresql://postgres.iycvqpcswixzvnqylmph:Herrera123Musfelcrow@aws-0-us-west-2.pooler.supabase.com:5432/postgres"

def seed_auth_users():
    try:
        print("Connecting to Supabase DB...")
        conn = psycopg2.connect(DB_URL)
        cur = conn.cursor()

        # Ensure extensions exist
        print("Enabling extensions...")
        cur.execute('CREATE EXTENSION IF NOT EXISTS "uuid-ossp";')
        cur.execute('CREATE EXTENSION IF NOT EXISTS "pgcrypto";')

        users = [
            ("admin@growthstars.com", "admin123", "admin"),
            ("artist@growthstars.com", "artist123", "artist"),
            ("investor@growthstars.com", "investor123", "investor")
        ]

        print("Seeding Auth Users...")
        for email, password, role in users:
            # Check if user exists
            cur.execute("SELECT id FROM auth.users WHERE email = %s", (email,))
            existing_user = cur.fetchone()

            if existing_user:
                print(f"User already exists: {email} (ID: {existing_user[0]})")
                user_id = existing_user[0]
                # Optional: Update password here if we wanted to enforce it
            else:
                print(f"Creating user: {email}...")
                cur.execute("""
                    INSERT INTO auth.users (
                        instance_id,
                        id,
                        aud,
                        role,
                        email,
                        encrypted_password,
                        email_confirmed_at,
                        raw_app_meta_data,
                        raw_user_meta_data,
                        created_at,
                        updated_at,
                        confirmation_token,
                        recovery_token,
                        email_change_token_new,
                        email_change
                    )
                    VALUES (
                        '00000000-0000-0000-0000-000000000000',
                        uuid_generate_v4(),
                        'authenticated',
                        'authenticated',
                        %s,
                        crypt(%s, gen_salt('bf')),
                        now(),
                        '{"provider":"email","providers":["email"]}',
                        json_build_object('role', %s),
                        now(),
                        now(),
                        '',
                        '',
                        '',
                        ''
                    )
                    RETURNING id;
                """, (email, password, role))
                
                user_id = cur.fetchone()[0]
                print(f" -> Created with ID: {user_id}")
            
            # Upsert into public.profiles
            cur.execute("""
                INSERT INTO public.profiles (id, email, full_name, role)
                VALUES (%s, %s, %s, %s)
                ON CONFLICT (id) DO NOTHING;
            """, (user_id, email, email.split('@')[0].capitalize(), role))

        conn.commit()
        print("Auth Seeding Complete!")
        cur.close()
        conn.close()

    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    seed_auth_users()
