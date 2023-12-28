<?php

use App\Enums\RequestStateEnum;
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
            $table->enum('statut', [
                RequestStateEnum::ATTENTE_DE_SOUMISSION->value,
                RequestStateEnum::ATTENTE_DE_VALIDATION->value,
                RequestStateEnum::ATTENTE_DE_TRAITEMENT->value,
                RequestStateEnum::EN_COURS_DE_TRAITEMENT->value,
                RequestStateEnum::ATTENTE_DE_DECISION->value,
                RequestStateEnum::ACCEPTEE->value,
                RequestStateEnum::REFUSEE->value,
                RequestStateEnum::EN_ATTENTE_DE_REPONSE_DE_L_ETUDIANT->value,
                RequestStateEnum::TERMINEE->value,
            ])->default(RequestStateEnum::ATTENTE_DE_SOUMISSION->value,);
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
