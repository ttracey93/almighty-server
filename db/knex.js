const knex = require('knex')({
  client: 'mysql',
  connection: {
    host: '127.0.0.1',
    user: 'standard',
    password: 'admin',
    database: 'almighty-cards',
    typeCast: (field, next) => {
      if (field.type === 'JSON') {
        return (JSON.parse(field.string()));
      }
      return next();
    },
  },
  // debug: true,
});

module.exports = knex;
