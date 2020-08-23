const LinkRepository = require('../repositories/LinkRepository');

class LinkController {
  async index(req, res) {
    const links = await LinkRepository.findAll();

    res.json(links);
  }

  show(req, res) {

  }

  store(req, res) {

  }

  update(req, res) {

  }

  delete(req, res) {

  }
}

module.exports = new LinkController();
