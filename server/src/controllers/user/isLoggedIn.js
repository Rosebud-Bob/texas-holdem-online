'use strict';


/**
 * Checks if user is logged in, sends a JSON response.
 */
module.exports = (req, res) => {
  res.setHeader('Cache-Control', 'no-store');
//   res.setHeader('Pragma', 'no-cache');
  res.setHeader('Expires', '0');
//   console.log(req.headers);
//   console.log(req.user);
  if (req.user) {
    res.send({ loggedIn: true });
    console.log('已经登录');
  } else {
    res.send({ loggedIn: false });
    console.log('未登录');
  }
//   res.set('Cache-Control', 'no-store');
};
