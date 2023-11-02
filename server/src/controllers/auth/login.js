'use strict';

/* ------------------- Dependencies ----------------- */
const passport = require('passport');


/**
 * Logs a user in. Sends back a simple JSON response.
 */
module.exports = (req, res) => {
  passport.authenticate('local')(req, res, () => {
    res.send({
      loggedIn: true,
    });
    // res.redirect('/profile');
    console.log(req.body);
    // req.login(req.body.username, (err) => {
    //     if (err) {
    //       console.error('登录时出错:', err);
    //       // 处理登录错误
    //     } else {
    //       // 登录成功后的处理，例如重定向到受保护的页面
    //       res.redirect('/profile');
    //     }
    // });
  });

//   passport.authenticate('local',{
//     successRedirect: '/profile',
//   });
//   res.send({
//     loggedIn: true,
//   });
};