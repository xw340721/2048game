module game {
	export class GameCommand extends puremvc.SimpleCommand implements puremvc.ICommand {
		public constructor() {
			super();
		}

		public static NAME:string="GameCommand";

		public static START_GAME:string="start_game";


		public register():void{
			this.facade.registerCommand(GameCommand.START_GAME,GameCommand);
		}


		public execute(notification:puremvc.Notification){
			var gameProxy:GameProxy = <GameProxy>this.facade.retrieveProxy(GameProxy.NAME);
			var gridProxy:GridProxy = <GridProxy>this.facade.retrieveProxy(GridProxy.NAME);
			switch(notification.getName()){
				case GameCommand.START_GAME:
					gridProxy.reset();
					gridProxy.addStartTiles()
					this.sendNotification(SceneCommand.CHANGE,2);
					break;
			}
		}
	}
}