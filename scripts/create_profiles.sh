#!/usr/bin/env bash
set -euo pipefail

# Usage:
# 1) Get your Supabase Postgres connection string (Settings → Database → Connection string -> "Connection string (URI)")
# 2) In your shell run:
#    export DATABASE_URL="postgresql://postgres:password@db.host:5432/postgres"
# 3) Then run:
#    ./scripts/create_profiles.sh
#
# This script runs the SQL in sql/create_profiles.sql using psql.

if [ -z "${DATABASE_URL:-}" ]; then
  echo "ERROR: Please set DATABASE_URL environment variable to your Supabase Postgres connection string."
  echo "Get it from Supabase → Settings → Database → Connection string (Connection string (URI))."
  exit 1
fi

if ! command -v psql >/dev/null 2>&1; then
  echo "ERROR: psql is not installed. Install it first. Examples:\n  Ubuntu: sudo apt-get install -y postgresql-client\n  macOS (Homebrew): brew install libpq && brew link --force libpq"
  exit 1
fi

echo "Running SQL to create profiles table..."
psql "$DATABASE_URL" -v ON_ERROR_STOP=1 -f sql/create_profiles.sql

echo "Done. The profiles table should now exist in your Supabase database."