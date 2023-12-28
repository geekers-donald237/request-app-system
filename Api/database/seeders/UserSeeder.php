<?php

namespace Database\Seeders;

use App\Enums\RuleEnum;
use App\Models\Rule;
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
        User::factory()
            ->create([
                'name' => 'Mbiada Idris',
                'email' => 'bayidris@gmail.com',
                'password' => '123456789'
            ])
            ->rules()
            ->attach(Rule::whereName(RuleEnum::STUDENT->value)->first()->id);

        Student::factory()->create([
            'user_id' => (User::whereEmail('bayidris@gmail.com')->first()->id)
            , 'matricule' => '21Q2915',
        ]);

        User::factory()
            ->create([
                'name' => 'Nyadjou Lucie',
                'email' => 'nyadjou@gmail.com',
                'password' => '123456789'
            ])
            ->rules()
            ->attach(Rule::whereName(RuleEnum::STUDENT->value)->first()->id);

        Student::factory()->create([
            'user_id' => (User::whereEmail('nyadjou@gmail.com')->first()->id)
            , 'matricule' => '21Q5915',
        ]);
    }

    /**
     * @return void
     */
    public function createSecretaryUser(): void
    {
        User::factory()
            ->create([
                'name' => 'Jane doe',
                'email' => 'janedoe@gmail.com',
                'password' => '123456789'
            ])
            ->rules()
            ->attach(Rule::whereName(RuleEnum::SECRETARY->value)->first()->id);
    }

    /**
     * @return void
     */
    public function createStaffUser(): void
    {
        User::factory()
            ->create([
                'name' => 'John doe',
                'email' => 'johndoe@gmail.com',
                'password' => '123456789'
            ])
            ->rules()
            ->attach(Rule::whereName(RuleEnum::STAFF->value)->first()->id);

        Staff::factory()->create([
            'user_id' => (User::whereEmail('johndoe@gmail.com')->first()->id),
            'job_title' => 'Enseignant ICT317',
            'address' => 'Bloc Pedagogique Porte S107',
            'phone_number' => '585458558',
        ]);
    }

    /**
     * @return void
     */
    public function createTechnicalAdminUser(): void
    {
        User::factory()
            ->create([
                'name' => 'Equipe Technique',
                'email' => 'request-app@gmail.com',
                'password' => '123456789'
            ])
            ->rules()
            ->attach(Rule::whereName(RuleEnum::TECHNICAL_ADMIN->value)->first()->id);
    }
}
