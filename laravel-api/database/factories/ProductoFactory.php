<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class ProductoFactory extends Factory
{
    public function definition(): array
    {
        return [
            'nombre' => fake()->unique()->words(3, true),
            'precio' => fake()->randomFloat(2, 100, 5000),
            'stock' => fake()->numberBetween(0, 100),
        ];
    }
}