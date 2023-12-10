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
            'name' => RuleEnum::STAFF->value,
            'description' => 'Staff Role',
        ]);

        Rule::factory()->create([
            'name' => RuleEnum::SECRETARY->value,
            'description' => 'Secretary Role',
        ]);

        Rule::factory()->create([
            'name' => RuleEnum::TECHNICAL_ADMIN->value,
            'description' => 'Technical Admin Role',
        ]);
    }
}
