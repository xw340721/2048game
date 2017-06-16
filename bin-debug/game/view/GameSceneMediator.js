var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var game;
(function (game) {
    var GameSceneMediator = (function (_super) {
        __extends(GameSceneMediator, _super);
        function GameSceneMediator(viewComponent) {
            return _super.call(this, GameSceneMediator.NAME, viewComponent) || this;
        }
        GameSceneMediator.prototype.listNotificationInterests = function () {
            return [
                game.GridProxy.TILE_INSERT,
                game.GridProxy.TILE_MERGED,
                game.GridProxy.TILE_MOVE,
                game.GridProxy.TILE_REMOVE,
                game.GridProxy.TILE_RESET
            ];
        };
        GameSceneMediator.prototype.handleNotification = function (notification) {
            var data = notification.getBody();
            switch (notification.getName()) {
                case game.GridProxy.TILE_INSERT:
                    this.gameScene.createTile(data);
                    break;
                case game.GridProxy.TILE_RESET:
                    this.gameScene.clearTiles();
                    break;
                case game.GridProxy.TILE_MOVE:
                    this.gameScene.moveTile(data);
                    break;
                case game.GridProxy.TILE_MERGED:
                    this.gameScene.mergedTile(data);
                    break;
            }
        };
        Object.defineProperty(GameSceneMediator.prototype, "gameScene", {
            get: function () {
                return this.viewComponent;
            },
            enumerable: true,
            configurable: true
        });
        return GameSceneMediator;
    }(puremvc.Mediator));
    GameSceneMediator.NAME = "GameSceneMediator";
    game.GameSceneMediator = GameSceneMediator;
    __reflect(GameSceneMediator.prototype, "game.GameSceneMediator", ["puremvc.IMediator", "puremvc.INotifier"]);
})(game || (game = {}));
//# sourceMappingURL=GameSceneMediator.js.map