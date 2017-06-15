module game {
	export class GameSceneMediator extends puremvc.Mediator implements puremvc.IMediator {
		public static NAME: string = "GameSceneMediator";
		public constructor(viewComponent: any) {
			super(GameSceneMediator.NAME, viewComponent);
		}


		public listNotificationInterests(): Array<any> {
			return [
				GridProxy.TILE_INSERT,
				GridProxy.TILE_MERGED,
				GridProxy.TILE_MOVE,
				GridProxy.TILE_REMOVE,
				GridProxy.TILE_RESET
			];
		}

		public handleNotification(notification: puremvc.INotification): void {
			var data: any = notification.getBody();
			switch (notification.getName()) {
				case GridProxy.TILE_INSERT:
					this.gameScene.createTile(<TileVO>data);
				case GridProxy.TILE_RESET:
					this.gameScene.clearTiles();
			}
		}


		public get gameScene(): GameScene {
			return <GameScene>this.viewComponent
		}
	}
}