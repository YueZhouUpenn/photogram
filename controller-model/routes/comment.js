/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
const express = require('express');

const router = express.Router();
const validate = require('validate.js');
const User = require('../models/user');
const Posts = require('../models/posts');

/* APIs for comments */

/* Create a comment */

router.put('/comment', (req, res) => {
  console.log('CREATE a comment');
  if (validate.isEmpty(req.body.postId)
  || validate.isEmpty(req.body.authorId)
  || validate.isEmpty(req.body.content)) {
    res.status(400).json({
      message: 'missing information',
    });
  } else {
    const { postId } = req.body;
    const { authorId } = req.body;
    const contentInput = req.body.content;
    const mentionInput = req.body.mention;
    /* Update Posts */
    Posts.updateOne(
      { _id: postId },
      {
        $push: {
          comment: {
            time: Date.now(),
            author: authorId,
            content: contentInput,
            mention: mentionInput,
          },
        },
      },
    ).then((result) => {
      console.log('success: update Posts');
    }).catch((err) => {
      console.log('failure: update Posts');
      console.error(err);
      res.status(404).json({
        message: 'failure: update the post',
      });
    });
    /* Update User - author */
    User.updateOne(
      { _id: authorId },
      {
        $push: {
          commenting: {
            time: Date.now(),
            post: postId,
          },
        },
      },
    ).then((result) => {
      console.log('success: update User - author');
    }).catch((err) => {
      console.log('failure: update User - author');
      console.error(err);
      res.sendStatus(404);
      res.json({
        message: 'failure: update the author',
      });
    });
    /* Update User - mention */
    User.updateMany(
      { _id: { $in: mentionInput } },
      {
        $push: {
          mentioned: {
            time: Date.now(),
            post: postId,
            mentionBy: authorId,
          },
        },
      },
    ).then((result) => {
      console.log('success: update User - mention');
      res.status(201);
      res.json({
        message: 'success',
      });
    }).catch((err) => {
      console.log('failure: update User - mention');
      console.error(err);
      res.sendStatus(404);
      res.json({
        message: 'failure: update the mentioned users',
      });
    });
  }
});

router.put('/comment/delete', (req, res) => {
  console.log('DELETE a comment');
  if (validate.isEmpty(req.body.postId) || validate.isEmpty(req.body.commentId)) {
    res.status(400).json({
      message: 'missing information',
    });
  } else {
    const { postId } = req.body;
    const { commentId } = req.body;
    /* Update Posts */
    Posts.updateOne(
      { _id: postId },
      {
        $pull: {
          comment: {
            _id: commentId,
          },
        },
      },
    ).then((result) => {
      console.log('success: update Posts');
      res.status(200).json({
        message: 'success',
      });
    }).catch((err) => {
      console.log('failure: update Posts');
      console.error(err);
      res.status(404).json({
        message: 'failure: update the post',
      });
    });
  }
});

module.exports = router;
