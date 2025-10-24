# Frontend Dockerfile
FROM nginx:alpine

# Eliminamos contenido default de Nginx
RUN rm -rf /usr/share/nginx/html/*

# Copiamos todos los archivos del frontend
COPY . /usr/share/nginx/html

# Exponemos el puerto 80 (Nginx)
EXPOSE 80