'use strict';

/* ------------------ Dependencies ---------------- */
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const mongoose = require('mongoose');
const passport = require('passport');
const cookieSession = require('cookie-session');
const socketIo = require('socket.io');
/* ------------------New Dependencies ---------------- */
const LocalStrategy = require('passport-local').Strategy;
const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectId;
const session = require('express-session');
const cookieParser = require('cookie-parser');

const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const tableRoutes = require('./routes/table');
const User = require('./models/user');
const dbConfig = require('./config/db');
const socketEvents = require('./socket/events');


/* -------------- Create express app -------------- */
const app = express();


/* ------------- Configure middlewares ------------ */
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors({
    origin: 'http://110.41.22.67:8080',
    credentials: true,
}));


/* --------------- Configure cookies -------------- */
require('dotenv').config();
const { COOKIE_KEY } = process.env;
const {
    DB_USER,
    DB_PASS,
    DB_HOST,
    DB_COLLECTION,
  } = process.env;
// app.use(cookieParser());
app.use(cookieSession({
  maxAge: 2 * 3600 * 1000,
  keys: [COOKIE_KEY],
}));

// Update a value in the cookie when receiving a request every hour top so that
// the set-cookieheader will be sent, thus extending the session expiration.
app.use(function (req, res, next) {
  req.session.nowInhours = Math.floor(Date.now() / 3600e3);
  next();
});

// app.use(session({
//     secret: COOKIE_KEY,
//     resave: false,
//     saveUninitialized: false,
//     cookie: { secure: false }
// }));


/* -------------- Configure passport -------------- */
passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
// 在 Passport 中配置序列化和反序列化函数
// passport.serializeUser((user, done) => {
//     done(null, user.id); // 将用户的唯一标识符存储在会话中
//     // console.log(user);
//   });
  
// passport.deserializeUser((id, done) => {
//     // 根据唯一标识符从数据库中查找用户
//     // 如果找到用户，将用户对象传递给 done 回调
//     User.findById(id, (err, user) => {
//       done(err, user); // 将用户对象恢复到 req.user
//     });
//     console.log(user);
// });

app.use(passport.initialize());
app.use(passport.session());


/* ----------------- Set up routes ---------------- */
app.use('/auth', authRoutes);
app.use('/user', userRoutes);
app.use('/table', tableRoutes);

/* ----- LocalStrategy ---- */

// const mongoURL = 'mongodb://localhost:27017'; // 替换为你的 MongoDB 连接字符串
// passport.use(new LocalStrategy(
//   function(username, password, done) {
//     MongoClient.connect(mongoURL, function(err, client) {
//       if (err) {
//         return done(err);
//       }

//       const db = client.db(DB_COLLECTION);
//       const usersCollection = db.collection('users'); // 替换为你的用户集合名称

//       // 查询数据库以查找用户
//       usersCollection.findOne({ username: username }, function(err, user) {
//         client.close();

//         if (err) {
//           return done(err);
//         }

//         if (!user) {
//           console.log('无效的用户名');
//           return done(null, false, { message: '无效的用户名' });
//         }

//         // 在这里检查密码是否匹配
//         if (user.password !== password) {
//           console.log('密码不匹配');
//           console.log(user.password);
//           console.log(password);
//           return done(null, false, { message: '密码不匹配' });
//         }
//         console.log('登录成功');
//         // console.log(user);
//         // 如果用户名和密码验证成功，将用户对象传递给 done 回调
//         return done(null, user);
//       });
//     });
//   }
// ));


/* ----- Connect to database and create server ---- */
mongoose.connect(dbConfig.url)
  .then(() => {
    console.log('Successfully connected to the database');

    // Create server and listen to port
    const server = app.listen(8081, () => {
      console.log('server running on port 8081');
    });


    // Create socket.io instance
    const io = socketIo(server);

    // Listen for socket events
    io.on('connection', (socket) => {
      socketEvents(socket, io);
    });

    // Listen for node events
    require('./node_events/events');
  }).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
  });
