const express = require('express');
const multer = require('multer')
const router = express.Router();
const uploadMidleware = require('../middleware/upload')
const {getAllPost, getPostByUserId, createPost, updateImage, editLike, editDislike, deletePost} = require('../controllers/post.controller.js')
const {auth} = require('../middleware/auth')

const uploaderMem = multer({
    storage: multer.memoryStorage(),
    limits: {
        fileSize: 10 * 1024 * 1024
    }
})

router
    .get('/all', auth, getAllPost)
    .get('/user', auth, getPostByUserId)
    .post('/', auth, uploaderMem.single('image'), uploadMidleware.upload, createPost)
    .put('/like/:id', auth, editLike)
    .put('/dislike/:id', auth, editDislike)
    .put('/:id', auth, updateImage)
    .delete('/:id', auth, deletePost)

module.exports = router;