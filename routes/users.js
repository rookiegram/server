const express = require('express');

const {getAllUser, getOneUser, updateUser, deleteUser} = require('../controllers/user.controller.js')

const router = express.Router();

router
    .get('/', getAllUser)
    .get('/:id', getOneUser)
    .put('/:id', updateUser)
    .delete('/:id', deleteUser)

module.exports = router;
