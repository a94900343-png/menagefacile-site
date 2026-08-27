Local-run option to create the Supabase table

If you don't want to run SQL in the Supabase web UI, run the provided script locally.

Steps:
1) Install psql (Postgres client) if you don't have it:
   - Ubuntu/Debian: sudo apt-get install -y postgresql-client
   - macOS (Homebrew): brew install libpq && brew link --force libpq

2) Get your Supabase Postgres connection string:
   - Open https://app.supabase.com → select your project → Settings → Database
   - Copy the "Connection string (URI)" (it looks like: postgres://postgres:password@db.host:5432/postgres)

3) Export it in your shell and run the script:
   export DATABASE_URL="postgres://postgres:..."
   chmod +x ./scripts/create_profiles.sh
   ./scripts/create_profiles.sh

This will run the SQL file sql/create_profiles.sql which creates the public.profiles table.

Security note: keep the connection string private. Do not commit it to the repo.
