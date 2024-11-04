<?php

use GraphQL\Type\Schema;
use GraphQL\Type\Definition\Type;
use GraphQL\Type\Definition\ObjectType;
use GraphQL\Type\Definition\InputObjectType;

class GraphQLSchema {
    private $product;
    private $orders;

    public function __construct(Products $product , Orders $orders) {
        $this->product = $product;
        $this->orders = $orders;
    }

    public function getSchema() {
        // ProductType definition
        $productType = new ObjectType([
            'name' => 'Product',
            'fields' => [
                'id' => Type::string(),
                'name' => Type::string(),
                'inStock' => Type::boolean(),
                'gallery' => Type::listOf(Type::string()),
                'description' => Type::string(),
                'category' => Type::string(),
                'attributes' => Type::listOf(new ObjectType([
                    'name' => 'AttributeSet',
                    'fields' => [
                        'id' => Type::string(),
                        'items' => Type::listOf(new ObjectType([
                            'name' => 'Attribute',
                            'fields' => [
                                'displayValue' => Type::string(),
                                'value' => Type::string(),
                                'id' => Type::string(),
                            ]
                        ])),
                        'name' => Type::string(),
                        'type' => Type::string(),
                    ]
                ])),
                'prices' => Type::listOf(new ObjectType([
                    'name' => 'Price',
                    'fields' => [
                        'amount' => Type::float(),
                        'currency' => new ObjectType([
                            'name' => 'Currency',
                            'fields' => [
                                'label' => Type::string(),
                                'symbol' => Type::string(),
                            ]
                        ]),
                    ]
                ])),
                'brand' => Type::string(),
            ]
        ]);

        // CategoryType definition
        $categoryType = new ObjectType([
            'name' => 'Category',
            'fields' => [
                'name' => Type::string(),
                '__typename' => Type::string(),
            ]
        ]);

        // Query definition
        $queryType = new ObjectType([
            'name' => 'Query',
            'fields' => [
                'products' => [
                    'type' => Type::listOf($productType),
                    'resolve' => function () {
                        return $this->product->getProducts();
                    }
                ],
                'productsByCategory' => [
                    'type' => Type::listOf($productType),
                    'args' => [
                        'category' => Type::string(),
                    ],
                    'resolve' => function ($root, $args) {
                        return $this->product->getProductsByCategory($args['category']);
                    }
                ],
                'categories' => [
                    'type' => Type::listOf($categoryType),
                    'resolve' => function () {
                        return $this->product->getCategories();
                    }
                ],
                'product' => [
                    'type' => $productType,
                    'args' => [
                        'id' => Type::nonNull(Type::string())
                    ],
                    'resolve' => function ($root, $args) {
                        return $this->product->getProductById($args['id']);
                    }
                ],
            ]
        ]);

        // Mutation definition
        $mutationType = new ObjectType([
            'name' => 'Mutation',
            'fields' => [
                'placeOrder' => [
                    'type' => Type::boolean(), 
                    'args' => [
                        'orders' => Type::listOf(new InputObjectType([
                            'name' => 'OrderInput',
                            'fields' => [
                                'id' => Type::nonNull(Type::string()),    
                                'quantity' => Type::nonNull(Type::int()), 
                                'size' => Type::string(),                  
                                'color' => Type::string(),                 
                            ],
                        ])),
                    ],
                    'resolve' => function ($root, $args) {
                        return $this->orders->placeOrder($args['orders']);
                    }
                ],
            ]
        ]);

        return new Schema([
            'query' => $queryType,
            'mutation' => $mutationType
        ]);
    }
}

