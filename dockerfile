# Utiliza la imagen oficial de Node.js
FROM node:18-alpine

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copia los archivos necesarios
COPY package*.json ./

# Instala dependencias
RUN npm install

# Copia el resto del código fuente
COPY . .

# Compila el proyecto
RUN npm run build

# Expone el puerto de la app Nest
EXPOSE 3004

# Comando para iniciar la app
CMD ["node", "dist/main.js"]
