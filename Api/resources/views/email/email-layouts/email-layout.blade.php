<!-- resources/views/emails/email-layout.blade.php -->

<!DOCTYPE html>
<html lang="">
<head>
    <title>@yield('email-title')</title>
    <link rel="stylesheet" href="{{ asset('css/email-style.css') }}">
</head>
<body>
<div class="container">
    @yield('email-content')
    <p>Si vous avez des questions, n'hésitez pas à nous contacter.</p>
    <p>Cordialement,</p>
    <p>L'équipe de l'université</p>
    <footer>
        <br><hr>
        pour en savoir plus veuillez consulter notre politique de confidentialité en consultant les liens ci-dessous  <hr><br><br>
        <a href="#">Politique de confidentialité</a> |
        <a href="#">Conditions d'utilisation</a> |
        <a href="#">Contactez nous</a>
    </footer><br>
</div>
</body>
</html>
