var express = require('express');
var users = require('./users.routes');
var router = express.Router();

router.get('/', users)

module.exports = router;