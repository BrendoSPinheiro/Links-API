const { v4 } = require('uuid');
const Query = require('../../database/index');

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
  findById(id) {
    return new Promise((resolve) => resolve(
      users.find((user) => user.id === id),
    ));
  }

  async findByEmail(email) {
    const [user] = await Query.query(`SELECT user FROM users WHERE email = '${email}'`);
    return user;
  }

  create({ name, email, password_hash }) {
    return Query.query(`
      INSERT INTO users (name, email, password_hash) VALUES (
        '${name}', '${email}', '${password_hash}'
      ) RETURNING *
    `);
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
}

module.exports = new UserRepository();
