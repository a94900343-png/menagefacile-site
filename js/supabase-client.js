// supabase-client.js
// Lightweight wrapper to use Supabase from the static frontend when supabase-config.js is present.
// If no config is provided, the app falls back to localStorage.

async function supabaseFetchProfiles(){
  if(!window.SUPABASE_CONFIG || !window.SUPABASE_CONFIG.SUPABASE_URL) return null;
  const url = `${window.SUPABASE_CONFIG.SUPABASE_URL}/rest/v1/profiles?select=*&order=created_at.desc`;
  const res = await fetch(url, {
    headers: {
      apikey: window.SUPABASE_CONFIG.SUPABASE_ANON_KEY,
      Authorization: `Bearer ${window.SUPABASE_CONFIG.SUPABASE_ANON_KEY}`
    }
  });
  if(!res.ok) throw new Error('Erreur Supabase: ' + res.statusText);
  return res.json();
}

async function supabaseCreateProfile(profile){
  if(!window.SUPABASE_CONFIG || !window.SUPABASE_CONFIG.SUPABASE_URL) return null;
  const url = `${window.SUPABASE_CONFIG.SUPABASE_URL}/rest/v1/profiles`;
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      apikey: window.SUPABASE_CONFIG.SUPABASE_ANON_KEY,
      Authorization: `Bearer ${window.SUPABASE_CONFIG.SUPABASE_ANON_KEY}`
    },
    body: JSON.stringify(profile)
  });
  if(!res.ok) throw new Error('Erreur Supabase: ' + res.statusText);
  return res.json();
}
