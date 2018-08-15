const Axios = require('axios');
// const _ = require('lodash');
const fs = require('fs');
const DB = require('../db/knex');

const PER_PAGE = 100;
const PAGES = 94;

async function getData() {
  const cards = [];
  for (let page = 1; page <= PAGES; page++) {
    console.log(`Getting page ${page}`);

    const response = await Axios.get(`https://db.ygoprodeck.com/getcardlist.php?sortby=Name%20(A-Z)&attrib=Select%20Attribute&linkmarkers=Link%20Arrows&effecttype=Effect%20Type&spelltype=All&traptype=All&synchrotype=All&pendtype=All&archetype=NoCard&desceffect=NoCard&ban=Select%20Ban%20List&cardset=Select%20Format&type=Select%20Card%20Type&name=&atk=&def=&level=0&race=Select%20Race&numberof=${PER_PAGE}%20Per%20Page&page=${page}`);
    cards.push(...JSON.parse(response.data.slice(1, -1)));
  }

  fs.writeFile(
    'scripts/ygo.json',
    JSON.stringify(cards),
    (err) => {
      if (err) {
        console.error('Shit happens');
        console.error(err);
      }
    },
  );

  console.log(cards.length);
  return cards;
}

async function readData() {
  const data = fs.readFileSync('scripts/ygo.json');
  const cards = JSON.parse(data);

  return cards;
}

/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-await-in-loop */
async function getCardImages(cards) {
  console.log('Getting card images');

  for (const card of cards) {
    const url = `https://www.ygoprodeck.com/pics/${card.id}.jpg`;
    // const imagePath = `scripts/images/${card.id}.jpg`;

    if (fs.existsSync(`scripts/images/${card.id}.jpg`)) {
      console.log('Not getting image for card ', card.id);
      continue;
    }

    try {
      const response = await Axios({
        method: 'GET',
        url,
        responseType: 'stream',
      });

      // pipe the result stream into a file on disc
      const path = `scripts/images/${card.id}.jpg`;
      response.data.pipe(fs.createWriteStream(path));

      // return a promise and resolve when download finishes
      await new Promise((resolve, reject) => {
        response.data.on('end', () => {
          resolve();
        });

        response.data.on('error', () => {
          reject();
        });
      });
    } catch (ex) {
      console.log(ex);
    }
  }
}

async function storeData(cards) {
  console.log('Storing data');

  const errors = [];

  for (const card of cards) {
    try {
      let atk = Number.parseInt(card.atk, 10);
      let def = Number.parseInt(card.def, 10);
      let level = Number.parseInt(card.level, 10);

      if (!atk || Number.isNaN(atk)) {
        atk = null;
      }

      if (!def || Number.isNaN(def)) {
        def = null;
      }

      if (!level || Number.isNaN(level)) {
        level = null;
      }

      const attributes = {
        id: card.id,
        name: card.name,
        description: card.desc,
        atk,
        def,
        level,
        attribute: card.attribute,
        race: card.race,
        type: card.type,
      };

      // Game 1 === Yugioh
      const scrubbed = {
        serial: card.id,
        game: 1,
        name: card.name,
        description: card.desc,
        attributes: JSON.stringify(attributes),
      };

      await DB('cards').insert(scrubbed);
    } catch (ex) {
      errors.push(ex.message || ex);
      console.log(ex);
    }
  }

  console.log('\n\n');
  console.log(errors);

  console.log('\n\n');
  console.log(errors.length);

  DB.destroy();
}

// Get card data from YGO, store it locally, and then upload it to firebase...
// getData().then(storeData);

// Stream data from local fs to firebase
readData().then(storeData);

// Stream images from YGO to firebase
// readData().then(getCardImages);
