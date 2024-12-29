# Используем официальный Node.js образ
FROM node:18

WORKDIR /app

# Копируем package.json и package-lock.json
COPY package*.json ./

# Устанавливаем зависимости
RUN npm install

# Копируем исходники приложения
COPY . .

# Открываем порт для приложения
EXPOSE 3000

# Запускаем сервер
CMD ["npm run start"]
