const jwt = require('jsonwebtoken')
const secrets = require('../../config/secrets')

module.exports =  function restricted(req, res, next) {
  
  const token = req.headers.authorization

  if(token){
    jwt.verify(token, secrets.jwtSecret, (error, decodedToken) =>{
      if(error){
        res.status(401).json({message: 'invalid token'})
      } else {
        req.decodedToken = decodedToken
        next()
      }
    })
  } else {
    res.status(401).json({message: 'please provide a valid token'})
  }

}