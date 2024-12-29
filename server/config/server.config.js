const express = require('express');
const morgan = require('morgan');
const session = require('express-session');
const FileStore = require('session-file-store')(session);
const cors = require('cors');


const { getUser, resLocals } = require('../middleware/auth');

const sessionConfig = {
  // тип хранилища - FileStore, который создаёт нам папку с файлами
  store: new FileStore(),
  name: 'user_sid',
  // слово используемое для шифрования, может быть любым
  secret: process.env.SESSION_SECRET ?? 'secret',
  // настройка пересохранения куки, при каждом запросе
  resave: false,
  // настройка для создания сессии, даже без авторизации
  saveUninitialized: false,
  cookie: {
    // время "протухания" куки в миллисекундах
    maxAge: 1000 * 60 * 60 * 12,
    // серверная установка флага httpOnly, запрет доступа к куке для клиентского JS
    httpOnly: true,
  },
};

//Конфигурация CORS-политики
const corsOptions = {
    //origin отвечает с каких хостов возможно подключение. В данный момент включена для всех
    origin: "http://localhost:5173",
    // настраивает заголовок Access-Control-Allow-Methods. Принимает строку или массив с разрешенными методами
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    //передает предварительный CORS-ответ следующему обработчику
    preflightContinue: false,
    //предоставляет статус-код для успешного разрешения запросов OPTIONS (для некоторых старых браузеров)
    optionsSuccessStatus: 204,
    //браузер передает сессионные куки между клиентом и сервером
    credentials: true,
}

// главная конфигурация приложения
const serverConfig = (app) => {
  // использование middleware
  app.use(morgan('dev'));
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(cors(corsOptions))
  app.use(session(sessionConfig));
  app.use(getUser);
  app.use(resLocals);
};

module.exports = serverConfig;
