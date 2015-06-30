/*jslint node: true, indent: 2,nomen:true */
'use strict';

var express = require('express');
var router = express.Router();
var User = require('../mongoose_models/user');

/* GET users listing. */
/*jslint unparam: true */
router.get('/', function (req, res, next) {
  User.find(function (err, users) {
    if (err) {
      return console.error(err);
    }
    res.send(users);
  });
});
/*jslint unparam: false */

/*jslint unparam: true */
router.get('/:username', function (req, res) {
  User
    .findOne(
      { username: req.params.username },
      function (err, user) {
        if (err) {
          return console.error(err);
        }
        res.send(user);
      }
    );
});
/*jslint unparam: false */

router.post('/', function (req, res) {
  var user = new User({
    username: req.body.username,
    mail: req.body.mail
  });

  user.save(function (err) {
    if (err) {
      return console.error(err);
    }
    res
      .status(200)
      .send({ saved: true, _id: user._id });
  });
});

module.exports = router;
