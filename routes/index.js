var express = require('express');
var router = express.Router();
const {login, register} = require('../controllers/index.controller')

/* GET home page. */
router
    .post('/login', login)
    .post('/register', register)

module.exports = router;
