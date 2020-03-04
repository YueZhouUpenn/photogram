/* eslint-disable no-underscore-dangle */
/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
const express = require('express');

const router = express.Router();
const bcrypt = require('bcryptjs');
const User = require('../models/user');

router.post('/login', (req, res) => {
  const { username } = req.body;
  const { password } = req.body;
  User.findOne({ username }, (err, foundUser) => {
    if (err) {
      console.log(err);
    } else if (foundUser) {
      console.log(foundUser.username);
      console.log(foundUser.password);
      // check if password match
      /*
            if(foundUser.password === password){
                console.log('login success!')
                res.json({
                    message:'success!',
                    user:{
                        userId:foundUser.userId
                    }
                })
  */

      bcrypt.compare(foundUser.password, password, (err2, authRight) => {
        if (err2) {
          console.log(err2);
        } else {
          console.log('login success!');
          res.json({
            message: 'success!',
            userId: foundUser._id,
          });
        }
      });

      /*
            }else{
                res.send('Password is incorrect!')
            } */
    } else {
      console.log('cannotfind');
    }
  });
  /*
        res.json({
            message:'successfully find the user',
            user:{
                username:foundUser.username,
                password:foundUser.password
            }
        })
        */
});


/* logout */
router.get('/logout', (req, res) => {
  req.logout();
  console.log('log you out!');
});
/* create a new user: user registration */
router.post('/register', (req, res) => {
  console.log('CREATE A NEW USER');

  const { username } = req.body;
  const { image } = req.body;

  let { password } = req.body;
  /*
     const newUser = {
        username: username,
        password: password,
        image: image,
        posts:[],
        followed:[],
        following:[],
        mentioned:[],
        liking:[],
        commenting:[],
        join: Date.now()
    }
    User.insertMany(newUser,function(err,result){
        if(err){
            console.log(err)
            throw err
        }
        console.log("new User success!"+result[0].username)
        console.log("new User success!"+result[0].password)
        res.json({
          message:'success',
          userId:result[0]._id
      })
    })
*/


  // eslint-disable-next-line consistent-return
  bcrypt.hash(password, 10, (err, hash) => {
    if (err) {
      // eslint-disable-next-line no-undef
      return next(err);
    }
    password = hash;
    console.log('hashed:', hash);
    console.log('hashed password', password);

    const newUser = {
      username,
      password,
      image,
      posts: [],
      followed: [],
      following: [],
      mentioned: [],
      liking: [],
      commenting: [],
      join: Date.now(),
    };
    User.insertMany(newUser, (err2, result) => {
      if (err2) {
        console.log(err2);
        throw err;
      }
      console.log(`new User success!${result[0].username}`);
      console.log(`new User success!${result[0].password}`);
      res.json({
        message: 'success',
        userId: result[0]._id,
      });
    });
  });
});

module.exports = router;
