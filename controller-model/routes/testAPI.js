/* eslint-disable no-console */
const express = require('express');

const router = express.Router();
const User = require('../models/user');
const Posts = require('../models/posts');

/* APIs for testing purpose */

/* Return the user collection */
router.get('/user', (req, res) => {
  User.find({}, (err, result) => {
    if (err) {
      // error connecting to database
      console.error(err.message);
      throw err;
    }
    res.json({
      message: 'success',
      data: result,
    });
  });
});

/* Return the posts collection */
router.get('/posts', (req, res) => {
  Posts.find({}, (err, result) => {
    if (err) {
      // error connecting to database
      console.error(err.message);
      throw err;
    }
    res.json({
      message: 'success',
      data: result,
    });
  });
});

module.exports = router;
