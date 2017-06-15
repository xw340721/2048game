var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var game;
(function (game) {
    var TileVO = (function () {
        function TileVO() {
        }
        TileVO.prototype.clone = function () {
            var tileVO = new TileVO();
            tileVO.x = this.x;
            tileVO.y = this.y;
            tileVO.value = this.value;
            // if(this.pre)
            tileVO.merged = this.merged;
            return tileVO;
        };
        return TileVO;
    }());
    game.TileVO = TileVO;
    __reflect(TileVO.prototype, "game.TileVO");
})(game || (game = {}));
//# sourceMappingURL=TileVO.js.map