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


		/**
		 * 初始化数据
		 */

		public reset():void{
			this.size = CommonData.size;
			this.cells = [];
			for(var x:number = 0;x<this.size;x++){
				var row:Array<any> = [];
				this.cells.push(row);
				for(var y:number = 0;y<this.size;y++){
					row.push(null);
				}
			}
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
				tile.value = Math.random() < 0.9 ? 2 : 4;
				this.insertTile(tile);
			}
		}


		/**
		 * 添加一个格子
		 */
		private insertTile(tile: TileVO): void {
			this.cells[tile.x][tile.y] = tile;
			this.sendNotification(GridProxy.TILE_INSERT,tile.clone());
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

	}
}