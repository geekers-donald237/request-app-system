@extends('email.email-layouts.email-layout')

@section('email-title', 'Nouvelle deadline ajoutée')


@section('email-content')
    <h1>Nouvelle deadline ajoutée</h1>
    <p>Cher utilisateur,</p>
    <p>Nous tenons à vous informer qu'une nouvelle deadline a été ajoutée/modifiée :</p>

    <div class="deadline-update">
        <p>Tâche : <span class="highlight">[NOM DE LA TÂCHE]</span></p>
        <p>Nouvelle deadline : <span class="highlight">[DATE DE LA DEADLINE]</span></p>
    </div>

    <p>Nous vous recommandons de prendre en compte cette nouvelle deadline pour vos activités.</p>
@endsection
