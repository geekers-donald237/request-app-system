<?php

namespace Database\Seeders;

use App\Models\UE;
use Illuminate\Database\Seeder;

class UeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $this->seedUE('ICT313', 'Cyber and internet security', 4, 3, 1);
        $this->seedUE('ICT315', 'Network application development', 4, 3, 2);
        $this->seedUE('ICT317', 'Information System', 4, 3, 3);
    }

    private function seedUE(string $code, string $libelle, int $departmentId, int $levelId, int $staffId): void
    {
        UE::factory()->create([
            'code_ue' => $code,
            'libelle' => $libelle,
            'department_id' => $departmentId,
            'level_id' => $levelId,
            'staff_id' => $staffId
        ],);
    }
}
