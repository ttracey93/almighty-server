const express = require('express');
const CardRouter = require('../api/cards/card-router');
const DeckRouter = require('../api/decks/deck-router');
const GameRouter = require('../api/games/game-router');

const { Router } = express;


class Routes {
  static init(app) {
    const router = new Router();

    CardRouter.init(router);
    DeckRouter.init(router);
    GameRouter.init(router);

    app.use('/', router);
  }
}

module.exports = Routes;
