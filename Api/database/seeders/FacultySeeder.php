<?php

namespace Database\Seeders;

use App\Enums\FacultyEnum;
use App\Models\Faculty;
use Illuminate\Database\Seeder;

class FacultySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Faculty::factory()->create([
            'name' => FacultyEnum::FACULTY_SCIENCES_DESCRIPTION,
            'acronym' => FacultyEnum::FACULTY_SCIENCES,
        ]);

        Faculty::factory()->create([
            'name' => FacultyEnum::FACULTY_LETTERS_DESCRIPTION,
            'acronym' => FacultyEnum::FACULTY_LETTERS,
        ]);

        Faculty::factory()->create([
            'name' => FacultyEnum::FACULTY_EDUCATION_DESCRIPTION,
            'acronym' => FacultyEnum::FACULTY_EDUCATION,
        ]);

        Faculty::factory()->create([
            'name' => FacultyEnum::FACULTY_MEDICINE_DESCRIPTION,
            'acronym' => FacultyEnum::FACULTY_MEDICINE,
        ]);

        Faculty::factory()->create([
            'name' => FacultyEnum::FACULTY_MANAGEMENT_SCIENCES_DESCRIPTION,
            'acronym' => FacultyEnum::FACULTY_MANAGEMENT_SCIENCES,
        ]);
    }
}
