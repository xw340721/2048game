module game {
	export class GameScene extends eui.Component {
		public static shared: GameScene;
		public mask_er: eui.Rect;
		public group_tiles: eui.Group;
		public static Shared() {
			if (GameScene.shared == null) {
				GameScene.shared = new GameScene;
			}
			return GameScene.shared;
		}
		public constructor() {
			super();
			this.skinName = "GameSceneSkins";
			this.once(eui.UIEvent.CREATION_COMPLETE, this.createViewComponent, this);
		}

		public createViewComponent() {
			this.mask = this.mask_er;
			ApplicationFacade.getInstance().registerMediator(new GameSceneMediator(this));
		}

		/**
	 * 创建一个格子
	 */
		public createTile(tileVO: TileVO): void {
			var tile: TileUI = <TileUI>ObjectPool.getPool("game.TileUI").borrowObj();
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
				} else {
					tile.playScale(false);
				}
			}
			egret.setTimeout(showTile, this, 100);
		}

		/**
		 * 清除所有
		 */
		public clearTiles(): void {
			var num: number = this.group_tiles.numChildren;
			var tileUI: TileUI;
			for (var i: number = num - 1; i >= 0; i--) {
				tileUI = <TileUI>this.group_tiles.removeChildAt(i);
				ObjectPool.getPool("game.TileUI").returnObj(tileUI);
			}
		}

		private getTileUI(x: number, y: number): TileUI {
			for (var i: number = 0; i < this.group_tiles.numChildren; i++) {
				var tile: TileUI = <TileUI>this.group_tiles.getChildAt(i);
				if (tile.location.x == x && tile.location.y == y) {
					return tile
				}
			}
			return null;
		}


		/**
		 * 移动一个格子
		 */

		public moveTile(tileVO: TileVO): void {
			var tile: TileUI = this.getTileUI(tileVO.previousPosition.x, tileVO.previousPosition.y);
			if (tile) {
				tile.location.x = tileVO.x;
				tile.location.y = tileVO.y;
				tile.playMove(tileVO.x * (tile.width + this.gap) + tile.width / 2,
					tileVO.y * (tile.height + this.gap) + tile.height / 2);
			}
		}

		/**
		 * 合并格子
		 */
		public mergedTile(tileVO: TileVO): void {
			var tileFrom: TileUI = <TileUI>this.getTileUI(tileVO.previousPosition.x, tileVO.previousPosition.y)
			var tileTo: TileUI = <TileUI>this.getTileUI(tileVO.x, tileVO.y);
			if (tileFrom && tileTo) {
				this.group_tiles.setChildIndex(tileFrom, 0);
				var self: GameScene = this;
				tileFrom.location.x = -1;
				tileFrom.location.y = -1;
				tileFrom.playMove(tileVO.x * (tileFrom.width + this.gap) + tileFrom.width / 2, tileVO.y * (tileFrom.height + this.gap) + tileFrom.height / 2);
				var moveComplete = function (event: egret.Event) {
					if (tileFrom.parent)
						self.group_tiles.removeChild(tileFrom);
					ObjectPool.getPool("game.TileUI").returnObj(tileFrom);   //回收到对象池
					tileTo.value = tileVO.value;
					self.group_tiles.setChildIndex(tileTo, self.group_tiles.numChildren - 1);  //将要缩放的格子置顶，
					tileTo.playScale(true);
				}
				tileFrom.once("moveComplete", moveComplete, this)
			}
		}



		/**
		 * 格子大小
		 */

		private get tileSize(): number {
			return (560 - (CommonData.size + 1) * this.gap) / CommonData.size;
		}


		/**
		 * 间距
		 */
		private get gap(): number {
			return 0
		}
	}
}