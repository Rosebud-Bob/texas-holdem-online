'use strict';

/* ------------------ Dependencies ------------------ */
const express = require('express');
const handlers = require('../controllers/auth/index');
const passport = require('passport');

/* ----------------- Create router ------------------ */
const router = express.Router();


/* -------------- Authentication routes ------------- */
// Register a new user
router.post('/register', handlers.register);

// Login
router.post('/login', handlers.login);
router.post('/login', passport.authenticate('local', {
    // successRedirect: '/user',
    // successRedirect: '/table',
    failureRedirect: '/login',
}));

// Logout
router.get('/logout', handlers.logout);


/* ----------------- Export router ------------------ */
module.exports = router;
