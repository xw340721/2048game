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
    var GameCommand = (function (_super) {
        __extends(GameCommand, _super);
        function GameCommand() {
            return _super.call(this) || this;
        }
        GameCommand.prototype.register = function () {
            this.facade.registerCommand(GameCommand.START_GAME, GameCommand);
            this.facade.registerCommand(GameCommand.MOVE_TILE, GameCommand);
            this.facade.registerCommand(GameCommand.UPDATE_SCORE, GameCommand);
        };
        GameCommand.prototype.execute = function (notification) {
            var gameProxy = this.facade.retrieveProxy(game.GameProxy.NAME);
            var gridProxy = this.facade.retrieveProxy(game.GridProxy.NAME);
            var data = notification.getBody();
            switch (notification.getName()) {
                case GameCommand.START_GAME:
                    this.sendNotification(game.SceneCommand.CHANGE, 2);
                    gridProxy.reset();
                    gameProxy.reset();
                    gridProxy.addStartTiles();
                    break;
                case GameCommand.MOVE_TILE:
                    gridProxy.move(data);
                    break;
                case GameCommand.UPDATE_SCORE:
                    gameProxy.updateScore(data);
                    break;
            }
        };
        return GameCommand;
    }(puremvc.SimpleCommand));
    GameCommand.NAME = "GameCommand";
    GameCommand.START_GAME = "start_game";
    /**
     * 执行移动 , body  0: 上, 1: 右, 2:下, 3: 左
     */
    GameCommand.MOVE_TILE = "move_tile";
    GameCommand.UPDATE_SCORE = "update_score";
    GameCommand.FINISH_GAME = "finish_game";
    game.GameCommand = GameCommand;
    __reflect(GameCommand.prototype, "game.GameCommand", ["puremvc.ICommand", "puremvc.INotifier"]);
})(game || (game = {}));
//# sourceMappingURL=GameCommand.js.map