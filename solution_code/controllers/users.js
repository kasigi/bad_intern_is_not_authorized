const express = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/user');
const jwt = require('jsonwebtoken');


const SALT_LENGTH = 12;

exports.signup = async function (req,res,next) {
    try {
        // Check if the username is already taken
        const userInDatabase = await User.findOne({ username: req.body.username });
        if (userInDatabase) {
            return res.json({error: 'Username already taken.'});
        }
        // Create a new user with hashed password
        const newUser = {
            username: req.body.username,
            hashedPassword: bcrypt.hashSync(req.body.password, SALT_LENGTH)
        }

        const user = await User.create(newUser)
        const token = jwt.sign({ username: user.username, _id: user._id }, process.env.JWT_SECRET);
        res.status(201).json({ user, token });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
/*
    {
        "username":"someUser",
        "password":"somePassword"
    }
*/
exports.signin = async function (req,res,next) {
    try {
        // Get the requested user from the database
        const user =
         await User.findOne({ username: req.body.username });

        // If we find a user, compare the password they supplied to the one in the DB
        if (user && bcrypt.compareSync(req.body.password, user.hashedPassword)) {

            // SUCCESS! The passwords match!

            // Create a signed token
            const token = jwt.sign({ username: user.username, _id: user._id }, process.env.JWT_SECRET);

            // Send the token to the user
            res.status(200).json({ token });
        } else {
            res.status(401).json({ error: 'Invalid username or password.' });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

