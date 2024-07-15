## Prérequis

Avant de commencer, assurez-vous d'avoir installé Docker et Docker Compose sur votre machine.

## Installation

1. Clonez le dépôt :

   ```sh
   git clone https://github.com/mouradof/projectlba.git
   cd projectlba
   ```

2. Créez un fichier .env dans le répertoire backend et ajoutez les variables d'environnement nécessaires :

  ```sh
  Copier le code
  MONGO_URI=mongodb://mongo:27017/mydatabase
  JWT_SECRET=your_jwt_secret
  ```

3. Construisez et lancez les services Docker :

Copier le code

  ```sh
  docker-compose up --build
  ```

Cette commande va :

Construire l'image Docker pour le backend et le frontend
Démarrer les conteneurs pour le backend, le frontend et MongoDB
Exposer le backend sur le port 5100 et le frontend sur le port 3000
Accédez à l'application dans votre navigateur à l'adresse http://localhost:3000/register.

4. Structure du Projet

backend/ : Contient le code du backend (Node.js, Express, MongoDB)
frontend/ : Contient le code du frontend (React, Redux, Material-UI, Vite)
docker-compose.yml : Fichier de configuration Docker Compose pour orchestrer les services
README.md : Fichier de documentation du projet
Points Clés

Sécurité : Les routes du backend sont protégées par JWT (JSON Web Token).
Modularité : Le code est organisé en composants réutilisables pour le frontend et en modules pour le backend.
State Management : Redux est utilisé pour gérer l'état global de l'application.
Commandes Utiles

Copier le code
# Lancer les services en arrière-plan

```sh
docker-compose up -d
```

# Arrêter les services
```sh
docker-compose down
```

# Rebuild les services

```sh
docker-compose up --build
```
