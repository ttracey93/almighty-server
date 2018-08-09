module.exports = function deckEntries(table) {
  table.bigIncrements('id').unsigned().primary();
  table.bigInteger('deck').unsigned();
  table.bigInteger('card').unsigned();
  table.timestamps();

  table.foreign('deck').references('decks.id');
  table.foreign('card').references('cards.id');
};
