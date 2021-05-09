//User Routes
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const User = require('../models/User');
const { check, validationResult } = require('express-validator/check');
//@route            POST api/users
//@description      Register a user
//@access           Public

//Do validation on post requests
router.post(
  '/',
  [
    //check.('name','name is required).not().isEmpty() to check empty field submissions
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check(
      'password',
      'Please enter a password with 6 or more characters'
    ).isLength({ min: 6 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      //If errors exist, respond with status 400 and array of errors
      return res.status(400).json({ errors: errors.array() });
    }

    //Destructures request object and pulls it out so we can use vars directly
    const { name, email, password } = req.body;

    try {
      //with ES6, same as saying email: email
      let user = await User.findOne({ email });

      //checks if user already exists in database
      if (user) {
        return res.status(400).json({ msg: 'User already exists' });
      }

      //If user doesn't exist create a new one based on schema.
      //same as name: name, email:email, password: password
      user = new User({
        name,
        email,
        password,
      });

      //Encrypting the password
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);

      //Save the user to database
      await user.save();

      //Creating and sending a JWT
      const payload = {
        user: {
          id: user.id,
        },
      };

      jwt.sign(
        payload,
        config.get('jwtSecret'),
        {
          expiresIn: 360000,
        },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (error) {
      console.error(error.message);
      res.status(500).send('Sever error');
    }
  }
);

module.exports = router;
