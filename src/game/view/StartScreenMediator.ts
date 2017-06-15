module game {
	export class StartScreenMediator extends puremvc.Mediator implements puremvc.IMediator {
		public static NAME: string = "StartScreenMediator";
		public constructor(viewComplement: eui.Component) {
			super(StartScreenMediator.NAME, viewComplement);
			this.StartScreen.btn_level.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onclick_level, this);
			this.StartScreen.btn_start.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onclick_start,this);
		}

		public onclick_level() {
			if (CommonData.level == Level.EASY) {
				this.setLevel(Level.NORMAL);
			} else if (CommonData.level == Level.NORMAL) {
				this.setLevel(Level.SPECIAL);
			} else if (CommonData.level == Level.SPECIAL) {
				this.setLevel(Level.EASY);
			}
		}

		public setLevel(level: string): void {
			CommonData.level = level;
			this.StartScreen.btn_level['btn_level_icon'].texture = RES.getRes("icon_json.level_" + level);
			this.StartScreen.btn_level['btn_level_label'].text = level.toUpperCase();
		}

		public get StartScreen(): StartScreen {
			return <StartScreen>this.viewComponent
		}


		public onclick_start(){
			this.facade.sendNotification(GameCommand.START_GAME)
		}
	}
}