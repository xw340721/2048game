var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var game;
(function (game) {
    var AppContainer = (function () {
        function AppContainer(layer) {
            this.layer = layer;
        }
        AppContainer.prototype.enterStartScreen = function () {
            this.layer.removeChildren();
            this.layer.addChild(game.StartScreen.Shared());
        };
        return AppContainer;
    }());
    game.AppContainer = AppContainer;
    __reflect(AppContainer.prototype, "game.AppContainer");
})(game || (game = {}));
//# sourceMappingURL=AppContainer.js.map