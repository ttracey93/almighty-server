module.exports = function games(table) {
  table.increments('id').unsigned().primary();
  table.string('name');
  table.text('description', 'longtext');
  table.integer('type').unsigned();
  table.timestamps();

  table.foreign('type').references('game_types.id');
};
