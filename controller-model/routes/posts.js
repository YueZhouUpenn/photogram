/* eslint-disable no-useless-escape */
/* eslint-disable no-param-reassign */
/* eslint-disable no-extend-native */
/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
const express = require('express');

const router = express.Router();
const validate = require('validate.js');
const Posts = require('../models/posts');
const User = require('../models/user');
const swagger = require('./swagger.json');

/* APIs for utility */

/* create a new post */

router.post('/post', (req, res) => {
  console.log('CREATE a post');
  if (validate.isEmpty(req.body.author)
  || validate.isEmpty(req.body.title)
  || validate.isEmpty(req.body.image)) {
    res.status(400).json({
      message: 'missing information',
    });
  } else {
    const authorInput = req.body.author;
    const titleInput = req.body.title;
    const imageInput = req.body.image;
    const descriptionInput = req.body.description;
    console.log(req.body.tag);
    const tagInput = req.body.tag;
    const tags = tagInput.trim(', #').split('#').map((value) => value.trim(', #'));
    console.log(tags);
    console.log(authorInput);
    console.log(titleInput);
    console.log(descriptionInput);
    const newPost = {
      author: authorInput,
      title: titleInput,
      image: imageInput,
      description: descriptionInput,
      create: Date.now(),
      liked: [],
      comment: [],
      tag: tags,
    };
    /* Update Posts */
    Posts.insertMany(newPost, (err, result) => {
      if (err) {
        console.log('Error: create a new post');
        console.error(err);
        res.status(404).json({
          message: 'Error: create a new post',
        });
      }
      /* Update User */
      User.updateOne(
        { _id: authorInput },
        { $push: { post: result[0] } },
        (err2, result2) => {
          if (err2) {
            console.log('Error: create a new post');
            console.error(err2);
            res.status(404).json({
              message: 'Error: create a new post',
            });
          }
          res.status(201).json({
            message: 'success',
            post: result[0],
          });
        },
      );
    });
  }
});


/* get a post by id */

router.get('/post/:id', (req, res) => {
  console.log('READ a post');
  const postId = req.params.id;
  Posts.findOne({ _id: postId }).populate({ path: 'author comment.author comment.mention', select: 'username' }).exec().then((result) => {
    res.status(200).json({
      message: 'success',
      post: {
        author: result.author,
        title: result.title,
        image: result.image,
        description: result.description,
        create: result.create,
        numberOfLikes: result.liked.length,
        comment: result.comment,
        tag: result.tag,
      },
    });
  })
    .catch((err) => {
      console.log('Error: get a post');
      console.error(err);
      res.status(404).json({
        message: 'Error: get a post',
      });
    });
});

/* update a post by id */

router.put('/post/put', (req, res) => {
  console.log('UPDATE a post');
  const postId = req.body.id;
  const titleInput = req.body.title;
  const descriptionInput = req.body.description;
  Posts.updateOne(
    { _id: postId },
    {
      $set: {
        title: titleInput,
        description: descriptionInput,
      },
    },
  ).then((result) => {
    res.status(200).json({
      message: 'success',
    });
  }).catch((err) => {
    console.log('Error: update a post');
    console.error(err);
    res.status(404).json({
      message: 'Error: update a post',
    });
  });
});

/* update a post by id */
router.delete('/post/delete', (req, res) => {
  console.log('UPDATE a post');
  const postId = req.body.id;
  const userId = req.body.user_id;
  Posts.deleteOne({ _id: postId }).then((result) => {
    console.log('Successfully update Posts.');
  })
    .catch((err) => {
      console.log('Error: update a post');
      console.error(err);
      res.status(404).json({
        message: 'Error: update a post',
      });
    });
  User.updateOne({ _id: userId },
    { $pull: { post: postId } }).then((result) => {
    res.status(200).json({
      message: 'success',
    }).catch((err) => {
      console.log('Error: update a post');
      console.error(err);
      res.status(404).json({
        message: 'Error: update a post',
      });
    });
  });
});

router.get('/swagger', (req, res) => {
  console.log('swagger');
  res.status(200).json(swagger);
});

/* trimLeft */
String.prototype.trimLeft = function trimL(charlist) {
  if (charlist === undefined) { charlist = '\s'; }

  return this.replace(new RegExp(`^[${charlist}]+`), '');
};

/* trimRight */
String.prototype.trimRight = function trimR(charlist) {
  if (charlist === undefined) { charlist = '\s'; }

  return this.replace(new RegExp(`[${charlist}]+$`), '');
};

/* trim */
String.prototype.trim = function trimB(charlist) {
  return this.trimLeft(charlist).trimRight(charlist);
};

module.exports = router;
