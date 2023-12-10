<?php

namespace Database\Seeders;

use App\Enums\RuleEnum;
use App\Models\Rule;
use Illuminate\Database\Seeder;

class RuleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Rule::factory()->create([
            'name' => RuleEnum::STUDENT->value,
            'description' => 'Student Role',
        ]);

        Rule::factory()->create([
            'name' => 'staff',
            'description' => 'Staff Role',
        ]);

        Rule::factory()->create([
            'name' => 'secretary',
            'description' => 'Secretary Role',
        ]);

        Rule::factory()->create([
            'name' => 'technical_admin',
            'description' => 'Technical Admin Role',
        ]);
    }
}
