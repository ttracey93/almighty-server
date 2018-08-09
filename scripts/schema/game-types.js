module.exports = function gameTypes(table) {
  table.increments('id').unsigned().primary();
  table.string('name');
  table.string('shortname');
  table.text('description', 'longtext');
  table.timestamps();
};
