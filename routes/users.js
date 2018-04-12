var express = require('express');
const multer = require('multer')

const uploadMidleware = require('../middleware/upload')

var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

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
