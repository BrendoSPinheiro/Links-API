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
      return res.status(404).json({ error: 'Link not found' });
    }

    res.json(link);
  }

  async store(req, res) {
    const { title, url, user_id } = req.body;

    if (!url) {
      return res.status(400).json({ error: 'insira os dados solicitados' });
    }

    const linkExists = await LinkRepository.findByUrl(url);

    if (linkExists) {
      return res.status(404).json({ error: 'Link already exists' });
    }

    const newLink = await LinkRepository.create({ title, url, user_id });

    res.json(newLink);
  }

  async update(req, res) {
    const { id } = req.params;
    const { title, url, user_id } = req.body;

    const linkExists = await LinkRepository.findById(id);

    if (!linkExists) {
      return res.status(404).json({ error: 'User not found' });
    }

    if (!title) {
      return res.status(400).json({ error: 'Title is required' });
    }

    const linkByUrl = await LinkRepository.findByLink(url);
    if (linkByUrl && linkByUrl.id !== id) {
      return res.status(400).json({ error: 'This link is already in use' });
    }

    const cardLink = await LinkRepository.update(id, {
      title, url, user_id,
    });

    res.json(cardLink);
  }

  async delete(req, res) {
    const { id } = req.params;

    const linkExists = await LinkRepository.findById(id);

    if (!linkExists) {
      return res.status(404).json({ error: 'Link not found' });
    }

    await LinkRepository.delete(id);

    res.status(202).json({ message: 'Link has been deleted' });
  }
}

module.exports = new LinkController();
