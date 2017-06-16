var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var game;
(function (game) {
    var CommonData = (function () {
        function CommonData() {
        }
        Object.defineProperty(CommonData, "size", {
            get: function () {
                switch (CommonData.level) {
                    case game.Level.EASY:
                        return 6;
                    case game.Level.NORMAL:
                        return 5;
                    case game.Level.SPECIAL:
                        return 4;
                    default:
                        return 6;
                }
            },
            enumerable: true,
            configurable: true
        });
        return CommonData;
    }());
    CommonData.winValue = 2048;
    /**
     * 游戏当前等级
     */
    CommonData.level = game.Level.EASY;
    /**
     * 最高分
     */
    CommonData.highScore = 0;
    /**
     * 游戏是否开始
     */
    CommonData.isRuning = false;
    game.CommonData = CommonData;
    __reflect(CommonData.prototype, "game.CommonData");
})(game || (game = {}));
//# sourceMappingURL=CommonData.js.map