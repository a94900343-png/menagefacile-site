# MénageFacile — Prototype front-end

Ce dépôt contient une base front-end fonctionnelle pour une plateforme de mise en relation entre clients et prestataires de ménage.

Fonctionnalités livrées :
- Page d'accueil avec recherche rapide.
- Page de recherche avec filtres.
- Pages profils avec contact direct (téléphone & WhatsApp).
- Formulaire de dépôt d'annonce (sauvegarde en localStorage pour démo).
- Mobile-first, SEO basic (meta tags), design épuré.

Installation locale :
1. Placer les fichiers sur un serveur HTTP (ex: `npx http-server` ou servir via un hébergement statique).
2. Ouvrir `index.html` dans un navigateur.

Notes d'évolution (prochaines étapes recommandées) :
- Ajouter un back-end (API REST) :
  - GET /api/profiles
  - GET /api/profiles/:id
  - POST /api/profiles (auth / modération)
  - Admin: GET /api/admin/profiles, DELETE /api/admin/profiles/:id, PATCH /api/admin/profiles/:id
- Base de données : PostgreSQL ou MongoDB. Schéma de base : profiles(id, prenom, photo_url, ville, cp, phone, whatsapp, desc, services, tarif, dispo, experience, created_at, verified, owner_id)
- Authentification & espaces : comptes utilisateurs, vérification profils, abonnement pro, système d'avis.
- Hébergement statique possible (Netlify, Vercel) pour la version front-end. Pour la version complète, utiliser un back-end (Heroku, Render, Railway, provider cloud).
