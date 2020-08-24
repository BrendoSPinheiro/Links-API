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

  async delete(req, res) {
    const { id } = req.params;

    const userExists = await UserRepository.findById(id);

    if (!userExists) {
      return res.status(400).json({ error: 'User does not exists' });
    }

    await UserRepository.delete(id);

    res.status(202).json({ message: 'User has been deleted' });
  }
}

module.exports = new UserController();
