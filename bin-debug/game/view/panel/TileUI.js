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
    var TileUI = (function (_super) {
        __extends(TileUI, _super);
        function TileUI() {
            var _this = _super.call(this) || this;
            _this.location = { x: 0, y: 0 };
            return _this;
        }
        Object.defineProperty(TileUI.prototype, "value", {
            get: function () {
                return this._value;
            },
            set: function (value) {
                if (value == this._value) {
                    return;
                }
                this._value = value;
                this.updateValue();
            },
            enumerable: true,
            configurable: true
        });
        TileUI.prototype.updateValue = function () {
            var mi = Math.log(this._value) / Math.log(2);
            this.texture = RES.getRes("tile_json.tile_" + mi);
        };
        TileUI.prototype.playScale = function (merged) {
            if (merged === void 0) { merged = false; }
            //todo 理解
            if (!merged) {
                this.scaleX = this.scaleY = 0.1;
                egret.Tween.get(this).to({
                    scaleX: 1,
                    scaleY: 1
                }, 100);
            }
            else {
                var self = this;
                var fun = function () {
                    egret.Tween.get(self).to({
                        scaleX: 1,
                        scaleY: 1
                    });
                };
                this.scaleX = this.scaleY = 1;
                egret.Tween.get(self).to({
                    scaleX: 1.3,
                    scaleY: 1.3
                }).call(fun);
            }
        };
        /**
         * 移动格子
         */
        TileUI.prototype.playMove = function (xTo, yTo) {
            var self = this;
            egret.Tween.get(self).to({
                x: xTo,
                y: yTo
            });
        };
        return TileUI;
    }(egret.Bitmap));
    game.TileUI = TileUI;
    __reflect(TileUI.prototype, "game.TileUI");
})(game || (game = {}));
//# sourceMappingURL=TileUI.js.map