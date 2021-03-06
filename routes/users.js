var User = require('./../models').User;
var errors = require('./../errors');

module.exports.create = function(req, res, next) {
  User.register(req.body.user, function(err, user) {
    if (err) return next(err);
    res.send(user);
  });
};

module.exports.show = function(req, res, next) {
  User.findOne({ email: req.oauth.bearerToken.userId}, function(err, user) {
    if (err) return next(err);
    if (!user) return next(new errors.NotFound('User not found'));
    var response = {
      uuid: user._id,  
      username: user.firstname,
      email: user.email
    };
    res.jsonp(response);
  });
};
