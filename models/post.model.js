const mongoose = require('mongoose')
const Schema = mongoose.Schema

const postSchema = mongoose.Schema({
  userid: {
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
  }],
  dislikes: [{
    type: Schema.Types.ObjectId,
    ref: 'user'
  }],
  isLike: Boolean,
  isDislike: Boolean
}, {
    timestamps: true
})

let post = mongoose.model('post', postSchema)

module.exports = post