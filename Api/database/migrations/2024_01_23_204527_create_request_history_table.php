<?php

use App\Enums\RequestStateEnum;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('request_history', function (Blueprint $table) {
            $table->id();
            $table->foreignId('request_id')->constrained('requests');
            $table->foreignId('modify_by')->constrained('users');
            $table->enum('status', [
                RequestStateEnum::ATTENTE_DE_SOUMISSION->value,
                RequestStateEnum::ATTENTE_DE_VALIDATION->value,
                RequestStateEnum::EN_COURS_DE_TRAITEMENT->value,
                RequestStateEnum::ACCEPTEE->value,
                RequestStateEnum::REFUSEE->value,
                RequestStateEnum::TERMINEE->value,
            ]);
            $table->boolean('is_deleted')->default(0);

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('request_history');
    }
};
