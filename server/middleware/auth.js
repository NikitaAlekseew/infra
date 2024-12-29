const { User } = require('../db/models');

// промежуточная функция наполнения локальных переменных
const resLocals = (req, res, next) => {
  if (req.session.userId) {
    res.locals.userId = req.session.userId;
  }
  next();
};

// промежуточная функция поиска пользователя в БД по ID из сессии
const getUser = async (req, res, next) => {
  if (req.session.userId) {
    const user = await User.findByPk(Number(req.session.userId));
    if (user.id) {
      res.locals.user = { username: user.username, id: user.id };
    } else {
      res.status(500).redirect('/');
    }
  }
  next();
};

module.exports = { getUser, resLocals };
