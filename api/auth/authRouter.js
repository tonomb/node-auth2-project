const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')

const User = require('../users/usersModel')

//====== /auth =====

router.post('/register', (req, res) => {
  //Creates a user using the information sent inside the body of the request. Hash the password before saving the user to the database.
  const hash = bcrypt.hashSync(req.body.password, 8);

  const newUser ={
    ...req.body,
    password: hash
  }

  User.addUser(newUser)
    .then( user =>{
      res.status(201).json(user)
    })
    .catch(err =>{
      console.log(err);
      res.status(500).json(err)
    })
})

router.post('/login', (req, res) => {
  // Use the credentials sent inside the body to authenticate the user. On successful login, create a new JWT with the user id as the subject and send it back to the client. If login fails, respond with the correct status code and the message: 'You shall not pass!'
})


module.exports = router