module game {
	export class GameMenuMediator extends puremvc.Mediator implements puremvc.IMediator  {
		public static NAME:string="GameMenuMediator";
		public constructor(viewComponent:any) {
			super(GameMenuMediator.NAME,viewComponent);
			this.gameMenuUI.btn_setting.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onclick_setting,this);
		}


		public onclick_setting(){
			this.sendNotification(SceneCommand.SHOW_SETTING,"pause");
		}

		public get gameMenuUI():GameMenuUI{
			return <GameMenuUI>this.viewComponent
		}
	}
}