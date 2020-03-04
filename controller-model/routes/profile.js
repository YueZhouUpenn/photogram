/* eslint-disable no-console */
const express = require('express');

const router = express.Router();
const mongoose = require('mongoose');
const User = require('../models/user');


router.get('/profile/:id', (req, res) => {
  console.log('READ a user profile');
  const { id } = req.params;
  User.findOne(
    { _id: id },
    (err, person) => {
      if (err) {
        res.status(404).json({
          message: 'failure: get the user profile',
        });
        return;
      }
      res.status(200).json({
        message: 'success',
        username: person.username,
        image: person.image,
        posts: person.post,
        followers: person.followed,
      });
    },
  );
});


router.get('/profile/comment/:id', (req, res) => {
  const id = mongoose.Types.ObjectId(req.params.id);
  console.log(`\nid is : ${id}`);
  console.log('\n commenting');
  User.findOne(
    { _id: id },
  ).populate({ path: 'commenting.post', select: { image: 0 } }).exec(
    (err, result) => {
      if (err) {
        res.status(404).json({ error: err.message });
        return;
      }
      console.log(result.commenting);
      res.status(200).json({
        message: 'success',
        data: result.commenting,
      });
    },
  );
});

router.get('/profile/like/:id', (req, res) => {
  const id = mongoose.Types.ObjectId(req.params.id);
  console.log(`\nid is : ${id}`);
  console.log('\n liking');
  User.find(
    { _id: id },
  ).populate({ path: 'liking.likee', select: { image: 0 } }).exec(
    (err, person) => {
      if (err) {
        res.status(404).json({ error: err.message });
        return;
      }
      res.status(200).json({
        message: 'success',
        data: person[0].liking,
      });
    },
  );
});


router.get('/profile/follow/:id', (req, res) => {
  const id = mongoose.Types.ObjectId(req.params.id);
  User.find(
    { _id: id },
  ).populate({ path: 'following.followee', select: { image: 0 } }).exec(
    (err, person) => {
      if (err) {
        res.status(404).json({ error: err.message });
        return;
      }
      res.status(200).json({
        message: 'success',
        data: person[0].following,
      });
    },
  );
});

module.exports = router;
