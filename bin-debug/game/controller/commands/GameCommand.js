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
        };
        GameCommand.prototype.execute = function (notification) {
            var gameProxy = this.facade.retrieveProxy(game.GameProxy.NAME);
            var gridProxy = this.facade.retrieveProxy(game.GridProxy.NAME);
            switch (notification.getName()) {
                case GameCommand.START_GAME:
                    gridProxy.reset();
                    gridProxy.addStartTiles();
                    this.sendNotification(game.SceneCommand.CHANGE, 2);
                    break;
            }
        };
        return GameCommand;
    }(puremvc.SimpleCommand));
    GameCommand.NAME = "GameCommand";
    GameCommand.START_GAME = "start_game";
    game.GameCommand = GameCommand;
    __reflect(GameCommand.prototype, "game.GameCommand", ["puremvc.ICommand", "puremvc.INotifier"]);
})(game || (game = {}));
//# sourceMappingURL=GameCommand.js.map