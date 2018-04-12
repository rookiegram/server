const mongoose = require('mongoose')
const Schema = mongoose.Schema

const postSchema = mongoose.Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'user'
  },
  image: {
    type: String,
    require: [true, 'Image required']
  },
  likes: [{
    type: Schema.Types.ObjectId,
    ref: 'user'
  }]
}, {
    timestamps: true
})

let post = mongoose.model('post', postSchema)

module.exports = post