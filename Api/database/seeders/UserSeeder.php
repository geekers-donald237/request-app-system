<?php

namespace Database\Seeders;

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
            ->attach(Rule::whereName('student')->first()->id);

        User::factory()
            ->create([
                'name' => 'Nyadjou Lucie',
                'email' => 'nyadjou@gmail.com',
                'password' => '123456789'
            ])
            ->rules()
            ->attach(Rule::whereName('student')->first()->id);

        User::factory()
            ->create([
                'name' => 'Jane doe',
                'email' => 'janedoe@gmail.com',
                'password' => '123456789'
            ])
            ->rules()
            ->attach(Rule::whereName('secretary')->first()->id);

        User::factory()
            ->create([
                'name' => 'John doe',
                'email' => 'johndoe@gmail.com',
                'password' => '123456789'
            ])
            ->rules()
            ->attach(Rule::whereName('staff')->first()->id);

        User::factory()
            ->create([
                'name' => 'Zogo dylan',
                'email' => 'zaz@gmail.com',
                'password' => '123456789'
            ])
            ->rules()
            ->attach(Rule::whereName('technical_admin')->first()->id);

    }
}
