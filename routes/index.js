const express = require('express');
const Router = express.Router;

const CardRouter = require('../api/cards/card-router');
const DeckRouter = require('../api/decks/deck-router');

class Routes {
  static init(app) {
    const router = new Router();

    CardRouter.init(router);
    DeckRouter.init(router);

    app.use('/', router);
  }
}

module.exports = Routes;