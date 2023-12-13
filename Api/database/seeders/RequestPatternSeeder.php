<?php

namespace Database\Seeders;

use App\Enums\RequestPatternEnum;
use App\Models\RequestPattern;
use Illuminate\Database\Seeder;

class RequestPatternSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        RequestPattern::factory()->create([
            'pattern_name' => RequestPatternEnum::MARK_ABSENCE->value,
            'pattern_description' => RequestPatternEnum::MARK_ABSENCE->value,
        ]);

        RequestPattern::factory()->create([
            'pattern_name' => RequestPatternEnum::MARK_ERROR_DESCRIPTION->value,
            'pattern_description' => RequestPatternEnum::MARK_ERROR_DESCRIPTION->value,
        ]);
    }
}
