<?php

interface ProductInterface {
    public function getId(): string;
    public function getName(): string;
    public function isInStock(): bool;
    public function getGallery(): array;
    public function getDescription(): string;
    public function getCategory(): string;
    public function getAttributes(): array;
    public function getPrices(): array;
    public function getBrand(): string;
}

class Product implements ProductInterface {
    private string $id;
    private string $name;
    private bool $inStock;
    private array $gallery;
    private string $description;
    private string $category;
    private array $attributes;
    private array $prices;
    private string $brand;

    public function __construct(array $data) {
        $this->id = $data['id'];
        $this->name = $data['name'];
        $this->inStock = (bool) $data['inStock'];
        $this->gallery = json_decode($data['gallery'], true);
        $this->description = $data['description'];
        $this->category = $data['category'];
        $this->attributes = json_decode($data['attributes'], true);
        $this->prices = json_decode($data['prices'], true);
        $this->brand = $data['brand'];
    }

    public function getId(): string {
        return $this->id;
    }

    public function getName(): string {
        return $this->name;
    }

    public function isInStock(): bool {
        return $this->inStock;
    }

    public function getGallery(): array {
        return $this->gallery;
    }

    public function getDescription(): string {
        return $this->description;
    }

    public function getCategory(): string {
        return $this->category;
    }

    public function getAttributes(): array {
        return $this->attributes;
    }

    public function getPrices(): array {
        return $this->prices;
    }

    public function getBrand(): string {
        return $this->brand;
    }


}

class Category {
    private string $id;
    private string $name;

    public function __construct(array $data) {
        $this->id = $data['id'];
        $this->name = $data['name'];
    }

    public function getId(): string {
        return $this->id;
    } 

    public function getName(): string {
        return $this->name;
    }


}



class Products {
    private PDO $db;
    private array $products;

    public function __construct(Database $db) {
        $this->db = $db->getConnection();
    }

    public function getProducts(): array {
        $statement = $this->db->prepare("SELECT * FROM products");
        $statement->execute();
        $rows = $statement->fetchAll(PDO::FETCH_ASSOC);

        $products = [];
        foreach ($rows as $row) {
            $products[] = new Product($row); // Create Product entity
        }
        return $products;
    }

    public function getProductsByCategory(string $category): array {
        $statement = $this->db->prepare("SELECT * FROM products WHERE category = :category");
        $statement->bindParam(':category', $category, PDO::PARAM_STR);
        $statement->execute();
        $rows = $statement->fetchAll(PDO::FETCH_ASSOC);

        $products = [];
        foreach ($rows as $row) {
            $products[] = new Product($row); // Create Product entity
        }
        return $products;
    }

    public function getProductById(string $id): ?Product {
        $statement = $this->db->prepare("SELECT * FROM products WHERE id = :id");
        $statement->bindParam(':id', $id, PDO::PARAM_STR);
        $statement->execute();
        $row = $statement->fetch(PDO::FETCH_ASSOC);

        if ($row) {
            return new Product($row); // Create Product entity
        }
        return null;    

        
    }


    public function getCategories(): array {
        $statement = $this->db->prepare("SELECT * FROM categories");
        $statement->execute();
        $rows = $statement->fetchAll(PDO::FETCH_ASSOC);

        $categories = [];        
        foreach ($rows as $row) {
            $categories[] = new Category($row);
        }

        return $categories;
    }

}


// class Products {
//     private $db;

//     public function __construct(Database $db) {
//         $this->db = $db->getConnection();
//     }

//     public function getProducts() {
//         $statement = $this->db->prepare("SELECT * FROM products");
//         $statement->execute();
//         $products = $statement->fetchAll(PDO::FETCH_ASSOC);

//         // Decode the gallery, attributes and prices field to make sure it's an array
//         foreach ($products as &$product) {
//             $product['gallery'] = json_decode($product['gallery'], true);
//             $product['attributes'] = json_decode($product['attributes'], true);
//             $product['prices'] = json_decode($product['prices'], true);
//         }

//         return $products;

//     }
    
//     public function getProductsByCategory($category) {
//         $statement = $this->db->prepare("SELECT * FROM products WHERE category = :category");
//         $statement->bindParam(':category', $category, PDO::PARAM_STR);
//         $statement->execute();
//         $products = $statement->fetchAll(PDO::FETCH_ASSOC);

//         // Decode the gallery, attributes and prices field to make sure it's an array
//         foreach ($products as &$product) {
//             $product['gallery'] = json_decode($product['gallery'], true);
//             $product['attributes'] = json_decode($product['attributes'], true);
//             $product['prices'] = json_decode($product['prices'], true);
//         }   

//         return $products;
//     }

//     public function getCategories() {
//         $statement = $this->db->prepare("SELECT * FROM categories");
//         $statement->execute();
//         $categories = $statement->fetchAll(PDO::FETCH_ASSOC);

//         return $categories;
//     }

//     public function getProductById($id) {
//         $statement = $this->db->prepare("SELECT * FROM products WHERE id = :id");
//         $statement->bindParam(':id', $id, PDO::PARAM_STR);
//         $statement->execute();
//         $products = $statement->fetch(PDO::FETCH_ASSOC);

//         // Decode the gallery, attributes and prices field to make sure it's an array
//         $products['gallery'] = json_decode($products['gallery'], true);
//         $products['attributes'] = json_decode($products['attributes'], true);
//         $products['prices'] = json_decode($products['prices'], true);
    

//         return $products;

//     }

// }