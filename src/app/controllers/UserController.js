const bcrypt = require('bcryptjs');
const UserRepository = require('../repositories/UserRepository');

class UserController {
  async index(req, res) {
    const users = await UserRepository.findAll();
    res.json(users);
  }

  async show(req, res) {
    const { id } = req.params;

    const user = await UserRepository.findById(id);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json(user);
  }

  async store(req, res) {
    const { name, email, password } = req.body;

    if (!name) {
      return res.status(400).json({ error: 'Name is required' });
    }

    const userExists = await UserRepository.findByEmail(email);

    if (userExists) {
      return res.status(400).json({ error: 'This email is already in use' });
    }

    const password_hash = await bcrypt.hash(password, 8);

    const newUser = await UserRepository.create({ name, email, password_hash });

    res.json(newUser);
  }

  async update(req, res) {
    const { id } = req.params;
    const { name, email, oldPassword, password } = req.body;

    const userExists = await UserRepository.findById(id);
    if (!userExists) {
      return res.status(404).json({ error: 'User not found' });
    }

    if (!name) {
      return res.status(400).json({ error: 'Name is required' });
    }

    if (oldPassword && !password) {
      return res.status(400).json({ error: 'Password is required' });
    }

    const userByEmail = await UserRepository.findByEmail(email);
    if (userByEmail && userByEmail.id !== id) {
      return res.status(400).json({ error: 'This email is already in use' });
    }

    if (oldPassword && !(await bcrypt.compare(oldPassword, userExists.password_hash))) {
      return res.status(401).json({ error: 'Password does not match' });
    }

    let password_hash;
    if (oldPassword) {
      password_hash = await bcrypt.hash(password, 8);
    } else if (!password_hash) {
      password_hash = userExists.password_hash;
    }

    const updatedUser = await UserRepository.update(id, { name, email, password_hash });

    res.json(updatedUser);
  }

  async delete(req, res) {
    const { id } = req.params;

    const userExists = await UserRepository.findById(id);

    if (!userExists) {
      return res.status(400).json({ error: 'User does not exists' });
    }

    await UserRepository.delete(id);

    res.status(202).json({ message: 'User has been deleted' });
  }

  checkPassword(oldPassword, password) {
    return bcrypt.compare(oldPassword, password);
  }
}

module.exports = new UserController();
