<!-- resources/views/emails/informations-acces.blade.php -->

@extends('email.email-layouts.email-layout')

@section('email-title', 'Informations d\'accès')


@section('email-content')
    <h1>Informations d'accès</h1>
    <p>Cher étudiant,</p>
    <p>Voici vos informations d'accès :</p>

    <div class="status-update">
        <p><span class="highlight">Adresse e-mail :</span> [ADRESSE E-MAIL]</p>
        <p><span class="highlight">Mot de passe :</span> [MOT DE PASSE]</p>
    </div>

    <p>Nous vous recommandons de changer votre mot de passe dès votre première connexion.</p>
@endsection
