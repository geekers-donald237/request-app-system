<?php

namespace Database\Seeders;

use App\Enums\RuleEnum;
use App\Models\Rule;
use App\Models\Secretary;
use App\Models\Staff;
use App\Models\Student;
use App\Models\User;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $this->createdStudentUsers();
        $this->createSecretaryUser();
        $this->createStaffUser();
        $this->createTechnicalAdminUser();

    }

    /**
     * @return void
     */
    public function createdStudentUsers(): void
    {
        User::factory()->create(['name' => 'Mbiada Idris', 'email' => 'bayidris@gmail.com', 'password' => '123456789'])->rules()->attach(Rule::whereName(RuleEnum::STUDENT->value)->first()->id);

        Student::factory()->create(['user_id' => (User::whereEmail('bayidris@gmail.com')->first()->id),
            'matricule' => '21Q2915'
            , 'department_id' => '4'
            , 'level_id' => 3,

        ]);
    }

    /**
     * @return void
     */
    public function createSecretaryUser(): void
    {
        User::factory()->create(['name' => 'Jane doe', 'email' => 'janedoe@gmail.com', 'password' => '123456789'])->rules()->attach(Rule::whereName(RuleEnum::SECRETARY->value)->first()->id);

        Secretary::factory()->create(['user_id' => (User::whereEmail('janedoe@gmail.com')->first()->id), 'job_title' => 'secretaire dpt info', 'address' => 'Extension 2', 'phone_number' => '+237 699854525', 'department_id' => '4']);
    }

    /**
     * @return void
     */
    public function createStaffUser(): void
    {
        User::factory()->create(['name' => 'John doe',
            'email' => 'johndoe@gmail.com', 'password' => '123456789'])->rules()->attach(Rule::whereName(RuleEnum::STAFF->value)->first()->id);

        Staff::factory()->create(['user_id' => (User::whereEmail('johndoe@gmail.com')->first()->id), 'job_title' => 'Enseignant ICT317', 'address' => 'Bloc Pedagogique Porte S107', 'phone_number' => '+237 699854525']);
    }

    /**
     * @return void
     */
    public function createTechnicalAdminUser(): void
    {
        User::factory()->create(['name' => 'Equipe Technique', 'email' => 'request-app@gmail.com', 'password' => '123456789'])->rules()->attach(Rule::whereName(RuleEnum::TECHNICAL_ADMIN->value)->first()->id);
    }
}
