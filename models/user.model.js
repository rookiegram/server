const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = mongoose.Schema({
    email: {
        type: String,
        require: [true, 'Email required'],
        unique: [true, 'Email already exits'],
        validate: {
            validator: function(email) {
                return /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/.test(email);
            },
            message: 'Email not valid'
        } 
    },
    nickname: {
      type: String,
      require: [true, 'Nickname required'],
      unique: [true, 'Nickname already exits'],
    },
    password: {
        type: String,
        require: [true, 'Password required']
    }
}, {
    timestamps: true
})

let user = mongoose.model('user', userSchema)

module.exports = user