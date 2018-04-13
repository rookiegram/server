const OAuth = require('oauth')
var oauth = new OAuth.OAuth(
    'https://api.twitter.com/oauth/request_token',
    'https://api.twitter.com/oauth/access_token',
    process.env.CONSUMER_KEY,
    process.env.CONSUMER_SECRET,
    '1.0A',
    null,
    'HMAC-SHA1'
)

module.exports = {
  postTweet: function(req, res){
    oauth.post(
      'https://api.twitter.com/1.1/statuses/update.json',
      process.env.TOKEN,
      process.env.TOKEN_SECRET,
      {status: req.body.tweet},    
      function (err, data, response){
        if (err) {
          res.status(400).json({
              message: err
          })
        } else {
          res.status(201).json({
              message: 'post tweets succeed',
              data
          })
        }
      });  
},
}