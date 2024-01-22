<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call(FacultySeeder::class);
        $this->call(DepartmentSeeder::class);
        $this->call(RuleSeeder::class);
        $this->call(LevelSeeder::class);
        $this->call(UeSeeder::class);
        $this->call(UserSeeder::class);
        $this->call(RequestPatternSeeder::class);
    }
}
