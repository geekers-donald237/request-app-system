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
        Schema::create('requests', function (Blueprint $table) {
            $table->id();
            $table->foreignId('sender_id')->constrained('students');
            $table->foreignId('request_pattern_id')->constrained('request_patterns');
            $table->string('title');
            $table->text('content');
            $table->enum('status', [1, 2, 3, 4, 5, 6, 7, 8])->default(1);
            $table->boolean('in_draft')->default(1);
            $table->boolean('is_deleted')->default(0);
            $table->boolean('handwritten_piece_present_disc')->default(false);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('requests');
    }
};
