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
    var GameScene = (function (_super) {
        __extends(GameScene, _super);
        function GameScene() {
            var _this = _super.call(this) || this;
            _this.skinName = "GameSceneSkins";
            _this.once(eui.UIEvent.CREATION_COMPLETE, _this.createViewComponent, _this);
            return _this;
        }
        GameScene.Shared = function () {
            if (GameScene.shared == null) {
                GameScene.shared = new GameScene;
            }
            return GameScene.shared;
        };
        GameScene.prototype.createViewComponent = function () {
            this.mask = this.mask_er;
            game.ApplicationFacade.getInstance().registerMediator(new game.GameSceneMediator(this));
        };
        /**
         * 创建一个格子
         */
        GameScene.prototype.createTile = function (tileVO) {
            var tile = game.ObjectPool.getPool("game.TileUI").borrowObj();
            tile.value = tileVO.value;
            tile.location.x = tileVO.x;
            tile.location.y = tileVO.y;
            tile.width = tile.height = this.tileSize;
            tile.anchorOffsetX = tile.anchorOffsetY = this.tileSize / 2;
            tile.x = tileVO.x * (tile.width + this.gap) + this.tileSize / 2;
            tile.y = tileVO.y * (tile.height + this.gap) + this.tileSize / 2;
            tile.visible = false;
            this.group_tiles.addChild(tile);
            var showTile = function () {
                tile.visible = true;
                if (tileVO.merged) {
                    tile.playScale(true);
                }
                else {
                    tile.playScale(false);
                }
            };
            egret.setTimeout(showTile, this, 100);
        };
        /**
         * 清除所有
         */
        GameScene.prototype.clearTiles = function () {
            var num = this.group_tiles.numChildren;
            var tileUI;
            for (var i = num - 1; i >= 0; i--) {
                tileUI = this.group_tiles.removeChildAt(i);
                game.ObjectPool.getPool("game.TileUI").returnObj(tileUI);
            }
        };
        Object.defineProperty(GameScene.prototype, "tileSize", {
            /**
             * 格子大小
             */
            get: function () {
                return (560 - (game.CommonData.size + 1) * this.gap) / game.CommonData.size;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GameScene.prototype, "gap", {
            /**
             * 间距
             */
            get: function () {
                return 0;
            },
            enumerable: true,
            configurable: true
        });
        return GameScene;
    }(eui.Component));
    game.GameScene = GameScene;
    __reflect(GameScene.prototype, "game.GameScene");
})(game || (game = {}));
//# sourceMappingURL=GameScene.js.map