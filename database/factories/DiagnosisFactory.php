<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\User>
 */
class DiagnosisFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        return [
            'age_spots_score' => $this->faker->numberBetween(0, 100),
            'skin_age' => $this->faker->numberBetween(0, 100),
            'wrinkles_score' => $this->faker->numberBetween(0, 100),
            'texture_score' => $this->faker->numberBetween(0, 100),
            'dark_circles_v2_score' => $this->faker->numberBetween(0, 100),
            'moisture_score' => $this->faker->numberBetween(0, 100),
            'oiliness_score' => $this->faker->numberBetween(0, 100),
            'radiance_score' => $this->faker->numberBetween(0, 100),
            //'raw' => file_get_contents('tests/Feature/test.jpg')
        ];
    }
}
