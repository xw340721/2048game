var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
// TypeScript file
var game;
(function (game) {
    var Level = (function () {
        function Level() {
        }
        return Level;
    }());
    Level.EASY = "easy";
    Level.NORMAL = "normal";
    Level.SPECIAL = "special";
    game.Level = Level;
    __reflect(Level.prototype, "game.Level");
})(game || (game = {}));
//# sourceMappingURL=Level.js.map