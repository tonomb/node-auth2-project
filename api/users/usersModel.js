const db = require('../../data/dbConfig')

module.exports = {
  addUser,

}

function addUser(user){
  return db('users').insert(user)
    .then(ids =>{
      return db('users').where({id: ids}).first()
    })
}