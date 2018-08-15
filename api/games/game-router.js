const GameController = require('./game-controller');

class GameRouter {
  static init(router) {
    router.get('/games', GameController.index);
    router.get('/games/types', GameController.getTypes);
  }
}

module.exports = GameRouter;
