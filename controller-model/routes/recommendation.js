/* eslint-disable no-console */
/* eslint-disable radix */
const express = require('express');

const router = express.Router();
const Posts = require('../models/posts');
const User = require('../models/user');

/* APIs for trending posts */
router.get('/trending', (req, res) => {
  console.log('READ trending posts');
  let limit;
  try {
    limit = parseInt(req.query.limit); // Inclusive
  } catch (err) {
    res.status(400).json({
      message: 'parameters are not integers',
    });
    return;
  }
  Posts.find({}).limit(limit)
    .select({ _id: 1 })
    .exec()
    .then((result) => {
      res.status(200).json({
        message: 'success',
        data: result,
      });
    })
    .catch((err) => {
      console.error(err);
      res.status(404).json({
        message: 'failure: get trending posts',
      });
    });
});

/* APIs for follower suggestions */
router.get('/recFollow', (req, res) => {
  console.log('READ recommended followers');
  let startIndex;// start point
  let numberOfFollows;// end point
  try {
    startIndex = parseInt(req.query.start); // Inclusive
    numberOfFollows = parseInt(req.query.follows); // Number of recommended posts wanted
  } catch (err) {
    res.status(400).json({
      message: 'parameters are not integers',
    });
    return;
  }
  // find the users with top number of followers
  User.find({}).limit(startIndex + numberOfFollows).sort({ 'followed.length': -1 }).select({ _id: 1 })
    .exec()
    .then((result) => {
      if (result.length < startIndex) {
        res.sendStatus(404); // No more data available
      }
      result.splice(0, startIndex);
      console.log(result);
      res.status(200).json({
        message: 'success',
        data: result,
      });
    })
    .catch((err) => {
      console.err(err);
      res.status(404).json({
        message: 'failure: get recommended followers',
      });
    });
});


module.exports = router;
