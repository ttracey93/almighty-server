module.exports = function cards(table) {
  table.bigIncrements('id').unsigned().primary();
  table.integer('game').unsigned();
  table.string('name').notNullable();
  table.text('description', 'longtext').notNullable();
  table.json('attributes');
  // table.integer('atk');
  // table.integer('def');
  // table.integer('level');
  // table.string('race');
  // table.string('type');
  // table.string('attribute');
  table.timestamps();

  // TODO: Switch to local user auth and add reference
  table.foreign('game').references('games.id');
};
