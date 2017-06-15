// TypeScript file
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
    var GameMenuUI = (function (_super) {
        __extends(GameMenuUI, _super);
        function GameMenuUI() {
            var _this = _super.call(this) || this;
            _this.skinName = "GameMenuUISkins";
            _this.once(eui.UIEvent.CREATION_COMPLETE, _this.createCompleteEvent, _this);
            return _this;
        }
        GameMenuUI.Shared = function () {
            if (this.shared == null) {
                GameMenuUI.shared = new GameMenuUI();
            }
            return GameMenuUI.shared;
        };
        GameMenuUI.prototype.createCompleteEvent = function () {
            game.ApplicationFacade.getInstance().registerMediator(new game.GameMenuMediator(this));
        };
        return GameMenuUI;
    }(eui.Component));
    game.GameMenuUI = GameMenuUI;
    __reflect(GameMenuUI.prototype, "game.GameMenuUI");
})(game || (game = {}));
//# sourceMappingURL=GameMenuUI.js.map