const express = require('express')

const router = express.Router()

//====== /users ======

router.get('/', (req, res) =>{
  //If the user is logged in, respond with an array of all the users contained in the database. If the user is not logged in respond with the correct status code and the message: 'You shall not pass!'.
  res.status(200).json({users: 'users go here'})

})


module.exports = router