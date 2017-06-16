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
    var GameMenuMediator = (function (_super) {
        __extends(GameMenuMediator, _super);
        function GameMenuMediator(viewComponent) {
            var _this = _super.call(this, GameMenuMediator.NAME, viewComponent) || this;
            _this.gameMenuUI.btn_setting.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onclick_setting, _this);
            return _this;
        }
        GameMenuMediator.prototype.listNotificationInterests = function () {
            return [
                game.GameProxy.SCORE_RESERT,
                game.GameProxy.SCORE_UPDATE
            ];
        };
        GameMenuMediator.prototype.handleNotification = function (notification) {
            var data = notification.getBody();
            switch (notification.getName()) {
                case game.GameProxy.SCORE_RESERT:
                    this.gameMenuUI.reset();
                    break;
                case game.GameProxy.SCORE_UPDATE:
                    this.gameMenuUI.update(data);
                    break;
            }
        };
        GameMenuMediator.prototype.onclick_setting = function () {
            this.sendNotification(game.SceneCommand.SHOW_SETTING, "pause");
        };
        Object.defineProperty(GameMenuMediator.prototype, "gameMenuUI", {
            get: function () {
                return this.viewComponent;
            },
            enumerable: true,
            configurable: true
        });
        return GameMenuMediator;
    }(puremvc.Mediator));
    GameMenuMediator.NAME = "GameMenuMediator";
    game.GameMenuMediator = GameMenuMediator;
    __reflect(GameMenuMediator.prototype, "game.GameMenuMediator", ["puremvc.IMediator", "puremvc.INotifier"]);
})(game || (game = {}));
//# sourceMappingURL=GameMenuMediator.js.map