const { v4 } = require('uuid');

let links = [
  {
    id: v4(),
    title: 'Google',
    url: 'www.google.com',
    user_id: v4(),
  },
  {
    id: v4(),
    title: 'Yahoo',
    url: 'www.yahoo.com',
    user_id: v4(),
  },
  {
    id: v4(),
    title: 'Youtube',
    url: 'www.youtube.com',
    user_id: v4(),
  },
];
class LinkRepository {
  findAllByUserId(user_id) {
    return new Promise((resolve) => resolve(
      links.filter((link) => link.user_id === user_id),
    ));
  }

  findById(id) {
    return new Promise((resolve) => resolve(
      links.find((link) => link.id === id),
    ));
  }

  findByUrl(url) {
    return new Promise((resolve) => resolve(
      links.find((link) => link.url === url),
    ));
  }

  create({ title, url, user_id }) {
    return new Promise((resolve) => {
      const newLink = {
        id: v4(),
        title,
        url,
        user_id,
      };

      links.push(newLink);
      resolve(newLink);
    });
  }

  update(id, { title, url, user_id }) {
    return new Promise((resolve) => {
      const updatedLink = {
        id,
        title,
        url,
        user_id,
      };

      links = links.map((link) => (
        link.id === id ? updatedLink : link
      ));

      resolve(updatedLink);
    });
  }

  delete(id) {
    return new Promise((resolve) => {
      links = links.filter((link) => link.id !== id);
      resolve();
    });
  }
}

module.exports = new LinkRepository();
