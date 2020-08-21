const { Router } = require('express');

const router = Router();

router.get('/', (req, res) => {
  res.json({ Ok: true });
});

module.exports = router;
