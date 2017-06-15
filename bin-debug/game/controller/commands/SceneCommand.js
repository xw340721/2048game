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
    var SceneCommand = (function (_super) {
        __extends(SceneCommand, _super);
        function SceneCommand() {
            return _super.call(this) || this;
        }
        SceneCommand.prototype.register = function () {
            this.facade.registerCommand(SceneCommand.CHANGE, SceneCommand);
        };
        SceneCommand.prototype.execute = function (notification) {
            var data = notification.getBody();
            var appMeidator = this.facade.retrieveMediator(game.ApplicationMediator.NAME);
            switch (notification.getName()) {
                case SceneCommand.CHANGE: {
                    if (data == 1)
                        appMeidator.main.enterStartScreen();
                }
            }
        };
        return SceneCommand;
    }(puremvc.SimpleCommand));
    SceneCommand.NAME = "SceneCommand";
    /**
     * 场景切换
     */
    SceneCommand.CHANGE = "scene_change";
    game.SceneCommand = SceneCommand;
    __reflect(SceneCommand.prototype, "game.SceneCommand", ["puremvc.ICommand", "puremvc.INotifier"]);
})(game || (game = {}));
//# sourceMappingURL=SceneCommand.js.map