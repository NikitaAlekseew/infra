# Используем официальный Node.js образ для сборки
FROM node:18 AS build

WORKDIR /app

# Копируем package.json и package-lock.json
COPY package*.json ./

# Устанавливаем зависимости
RUN npm install

# Копируем все исходники
COPY . .

# Собираем приложение
RUN npm run build

RUN ls -al /app


# Используем Nginx для сервировки статических файлов
FROM nginx:alpine

# Копируем собранные файлы из первого этапа
COPY --from=build /app/build /usr/share/nginx/html

# Открываем порт 80
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
