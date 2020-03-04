const express = require('express');

const router = express.Router();
const User = require('../models/user');

/* Get user information by id */
router.get('/user/:id', (req, res) => {
  const userId = req.params.id;
  User.findOne({ _id: userId }).then((result) => {
    res.status(200).json({
      message: 'success',
      // eslint-disable-next-line no-underscore-dangle
      id: result._id,
      username: result.username,
      image: result.image,
      numberOfFollowers: result.followed.length,
    });
  }).catch((err) => {
    // eslint-disable-next-line no-console
    console.error(err);
    res.status(404).json({
      message: 'failure: get user information',
    });
  });
});

module.exports = router;
