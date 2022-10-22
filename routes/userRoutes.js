const express = require('express');
const userControllrer = require('../controllers/userController');
const auth = require('../controllers/authentication');

const router = express.Router();

router.post('/signup', userControllrer.createUser);
router.post('/login', auth.login);
router.patch('/top-up', userControllrer.updateBalance);

router.get('/', userControllrer.getAllUsers);

router
  .route('/:pk')
  .get(userControllrer.getUser)
  .patch(userControllrer.updateUser)
  .delete(userControllrer.deleteUser);

module.exports = router;
