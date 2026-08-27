-- sql/create_profiles.sql
-- Creates the public.profiles table used by the frontend.

CREATE EXTENSION IF NOT EXISTS pgcrypto;

CREATE TABLE IF NOT EXISTS public.profiles (
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
