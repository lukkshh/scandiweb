<?php

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    
    http_response_code(405);
    echo json_encode([
        'errors' => [
            ['message' => "Method Not Allowed!"]
        ]
    ]);

    exit;
}


require_once __DIR__.'/../vendor/autoload.php';

require_once __DIR__."/../controllers/database.php";
require_once __DIR__."/../controllers/products.php";
require_once __DIR__."/../controllers/graphql.php";
require_once __DIR__."/../controllers/orders.php";

use GraphQL\GraphQL;


$database = new Database();
$products = new Products($database);
$orders = new Orders($database);
$graphqlSchema = new GraphQLSchema($products , $orders);
$schema = $graphqlSchema->getSchema();

$input = json_decode(file_get_contents('php://input'), true);
$query = $input['query'] ?? '';
$variables = $input['variables'] ?? null;

try {
    $result = GraphQL::executeQuery($schema, $query, null, null, $variables);
    $output = $result->toArray();
    
    echo json_encode($output);
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode([
        'errors' => [
            ['message' => $e->getMessage()]
        ]
    ]);
}

