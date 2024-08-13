FROM node:lts-alpine

# Créer l'utilisateur vscode
RUN adduser -D vscode

# Ajouter les fichiers source
ADD . /src/
WORKDIR /src

# Changer les permissions des fichiers
RUN chown -R vscode:vscode /src

# Changer l'utilisateur pour vscode
USER vscode

# Installer les dépendances
RUN yarn

# Exposer le port de l'application
EXPOSE 3000