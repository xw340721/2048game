var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var game;
(function (game) {
    var CommonData = (function () {
        function CommonData() {
        }
        return CommonData;
    }());
    CommonData.winValue = 2048;
    /**
     * 游戏当前等级
     */
    CommonData.level = game.Level;
    game.CommonData = CommonData;
    __reflect(CommonData.prototype, "game.CommonData");
})(game || (game = {}));
//# sourceMappingURL=CommonData.js.map