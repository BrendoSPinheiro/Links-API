const { v4 } = require('uuid');

const links = [
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
}

module.exports = new LinkRepository();
