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
    var GridProxy = (function (_super) {
        __extends(GridProxy, _super);
        function GridProxy() {
            var _this = _super.call(this, GridProxy.NAME) || this;
            _this.startTiles = 2;
            /**
             * 为填充的tiles
             */
            _this.cells = [];
            return _this;
        }
        /**
         * 初始化数据
         */
        GridProxy.prototype.reset = function () {
            this.size = game.CommonData.size;
            this.cells = [];
            for (var x = 0; x < this.size; x++) {
                var row = [];
                this.cells.push(row);
                for (var y = 0; y < this.size; y++) {
                    row.push(null);
                }
            }
            this.sendNotification(GridProxy.TILE_RESET);
        };
        /**
         * 添加游戏开始的格子
         */
        GridProxy.prototype.addStartTiles = function () {
            for (var i = 0; i < this.startTiles; i++) {
                this.addRandomTile();
            }
        };
        GridProxy.prototype.addRandomTile = function () {
            if (this.cellsAvailable()) {
                var position = this.randomAvailableCell;
                var tile = new game.TileVO();
                tile.x = position.x;
                tile.y = position.y;
                tile.value = Math.random() < 0.9 ? 2 : 4;
                this.insertTile(tile);
            }
        };
        /**
         * 添加一个格子
         */
        GridProxy.prototype.insertTile = function (tile) {
            this.cells[tile.x][tile.y] = tile;
            this.sendNotification(GridProxy.TILE_INSERT, tile.clone());
        };
        /**
         * 是否存在空格子
         */
        GridProxy.prototype.cellsAvailable = function () {
            if (this.availableCells.length > 0) {
                return true;
            }
            return false;
        };
        Object.defineProperty(GridProxy.prototype, "randomAvailableCell", {
            get: function () {
                var arr = this.availableCells;
                if (arr.length) {
                    return arr[Math.floor(Math.random() * arr.length)];
                }
                return null;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GridProxy.prototype, "availableCells", {
            /**
             * 所有的空格子的位置
             */
            get: function () {
                var arr = [];
                for (var x = 0; x < this.size; x++) {
                    for (var y = 0; y < this.size; y++) {
                        if (!this.cells[x][y]) {
                            arr.push({
                                x: x,
                                y: y
                            });
                        }
                    }
                }
                return arr;
            },
            enumerable: true,
            configurable: true
        });
        return GridProxy;
    }(puremvc.Proxy));
    GridProxy.NAME = "GridProxy";
    /**
    * 格子重置了
    */
    GridProxy.TILE_RESET = "tile_reset";
    /**
     * 格子移动了
     */
    GridProxy.TILE_MOVE = "tile_move";
    /**
     * 格子添加了
     */
    GridProxy.TILE_INSERT = "tile_insert";
    /**
     * 格子移除了
     */
    GridProxy.TILE_REMOVE = "tile_remove";
    /**
     * 格子合并了
     */
    GridProxy.TILE_MERGED = "tile_merged";
    game.GridProxy = GridProxy;
    __reflect(GridProxy.prototype, "game.GridProxy", ["puremvc.IProxy", "puremvc.INotifier"]);
})(game || (game = {}));
//# sourceMappingURL=GridProxy.js.map