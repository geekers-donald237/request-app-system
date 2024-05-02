<?php

namespace Database\Seeders;

use App\Enums\EmailEnum;
use App\Enums\RuleEnum;
use App\Helpers\HelpersFunction;
use App\Models\Rule;
use App\Models\Secretary;
use App\Models\Staff;
use App\Models\Student;
use App\Models\User;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    public array $userData;


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
        User::factory()->create(['name' => 'Compte test eleve', 'email' => 'student@gmail.com', 'password' => '123456789'])->rules()->attach(Rule::whereName(RuleEnum::STUDENT->value)->first()->id);

        Student::factory()->create(['user_id' => (User::whereEmail('student@gmail.com')->first()->id),
            'matricule' => '21Q2915'
            , 'department_id' => '4'
            , 'level_id' => 3,

        ]);

        $this->userData = [
            'name' => "Dany mckeny",
            'email' => 'danymckeny@gmail.com',
            'password' => '123456789',

        ];
        HelpersFunction::sendEmail($this->userData, EmailEnum::STATUT3->value);
    }

    /**
     * @return void
     */
    public function createSecretaryUser(): void
    {
        User::factory()->create(['name' => 'Compte test secretaire', 'email' => 'secretary@gmail.com', 'password' => '123456789'])->rules()->attach(Rule::whereName(RuleEnum::SECRETARY->value)->first()->id);
        Secretary::factory()->create(['user_id' => (User::whereEmail('secretary@gmail.com')->first()->id), 'job_title' => 'secretaire dpt info', 'address' => 'Extension 2', 'phone_number' => '+237 699854525', 'department_id' => '4']);

    }

    /**
     * @return void
     */
    public function createStaffUser(): void
    {
        User::factory()->create(['name' => 'Compte test Enseigant',
            'email' => 'teacher@gmail.com', 'password' => '123456789'])->rules()->attach(Rule::whereName(RuleEnum::STAFF->value)->first()->id);

        Staff::factory()->create(['user_id' => (User::whereEmail('teacher@gmail.com')->first()->id), 'job_title' => 'Enseignant ICT317', 'address' => 'Bloc Pedagogique Porte S107', 'phone_number' => '+237 699854525']);

    }

    /**
     * @return void
     */
    public function createTechnicalAdminUser(): void
    {
        User::factory()->create(['name' => 'Equipe Technique', 'email' => 'request-app@gmail.com', 'password' => '123456789'])->rules()->attach(Rule::whereName(RuleEnum::TECHNICAL_ADMIN->value)->first()->id);
    }

}
