const express = require('express');
const multer = require('multer')
const router = express.Router();
const uploadMidleware = require('../middleware/upload')
const {getAllPost, getPostByUserId, createPost, updateImage, editLike, editDislike, deletePost} = require('../controllers/post.controller.js')

const uploaderMem = multer({
    storage: multer.memoryStorage(),
    limits: {
        fileSize: 10 * 1024 * 1024
    }
})

router
    .get('/all/:userid', getAllPost)
    .get('/user/:userid', getPostByUserId)
    .post('/:userid', uploaderMem.single('image'), uploadMidleware.upload, createPost)
    .put('/like/:id/:userid', editLike)
    .put('/dislike/:id/:userid', editDislike)
    .put('/:id', updateImage)
    .delete('/:id', deletePost)

module.exports = router;