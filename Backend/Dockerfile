# Backend Dockerfile
FROM node:20-alpine

# Carpeta de trabajo dentro del contenedor
WORKDIR /usr/src/app

# Copiamos package.json y package-lock.json
COPY package*.json ./

# Instalamos dependencias de producción
RUN npm install --production

# Copiamos el resto del código
COPY . .

# Compilamos TypeScript
RUN npm run build

# Exponemos el puerto donde corre la API
EXPOSE 3000

# Comando para iniciar la app
CMD ["node", "dist/app.js"]
