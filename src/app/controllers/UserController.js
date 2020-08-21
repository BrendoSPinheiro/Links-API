class UserController {
  index(req, res) {
    res.json({ ok: true });
  }
}

module.exports = new UserController();
