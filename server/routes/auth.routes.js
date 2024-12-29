const express = require('express');
const bcrypt = require('bcrypt');
const {User} = require('../db/models')

const router = express.Router();


router.post('/register', async (req, res) => {
    const { email } = req.body;
    try {
        if (!await User.findOne({ where: { email } })) {
            const saltRounds = Number(process.env.SALT_ROUNDS) ?? 10;
            const hash = await bcrypt.hash(req.body.password, saltRounds);
            const newUser = await User.create({ ...req.body, password: hash });
            if (newUser.id) {
              req.session.userId = newUser.id;
              return res.status(200).json({username: newUser.username, id: newUser.id});
            }
          }
          return res.status(500).json({ error: 'User cannot be created' });
        } catch (error) {
          return res.status(400).json({ error: error.message });
        }
      });

router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
      const user = await User.findOne({ where: { email } });
      if (user.id) {
        const isSame = await bcrypt.compare(password, user.password);
        if (isSame) {
          req.session.userId = user.id;
          return res.status(200).json({username: user.username, id: user.id});
        }
        return res.status(401).json({ error: 'Login Data is incorrect' });
      }
      return res.status(401).json({ error: 'Login Data is incorrect' });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  });

router.get('/logout', (req, res) => { 
  req.session.destroy((error) => {
      if (error) {
        return res.status(500).json({ error: 'Log out Failed' });
      }
      return res.clearCookie('user_sid').json( 'OK' );
    });
  });  

router.get('/user', (req, res) =>{
  const {user} = res.locals
  console.log(user)
  if(user){
    return res.status(200).json(user)
  }
  return res.status(200).json(null)
})
module.exports = router