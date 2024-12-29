# Используем официальный Node.js образ
FROM node:18

WORKDIR /appServer

# Копируем package.json и package-lock.json
COPY package*.json ./

# Устанавливаем зависимости
RUN npm install

# Копируем исходники приложения
COPY . .

# Открываем порт для приложения
EXPOSE 3000

# Запускаем сервер
RUN npm run start
