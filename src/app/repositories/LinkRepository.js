const Query = require('../../database/index');

class LinkRepository {
  findAllByUserId(user_id) {
    return Query.query(`SELECT * FROM links WHERE user_id = '${user_id}'`);
  }

  async findById(id) {
    const [link] = await Query.query(`SELECT * FROM links WHERE id = '${id}'`);
    return link;
  }

  async findByUrl(url) {
    const [link] = await Query.query(`SELECT * FROM users WHERE url = '${url}'`);
    return link;
  }

  create({ title, url, user_id }) {
    return Query.query(`
      INSERT INTO links (title, url, user_id)
      VALUES ('${title}', '${url}', '${user_id}') RETURNING title, url
    `);
  }

  update(id, { title, url }) {
    return Query.query(`
      UPDATE links SET title = '${title}', url = '${url}'
      WHERE id = '${id}' RETURNING title, url
    `);
  }

  delete(id) {
    return Query.query(`DELETE FROM links WHERE id = '${id}'`);
  }
}

module.exports = new LinkRepository();
