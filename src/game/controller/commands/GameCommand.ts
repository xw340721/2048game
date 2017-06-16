module game {
	export class GameCommand extends puremvc.SimpleCommand implements puremvc.ICommand {
		public constructor() {
			super();
		}

		public static NAME:string="GameCommand";

		public static START_GAME:string="start_game";

		/**
         * 执行移动 , body  0: 上, 1: 右, 2:下, 3: 左
         */
		public static MOVE_TILE:string="move_tile";
		public static UPDATE_SCORE:string="update_score";
		public static FINISH_GAME:string="finish_game";

		public register():void{
			this.facade.registerCommand(GameCommand.START_GAME,GameCommand);
			this.facade.registerCommand(GameCommand.MOVE_TILE,GameCommand);
			this.facade.registerCommand(GameCommand.UPDATE_SCORE,GameCommand);
		}


		public execute(notification:puremvc.Notification){
			var gameProxy:GameProxy = <GameProxy>this.facade.retrieveProxy(GameProxy.NAME);
			var gridProxy:GridProxy = <GridProxy>this.facade.retrieveProxy(GridProxy.NAME);
			var data:any = notification.getBody();
			switch(notification.getName()){
				case GameCommand.START_GAME:
					this.sendNotification(SceneCommand.CHANGE,2);
					gridProxy.reset();
					gameProxy.reset();
					gridProxy.addStartTiles()
					break;
				case GameCommand.MOVE_TILE:
					gridProxy.move(<number>data);
					break;
				case GameCommand.UPDATE_SCORE:
					gameProxy.updateScore(<number>data);
					break;
					
			}
		}
	}
}