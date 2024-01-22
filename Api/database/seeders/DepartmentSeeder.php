<?php

namespace Database\Seeders;
use Illuminate\Database\Seeder;
use App\Models\Faculty;
use App\Models\Department;
use App\Enums\FacultyEnum;

class DepartmentSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $this->createFacultyDepartments(FacultyEnum::FACULTY_SCIENCES, ['Mathématiques', 'Physique', 'Biologie', 'Informatique']);
        $this->createFacultyDepartments(FacultyEnum::FACULTY_MEDICINE, ['Médecine Générale', 'Sciences Biomédicales']);
        $this->createFacultyDepartments(FacultyEnum::FACULTY_MANAGEMENT_SCIENCES, ['Gestion', 'Finance']);
        $this->createFacultyDepartments(FacultyEnum::FACULTY_LETTERS, ['Littérature', 'Langues Étrangères']);
        $this->createFacultyDepartments(FacultyEnum::FACULTY_EDUCATION, ['Sciences de l\'Éducation', 'Psychologie']);
    }

    private function createFacultyDepartments(string $facultyAcronym, array $departmentNames): void
    {
        $faculty = Faculty::where('acronym', $facultyAcronym)->first();
        foreach ($departmentNames as $departmentName) {
            Department::factory()->create([
                'faculty_id' => $faculty->id,
                'name' => $departmentName,
            ]);
        }
    }
}
