<!-- resources/views/emails/changement-statut.blade.php -->

@extends('email.email-layouts.email-layout')

@section('email-title', 'Changement de statut de la requête')


@section('email-content')
    <h1>Changement de statut de la requête</h1>
    <p>Cher utilisateur,</p>
    <p>Nous tenons à vous informer que le statut de votre requête a été mis à jour :</p>

    <div class="status-update">
        <p>Requête : <span class="highlight">[NUMÉRO DE REQUÊTE]</span></p>
        <p>Nouveau statut : <span class="highlight">[NOUVEAU STATUT]</span></p>
    </div>

    <p>Nous vous invitons à vous connecter à votre compte pour consulter les détails de votre requête.</p>

@endsection
