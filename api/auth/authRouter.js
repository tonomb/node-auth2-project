const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const secrets = require('../../config/secrets')
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
      const token = generateToken(user)
      res.status(201).json({user, token})
    })
    .catch(err =>{
      console.log(err);
      res.status(500).json(err)
    })
})

router.post('/login', (req, res) => {
  // Use the credentials sent inside the body to authenticate the user. On successful login, create a new JWT with the user id as the subject and send it back to the client. If login fails, respond with the correct status code and the message: 'You shall not pass!'

  User.findUser(req.body.username)
    .then( user =>{
      if(user && bcrypt.compareSync(req.body.password, user.password)){
        const token = generateToken(user)
        res.status(200).json({user, token})
      } else {
        res.status(400).json({message: 'invalid credentials'})
      }
    })
    .catch(err =>{
      console.log(err);
      res.status(500).json({message: 'something went wrong'})
    })


})

function generateToken(user){
  const payload = {
    subject: user.id,
    username: user.username,
    department: user.department
  }

  const secret = secrets.jwtSecret

  const options = {
    expiresIn: '1d'
  }

  return jwt.sign(payload, secret, options)
}


module.exports = router