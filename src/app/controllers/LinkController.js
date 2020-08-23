const LinkRepository = require('../repositories/LinkRepository');

class LinkController {
  async index(req, res) {
    const links = await LinkRepository.findAll();

    res.json(links);
  }

  async show(req, res) {
    const { id } = req.params;

    const link = await LinkRepository.findById(id);

    if (!link) {
      res.status(404).json({ error: 'Link not found' });
    }

    res.json(link);
  }

  store(req, res) {

  }

  update(req, res) {

  }

  async delete(req, res) {
    const { id } = req.params;

    const linkExists = await LinkRepository.findById(id);

    if (!linkExists) {
      res.status(404).json({ error: 'Link not found' });
    }

    await LinkRepository.delete(id);

    res.status(202).json({ message: 'Link has been deleted' });
  }
}

module.exports = new LinkController();
