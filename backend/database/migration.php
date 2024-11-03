<?php

// Run This To Create Tables In Database;

require_once __DIR__.'/../vendor/autoload.php';

use Dotenv\Dotenv;

$dotenv = Dotenv::createImmutable(__DIR__."/../");
$dotenv->load();

$host = $_ENV["db_host"];
$dbname = $_ENV["db_name"];
$username = $_ENV["db_username"]; 
$password = $_ENV["db_password"];

try {
    
    $pdo = new PDO(
        "mysql:host=$host;dbname=$dbname",
        $username,
        $password);

    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    $sqlCategories = "
    CREATE TABLE IF NOT EXISTS categories (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL UNIQUE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    )";

    $sqlProducts = "
    CREATE TABLE IF NOT EXISTS products (
        id VARCHAR(50) PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        inStock BOOLEAN NOT NULL,
        gallery JSON,
        description TEXT,
        category VARCHAR(255),
        attributes JSON,
        brand VARCHAR(255),
        prices JSON,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        FOREIGN KEY (category) REFERENCES categories(name) ON DELETE CASCADE
    )";

    $sqlOrders = "
    CREATE TABLE IF NOT EXISTS orders (
        id INT AUTO_INCREMENT PRIMARY KEY,
        product_id VARCHAR(50),
        quantity INT NOT NULL,
        size VARCHAR(255) DEFAULT NULL,
        color VARCHAR(255) DEFAULT NULL,
        order_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
    )";

    $pdo->exec($sqlCategories);
    $pdo->exec($sqlProducts);
    $pdo->exec($sqlOrders);

    echo "Tables created successfully.";

} catch (PDOException $e) {
    echo "Error: " . $e->getMessage();
}

exit;
