const Post = require('../models/post.model')

module.exports = {
  getAllPost: (req, res) => {
    Post
      .find()
      .populate('userid')
      .exec()
      .then(response => {
        res.status(200).send({
          message: 'query all posts success',
          data: response
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
      userid, image: req.imageURL
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
        const likes = response[0].likes;
        const dislikes = response[0].dislikes;
        let indexLike = likes.indexOf(userid);
        let indexDislike = dislikes.indexOf(userid);

        if(indexDislike !== -1) {
          res.status(400).send({
            message: 'Sudah ada dislike'
          })
        } else {
          if (indexLike !== -1) {
            console.log('include')
            action = '$pull'
          } else {
            console.log('tidak include')
            action = '$push'
          }
          
          Post.update({
            _id:id
          }, {
            [action]: {
              likes: userid
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
        const likes = response[0].likes;
        const dislikes = response[0].dislikes;
        let indexLike = likes.indexOf(userid);
        let indexDislike = dislikes.indexOf(userid);
        
        if(indexLike !== -1) {
          res.status(400).send({
            message: 'Sudah ada like'
          })
        } else {
          if (indexDislike !== -1) {
            console.log('include')
            action = '$pull'
          } else {
            console.log('tidak include')
            action = '$push'
          }
          
          Post.update({
            _id:id
          }, {
            [action]: {
              dislikes: userid
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