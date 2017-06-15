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
    var StartScreen = (function (_super) {
        __extends(StartScreen, _super);
        function StartScreen() {
            var _this = _super.call(this) || this;
            _this.index = 0;
            _this.skinName = "BeginSkins";
            _this.btn_level.addEventListener(egret.TouchEvent.TOUCH_END, _this.onclick_level, _this);
            _this.btn_level.addEventListener(egret.TouchEvent.TOUCH_BEGIN, _this.onclick_level_begin, _this);
            return _this;
        }
        StartScreen.Shared = function () {
            if (StartScreen.shared == null) {
                StartScreen.shared = new StartScreen();
            }
            return StartScreen.shared;
        };
        StartScreen.prototype.onclick_level_begin = function () {
            this.btn_level.currentState = "down";
        };
        StartScreen.prototype.onclick_level = function () {
            var level = ["level_easy", "level_normal", "level_special"];
            this.btn_level.currentState = level[this.index++ % 3];
        };
        return StartScreen;
    }(eui.Component));
    game.StartScreen = StartScreen;
    __reflect(StartScreen.prototype, "game.StartScreen");
})(game || (game = {}));
//# sourceMappingURL=StartScreen.js.map