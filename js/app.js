// Simple client-side app to load profiles from data/profiles.json and localStorage
const PROFILES_SRC = 'data/profiles.json';
const LOCAL_KEY = 'menagefacile_local_profiles';

// util: fetch local + remote profiles and merge
async function loadAllProfiles(){
  const res = await fetch(PROFILES_SRC, {cache: 'no-cache'});
  const remote = await res.json();
  const local = JSON.parse(localStorage.getItem(LOCAL_KEY) || '[]');
  // ensure ids don't conflict: local ids use prefix L-
  return [...remote, ...local];
}

function formatPrice(p){ return p ? p + ' €/h' : '—'; }

async function loadLatestProfiles(containerId, limit=6){
  const list = document.getElementById(containerId);
  if(!list) return;
  const profiles = await loadAllProfiles();
  // sort by createdAt desc (if exists) otherwise keep order
  profiles.sort((a,b)=> (b.createdAt || 0) - (a.createdAt || 0));
  list.innerHTML = profiles.slice(0,limit).map(cardHtml).join('');
  // add click listeners
  Array.from(list.querySelectorAll('.card-link')).forEach(el=>{
    el.addEventListener('click', (e)=>{
      const id = el.dataset.id;
      window.location = 'profile.html?id=' + id;
    });
  });
}

function cardHtml(p){
  const photo = p.photo || 'assets/avatar-placeholder.svg';
  const services = (p.services || '').slice(0,60);
  const tarif = formatPrice(p.tarif);
  return `
  <article class="card profile-card">
    <img src="${photo}" alt="${escapeHtml(p.prenom)}" />
    <div class="meta">
      <h4>${escapeHtml(p.prenom)} <span class="small">— ${escapeHtml(p.ville || '')}</span></h4>
      <p class="small">${escapeHtml(services)}</p>
      <p class="small"><strong>${tarif}</strong></p>
      <div style="margin-top:8px;">
        <a class="btn" href="profile.html?id=${p.id}">Voir le profil</a>
      </div>
    </div>
  </article>`;
}

function escapeHtml(s){ if(!s) return ''; return String(s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c])); }

// Search & filters
async function applyFilters(){
  const ville = document.getElementById('f-ville').value.trim().toLowerCase();
  const cp = document.getElementById('f-cp').value.trim();
  const type = document.getElementById('f-type').value;
  const tarifMax = Number(document.getElementById('f-tarif').value || 0);
  const dispo = document.getElementById('f-dispo').value;

  const all = await loadAllProfiles();
  let results = all.filter(p=>{
    if (ville && !(p.ville || '').toLowerCase().includes(ville)) return false;
    if (cp && (p.cp || '') !== cp) return false;
    if (type && !(p.services || '').toLowerCase().includes(type.toLowerCase())) return false;
    if (tarifMax && Number(p.tarif) > tarifMax) return false;
    if (dispo && !(p.dispo || '').toLowerCase().includes(dispo.toLowerCase())) return false;
    return true;
  });

  const container = document.getElementById('results');
  if(!container) return;
  if(results.length === 0){
    container.innerHTML = '<p class="card">Aucun résultat trouvé.</p>';
    return;
  }
  container.innerHTML = results.map(r => cardHtml(r)).join('');
}

// Render profile by id into containerId
async function renderProfileById(id, containerId){
  const all = await loadAllProfiles();
  const p = all.find(x => String(x.id) === String(id));
  const cont = document.getElementById(containerId);
  if(!cont) return;
  if(!p){
    cont.innerHTML = '<p>Profil introuvable.</p>';
    return;
  }
  const photo = p.photo || 'assets/avatar-placeholder.svg';
  const tarif = formatPrice(p.tarif);
  // pre-fill WhatsApp message for convenience
  const defaultMsg = `Bonjour ${p.prenom}, je suis intéressé(e) par vos services de ${p.services || 'ménage'}. Pouvez-vous me dire vos disponibilités ?`;
  const whatsappHref = p.whatsapp ? `https://wa.me/${p.whatsapp}?text=${encodeURIComponent(defaultMsg)}` : null;
  const phoneHref = p.phone ? `tel:${p.phone}` : null;

  cont.innerHTML = `
  <article class="card profile-page">
    <div>
      <div class="profile-hero">
        <img src="${photo}" alt="${escapeHtml(p.prenom)}" />
        <div>
          <h2>${escapeHtml(p.prenom)}</h2>
          <p class="small">${escapeHtml(p.ville || '')} ${p.cp ? '— ' + escapeHtml(p.cp) : ''}</p>
          <p class="small">${escapeHtml(p.experience || '')}</p>
          <div class="actions">
            ${phoneHref ? `<a class="btn" href="${phoneHref}">Appeler</a>` : ''}
            ${whatsappHref ? `<a class="btn primary" href="${whatsappHref}" target="_blank" rel="noopener">WhatsApp</a>` : ''}
          </div>
        </div>
      </div>

      <section style="margin-top:12px">
        <h3>Présentation</h3>
        <p>${escapeHtml(p.desc || '')}</p>
      </section>

      <section style="margin-top:12px">
        <h3>Services proposés</h3>
        <p>${escapeHtml(p.services || '')}</p>
      </section>
    </div>

    <aside>
      <div class="card">
        <h4>Tarif</h4>
        <p><strong>${tarif}</strong></p>
      </div>

      <div class="card">
        <h4>Disponibilités</h4>
        <p>${escapeHtml(p.dispo || '—')}</p>
      </div>

      <div class="card">
        <h4>Contact</h4>
        <p class="small">Téléphone: ${p.phone ? escapeHtml(p.phone) : '—'}</p>
        <p class="small">WhatsApp: ${p.whatsapp ? escapeHtml(p.whatsapp) : '—'}</p>
      </div>

      <div class="card">
        <h4>Avis</h4>
        <p class="small">Aucun avis pour le moment — fonctionnalité à activer côté serveur.</p>
      </div>
    </aside>
  </article>
  `;
}

// create profile from form -> save to localStorage and return created profile
async function createProfileFromForm(){
  const prenom = document.getElementById('c-prenom').value.trim();
  const photo = document.getElementById('c-photo').value.trim();
  const ville = document.getElementById('c-ville').value.trim();
  const cp = document.getElementById('c-cp').value.trim();
  const phone = document.getElementById('c-phone').value.trim();
  const whatsapp = document.getElementById('c-whatsapp').value.trim();
  const desc = document.getElementById('c-desc').value.trim();
  const services = document.getElementById('c-services').value.trim();
  const tarif = Number(document.getElementById('c-tarif').value || 0);
  const dispo = document.getElementById('c-dispo').value.trim();
  const exp = document.getElementById('c-exp').value.trim();

  if(!prenom || !ville || !cp || !phone) throw new Error('Veuillez remplir les champs requis.');

  const profile = {
    id: 'L-' + Date.now(),
    prenom, photo, ville, cp, phone, whatsapp, desc, services, tarif, dispo, experience: exp,
    createdAt: Date.now()
  };

  const local = JSON.parse(localStorage.getItem(LOCAL_KEY) || '[]');
  local.unshift(profile);
  localStorage.setItem(LOCAL_KEY, JSON.stringify(local));
  return profile;
}
