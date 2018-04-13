var express = require('express');
var router = express.Router();
const {postTweet} = require('../controllers/twitter.controller')

router.post('/', postTweet)

module.exports = router;


