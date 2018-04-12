const express = require('express');
const multer = require('multer')

const {getAllUser, getOneUser, updateUser, deleteUser} = require('../controllers/user.controller.js')
const uploadMidleware = require('../middleware/upload')

const router = express.Router();

router
    .get('/', getAllUser)
    .get('/:id', getOneUser)
    .put('/:id', updateUser)
    .delete('/:id', deleteUser)

const uploaderMem = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 10 * 1024 * 1024
  }
})

router.post('/upload', uploaderMem.single('picture'), uploadMidleware.upload, (req, res) => {
  res.status(201).json({
    message: 'file berhasil di-upload dengan url ',
    data: req.imageURL
  })
})

module.exports = router;
