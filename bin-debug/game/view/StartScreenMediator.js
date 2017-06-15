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
    var StartScreenMediator = (function (_super) {
        __extends(StartScreenMediator, _super);
        function StartScreenMediator(viewComplement) {
            var _this = _super.call(this, StartScreenMediator.NAME, viewComplement) || this;
            _this.StartScreen.btn_level.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onclick_level, _this);
            _this.StartScreen.btn_start.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onclick_start, _this);
            return _this;
        }
        StartScreenMediator.prototype.onclick_level = function () {
            if (game.CommonData.level == game.Level.EASY) {
                this.setLevel(game.Level.NORMAL);
            }
            else if (game.CommonData.level == game.Level.NORMAL) {
                this.setLevel(game.Level.SPECIAL);
            }
            else if (game.CommonData.level == game.Level.SPECIAL) {
                this.setLevel(game.Level.EASY);
            }
        };
        StartScreenMediator.prototype.setLevel = function (level) {
            game.CommonData.level = level;
            this.StartScreen.btn_level['btn_level_icon'].texture = RES.getRes("icon_json.level_" + level);
            this.StartScreen.btn_level['btn_level_label'].text = level.toUpperCase();
        };
        Object.defineProperty(StartScreenMediator.prototype, "StartScreen", {
            get: function () {
                return this.viewComponent;
            },
            enumerable: true,
            configurable: true
        });
        StartScreenMediator.prototype.onclick_start = function () {
            this.facade.sendNotification(game.GameCommand.START_GAME);
        };
        return StartScreenMediator;
    }(puremvc.Mediator));
    StartScreenMediator.NAME = "StartScreenMediator";
    game.StartScreenMediator = StartScreenMediator;
    __reflect(StartScreenMediator.prototype, "game.StartScreenMediator", ["puremvc.IMediator", "puremvc.INotifier"]);
})(game || (game = {}));
//# sourceMappingURL=StartScreenMediator.js.map