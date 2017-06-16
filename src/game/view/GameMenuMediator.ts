module game {
	export class GameMenuMediator extends puremvc.Mediator implements puremvc.IMediator  {
		public static NAME:string="GameMenuMediator";
		public constructor(viewComponent:any) {
			super(GameMenuMediator.NAME,viewComponent);
			this.gameMenuUI.btn_setting.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onclick_setting,this);
		}


		public listNotificationInterests(){
			return [
				GameProxy.SCORE_RESERT,
				GameProxy.SCORE_UPDATE
			]
		}


		public handleNotification (notification:puremvc.Notification){
			var data :any = notification.getBody();
			switch(notification.getName()){
				case GameProxy.SCORE_RESERT:
					this.gameMenuUI.reset()
					break;
				case GameProxy.SCORE_UPDATE:
					this.gameMenuUI.update(data);
					break;
			}
		}



		public onclick_setting(){
			this.sendNotification(SceneCommand.SHOW_SETTING,"pause");
		}

		public get gameMenuUI():GameMenuUI{
			return <GameMenuUI>this.viewComponent
		}
	}
}