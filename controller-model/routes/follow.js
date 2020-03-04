/* eslint-disable no-unused-vars */
/* eslint-disable no-continue */
/* eslint-disable no-console */
const express = require('express');

const router = express.Router();
const validate = require('validate.js');
const User = require('../models/user');

/* APIs for follow */

/* Check whether user1 has followed user2 */

router.get('/follow', (req, res) => {
  /* The first query parameter is follower, which contains the _id of the follower
     The second query parameter is followee, which contains the _id of the followee */
  console.log('READ whether to follow');
  if (validate.isEmpty(req.query.follower) || validate.isEmpty(req.query.followee)) {
    res.status(400).json({
      message: 'missing information',
    });
  } else {
    const followerId = req.query.follower;
    const followeeId = req.query.followee;
    User.findById(followerId, (err, result) => {
      if (err) {
        // error connecting to database
        console.error(err);
        res.status(404).json({
          message: 'failure: check whether to follow',
        });
      }
      const followingList = result.following;
      console.log(followingList);
      let followResult = false;
      for (let i = 0; i < followingList.length; i += 1) {
        if (String(followingList[i].followee) === followeeId) {
          followResult = true;
          break;
        }
      }
      res.json({
        message: 'success',
        data: followResult,
      });
    });
  }
});

/* follow/unfollow a user */

router.get('/follow/put', (req, res) => {
  /* The first parameter follower is the _id of follower
     The second parameter followee is the _id of followee */
  console.log('UPDATE follow');
  if (validate.isEmpty(req.query.follower) || validate.isEmpty(req.query.followee)) {
    res.status(400).json({
      message: 'missing information',
    });
  } else {
    const followerId = req.query.follower;
    const followeeId = req.query.followee;
    User.findById(followerId, (err, result) => {
      if (err) {
        // error connecting to database
        console.error(err);
        res.status(404).json({
          message: 'failure: follow/unfollow a user',
        });
      }
      let followResult = false;
      for (let i = 0; i < result.following.length; i += 1) {
        if (String(result.following[i].followee) === followeeId) {
          followResult = true;
          continue;
        }
      }
      if (followResult) {
        /* Since user1 has already followed user2, unfollow action */
        User.update(
          { _id: followerId },
          {
            $pull: {
              following: { followee: followeeId },
            },
          },
          { multi: true },
        ).then((result2) => {
          console.log('success');
        }).catch((err2) => {
          console.error(err);
          res.status(404).json({
            message: 'fail to update the follower',
            action: 'unfollow',
          });
        });
        User.update(
          { _id: followeeId },
          {
            $pull: {
              followed: { follower: followerId },
            },
          },
          { multi: true },
        ).then((result2) => {
          res.status(200).json({
            message: 'success',
            action: 'unfollow',
          });
        }).catch((err2) => {
          console.error(err);
          res.status(404).json({
            message: 'fail to update the followee',
            action: 'unfollow',
          });
        });
      } else {
        /* Since user1 hasn't followed user2 yet, follow action */
        User.update(
          { _id: followerId },
          {
            $push: {
              following: { time: Date.now(), followee: followeeId },
            },
          },
          { multi: true },
        ).then((result2) => {
          console.log('success');
        }).catch((err2) => {
          console.error(err);
          res.status(404).json({
            message: 'fail to update the follower',
            action: 'follow',
          });
        });
        User.update(
          { _id: followeeId },
          {
            $push: {
              followed: { time: Date.now(), follower: followerId },
            },
          },
          { multi: true },
        ).then((result2) => {
          res.status(200).json({
            message: 'success',
            action: 'follow',
          });
        }).catch((err2) => {
          res.status(404).json({
            message: 'fail to update the followee',
            action: 'follow',
          });
        });
      }
    });
  }
});

module.exports = router;
