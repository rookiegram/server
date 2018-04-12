const express = require('express');
const router = express.Router();
const {getAllUser, getOneUser, updateUser, deleteUser} = require('../controllers/user.controller.js')

router
    .get('/', getAllUser)
    .get('/:id', getOneUser)
    .put('/:id', updateUser)
    .delete('/:id', deleteUser)

module.exports = router;
