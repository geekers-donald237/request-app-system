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
        $this->seedUE('ENG203', 'Anglais', 4, 2);
        $this->seedUE('ENG303', 'Anglais', 4, 3);
        $this->seedUE('FRAN203', 'Français', 4, 2);
        $this->seedUE('FRAN303', 'Français', 4, 3);
        $this->seedUE('ICT101', 'introduction to SI', 1, 1);
        $this->seedUE('ICT103', 'Introduction to C programming', 2, 1);
        $this->seedUE('ICT105', 'Algorithmique', 3, 1);
        $this->seedUE('ICT107', 'algebre mathematiques', 4, 1);
        $this->seedUE('ICT109', 'maths logique', 4, 1);
        $this->seedUE('ICT111', 'Data Coding', 4, 1);
        $this->seedUE('ICT201', 'Introduction au Genie Logiciel', 4, 2);
        $this->seedUE('ICT203', 'Database Systems', 4, 2);
        $this->seedUE('ICT205', 'Introduction to .Net Programming', 4, 2);
        $this->seedUE('ICT207', 'Java Programming', 4, 2);
        $this->seedUE('ICT213', 'Securite et Management du Risque Informatique', 4, 2);
        $this->seedUE('ICT215', 'Reseaux informatique', 4, 2);
        $this->seedUE('ICT217', 'Genie Logiciel', 4, 2);
        $this->seedUE('ICT301', 'Software architecture and designs', 12, 3);
        $this->seedUE('ICT303', 'Data communication', 4, 3);
        $this->seedUE('ICT305', 'WEB Application development', 4, 3);
        $this->seedUE('ICT307', 'Computer systems', 4, 3);
        $this->seedUE('ICT313', 'Cyber and internet security', 4, 3);
        $this->seedUE('ICT315', 'Network application development', 4, 3);
        $this->seedUE('ICT317', 'Information System', 4, 3);
    }

    private function seedUE(string $code, string $libelle, int $departmentId, int $levelId): void
    {
        UE::factory()->create([
            'code_ue' => $code,
            'libelle' => $libelle,
            'department_id' => $departmentId,
            'level_id' => $levelId,
        ]);
    }
}
