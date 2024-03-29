# EasyRequest

Bienvenue dans le Gestionnaire de Requêtes.
Ce système permettra de simplifier et d'automatiser le processus de 
demande des étudiants et d'améliorer la transparence et 
la communication avec eux (Personnels administratifs).

## Stack du projet

- PHP 8.1 +
- Laravel 10
- Composer 
- Node.js et npm 
- Angular 17


## Installation

1. Clonez ce dépôt dans votre environnement local :

    ```bash
    git clone https://github.com/votre-utilisateur/gestion-requetes.git
    ```

2. Accédez au répertoire du projet :

    ```bash
    cd gestion-requetes
    ```

3. Installez les dépendances PHP via Composer :

    ```bash
    composer install
    ```

4. Copiez le fichier d'environnement :

    ```bash
    cp .env.example .env
    ```

5. Configurez votre base de données dans le fichier `.env`.

6. Générez la clé d'application :

    ```bash
    php artisan key:generate
    ```

7. Exécutez les migrations pour créer les tables de base de données :

    ```bash
    php artisan migrate
    ```

8. Installez les dépendances front-end via npm :

    ```bash
    npm install
    ```

9. Compilez les assets front-end :

    ```bash
    npm run dev
    ```

10. Lancez le serveur de développement :

    ```bash
    php artisan serve
    ```

Votre application devrait être accessible à l'adresse [http://localhost:8000](http://localhost:8000).

## Fonctionnalités

- **Gestion des Utilisateurs et des Rôles :** Les utilisateurs peuvent être associés à différents rôles pour définir leurs permissions.

- **Gestion des Requêtes :** Permet aux utilisateurs de soumettre des requêtes et aux administrateurs de les gérer.


## Contributeurs

Les contributions sont les bienvenues! N'hésitez pas à ouvrir une issue ou à proposer une pull request.

## Licence

Ce projet est sous License [PROPRIETAIRE](LICENSE).
