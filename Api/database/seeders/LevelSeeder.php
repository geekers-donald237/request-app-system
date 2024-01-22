<?php

namespace Database\Seeders;

use App\Enums\LevelEnum;
use App\Models\Level;
use Illuminate\Database\Seeder;

class LevelSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $this->createLevel(LevelEnum::LEVEL_L1, LevelEnum::LEVEL_L1_DESCRIPTION);
        $this->createLevel(LevelEnum::LEVEL_L2, LevelEnum::LEVEL_L2_DESCRIPTION);
        $this->createLevel(LevelEnum::LEVEL_L3, LevelEnum::LEVEL_L3_DESCRIPTION);
        $this->createLevel(LevelEnum::LEVEL_M1, LevelEnum::LEVEL_M1_DESCRIPTION);
        $this->createLevel(LevelEnum::LEVEL_M2, LevelEnum::LEVEL_M2_DESCRIPTION);
        $this->createLevel(LevelEnum::LEVEL_D1, LevelEnum::LEVEL_D1_DESCRIPTION);
        $this->createLevel(LevelEnum::LEVEL_D2, LevelEnum::LEVEL_D2_DESCRIPTION);
        $this->createLevel(LevelEnum::LEVEL_PLUS, LevelEnum::LEVEL_PLUS_DESCRIPTION);

        // Ajoutez d'autres niveaux au besoin
    }

    private function createLevel(string $code, string $name): void
    {
        Level::factory()->create([
            'code' => $code,
            'name' => $name,
        ]);
    }
}
