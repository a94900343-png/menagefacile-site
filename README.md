## Supabase integration

This branch adds a simple Supabase REST integration layer. The site still works without Supabase (falls back to localStorage), but when you add Supabase keys it will persist profiles to your Supabase project.

How to enable (I can guide you step-by-step):

1. Create a free Supabase project at https://app.supabase.com/
   - Choose a project name and password.
   - Wait for database provisioning.
2. Open the project, go to Settings -> API and copy:
   - URL (the project URL, ends with supabase.co)
   - anon public API key (ANON KEY)
3. In the repository, create a file `supabase-config.js` at the project root with the following content (or copy supabase-config.example.js and replace):

```js
window.SUPABASE_CONFIG = {
  SUPABASE_URL: "https://your-project-ref.supabase.co",
  SUPABASE_ANON_KEY: "your-anon-key"
};
```

Warning: Putting the anon key in a public repo is not recommended. Prefer setting environment variables in your hosting provider and creating the config file at build/deploy time. I can help deploy securely if you want.

4. Create the `profiles` table in Supabase. Use the SQL file `sql/create_profiles.sql` in the repo — paste it into the SQL editor in Supabase and run it.

5. In Supabase -> Authentication -> Policies, make sure you allow unauthenticated insert/select on `profiles` via Row Level Security (RLS) disabled for the prototype, or create RLS rules for production.

6. Deploy the static site (Netlify / Vercel) and ensure `supabase-config.js` with keys is present on the deployed site (or inject keys via build process).

If you prefer, give me the Supabase URL and anon key (paste here) and I will create `supabase-config.js` and finish the setup in the repo. Otherwise I will guide you step-by-step to do the few clicks — it's straightforward and I will provide exact screenshots / instructions.
