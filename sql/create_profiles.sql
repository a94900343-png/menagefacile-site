-- SQL to create profiles table in Supabase (Postgres)
-- Run in Supabase SQL editor or psql

CREATE TABLE public.profiles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  prenom text,
  photo_url text,
  ville text,
  cp text,
  phone text,
  whatsapp text,
  description text,
  services text,
  tarif numeric,
  dispo text,
  experience text,
  created_at timestamptz DEFAULT now(),
  verified boolean DEFAULT false
);

-- Note: gen_random_uuid() requires the pgcrypto extension in some setups; alternatively use uuid_generate_v4() if extension uuid-ossp is enabled.
