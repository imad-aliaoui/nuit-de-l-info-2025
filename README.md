# 🏛️ Village Numérique Résistant - Démarche NIRD

> **David contre Goliath, Astérix contre l'Empire numérique**

Application web ludique et pédagogique pour promouvoir la démarche NIRD (Numérique Inclusif, Responsable et Durable) dans les établissements scolaires.

Projet réalisé dans le cadre de la **Nuit de l'Info 2025**.

## 📖 Présentation

Face à l'Empire des Big Tech et à l'obsolescence programmée, les établissements scolaires peuvent devenir des villages numériques résistants. Cette application aide élèves, enseignants, familles et collectivités à :

- Comprendre comment réduire les dépendances numériques (Windows, Big Tech, obsolescence)
- Découvrir la démarche NIRD de manière progressive et ludique
- Rejoindre la communauté NIRD et participer à la résistance numérique

## 🛠️ Stack Technique

### Backend
- **PHP 8.2** - API REST
- **PostgreSQL** - Base de données
- Architecture MVC personnalisée

### Frontend
- **React 18** - Interface utilisateur
- **React Router** - Navigation SPA
- **Vite** - Build tool
- CSS personnalisé avec thèmes dynamiques

## 📁 Structure du Projet

```
├── backend/                 # API PHP
│   ├── public/
│   │   └── index.php       # Point d'entrée API
│   ├── src/
│   │   ├── Config/
│   │   │   └── Database.php
│   │   └── Controllers/
│   │       └── ApiController.php
│   └── composer.json
│
├── frontend/               # Application React
│   ├── public/
│   ├── src/
│   │   ├── components/     # Composants réutilisables
│   │   ├── pages/          # Pages de l'application
│   │   ├── hooks/          # Hooks personnalisés (Easter Eggs)
│   │   ├── styles/         # Styles globaux
│   │   └── services/       # Services API
│   ├── package.json
│   └── vite.config.js
│
└── README.md
```

## 🚀 Installation

### Prérequis
- PHP 8.1+
- Composer
- Node.js 18+
- npm ou yarn
- PostgreSQL (ou utiliser les variables d'environnement DATABASE_URL)

### Backend

```bash
cd backend/
composer install

# Configuration de la base de données
# Créer un fichier .env avec DATABASE_URL ou utiliser les variables d'environnement

# Lancer le serveur
php -S 0.0.0.0:8000 -t public
```

### Frontend

```bash
cd frontend/
npm install

# Lancer en développement
npm run dev
```

L'application sera accessible sur `http://localhost:5000`

## 📊 Base de Données

### Schéma

```sql
-- Messages de contact
CREATE TABLE contact_messages (
    id SERIAL PRIMARY KEY,
    nom VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    sujet VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    honeypot VARCHAR(255) DEFAULT '',
    ip_address VARCHAR(45),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Piliers NIRD
CREATE TABLE nird_pillars (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    slug VARCHAR(100) NOT NULL UNIQUE,
    description TEXT NOT NULL,
    icon VARCHAR(50),
    color VARCHAR(20),
    activities TEXT[],
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Acteurs de la communauté
CREATE TABLE nird_actors (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT NOT NULL,
    icon VARCHAR(50),
    role_type VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Étapes du parcours
CREATE TABLE journey_steps (
    id SERIAL PRIMARY KEY,
    step_number INTEGER NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    action_text VARCHAR(255),
    icon VARCHAR(50),
    difficulty VARCHAR(20),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## 🌐 Endpoints API

| Méthode | Endpoint | Description |
|---------|----------|-------------|
| GET | `/api/pillars` | Liste des 3 piliers NIRD |
| GET | `/api/actors` | Liste des acteurs de la communauté |
| GET | `/api/journey` | Étapes du parcours |
| GET | `/api/scenarios` | Scénarios interactifs |
| GET | `/api/stats` | Statistiques d'impact |
| GET | `/api/quiz` | Questions du quiz |
| POST | `/api/contact` | Envoi d'un message de contact |

## 🎮 Easter Eggs

### 1. Mode Village Gaulois 🏰
- **Comment le déclencher** : Triple-clic sur l'icône du logo dans la navbar
- **Effet** : Change le thème graphique avec des couleurs terre/or, police "Bangers" style BD, et la mascotte devient un druide

### 2. Mini-jeu Recyclage ♻️
- **Comment le déclencher** : Code Konami (↑↑↓↓←→←→BA)
- **Effet** : Ouvre un mini-jeu de tri où vous devez sauver les PC de l'obsolescence en les recyclant avec Linux. Marquez des points en faisant les bons choix !

### 3. Mode NIRD Ultra Résistant 💚
- **Comment le déclencher** : Taper "NIRD" au clavier (N-I-R-D)
- **Effet** : Active un mode "Matrix" vert avec effet de scanlines, police monospace, et ambiance hacker du libre

### 4. Secret du Pingouin 🐧
- **Comment le déclencher** : Cliquer 7 fois sur le copyright dans le footer
- **Effet** : Fait apparaître la mascotte Tux avec un message "Linux vaincra !"

### 5. Messages cachés anti-Big Tech 💪
- **Comment les trouver** : Survoler certains textes dans la page d'accueil
- **Effet** : Affiche des messages secrets comme "David > Goliath"

### 6. Mascotte interactive 🧙‍♂️
- **Comment la déclencher** : Se déclenche automatiquement lors de certaines actions (choix NIRD dans les scénarios, complétion d'étapes, découverte d'Easter eggs)
- **Effet** : Un druide/pingouin animé apparaît avec des messages encourageants

## 📱 Pages de l'Application

1. **Accueil** - Présentation du Village Numérique Résistant et de l'enjeu
2. **Les 3 Piliers** - Explication détaillée de l'Inclusion, Responsabilité et Durabilité
3. **Parcours** - Les 7 étapes pour transformer son établissement
4. **Scénarios** - Quiz interactif avec des situations réelles
5. **Communauté** - Présentation des acteurs et comment rejoindre NIRD
6. **Contact** - Formulaire de contact avec validation et popup fun

## 🎨 Design

- **Thème principal** : Vert forêt / Bleu nuit (résistance, nature, confiance)
- **Accent** : Orange (action, énergie)
- **Style** : Moderne, ludique, accessible
- **Animations** : Légères et non-intrusives
- **Responsive** : Adapté mobile/tablette/desktop

## 🔒 Sécurité du Formulaire

- Validation côté client (React) ET serveur (PHP)
- Protection honeypot contre le spam
- Sanitization des données entrées
- Messages d'erreur clairs et utiles

## 📜 Licence

Production sous licence libre - Projet réalisé pour la Nuit de l'Info 2025

## 🔗 Ressources

- [Site officiel NIRD](https://nird.forge.apps.education.fr/)
- [Forum Tchap NIRD](https://edurl.fr/tchap-laforgeedu-nird)
- [Forge des communs numériques éducatifs](https://forge.apps.education.fr/)

---

*Vive le libre, vive la résistance numérique ! 🏛️🐧*
