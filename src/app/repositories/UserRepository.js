const Query = require('../../database/index');

class UserRepository {
  async findById(id) {
    const [user] = await Query.query(`SELECT * FROM users WHERE id = '${id}'`);
    return user;
  }

  async findByEmail(email) {
    const [user] = await Query.query(`
      SELECT * FROM users WHERE email = '${email}'
    `);
    return user;
  }

  create({ name, email, password_hash }) {
    return Query.query(`
      INSERT INTO users (name, email, password_hash) VALUES (
        '${name}', '${email}', '${password_hash}'
      ) RETURNING id, name, email
    `);
  }

  update(id, { name, email, password_hash }) {
    return Query.query(`
    UPDATE users SET
      name = '${name}', email = '${email}', password_hash = '${password_hash}'
      WHERE id = '${id}' RETURNING *
    `);
  }
}

module.exports = new UserRepository();
