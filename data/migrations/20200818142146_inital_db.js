
exports.up = function(knex) {
  return knex.schema.createTable('users', table =>{
    table.increments('id'),
    table.string('username').notNullable().unique();
    table.string('password').notNullable()
    table.string('department')
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('users');
};
