const Knex = require('../../db/knex');

const users = require('./users');
const gameTypes = require('./game-types');
const games = require('./games');
const cards = require('./cards');
const decks = require('./decks');
const deckEntries = require('./deck-entries');


async function initDB() {
  const schema = Knex.schema.withSchema('almighty-cards');
  await schema.dropTableIfExists('deck_entries');
  await schema.dropTableIfExists('decks');
  await schema.dropTableIfExists('cards');
  await schema.dropTableIfExists('games');
  await schema.dropTableIfExists('game_types');
  await schema.dropTableIfExists('users');

  await schema.withSchema('almighty-cards')
    .createTable('users', users)
    .createTable('game_types', gameTypes)
    .createTable('games', games)
    .createTable('cards', cards)
    .createTable('decks', decks)
    .createTable('deck_entries', deckEntries);

  const tcgs = {
    name: 'Trading Card Games',
    shortname: 'TCGs',
    description: 'Card Games usually played on table tops',
  };

  await Knex('game_types').insert(tcgs);

  const yugioh = {
    name: 'Yugioh',
    description: 'Official Yugioh Trading Card Game',
    type: 1, // TCG
  };

  await Knex('games').insert(yugioh);
}

console.log('Attempting to initialize database...');

initDB().then(() => {
  console.log('Successfully initialized database');

  console.log('\n\n');
  console.log('Dont forget to seed card data!');

  Knex.destroy();
}).catch((err) => {
  console.error('Error occurred while building database');
  console.error(err);
});
