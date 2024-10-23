<?php

class Products {
    private $db;

    public function __construct(Database $db) {
        $this->db = $db->getConnection();
    }

    public function getProducts() {
        $statement = $this->db->prepare("SELECT * FROM products");
        $statement->execute();
        $products = $statement->fetchAll(PDO::FETCH_ASSOC);

        // Decode the gallery, attributes and prices field to make sure it's an array
        foreach ($products as &$product) {
            $product['gallery'] = json_decode($product['gallery'], true);
            $product['attributes'] = json_decode($product['attributes'], true);
            $product['prices'] = json_decode($product['prices'], true);
        }

        return $products;

    }

    public function getCategories() {
        $statement = $this->db->prepare("SELECT * FROM categories");
        $statement->execute();
        $categories = $statement->fetchAll(PDO::FETCH_ASSOC);

        return $categories;
    }

    public function getProductById($id) {
        $statement = $this->db->prepare("SELECT * FROM products WHERE id = :id");
        $statement->bindParam(':id', $id, PDO::PARAM_STR);
        $statement->execute();
        $products = $statement->fetch(PDO::FETCH_ASSOC);

        // Decode the gallery, attributes and prices field to make sure it's an array
        $products['gallery'] = json_decode($products['gallery'], true);
        $products['attributes'] = json_decode($products['attributes'], true);
        $products['prices'] = json_decode($products['prices'], true);
    

        return $products;

    }

}