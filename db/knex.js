const knex = require('knex')({
  client: 'mysql',
  connection: {
    host : '127.0.0.1',
    user : 'standard',
    password : 'admin',
    database : 'almighty-cards'
  },
  // debug: true,
});

module.exports = knex;
