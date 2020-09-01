const bcrypt = require('bcryptjs');
const Yup = require('yup');
const UserRepository = require('../repositories/UserRepository');
const passwordValidator = require('../../utils/passwordValidator');

class UserController {
  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string().email().required(),
      password: Yup.string().required().min(6),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { name, email, password } = req.body;

    const userExists = await UserRepository.findByEmail(email);
    if (userExists) {
      return res.status(400).json({ error: 'This email is already in use' });
    }

    const password_hash = await bcrypt.hash(password, 8);

    const newUser = await UserRepository.create({ name, email, password_hash });

    res.json(newUser);
  }

  async update(req, res) {
    const schema = Yup.object.shape({
      name: Yup.string(),
      email: Yup.string().email(),
      oldPassword: Yup.string().min(6),
      password: Yup.string().min(6).when('oldPassword',
        (oldPassword, field) => (oldPassword ? field.required() : field)),
      confirmPassword: Yup.string().when('password',
        (password, field) => (password ? field.required().oneOf(
          [Yup.ref('password')],
        ) : field)),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { id } = req.params;
    const { name, email, oldPassword, password } = req.body;

    const userExists = await UserRepository.findById(id);
    if (!userExists) {
      return res.status(404).json({ error: 'User not found' });
    }

    const userByEmail = await UserRepository.findByEmail(email);
    if (userByEmail && userByEmail.id !== id) {
      return res.status(400).json({ error: 'This email is already in use' });
    }

    if (oldPassword && !(await passwordValidator.checkPassword(
      oldPassword, userExists.password_hash,
    ))) {
      return res.status(401).json({ error: 'Password does not match' });
    }

    let password_hash;
    if (oldPassword) {
      password_hash = await bcrypt.hash(password, 8);
    } else {
      password_hash = userExists.password_hash;
    }

    const updatedUser = await UserRepository.update(id,
      { name, email, password_hash });

    res.json(updatedUser);
  }
}

module.exports = new UserController();
