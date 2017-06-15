module game {
	export class StartScreen extends eui.Component {
		public btn_start: eui.Button;
		public btn_level: eui.Button;
		public btn_setting: eui.Button;
		public static shared: StartScreen;
		public static Shared(): StartScreen {
			if (StartScreen.shared == null) {
				StartScreen.shared = new StartScreen();
			}
			return StartScreen.shared;
		}
		public constructor() {
			super();
			this.skinName = "BeginSkins";
			this.once(eui.UIEvent.CREATION_COMPLETE, this.createdComplete, this);
		}

		public createdComplete() {
			ApplicationFacade.getInstance().registerMediator(new StartScreenMediator(this));
		}

	}
}