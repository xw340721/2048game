module game {
	export class GameScene extends eui.Component {
		public static shared:GameScene;
		public mask_er:eui.Rect;
		public group_tiles:eui.Group;
		public static Shared(){
			if(GameScene.shared==null){
				GameScene.shared = new GameScene;
			}
			return GameScene.shared;
		}
		public constructor() {
			super();
			this.skinName="GameSceneSkins";
			this.once(eui.UIEvent.CREATION_COMPLETE,this.createViewComponent,this);
		}

		public createViewComponent(){
			this.mask = this.mask_er;
			ApplicationFacade.getInstance().registerMediator(new GameSceneMediator(this));
		}

 		/**
         * 创建一个格子
         */
		public createTile(tileVO:TileVO):void{
			var tile:TileUI = <TileUI>ObjectPool.getPool("game.TileUI").borrowObj();
			tile.value = tileVO.value;
			tile.location.x = tileVO.x;
			tile.location.y = tileVO.y;
			tile.width = tile.height = this.tileSize;
			tile.anchorOffsetX = tile.anchorOffsetY = this.tileSize/2;
			tile.x = tileVO.x*(tile.width+this.gap)+this.tileSize/2;
			tile.y = tileVO.y*(tile.height+this.gap)+this.tileSize/2;
			tile.visible = false;
			this.group_tiles.addChild(tile);
			var showTile = function(){
				 tile.visible = true;
                if (tileVO.merged) {
                    tile.playScale(true);
                } else {
                    tile.playScale(false);
                }
			}
			egret.setTimeout(showTile,this,100);
		}

		/**
		 * 清除所有
		 */
		public clearTiles():void{
			var num:number = this.group_tiles.numChildren;
			var tileUI:TileUI;
			for(var i:number = num-1;i>=0;i--){
				tileUI = <TileUI>this.group_tiles.removeChildAt(i);
				ObjectPool.getPool("game.TileUI").returnObj(tileUI);
			}
		}

		/**
		 * 格子大小
		 */

		private get tileSize():number{
			return (560-(CommonData.size+1)*this.gap)/CommonData.size;
		}


		/**
		 * 间距
		 */
		private get gap():number{
			return 0
		}
	}
}