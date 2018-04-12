const Post = require('../models/post.model')

module.exports = {
  getAllPost: (req, res) => {
    const {userid} = req.params
    Post
      .find()
      .populate('userid')
      .exec()
      .then(posts => {
        res.status(200).send({
          message: 'query all posts success',
          data: posts
        })
      })
      .catch(err => {
        res.status(400).send({
          message: err
        })
      })
  },
  getPostByUserId: (req, res) => {
    const {userid} = req.params
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
    const {userid} = req.params

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
    const {id} = req.params
    const {image} = req.body

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
    const {id, userid} = req.params
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
    const {id, userid} = req.params
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
    const {id} = req.params
  }
}