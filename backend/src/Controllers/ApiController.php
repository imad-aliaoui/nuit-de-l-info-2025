<?php

namespace App\Controllers;

use App\Config\Database;

class ApiController
{
    private ?\PDO $db;

    public function __construct()
    {
        $this->db = Database::getInstance()->getConnection();
    }

    public function handleRequest(): void
    {
        header('Content-Type: application/json');
        header('Access-Control-Allow-Origin: *');
        header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
        header('Access-Control-Allow-Headers: Content-Type, Authorization');
        header('Cache-Control: no-cache, no-store, must-revalidate');

        if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
            http_response_code(200);
            exit;
        }

        $uri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
        $method = $_SERVER['REQUEST_METHOD'];

        $routes = [
            'GET' => [
                '/api/pillars' => 'getPillars',
                '/api/actors' => 'getActors',
                '/api/journey' => 'getJourneySteps',
                '/api/scenarios' => 'getScenarios',
                '/api/stats' => 'getStats',
                '/api/quiz' => 'getQuiz',
            ],
            'POST' => [
                '/api/contact' => 'submitContact',
            ]
        ];

        if (isset($routes[$method][$uri])) {
            $action = $routes[$method][$uri];
            $this->$action();
        } else {
            http_response_code(404);
            echo json_encode(['error' => 'Endpoint non trouvé', 'uri' => $uri]);
        }
    }

    private function getPillars(): void
    {
        if (!$this->db) {
            echo json_encode($this->getDefaultPillars());
            return;
        }

        try {
            $stmt = $this->db->query("SELECT * FROM nird_pillars ORDER BY id");
            $pillars = $stmt->fetchAll();
            
            foreach ($pillars as &$pillar) {
                if (isset($pillar['activities']) && is_string($pillar['activities'])) {
                    $pillar['activities'] = $this->parsePostgresArray($pillar['activities']);
                }
            }
            
            echo json_encode($pillars);
        } catch (\Exception $e) {
            echo json_encode($this->getDefaultPillars());
        }
    }

    private function getDefaultPillars(): array
    {
        return [
            [
                'id' => 1,
                'name' => 'Inclusion',
                'slug' => 'inclusion',
                'description' => 'Accès équitable au numérique pour tous. Réduire la fracture numérique et permettre à chaque élève, enseignant et famille de bénéficier des outils numériques.',
                'icon' => 'users',
                'color' => '#4CAF50',
                'activities' => ['Formation des équipes éducatives', 'Accompagnement des familles', 'Accessibilité des outils', 'Réduction de la fracture numérique']
            ],
            [
                'id' => 2,
                'name' => 'Responsabilité',
                'slug' => 'responsabilite',
                'description' => 'Usage raisonné et réflexif des technologies. Choisir des solutions souveraines et respectueuses des données personnelles.',
                'icon' => 'shield',
                'color' => '#2196F3',
                'activities' => ['Protection des données personnelles', 'Souveraineté numérique', 'Sensibilisation à la sobriété', 'Choix de logiciels libres']
            ],
            [
                'id' => 3,
                'name' => 'Durabilité',
                'slug' => 'durabilite',
                'description' => 'Lutte contre l\'obsolescence programmée. Prolonger la vie du matériel informatique grâce à Linux.',
                'icon' => 'recycle',
                'color' => '#FF9800',
                'activities' => ['Adoption de Linux', 'Reconditionnement du matériel', 'Réemploi des équipements', 'Mutualisation des ressources']
            ]
        ];
    }

    private function getActors(): void
    {
        if (!$this->db) {
            echo json_encode($this->getDefaultActors());
            return;
        }

        try {
            $stmt = $this->db->query("SELECT * FROM nird_actors ORDER BY id");
            echo json_encode($stmt->fetchAll());
        } catch (\Exception $e) {
            echo json_encode($this->getDefaultActors());
        }
    }

    private function getDefaultActors(): array
    {
        return [
            ['id' => 1, 'name' => 'Élèves et éco-délégués', 'description' => 'Acteurs principaux de la transition', 'icon' => 'graduation-cap', 'role_type' => 'student'],
            ['id' => 2, 'name' => 'Enseignants', 'description' => 'Porteurs de la démarche pédagogique', 'icon' => 'chalkboard-teacher', 'role_type' => 'teacher'],
            ['id' => 3, 'name' => 'Directions d\'établissements', 'description' => 'Décideurs clés', 'icon' => 'building', 'role_type' => 'admin'],
            ['id' => 4, 'name' => 'Techniciens réseaux', 'description' => 'Experts techniques', 'icon' => 'tools', 'role_type' => 'tech'],
            ['id' => 5, 'name' => 'Collectivités territoriales', 'description' => 'Partenaires essentiels', 'icon' => 'landmark', 'role_type' => 'authority'],
            ['id' => 6, 'name' => 'Associations partenaires', 'description' => 'Accompagnateurs de la transition', 'icon' => 'handshake', 'role_type' => 'partner']
        ];
    }

    private function getJourneySteps(): void
    {
        if (!$this->db) {
            echo json_encode($this->getDefaultJourneySteps());
            return;
        }

        try {
            $stmt = $this->db->query("SELECT * FROM journey_steps ORDER BY step_number");
            echo json_encode($stmt->fetchAll());
        } catch (\Exception $e) {
            echo json_encode($this->getDefaultJourneySteps());
        }
    }

    private function getDefaultJourneySteps(): array
    {
        return [
            ['id' => 1, 'step_number' => 1, 'title' => 'Mobilisation', 'description' => 'Sensibiliser l\'équipe éducative', 'action_text' => 'Former un groupe pilote', 'icon' => 'flag', 'difficulty' => 'facile'],
            ['id' => 2, 'step_number' => 2, 'title' => 'Diagnostic', 'description' => 'Évaluer le parc informatique', 'action_text' => 'Auditer le parc', 'icon' => 'search', 'difficulty' => 'facile'],
            ['id' => 3, 'step_number' => 3, 'title' => 'Expérimentation', 'description' => 'Installer Linux sur quelques postes', 'action_text' => 'Lancer un pilote', 'icon' => 'flask', 'difficulty' => 'moyen'],
            ['id' => 4, 'step_number' => 4, 'title' => 'Formation', 'description' => 'Former les équipes', 'action_text' => 'Organiser des sessions', 'icon' => 'graduation-cap', 'difficulty' => 'moyen'],
            ['id' => 5, 'step_number' => 5, 'title' => 'Déploiement', 'description' => 'Étendre Linux à l\'ensemble du parc', 'action_text' => 'Déployer', 'icon' => 'rocket', 'difficulty' => 'avancé'],
            ['id' => 6, 'step_number' => 6, 'title' => 'Reconditionnement', 'description' => 'Ateliers avec les élèves', 'action_text' => 'Créer un atelier', 'icon' => 'recycle', 'difficulty' => 'moyen'],
            ['id' => 7, 'step_number' => 7, 'title' => 'Intégration', 'description' => 'Ancrer dans le projet d\'établissement', 'action_text' => 'Pérenniser', 'icon' => 'check-circle', 'difficulty' => 'avancé']
        ];
    }

    private function getScenarios(): void
    {
        $scenarios = [
            [
                'id' => 1,
                'title' => 'Mon parc est bloqué en Windows 10',
                'description' => 'La fin du support de Windows 10 approche et votre parc de 50 PC risque l\'obsolescence. Que faites-vous ?',
                'choices' => [
                    [
                        'id' => 'a',
                        'text' => 'Acheter 50 nouveaux PC compatibles Windows 11',
                        'result' => 'Coût estimé : 50 000€. Empreinte carbone élevée. Dépendance maintenue aux Big Tech.',
                        'score' => 0,
                        'isNird' => false
                    ],
                    [
                        'id' => 'b',
                        'text' => 'Installer Linux sur le parc existant',
                        'result' => 'Coût : quasi nul. Les PC retrouvent une seconde vie ! Vous économisez 50 000€ et réduisez votre empreinte carbone.',
                        'score' => 100,
                        'isNird' => true
                    ],
                    [
                        'id' => 'c',
                        'text' => 'Attendre et voir ce qui se passe',
                        'result' => 'Risque de failles de sécurité. Pas de solution durable. Les problèmes s\'accumulent.',
                        'score' => 10,
                        'isNird' => false
                    ]
                ]
            ],
            [
                'id' => 2,
                'title' => 'Des PC destinés à la déchetterie',
                'description' => 'La collectivité vous propose 20 ordinateurs "obsolètes" de 5 ans. Ils fonctionnent encore mais sont trop lents sous Windows.',
                'choices' => [
                    [
                        'id' => 'a',
                        'text' => 'Refuser, ils sont trop vieux',
                        'result' => 'Opportunité manquée. Ces PC partent en déchetterie alors qu\'ils pouvaient encore servir.',
                        'score' => 0,
                        'isNird' => false
                    ],
                    [
                        'id' => 'b',
                        'text' => 'Récupérer et reconditionner avec les élèves',
                        'result' => 'Excellent choix NIRD ! Les élèves apprennent, le matériel est sauvé, et vous équipez des familles ou des écoles.',
                        'score' => 100,
                        'isNird' => true
                    ],
                    [
                        'id' => 'c',
                        'text' => 'Les récupérer pour pièces détachées',
                        'result' => 'Bonne idée de récupération, mais le potentiel des machines n\'est pas exploité au maximum.',
                        'score' => 40,
                        'isNird' => false
                    ]
                ]
            ],
            [
                'id' => 3,
                'title' => 'Suite bureautique payante ou libre ?',
                'description' => 'Le renouvellement des licences Microsoft Office coûte 3000€/an. Une alternative existe : LibreOffice.',
                'choices' => [
                    [
                        'id' => 'a',
                        'text' => 'Renouveler les licences Office',
                        'result' => 'Coût annuel maintenu. Dépendance aux formats propriétaires. Pas d\'économie.',
                        'score' => 10,
                        'isNird' => false
                    ],
                    [
                        'id' => 'b',
                        'text' => 'Migrer vers LibreOffice',
                        'result' => 'Économie de 3000€/an ! Logiciel libre, pérenne, et formats ouverts. Choix NIRD exemplaire.',
                        'score' => 100,
                        'isNird' => true
                    ],
                    [
                        'id' => 'c',
                        'text' => 'Utiliser uniquement Google Docs',
                        'result' => 'Gratuit mais données stockées hors UE. Dépendance à un autre géant du numérique.',
                        'score' => 30,
                        'isNird' => false
                    ]
                ]
            ]
        ];

        echo json_encode($scenarios);
    }

    private function getStats(): void
    {
        $stats = [
            'computers_saved' => 15000,
            'co2_saved' => 4500,
            'money_saved' => 7500000,
            'schools_participating' => 127,
            'students_trained' => 3200,
            'trees_equivalent' => 225
        ];
        echo json_encode($stats);
    }

    private function getQuiz(): void
    {
        $quiz = [
            [
                'id' => 1,
                'question' => 'Quelle est la durée de vie moyenne d\'un ordinateur sous Windows selon les mises à jour forcées ?',
                'options' => ['3 ans', '5 ans', '7 ans', '10 ans'],
                'correct' => 1,
                'explanation' => 'Avec Linux, un ordinateur peut fonctionner 10 à 15 ans !'
            ],
            [
                'id' => 2,
                'question' => 'Que signifie NIRD ?',
                'options' => ['Nouveau Internet Responsable Durable', 'Numérique Inclusif Responsable Durable', 'Numérique Intelligent Rapide Digital', 'Nouvelle Initiative de Recyclage Digital'],
                'correct' => 1,
                'explanation' => 'NIRD = Numérique Inclusif, Responsable et Durable'
            ],
            [
                'id' => 3,
                'question' => 'Combien de CO2 économise-t-on en prolongeant la vie d\'un PC de 5 ans ?',
                'options' => ['50 kg', '150 kg', '300 kg', '500 kg'],
                'correct' => 2,
                'explanation' => 'Fabriquer un nouvel ordinateur émet environ 300 kg de CO2 !'
            ]
        ];
        echo json_encode($quiz);
    }

    private function submitContact(): void
    {
        $input = json_decode(file_get_contents('php://input'), true);
        
        $errors = $this->validateContact($input);
        
        if (!empty($errors)) {
            http_response_code(400);
            echo json_encode(['success' => false, 'errors' => $errors]);
            return;
        }

        if (!empty($input['website'])) {
            http_response_code(400);
            echo json_encode(['success' => false, 'errors' => ['spam' => 'Détection de spam']]);
            return;
        }

        if ($this->db) {
            try {
                $stmt = $this->db->prepare(
                    "INSERT INTO contact_messages (nom, email, sujet, message, honeypot, ip_address) VALUES (?, ?, ?, ?, ?, ?)"
                );
                $stmt->execute([
                    htmlspecialchars($input['nom']),
                    filter_var($input['email'], FILTER_SANITIZE_EMAIL),
                    htmlspecialchars($input['sujet']),
                    htmlspecialchars($input['message']),
                    $input['website'] ?? '',
                    $_SERVER['REMOTE_ADDR'] ?? 'unknown'
                ]);
            } catch (\Exception $e) {
                error_log("Contact save error: " . $e->getMessage());
            }
        }

        $funMessages = [
            "Par Toutatis ! Votre message a été transmis aux druides du village NIRD !",
            "Le pigeon voyageur libre (et open source) a emporté votre message !",
            "Votre message résiste désormais à l'Empire numérique !",
            "Les Gaulois du libre ont bien reçu votre missive !",
            "Merci ! Votre contribution à la résistance numérique est enregistrée !"
        ];

        echo json_encode([
            'success' => true,
            'message' => $funMessages[array_rand($funMessages)]
        ]);
    }

    private function validateContact(array $input): array
    {
        $errors = [];

        if (empty($input['nom']) || strlen(trim($input['nom'])) < 2) {
            $errors['nom'] = 'Le nom est requis (minimum 2 caractères)';
        }

        if (empty($input['email']) || !filter_var($input['email'], FILTER_VALIDATE_EMAIL)) {
            $errors['email'] = 'Email invalide';
        }

        if (empty($input['sujet']) || strlen(trim($input['sujet'])) < 3) {
            $errors['sujet'] = 'Le sujet est requis (minimum 3 caractères)';
        }

        if (empty($input['message']) || strlen(trim($input['message'])) < 10) {
            $errors['message'] = 'Le message est requis (minimum 10 caractères)';
        }

        return $errors;
    }

    private function parsePostgresArray(string $array): array
    {
        $array = trim($array, '{}');
        if (empty($array)) return [];
        
        preg_match_all('/"([^"]+)"|([^,]+)/', $array, $matches);
        $result = [];
        foreach ($matches[0] as $match) {
            $result[] = trim($match, '"');
        }
        return $result;
    }
}
