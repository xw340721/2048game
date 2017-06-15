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
    var GameScreen = (function (_super) {
        __extends(GameScreen, _super);
        function GameScreen() {
            var _this = _super.call(this) || this;
            _this.skinName = "GameScreenSkins";
            _this.addEventListener(eui.UIEvent.CREATION_COMPLETE, _this.createComponent, _this);
            return _this;
        }
        GameScreen.Shared = function () {
            if (GameScreen.shared == null) {
                GameScreen.shared = new GameScreen();
            }
            return GameScreen.shared;
        };
        GameScreen.prototype.createComponent = function () {
            game.ApplicationFacade.getInstance().registerMediator(new game.GameScreenMediator(this));
            this.addChild(game.GameMenuUI.Shared());
            this.addChild(game.GameScene.Shared());
        };
        return GameScreen;
    }(eui.Component));
    game.GameScreen = GameScreen;
    __reflect(GameScreen.prototype, "game.GameScreen");
})(game || (game = {}));
//# sourceMappingURL=GameScreen.js.map