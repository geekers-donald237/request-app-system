<?php

use App\Enums\RuleEnum;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('rules', function (Blueprint $table) {
            $table->id();
            $table->enum('name', [RuleEnum::STUDENT->value, RuleEnum::STAFF->value, RuleEnum::SECRETARY->value, RuleEnum::TECHNICAL_ADMIN->value])->unique();
            $table->string('description');
            $table->timestamps();
        });

    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('rules');
    }
};
