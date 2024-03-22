<!DOCTYPE html>
<html lang="">
<head>
    <title>Informations d'accès</title>
    <link rel="stylesheet" href="mail.css">
</head>
<body>
<div class="container">
    <h1>Informations d'accès</h1>
    <p>Cher.e <span style="font-weight: bold">{{$userData['name']}}</span></p>
    <p>Voici vos informations d'accès :</p>
    <div class="status-update">
        <p>Adresse e-mail :<span class="highlight"> [{{$userData['email']}}] </span></p>
        <p>Mot de passe : <span class="highlight"> [{{$userData['password']}}]  </span></p>
    </div>
    <p>Nous vous recommandons de changer votre mot de passe dès votre première connexion.</p>
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
