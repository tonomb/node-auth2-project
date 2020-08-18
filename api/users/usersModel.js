const db = require('../../data/dbConfig')

module.exports = {
  addUser,
  getUsers,
  findUser

}

function addUser(user){
  return db('users').insert(user)
    .then(ids =>{
      return db('users').where({id: ids}).first()
    })
}

function getUsers(department){
  if(!department){
    return db('users').select('*');
  } else {
    return db('users').where({department})
  }
}

function findUser(username){
  return db('users').where({username}).first()
}