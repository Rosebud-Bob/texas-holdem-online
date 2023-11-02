'use strict';

/* ------------------- Dependencies ----------------- */
const User = require('../../models/user');


/**
 * Sends a JSON response.
 */
module.exports = (req, res) => {
//   console.log(req.user);
  User.findOne(req.user, (err, user) => {
    // Handle connection errors
    if (err) {
      console.log(err);
      console.log('erro');
    }
    // console.log(user);
    if (user) {
      res.send(user);
    } else {
      res.send({ err: 'user does not exist' });
    }
  });
};
