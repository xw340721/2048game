module game {
	export class SceneCommand extends puremvc.SimpleCommand implements puremvc.ICommand {
		public constructor() {
			super();
		}

		public static NAME:string="SceneCommand";

		/**
		 * 场景切换
		 */
		public static CHANGE:string="scene_change";

		/**
		 * 显示设置界面
		 */
		public static SHOW_SETTING:string="scene_setting";

		public register():void{
			this.facade.registerCommand(SceneCommand.CHANGE,SceneCommand)
			this.facade.registerCommand(SceneCommand.SHOW_SETTING,SceneCommand)
		}

		public execute(notification:puremvc.Notification):void{
			var data :any = notification.getBody();
			var appMeidator:ApplicationMediator = <ApplicationMediator>this.facade.retrieveMediator(ApplicationMediator.NAME);
			switch(notification.getName()){
				case SceneCommand.CHANGE:{
					if(data==1)
						appMeidator.main.enterStartScreen();
					else
						appMeidator.main.enterGameScreen();
					break;
				}
				case SceneCommand.SHOW_SETTING:{
					appMeidator.main.showSettingWindow(data);
					break;
				}
			}
		}
	}
}