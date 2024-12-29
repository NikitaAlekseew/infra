// использование данных из конфигурации файла .env
require('dotenv').config();


const express = require('express');
const serverConfig = require('./config/server.config');
const { sequelize } = require('./db/models');

const authRoutes = require('./routes/auth.routes');

const server = express();

// условное формирование порта
const PORT = process.env.PORT ?? 3000;

// конфигурация приложения
serverConfig(server);

//Маршрутизация сервера

server.use('/', authRoutes)

// проверка работы ДБ
sequelize.authenticate(console.log('BD connection'));

// прослушивание порта приложения
server.listen(PORT, () => console.log(`Server started on Port ${PORT}`));
