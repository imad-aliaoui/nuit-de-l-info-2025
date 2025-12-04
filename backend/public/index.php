<?php

require_once __DIR__ . '/../src/Config/Database.php';
require_once __DIR__ . '/../src/Controllers/ApiController.php';

use App\Config\Database;
use App\Controllers\ApiController;

Database::getInstance()->initializeTables();

$controller = new ApiController();
$controller->handleRequest();
