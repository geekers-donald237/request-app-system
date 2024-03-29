<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('u_e_s', function (Blueprint $table) {
            $table->id();
            $table->foreignId('level_id')->constrained('levels');
            $table->foreignId('department_id')->constrained('departments');
            $table->foreignId('staff_id')->constrained('staff');
            $table->string('code_ue');
            $table->string('libelle');
            $table->boolean('is_deleted')->default(0);
            $table->date('publication_date')->nullable();
            $table->timestamp('request_deadline')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('u_e_s');
    }
};
