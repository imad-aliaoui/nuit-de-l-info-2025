<?php

namespace App\Config;

class Database
{
    private static ?Database $instance = null;
    private ?\PDO $connection = null;

    private function __construct()
    {
        $databaseUrl = getenv('DATABASE_URL');
        
        if ($databaseUrl) {
            $dbParams = parse_url($databaseUrl);
            $dsn = sprintf(
                'pgsql:host=%s;port=%s;dbname=%s',
                $dbParams['host'],
                $dbParams['port'] ?? 5432,
                ltrim($dbParams['path'], '/')
            );
            
            try {
                $this->connection = new \PDO(
                    $dsn,
                    $dbParams['user'],
                    $dbParams['pass'],
                    [
                        \PDO::ATTR_ERRMODE => \PDO::ERRMODE_EXCEPTION,
                        \PDO::ATTR_DEFAULT_FETCH_MODE => \PDO::FETCH_ASSOC
                    ]
                );
            } catch (\PDOException $e) {
                error_log("Database connection error: " . $e->getMessage());
            }
        }
    }

    public static function getInstance(): Database
    {
        if (self::$instance === null) {
            self::$instance = new self();
        }
        return self::$instance;
    }

    public function getConnection(): ?\PDO
    {
        return $this->connection;
    }

    public function initializeTables(): void
    {
        if ($this->connection === null) return;

        $sql = "
            CREATE TABLE IF NOT EXISTS contact_messages (
                id SERIAL PRIMARY KEY,
                nom VARCHAR(255) NOT NULL,
                email VARCHAR(255) NOT NULL,
                sujet VARCHAR(255) NOT NULL,
                message TEXT NOT NULL,
                honeypot VARCHAR(255) DEFAULT '',
                ip_address VARCHAR(45),
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );

            CREATE TABLE IF NOT EXISTS nird_pillars (
                id SERIAL PRIMARY KEY,
                name VARCHAR(100) NOT NULL,
                slug VARCHAR(100) NOT NULL UNIQUE,
                description TEXT NOT NULL,
                icon VARCHAR(50),
                color VARCHAR(20),
                activities TEXT[],
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );

            CREATE TABLE IF NOT EXISTS nird_actors (
                id SERIAL PRIMARY KEY,
                name VARCHAR(100) NOT NULL,
                description TEXT NOT NULL,
                icon VARCHAR(50),
                role_type VARCHAR(50),
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );

            CREATE TABLE IF NOT EXISTS journey_steps (
                id SERIAL PRIMARY KEY,
                step_number INTEGER NOT NULL,
                title VARCHAR(255) NOT NULL,
                description TEXT NOT NULL,
                action_text VARCHAR(255),
                icon VARCHAR(50),
                difficulty VARCHAR(20),
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
        ";

        try {
            $this->connection->exec($sql);
            $this->seedData();
        } catch (\PDOException $e) {
            error_log("Table creation error: " . $e->getMessage());
        }
    }

    private function seedData(): void
    {
        $checkPillars = $this->connection->query("SELECT COUNT(*) FROM nird_pillars")->fetchColumn();
        
        if ($checkPillars == 0) {
            $pillars = [
                [
                    'name' => 'Inclusion',
                    'slug' => 'inclusion',
                    'description' => 'Accès équitable au numérique pour tous. Réduire la fracture numérique et permettre à chaque élève, enseignant et famille de bénéficier des outils numériques, quel que soit son niveau de compétence ou ses moyens.',
                    'icon' => 'users',
                    'color' => '#4CAF50',
                    'activities' => '{Formation des équipes éducatives,Accompagnement des familles,Accessibilité des outils,Réduction de la fracture numérique}'
                ],
                [
                    'name' => 'Responsabilité',
                    'slug' => 'responsabilite',
                    'description' => 'Usage raisonné et réflexif des technologies. Choisir des solutions souveraines et respectueuses des données personnelles, sensibiliser à la sobriété numérique.',
                    'icon' => 'shield',
                    'color' => '#2196F3',
                    'activities' => '{Protection des données personnelles,Souveraineté numérique,Sensibilisation à la sobriété,Choix de logiciels libres}'
                ],
                [
                    'name' => 'Durabilité',
                    'slug' => 'durabilite',
                    'description' => 'Lutte contre l\'obsolescence programmée. Prolonger la vie du matériel informatique grâce à Linux, favoriser le réemploi et le reconditionnement, maîtriser les coûts.',
                    'icon' => 'recycle',
                    'color' => '#FF9800',
                    'activities' => '{Adoption de Linux,Reconditionnement du matériel,Réemploi des équipements,Mutualisation des ressources}'
                ]
            ];

            $stmt = $this->connection->prepare(
                "INSERT INTO nird_pillars (name, slug, description, icon, color, activities) VALUES (?, ?, ?, ?, ?, ?)"
            );

            foreach ($pillars as $pillar) {
                $stmt->execute([
                    $pillar['name'],
                    $pillar['slug'],
                    $pillar['description'],
                    $pillar['icon'],
                    $pillar['color'],
                    $pillar['activities']
                ]);
            }
        }

        $checkActors = $this->connection->query("SELECT COUNT(*) FROM nird_actors")->fetchColumn();
        
        if ($checkActors == 0) {
            $actors = [
                ['name' => 'Élèves et éco-délégués', 'description' => 'Acteurs principaux de la transition, ils participent aux projets de reconditionnement et sensibilisent leurs pairs.', 'icon' => 'graduation-cap', 'role_type' => 'student'],
                ['name' => 'Enseignants', 'description' => 'Porteurs de la démarche pédagogique, ils intègrent les outils libres dans leurs pratiques.', 'icon' => 'chalkboard-teacher', 'role_type' => 'teacher'],
                ['name' => 'Directions d\'établissements', 'description' => 'Décideurs clés pour engager l\'établissement dans la démarche NIRD.', 'icon' => 'building', 'role_type' => 'admin'],
                ['name' => 'Techniciens réseaux', 'description' => 'Experts techniques qui déploient Linux et maintiennent les équipements.', 'icon' => 'tools', 'role_type' => 'tech'],
                ['name' => 'Collectivités territoriales', 'description' => 'Partenaires essentiels pour le financement et l\'équipement des établissements.', 'icon' => 'landmark', 'role_type' => 'authority'],
                ['name' => 'Associations partenaires', 'description' => 'Clubs informatiques et associations du libre qui accompagnent la transition.', 'icon' => 'handshake', 'role_type' => 'partner']
            ];

            $stmt = $this->connection->prepare(
                "INSERT INTO nird_actors (name, description, icon, role_type) VALUES (?, ?, ?, ?)"
            );

            foreach ($actors as $actor) {
                $stmt->execute([$actor['name'], $actor['description'], $actor['icon'], $actor['role_type']]);
            }
        }

        $checkSteps = $this->connection->query("SELECT COUNT(*) FROM journey_steps")->fetchColumn();
        
        if ($checkSteps == 0) {
            $steps = [
                ['step_number' => 1, 'title' => 'Mobilisation', 'description' => 'Sensibiliser l\'équipe éducative et identifier les volontaires pour porter la démarche.', 'action_text' => 'Former un groupe pilote', 'icon' => 'flag', 'difficulty' => 'facile'],
                ['step_number' => 2, 'title' => 'Diagnostic', 'description' => 'Évaluer le parc informatique existant et identifier les machines candidates à Linux.', 'action_text' => 'Auditer le parc', 'icon' => 'search', 'difficulty' => 'facile'],
                ['step_number' => 3, 'title' => 'Expérimentation', 'description' => 'Installer Linux sur quelques postes pilotes et former les premiers utilisateurs.', 'action_text' => 'Lancer un pilote', 'icon' => 'flask', 'difficulty' => 'moyen'],
                ['step_number' => 4, 'title' => 'Formation', 'description' => 'Organiser des sessions de formation pour les enseignants et le personnel.', 'action_text' => 'Former les équipes', 'icon' => 'graduation-cap', 'difficulty' => 'moyen'],
                ['step_number' => 5, 'title' => 'Déploiement', 'description' => 'Étendre Linux à l\'ensemble du parc et mettre en place les outils libres.', 'action_text' => 'Déployer à grande échelle', 'icon' => 'rocket', 'difficulty' => 'avancé'],
                ['step_number' => 6, 'title' => 'Reconditionnement', 'description' => 'Organiser des ateliers de reconditionnement avec les élèves.', 'action_text' => 'Créer un atelier', 'icon' => 'recycle', 'difficulty' => 'moyen'],
                ['step_number' => 7, 'title' => 'Intégration', 'description' => 'Ancrer la démarche NIRD dans le projet d\'établissement.', 'action_text' => 'Pérenniser la démarche', 'icon' => 'check-circle', 'difficulty' => 'avancé']
            ];

            $stmt = $this->connection->prepare(
                "INSERT INTO journey_steps (step_number, title, description, action_text, icon, difficulty) VALUES (?, ?, ?, ?, ?, ?)"
            );

            foreach ($steps as $step) {
                $stmt->execute([
                    $step['step_number'],
                    $step['title'],
                    $step['description'],
                    $step['action_text'],
                    $step['icon'],
                    $step['difficulty']
                ]);
            }
        }
    }
}
