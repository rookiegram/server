const Post = require('../models/post.model')

module.exports = {

  getPostById: (req, res) => {
    Post.find({
      _id: req.params.id
    }).populate('userid').exec()
    .then(post => {
      res.status(200).send({
        message: 'query post success',
        data: post
      })
    })
  },

  getAllPost: (req, res) => {
    let userid = req.headers.decoded.id

    Post
      .find()
      .populate('userid')
      .exec()
      .then(post => {
        res.status(200).send({
          message: 'query all posts success',
          data: post
        })
      })
      .catch(err => {
        res.status(400).send({
          message: err
        })
      })
    },

  getPostByUserId: (req, res) => {
    let userid = req.headers.decoded.id

    Post
      .find({
        userid
      })
      .populate('userid')
      .exec()
      .then(response => {
        res.status(200).send({
          message: 'query posts by user success',
          data: response
        })
      })
      .catch(err => {
        res.status(400).send({
          message: err
        })
      })
  },
  createPost: (req, res) => {
    let userid = req.headers.decoded.id

    let post = new Post({
      userid, image: req.imageURL,
      isDislike: false, isLike: false
    })

    post.save((err, result) => {
        if(err) {
            res.status(400).send({
                message: err.message
            })
        } else {
            res.status(201).send({
                message: 'create post success',
                data: result
            })
        }
    })
  },
  updateImage: (req, res) => {
    let {id} = req.params
    let {image} = req.body

    Post.update({
      _id: id
    }, {
      $set: {
        image
      }
    }, {
      overwrite: false
    }, (err, result) => {
      if(err) {
        res.status(400).send({
            message: 'edit post failed',
            err: err.message
        })
      } else {
        res.status(200).send({
            message: 'edit post success'
        })
      }
    })
  },
  editLike: (req, res) => {
    let {id} = req.params
    let userid = req.headers.decoded.id
    let action = '';

    Post
      .find({
        _id: id
      })
      .populate('userid')
      .exec()
      .then(response => {
        let isLike = response[0].isLike;
        if(response[0].isDislike) {
          res.status(400).send({
            message: 'Sudah ada dislike'
          })
        } else {
          if (isLike) {
            action = '$pull'
            isLike = false;
          } else {
            action = '$push'
            isLike = true;
          }
          
          Post.update({
            _id:id
          }, {
            [action]: {
              likes: userid
            },
            $set: {
              isLike: isLike
            }
          }, {
            overwrite: false
          }, function (err, post) {
            if(!err) {
              res.status(200).send({
                message: 'edit like success'
              })
            } else {
              res.status(400).send({
                message: 'edit like failed'
              })
            }
          })
        }
      })
      .catch(err => {
        res.status(400).send({
          message: err
        })
      })
  },
  editDislike: (req, res) => {
    let {id} = req.params
    let userid = req.headers.decoded.id
    let action = '';

    Post
      .find({
        _id: id
      })
      .populate('userid')
      .exec()
      .then(response => {
        let isDislike = response[0].isDislike;
        if(response[0].isLike) {
          res.status(400).send({
            message: 'Sudah ada like'
          })
        } else {
          if (isDislike) {
            console.log('include')
            action = '$pull';
            isDislike = false;
          } else {
            console.log('tidak include')
            action = '$push';
            isDislike = true;
          }
          
          Post.update({
            _id:id
          }, {
            [action]: {
              dislikes: userid
            },
            $set: {
              isDislike: isDislike
            }
          }, {
            overwrite: false
          }, function (err, post) {
            if(!err) {
              res.status(200).send({
                message: 'edit dislike success'
              })
            } else {
              res.status(400).send({
                message: 'edit dislike failed'
              })
            }
          })
        }
      })
      .catch(err => {
        res.status(400).send({
          message: err
        })
      })
  },
  deletePost: (req, res) => {
    let {id} = req.params
  }
}