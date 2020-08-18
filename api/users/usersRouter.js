const express = require('express')

const router = express.Router()

//====== /users ======

router.get('/', (req, res) =>{
  res.status(200).json({users: 'users go here'})
})


module.exports = router