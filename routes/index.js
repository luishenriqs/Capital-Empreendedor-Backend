var express = require('express');
var usersRouter = require('./users.routes');
var router = express.Router();

router.use(usersRouter)

module.exports = router;