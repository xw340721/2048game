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
    var GameProxy = (function (_super) {
        __extends(GameProxy, _super);
        function GameProxy() {
            var _this = _super.call(this, GameProxy.NAME) || this;
            _this.won = false;
            _this.over = false;
            _this._score = 0;
            return _this;
        }
        Object.defineProperty(GameProxy.prototype, "score", {
            get: function () {
                return this._score;
            },
            enumerable: true,
            configurable: true
        });
        GameProxy.prototype.reset = function () {
            this._score = 0;
            this.won = false;
            this.over = false;
            game.CommonData.isRuning = true;
            this.sendNotification(GameProxy.SCORE_RESERT);
        };
        /**
         * 更新计分板
         */
        GameProxy.prototype.updateScore = function (addScore) {
            if (addScore != 0) {
                this._score += addScore;
                if (this._score > game.CommonData.highScore)
                    game.CommonData.highScore = this._score;
                this.sendNotification(GameProxy.SCORE_UPDATE, { totalScore: this.score, highScore: game.CommonData.highScore, addScore: addScore });
            }
        };
        return GameProxy;
    }(puremvc.Proxy));
    GameProxy.NAME = "GameProxy";
    /**
     * 更新得分
     */
    GameProxy.SCORE_UPDATE = "score_update";
    /**
     * 游戏重置
     */
    GameProxy.SCORE_RESERT = "score_reset";
    game.GameProxy = GameProxy;
    __reflect(GameProxy.prototype, "game.GameProxy", ["puremvc.IProxy", "puremvc.INotifier"]);
})(game || (game = {}));
//# sourceMappingURL=GameProxy.js.map