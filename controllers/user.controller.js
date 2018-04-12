const bcrypt = require('bcrypt')
const User = require('../models/user.model')

module.exports = {
  getAllUser (req, res) {
      User
        .find()
        .exec()
        .then(response => {
          res.status(200).send({
            message: 'query users success',
            data: response
          })
        })
        .catch(err => {
          res.status(400).send({
            message: err
          })
        })
  },
  getOneUser (req, res) {
      const {id} = req.params
      User.findById(id, (err, user) => {  
        if (!err) {
          res.status(201).send({
            message: 'query user success',
            user
          })
        } else {
          res.status(400).send({
            message: 'query user failed'
          })
        }
      });
  },
  updateUser (req, res) {
    const {id} = req.params
    const {password, nickname} = req.body

    bcrypt.hash(password, 10, function(err, hash) { 
      if(err) {
        res.status(500).json({
          message: 'edit failed',
          err: err.message
        })
      } else {
        User.update({
          _id: id
        }, {
          $set: {
            password: hash,
            nickname
          }
        }, {
          overwrite: false
        }, (err, result) => {
          if(err) {
            res.status(400).send({
                message: 'edit user failed',
                err: err.message
            })
          } else {
            console.log("a", result.data.likes)
            res.status(200).send({
                message: 'edit user success'
            })
            
          }
        })
      }
    });
  },
  deleteUser (req, res) {
    const {id} = req.params
    customer.findByIdAndRemove(id, (err, todo) => {
      if(!err) {
        res.status(200).send({
          message: 'delete user success',
          data: todo
        })
      } else {
        res.status(400).send({
          message: 'delete user failed'
        })
      }
    })
  }
}