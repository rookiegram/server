const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../models/user.model')

module.exports = {
  login: (req, res) => {
    let email = req.body.email
    let password = req.body.password

    User.findOne({
        email
    }, (err, user) => {
        if(err) {
            res.status(400).send({
                message: err.message
            })
        } else {
            bcrypt.compare(password, user.password, function(err, res2) {
                if(err) {
                    res.status(400).send({
                        message: err.message
                    })
                } else {
                    if(res2) {
                        let token = jwt.sign(
                            {
                                id: user._id,
                                email: user.email,
                                nickname: user.nickname
                            },
                            process.env.SECRET)
                        //req.headers.token = token;
                        console.log("token--", req.headers.token)
                        res.status(201).json({
                            message: "login success",
                            token: token,
                            user: user
                        })
                    } else {
                        res.status(500).json({
                            message: "login failed"
                        })
                    }
                }
            });
        }
    })
  },
  register: (req, res) => {
    let email = req.body.email
    let password = req.body.password
    let nickname = req.body.nickname
    
    bcrypt.hash(password, 10, function(err, hash) { 
        if(err) {
            res.status(500).json({
                message: err
            })
        } else {
            password = hash;
            let user = new User({
                email, password, nickname
            })

            user.save((err, result) => {
                if(err) {
                    res.status(400).send({
                        message: err.message
                    })
                } else {
                    res.status(201).send({
                        message: 'sign up success',
                        data: result
                    })
                }
            })
        }
    });
  }
}