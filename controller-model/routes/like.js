/* eslint-disable no-unused-vars */
/* eslint-disable no-continue */
/* eslint-disable no-console */
const express = require('express');

const router = express.Router();
const Posts = require('../models/posts');
const User = require('../models/user');


/* APIs for like */

/* Check whether the user has liked the post */
router.get('/like', (req, res) => {
  /* The first query parameter is the _id of the user
     The second query parameter is the _id of the post */
  console.log('READ whether to like');
  const likerId = req.query.liker;
  const likeeId = req.query.likee;
  User.findById(likerId, (err, result) => {
    if (err) {
      // error connecting to database
      console.error(err.message);
      res.status(404).json({
        message: 'failure: check whether to like',
      });
    }
    const likingList = result.liking;
    let likeResult = false;
    for (let i = 0; i < likingList.length; i += 1) {
      if (String(likingList[i].likee) === likeeId) {
        likeResult = true;
        break;
      }
    }
    res.status(200).json({
      message: 'success',
      data: likeResult,
    });
  });
});

/* like/unlike a post */
router.get('/like/put', (req, res) => {
  /* The first parameter is the _id of user
       The second parameter is the _id of post */
  console.log('UPDATE like');
  const likerId = req.query.liker;
  const likeeId = req.query.likee;
  User.findById(likerId, (err, result) => {
    if (err) {
      // error connecting to database
      console.error(err.message);
      res.status(404).json({
        message: 'failure: update like',
      });
    }
    let likeResult = false;
    console.log(result.liking);
    for (let i = 0; i < result.liking.length; i += 1) {
      console.log(`check${i}`);
      if (String(result.liking[i].likee) === likeeId) {
        likeResult = true;
        continue;
      }
    }
    console.log(likeResult);
    if (likeResult) {
      /* Since user has already liked post, unlike action */
      User.update(
        { _id: likerId },
        {
          $pull: { liking: { likee: likeeId } },
        },
        { multi: true },
      ).then((result2) => {
        console.log('success');
      }).catch((err2) => {
        console.error(err2);
        res.status(404).json({
          message: 'failure: update the liker',
        });
      });
      Posts.update(
        { _id: likeeId },
        {
          $pull: { liked: { likedBy: likerId } },
        },
        { multi: true },
      ).then((result3) => {
        res.status(200).json({
          message: 'success',
          action: 'unlike',
        });
      }).catch((err3) => {
        res.status(404).json({
          message: 'failure: update the likee',
        });
      });
    } else {
      /* Since user1 hasn't followed user2 yet, follow action */
      User.update(
        { _id: likerId },
        {
          $push: { liking: { likee: likeeId, time: Date.now() } },
        },
        { multi: true },
      ).then((result4) => {
        console.log('success');
      }).catch((err4) => {
        console.error(err);
        res.sendStatus(404);
        res.json({
          message: 'failure: update the liker',
        });
      });

      Posts.update(
        { _id: likeeId },
        {
          $push: { liked: { likedBy: likerId, time: Date.now() } },
        },
        { multi: true },
      ).then((result2) => {
        res.status(200).json({
          message: 'success',
          action: 'like',
        });
      }).catch((err2) => {
        console.error(err);
        res.status(404).json({
          message: 'failure: update the likee',
        });
      });
    }
  });
});

/* get number of likes of a post */
router.get('/liked/:id', (req, res) => {
  console.log('READ number of likes');
  const postId = req.params.id;
  Posts.findById(postId, (err, result) => {
    if (err) {
      // error connecting to database
      console.error(err);
      res.status(404).json({
        message: 'failure: get number of likes',
      });
    }
    res.status(200).json({
      message: 'success',
      count: result.liked.length,
    });
  });
});

module.exports = router;
