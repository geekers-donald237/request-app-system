<?php

namespace Database\Seeders;

use App\Enums\RuleEnum;
use App\Models\Rule;
use App\Models\User;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        User::factory()
            ->create([
                'name' => 'Mbiada Idris',
                'email' => 'bayidris@gmail.com',
                'password' => '123456789'
            ])
            ->rules()
            ->attach(Rule::whereName(RuleEnum::STUDENT->value)->first()->id);

        User::factory()
            ->create([
                'name' => 'Nyadjou Lucie',
                'email' => 'nyadjou@gmail.com',
                'password' => '123456789'
            ])
            ->rules()
            ->attach(Rule::whereName(RuleEnum::STUDENT->value)->first()->id);

        User::factory()
            ->create([
                'name' => 'Jane doe',
                'email' => 'janedoe@gmail.com',
                'password' => '123456789'
            ])
            ->rules()
            ->attach(Rule::whereName(RuleEnum::SECRETARY->value)->first()->id);

        User::factory()
            ->create([
                'name' => 'John doe',
                'email' => 'johndoe@gmail.com',
                'password' => '123456789'
            ])
            ->rules()
            ->attach(Rule::whereName(RuleEnum::STAFF->value)->first()->id);

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
