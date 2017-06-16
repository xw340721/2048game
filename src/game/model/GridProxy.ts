module game {
	export class GridProxy extends puremvc.Proxy implements puremvc.IProxy {
		public static NAME: string = "GridProxy";
		private startTiles: number = 2;
		private size: number;
		/**
   		* 格子重置了
   		*/
		public static TILE_RESET: string = "tile_reset";
        /**
         * 格子移动了
         */
		public static TILE_MOVE: string = "tile_move";
        /**
         * 格子添加了
         */
		public static TILE_INSERT: string = "tile_insert";
        /**
         * 格子移除了
         */
		public static TILE_REMOVE: string = "tile_remove";

        /**
         * 格子合并了
         */
		public static TILE_MERGED: string = "tile_merged";

		private playerTurn: boolean;

		/**
		 * 初始化数据
		 */

		public reset(): void {
			this.size = CommonData.size;
			this.cells = [];
			for (var x: number = 0; x < this.size; x++) {
				var row: Array<any> = [];
				this.cells.push(row);
				for (var y: number = 0; y < this.size; y++) {
					row.push(null);
				}
			}
			this.playerTurn = true;
			this.sendNotification(GridProxy.TILE_RESET);
		}


		/**
		 * 为填充的tiles
		 */
		private cells: Array<any> = [];
		public constructor() {
			super(GridProxy.NAME);
		}

		/**
		 * 添加游戏开始的格子
		 */
		public addStartTiles(): void {
			for (var i: number = 0; i < this.startTiles; i++) {
				this.addRandomTile();
			}
		}

		private addRandomTile() {
			if (this.cellsAvailable()) {
				var position: any = this.randomAvailableCell;
				var tile: TileVO = new TileVO();
				tile.x = position.x;
				tile.y = position.y;
				tile.value = Math.random() < 0.95 ? 2 : 4;
				this.insertTile(tile);
			}
		}


		/**
		 * 添加一个格子
		 */
		private insertTile(tile: TileVO): void {
			this.cells[tile.x][tile.y] = tile;
			this.sendNotification(GridProxy.TILE_INSERT, tile.clone());
		}


		/**
		 * 是否存在空格子
		 */

		private cellsAvailable(): boolean {
			if (this.availableCells.length > 0) {
				return true;
			}
			return false;
		}

		/**
		 * 随机产生空格子
		 */
		private get randomAvailableCell(): any {
			var arr: Array<any> = this.availableCells;
			if (arr.length) {
				return arr[Math.floor(Math.random() * arr.length)];
			}
			return null;
		}



		/**
		 * 所有的空格子的位置
		 */
		private get availableCells(): Array<any> {
			var arr: Array<any> = [];

			for (var x: number = 0; x < this.size; x++) {
				for (var y: number = 0; y < this.size; y++) {
					if (!this.cells[x][y]) {
						arr.push({
							x: x,
							y: y
						})
					}
				}
			}

			return arr;
		}

		/**
		 * 向某一方向移动
		 * @param direction 0: 上, 1: 右, 2:下, 3: 左
		 */

		public move(director: number): void {
			var won: boolean = false;
			var moved: boolean = false;
			var score: number = 0;
			this.perpareTiles();
			var tiles = this.buildMoveOrder(director);
			for (var i: number = 0; i < tiles.length; i++) {
				var tile = <TileVO>tiles[i];
				if (tile) {
					var fathestPosition: any = this.findFarthestPosition({ x: tile.x, y: tile.y }, director);
					var nextPosition: any = this.getNextPosition(fathestPosition, director);
					var nextTile: TileVO = this.cellContent(nextPosition.x, nextPosition.y);
					if (nextTile && nextTile.value == tile.value && !nextTile.merged) {
						var newValue: number = tile.value + nextTile.value;
						this.mergedTile(tile, nextTile);
						tile.y = nextTile.y;

						//更新分数
						score += newValue;

						if (newValue >= CommonData.winValue) {   //游戏结束
							won = true;
						}
					} else {
						this.moveTile(tile, fathestPosition.x, fathestPosition.y);
					}

					if (tile.x != tile.previousPosition.x || tile.y != tile.previousPosition.y) {  //格子移动了
						this.playerTurn = false;
						moved = true;
					}
				}
			}

			if (score > 0) {
				this.sendNotification(GameCommand.UPDATE_SCORE, score);
			}
			if (!won) {
				if (moved) {
					this.computerMove();
				}
				if (!this.movesAvailable()) {
					this.sendNotification(GameCommand.FINISH_GAME, false);
				}
			} else {
				this.sendNotification(GameCommand.FINISH_GAME, true);
			}


		}


		/**
		 * 电脑添加一个格子
		 */
		private computerMove(): void {
			this.addRandomTile();
			this.playerTurn = true;
		}

		/**
		 * 是否能够继续游戏
		 */
		private movesAvailable(): boolean {
			for (var i: number = 0; i < this.size; i++) {
				for (var j: number = 0; j < this.size; j++) {
					var tile: TileVO = <TileVO>this.cells[i][j];
					if(tile){
						for (var direction: number = 0; direction < 4; direction++) {
							var nextPosition: any = this.getNextPosition({ "x": tile.x, "y": tile.y }, direction);
							var nextTileVO: TileVO = this.cellContent(nextPosition.x, nextPosition.y);
							if ((!nextTileVO && this.withinBounds(nextPosition.x, nextPosition.y)) ||    //某一位置是空的
								(nextTileVO && nextTileVO.value == tile.value)) {     //某一位置可以合并
								return true;
							}
						}
					}
				}
			}
			return false;
		}



		/**
		 * 合并格子
		 */
		private mergedTile(tileForm: TileVO, tileTo: TileVO): void {
			var mergedTile: TileVO = new TileVO;
			mergedTile.x = tileTo.x;
			mergedTile.y = tileTo.y;
			mergedTile.previousPosition = {
				x: tileForm.x,
				y: tileForm.y
			}
			mergedTile.value = tileForm.value + tileTo.value;
			mergedTile.merged = true;

			this.cells[tileForm.x][tileForm.y] = null;
			this.cells[tileTo.x][tileTo.y] = mergedTile;

			this.sendNotification(GridProxy.TILE_MERGED, mergedTile.clone());
		}


		/**
		 * 存储移动前状态
		 */
		private perpareTiles() {
			for (var x: number = 0; x < this.size; x++) {
				for (var y: number = 0; y < this.size; y++) {
					var tile: TileVO = <TileVO><any>(this.cells[x][y]);
					if (tile) {
						tile.merged = false;
						tile.previousPosition = {
							x: tile.x,
							y: tile.y
						}
					}
				}
			}
		}


		/**
		 *  获取某一方向的格子
		 */
		private buildMoveOrder(director: number): Array<any> {
			var arr: Array<any> = [];
			var vector: any = this.getVector(director);
			var xReverse: boolean = (vector.x == 1) ? true : false;
			var yReverse: boolean = (vector.y == 1) ? true : false;
			var x: number = xReverse ? (this.size - 1) : 0;

			while (x >= 0 && x < this.size) {
				var y: number = yReverse ? (this.size - 1) : 0;
				while (y >= 0 && y < this.size) {
					arr.push(this.cellContent(x, y));
					y = y + (yReverse ? -1 : 1);
				}
				x = x + (xReverse ? -1 : 1);
			}
			return arr;
		}


		/**
		 * 获取某一方向的偏移位置
		 * @param direction 0: 上, 1: 右, 2:下, 3: 左
		 */
		private getVector(director: number): any {
			switch (director) {
				case 0:
					return { x: 0, y: -1 };
				case 1:
					return { x: 1, y: 0 }
				case 2:
					return { x: 0, y: 1 };
				case 3:
					return { x: -1, y: 0 };
				default:
					return null;
			}
		}

		/**
		 * 获取合法格子位置
		 */

		private cellContent(x: number, y: number): TileVO {
			if (this.withinBounds(x, y)) {
				return <TileVO>this.cells[x][y];
			} else {
				return null;
			}
		}


		/**
		 * 检测位置合法
		 */
		private withinBounds(x: number, y: number): boolean {
			return x >= 0 && x < this.size && y >= 0 && y < this.size;
		}

		/**
		 * 获取指定方向上能移动到的位置
		 */
		private findFarthestPosition(position: any, direction: number) {
			var vector: any = this.getVector(direction);
			var lastPosition: any;
			//一直移到边缘或者被位置已经被占
			do {
				lastPosition = position;
				//position 传入可以修改值
				position = this.getNextPosition(position, direction);
			} while (this.withinBounds(position.x, position.y) && this.isAvailable(position.x, position.y));
			return lastPosition;
		}

		/**
		 * 获取某一位置指定方向的下一个位置
		 */
		private getNextPosition(position: any, director) {
			var vector: any = this.getVector(director);
			return { x: position.x + vector.x, y: position.y + vector.y };
		}

		/**
		 * 判断该位置是否可用
		 */
		private isAvailable(x: number, y: number): boolean {
			return !this.isOccupied(x, y);
		}

		/**
		 * 获取指定位置的格子是否被占用
		 */
		private isOccupied(x: number, y: number): boolean {
			if (this.cellContent(x, y))
				return true;
			else
				return false;
		}

		/**
		 * 移动格子
		 */
		private moveTile(tile: TileVO, x: number, y: number) {
			if (tile.x == x && tile.y == y) {
				return;
			}
			this.cells[tile.x][tile.y] = null;
			tile.x = x;
			tile.y = y;
			this.cells[tile.x][tile.y] = tile;
			this.sendNotification(GridProxy.TILE_MOVE, tile.clone())
		}
	}
}