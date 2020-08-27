const jwt = require('jsonwebtoken');
const authConfig = require('../../config/auth');
const UserRepository = require('../repositories/UserRepository');
const passwordValidator = require('../../utils/passwordValidator');

class SessionController {
  async store(req, res) {
    const { email, password } = req.body;

    const userByEmail = await UserRepository.findByEmail(email);
    if (!userByEmail) {
      return res.status(401).json({ error: 'User not found' });
    }
    if (!(await passwordValidator.checkPassword(password, userByEmail.password_hash))) {
      return res.status(401).json({ error: 'Password does not match' });
    }

    const { id, name } = userByEmail;

    res.json({
      user: {
        id,
        name,
        email,
      },
      token: jwt.sign({ id }, authConfig.secret, {
        expiresIn: authConfig.expiresIn,
      }),
    });
  }
}

module.exports = new SessionController();
