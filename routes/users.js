const express = require('express');
const {getAllUser, getOneUser, updateUser, deleteUser} = require('../controllers/user.controller.js')
const {auth} = require('../middleware/auth')
const router = express.Router();

router
    .get('/all', auth, getAllUser)
    .get('/user', auth, getOneUser)
    .put('/', auth, updateUser)
    .delete('/', auth, deleteUser)

module.exports = router;
