module.exports = function users(table) {
  table.bigIncrements('id').unsigned().primary();
  table.string('email');
  table.string('username');
  table.string('password');
  table.timestamps();
};
