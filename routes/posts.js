const express = require('express');
const router = express.Router();
const {getAllPost, getPostByUserId, createPost, updateImage, editLike, editDislike, deletePost} = require('../controllers/post.controller.js')

router
    .get('/all/:userid', getAllPost)
    .get('/user/:userid', getPostByUserId)
    .post('/:userid', createPost)
    .put('/like/:id/:userid', editLike)
    .put('/dislike/:id/:userid', editDislike)
    .put('/:id', updateImage)
    .delete('/:id', deletePost)

module.exports = router;
