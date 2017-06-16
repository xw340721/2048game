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
            this.playerTurn = true;
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
                tile.value = Math.random() < 0.95 ? 2 : 4;
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
            /**
             * 随机产生空格子
             */
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
        /**
         * 向某一方向移动
         * @param direction 0: 上, 1: 右, 2:下, 3: 左
         */
        GridProxy.prototype.move = function (director) {
            var won = false;
            var moved = false;
            var score = 0;
            this.perpareTiles();
            var tiles = this.buildMoveOrder(director);
            for (var i = 0; i < tiles.length; i++) {
                var tile = tiles[i];
                if (tile) {
                    var fathestPosition = this.findFarthestPosition({ x: tile.x, y: tile.y }, director);
                    var nextPosition = this.getNextPosition(fathestPosition, director);
                    var nextTile = this.cellContent(nextPosition.x, nextPosition.y);
                    if (nextTile && nextTile.value == tile.value && !nextTile.merged) {
                        var newValue = tile.value + nextTile.value;
                        this.mergedTile(tile, nextTile);
                        tile.y = nextTile.y;
                        //更新分数
                        score += newValue;
                        if (newValue >= game.CommonData.winValue) {
                            won = true;
                        }
                    }
                    else {
                        this.moveTile(tile, fathestPosition.x, fathestPosition.y);
                    }
                    if (tile.x != tile.previousPosition.x || tile.y != tile.previousPosition.y) {
                        this.playerTurn = false;
                        moved = true;
                    }
                }
            }
            if (score > 0) {
                this.sendNotification(game.GameCommand.UPDATE_SCORE, score);
            }
            if (!won) {
                if (moved) {
                    this.computerMove();
                }
                if (!this.movesAvailable()) {
                    this.sendNotification(game.GameCommand.FINISH_GAME, false);
                }
            }
            else {
                this.sendNotification(game.GameCommand.FINISH_GAME, true);
            }
        };
        /**
         * 电脑添加一个格子
         */
        GridProxy.prototype.computerMove = function () {
            this.addRandomTile();
            this.playerTurn = true;
        };
        /**
         * 是否能够继续游戏
         */
        GridProxy.prototype.movesAvailable = function () {
            for (var i = 0; i < this.size; i++) {
                for (var j = 0; j < this.size; j++) {
                    var tile = this.cells[i][j];
                    if (tile) {
                        for (var direction = 0; direction < 4; direction++) {
                            var nextPosition = this.getNextPosition({ "x": tile.x, "y": tile.y }, direction);
                            var nextTileVO = this.cellContent(nextPosition.x, nextPosition.y);
                            if ((!nextTileVO && this.withinBounds(nextPosition.x, nextPosition.y)) ||
                                (nextTileVO && nextTileVO.value == tile.value)) {
                                return true;
                            }
                        }
                    }
                }
            }
            return false;
        };
        /**
         * 合并格子
         */
        GridProxy.prototype.mergedTile = function (tileForm, tileTo) {
            var mergedTile = new game.TileVO;
            mergedTile.x = tileTo.x;
            mergedTile.y = tileTo.y;
            mergedTile.previousPosition = {
                x: tileForm.x,
                y: tileForm.y
            };
            mergedTile.value = tileForm.value + tileTo.value;
            mergedTile.merged = true;
            this.cells[tileForm.x][tileForm.y] = null;
            this.cells[tileTo.x][tileTo.y] = mergedTile;
            this.sendNotification(GridProxy.TILE_MERGED, mergedTile.clone());
        };
        /**
         * 存储移动前状态
         */
        GridProxy.prototype.perpareTiles = function () {
            for (var x = 0; x < this.size; x++) {
                for (var y = 0; y < this.size; y++) {
                    var tile = (this.cells[x][y]);
                    if (tile) {
                        tile.merged = false;
                        tile.previousPosition = {
                            x: tile.x,
                            y: tile.y
                        };
                    }
                }
            }
        };
        /**
         *  获取某一方向的格子
         */
        GridProxy.prototype.buildMoveOrder = function (director) {
            var arr = [];
            var vector = this.getVector(director);
            var xReverse = (vector.x == 1) ? true : false;
            var yReverse = (vector.y == 1) ? true : false;
            var x = xReverse ? (this.size - 1) : 0;
            while (x >= 0 && x < this.size) {
                var y = yReverse ? (this.size - 1) : 0;
                while (y >= 0 && y < this.size) {
                    arr.push(this.cellContent(x, y));
                    y = y + (yReverse ? -1 : 1);
                }
                x = x + (xReverse ? -1 : 1);
            }
            return arr;
        };
        /**
         * 获取某一方向的偏移位置
         * @param direction 0: 上, 1: 右, 2:下, 3: 左
         */
        GridProxy.prototype.getVector = function (director) {
            switch (director) {
                case 0:
                    return { x: 0, y: -1 };
                case 1:
                    return { x: 1, y: 0 };
                case 2:
                    return { x: 0, y: 1 };
                case 3:
                    return { x: -1, y: 0 };
                default:
                    return null;
            }
        };
        /**
         * 获取合法格子位置
         */
        GridProxy.prototype.cellContent = function (x, y) {
            if (this.withinBounds(x, y)) {
                return this.cells[x][y];
            }
            else {
                return null;
            }
        };
        /**
         * 检测位置合法
         */
        GridProxy.prototype.withinBounds = function (x, y) {
            return x >= 0 && x < this.size && y >= 0 && y < this.size;
        };
        /**
         * 获取指定方向上能移动到的位置
         */
        GridProxy.prototype.findFarthestPosition = function (position, direction) {
            var vector = this.getVector(direction);
            var lastPosition;
            //一直移到边缘或者被位置已经被占
            do {
                lastPosition = position;
                //position 传入可以修改值
                position = this.getNextPosition(position, direction);
            } while (this.withinBounds(position.x, position.y) && this.isAvailable(position.x, position.y));
            return lastPosition;
        };
        /**
         * 获取某一位置指定方向的下一个位置
         */
        GridProxy.prototype.getNextPosition = function (position, director) {
            var vector = this.getVector(director);
            return { x: position.x + vector.x, y: position.y + vector.y };
        };
        /**
         * 判断该位置是否可用
         */
        GridProxy.prototype.isAvailable = function (x, y) {
            return !this.isOccupied(x, y);
        };
        /**
         * 获取指定位置的格子是否被占用
         */
        GridProxy.prototype.isOccupied = function (x, y) {
            if (this.cellContent(x, y))
                return true;
            else
                return false;
        };
        /**
         * 移动格子
         */
        GridProxy.prototype.moveTile = function (tile, x, y) {
            if (tile.x == x && tile.y == y) {
                return;
            }
            this.cells[tile.x][tile.y] = null;
            tile.x = x;
            tile.y = y;
            this.cells[tile.x][tile.y] = tile;
            this.sendNotification(GridProxy.TILE_MOVE, tile.clone());
        };
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