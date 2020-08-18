const express = require('express')
const router = express.Router()

const restricted = require('../auth/restricted')

const Users = require('./usersModel')

//====== /users ======

router.get('/', restricted, (req, res) =>{
  //If the user is logged in, respond with an array of all the users contained in the database. If the user is not logged in respond with the correct status code and the message: 'You shall not pass!'.
//TODO: check for token
  const department = req.decodedToken.department

  Users.getUsers(department)
    .then(users =>{
      res.status(200).json({users})
    })
    .catch(err=>{
      console.log(err);
      res.status(500).json(err)
    })

})


module.exports = router