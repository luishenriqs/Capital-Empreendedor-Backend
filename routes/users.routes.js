var express = require('express');
var router = express.Router();

router.get('/', async (req, res) => {
  res.json(data)
  res.send({ message: "OK" });
});

module.exports = router;