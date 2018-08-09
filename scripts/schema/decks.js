module.exports = function decks(table) {
  table.bigIncrements('id').unsigned().primary();
  table.string('owner').notNullable();
  table.string('name').notNullable();
  table.text('description', 'longtext');
  table.boolean('public').defaultTo(false);
  table.timestamps();

  // TODO: Switch to local user auth and add reference
  // table.foreign('owner').references('users.id');
};
