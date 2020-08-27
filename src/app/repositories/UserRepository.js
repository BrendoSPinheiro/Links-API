const { v4 } = require('uuid');

let users = [
  {
    id: v4(),
    name: 'Brendo Souza',
    email: 'brendo@mail.com',
    password_hash: '123456',
  },
  {
    id: v4(),
    name: 'Maisa Greice',
    email: 'maisa@mail.com',
    password_hash: '654321',
  },
  {
    id: '9519f09e-58dd-473e-8f9b-db187fc27f4f',
    name: 'Bruno Santos',
    email: 'bruno@mail.com',
    password_hash: '$2a$08$RMT6.lv31ASJX53ziv6IU.qOTCJB6qkCaKcqz4TJbDBANfEdwXqnu',
  },
];

class UserRepository {
  findAll() {
    return new Promise((resolve) => resolve(users));
  }

  findById(id) {
    return new Promise((resolve) => resolve(
      users.find((user) => user.id === id),
    ));
  }

  findByEmail(email) {
    return new Promise((resolve) => resolve(
      users.find((user) => user.email === email),
    ));
  }

  create({ name, email, password_hash }) {
    return new Promise((resolve) => {
      const newUser = {
        id: v4(),
        name,
        email,
        password_hash,
      };

      users.push(newUser);

      resolve(newUser);
    });
  }

  update(id, { name, email, password_hash }) {
    return new Promise((resolve) => {
      const updatedUser = {
        id,
        name,
        email,
        password_hash,
      };

      users = users.map((user) => (
        user.id === id ? updatedUser : user
      ));

      resolve(updatedUser);
    });
  }

  delete(id) {
    return new Promise((resolve) => {
      users = users.filter((user) => user.id !== id);
      resolve();
    });
  }
}

module.exports = new UserRepository();
