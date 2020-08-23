const LinkRepository = require('../repositories/LinkRepository');

class LinkController {
  async index(req, res) {
    const links = await LinkRepository.findAll();

    res.json(links);
  }

  show(req, res) {
    const { id } = req.params;

    const link = LinkRepository.findById(id);

    if (!link) {
      res.status(404).json({ error: 'Link not found' });
    }

    res.json(link);
  }

  store(req, res) {

  }

  update(req, res) {

  }

  delete(req, res) {

  }
}

module.exports = new LinkController();
