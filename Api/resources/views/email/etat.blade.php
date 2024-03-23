<!DOCTYPE html>
<html lang="">
<head>
    <title>Changement de statut de la requête</title>
    <link rel="stylesheet" href="mail.css">
</head>
<body>
<div class="container">
    <h1>Changement de statut de la requête</h1>
    <p>Cher.e <span style="font-weight: bold">{{$userData['name']}}</span></p>
    <p>Nous tenons à vous informer que le statut de votre requête a été mis à jour :</p>
    <div class="status-update">
        <p>Requête : <span class="highlight">[{{$userData['request_number']}}]</span></p>
        <p>Nouveau statut : <span class="highlight">[{{$userData['new_state']}}]</span></p>
    </div>

    <p>Nous vous invitons à vous connecter à votre compte pour consulter les détails de votre requête.</p>
    <p>Si vous avez des questions, n'hésitez pas à nous contacter.</p>
    <p>Cordialement,</p>
    <p>L'équipe de l'université</p>
    <footer><br>
        <hr>
        pour en savoir plus veuillez consulter notre politique de confidentialité en consultant les liens ci-dessous
        <hr>
        <br><br>
        <a href="#">Politique de confidentialité</a> |
        <a href="#">Conditions d'utilisation</a> |
        <a href="#">Contactez nous</a>
    </footer>
    <br>
</div>

</body>
</html>
