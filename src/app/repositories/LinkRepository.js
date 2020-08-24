const { v4 } = require('uuid');

let links = [
  {
    id: v4(),
    title: 'Google',
    link: 'www.google.com',
    user_id: v4(),
  },
  {
    id: v4(),
    title: 'Yahoo',
    link: 'www.yahoo.com',
    user_id: v4(),
  },
  {
    id: v4(),
    title: 'Youtube',
    link: 'www.youtube.com',
    user_id: v4(),
  },
];
class LinkRepository {
  findAll() {
    return new Promise((resolve) => resolve(links));
  }

  findById(id) {
    return new Promise((resolve) => resolve(
      links.find((link) => link.id === id),
    ));
  }

  findByLink(url) {
    return new Promise((resolve) => resolve(
      links.find((link) => link.link === url),
    ));
  }

  create({ title, link, user_id }) {
    return new Promise((resolve) => {
      const newLink = {
        id: v4(),
        title,
        link,
        user_id,
      };

      links.push(newLink);
      resolve(newLink);
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
