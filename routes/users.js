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
        if (user) {
          res.send(user);
        }
        var userMessage = req.params.username + 'does not exists.';
          res.send({
            'status': '404 not found',
            'message': userMessage}
          );
      }
    );
});

router.patch('/:username', function (req, res) {
  User
    .update(
      { username: req.params.username },
      { mail: req.body.mail },
      function (err, result) {
        if (err) {
          return console.error(err);
        }
        console.log(result);
        if (result.n !== 0){
          res.send(result);
        } else {
          var userMessage = req.params.username + 'does not exist';
          res.send({
            'status': '404 not found',
            'message': userMessage
          });
        }
        
      }
    );
});



router.delete('/:username', function (req, res) {
  User
    .remove(
      { username: req.params.username },
      function (err, user) {
        if (err) {
          return console.error(err);
        }
        if (user.result.n === 0) {
          res.send({
            success: true,
            message: 'No user found'
          });
        } else {
          res.send({
            success: true,
            message: 'Users deleted: ' + user.result.n
          });
        }
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
