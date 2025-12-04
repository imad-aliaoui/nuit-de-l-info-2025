# Village Numérique Résistant - NIRD

## Project Overview
Application web pour la Nuit de l'Info 2025 sur la démarche NIRD (Numérique Inclusif, Responsable et Durable). L'application aide les établissements scolaires à résister à l'Empire Big Tech et à adopter des solutions libres et durables.

## Architecture
- **Backend**: PHP 8.2 API REST (port 8000)
- **Frontend**: React 18 + Vite SPA (port 5000)
- **Database**: PostgreSQL

## Key Files
- `backend/public/index.php` - Point d'entrée API PHP
- `backend/src/Controllers/ApiController.php` - Contrôleur API principal
- `backend/src/Config/Database.php` - Configuration et connexion base de données
- `frontend/src/App.jsx` - Composant React principal
- `frontend/src/hooks/useEasterEggs.jsx` - Gestion des Easter eggs

## Running the Project
1. Backend PHP sur port 8000: `cd backend && php -S 0.0.0.0:8000 -t public`
2. Frontend React sur port 5000: `cd frontend && npm run dev`

## Easter Eggs
1. Triple-clic sur le logo → Mode Village Gaulois
2. Code Konami (↑↑↓↓←→←→BA) → Mini-jeu Recyclage
3. Taper "NIRD" → Mode Ultra Résistant
4. 7 clics sur le copyright → Secret du Pingouin

## Database Tables
- contact_messages - Formulaire de contact
- nird_pillars - 3 piliers NIRD (Inclusion, Responsabilité, Durabilité)
- nird_actors - Acteurs de la communauté
- journey_steps - Étapes du parcours de transition

## User Preferences
- Theme: Village résistant vs Big Tech
- Style ludique et pédagogique
- Interface responsive et accessible
