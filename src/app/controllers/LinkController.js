const Yup = require('yup');
const LinkRepository = require('../repositories/LinkRepository');

class LinkController {
  async index(req, res) {
    const { user_id } = req;
    const links = await LinkRepository.findAllByUserId(user_id);

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
    const schema = Yup.object().shape({
      title: Yup.string().required(),
      url: Yup.string.url().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { user_id } = req;
    const { title, url } = req.body;

    const newLink = await LinkRepository.create({ title, url, user_id });

    res.json(newLink);
  }

  async update(req, res) {
    const schema = Yup.object.shape({
      title: Yup.string().required(),
      url: Yup.string.url().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { id } = req.params;
    const { user_id } = req;
    const { title, url } = req.body;

    const linkExists = await LinkRepository.findById(id);

    if (!linkExists) {
      return res.status(404).json({ error: 'Link not found' });
    }

    if (linkExists.user_id !== user_id) {
      return res.status(400).json({ error: 'Do not have permission' });
    }

    const link = await LinkRepository.update(id, {
      title, url,
    });

    res.json(link);
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
