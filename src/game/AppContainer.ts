module game {
	export class AppContainer {
		private layer:eui.UILayer;
		public constructor(layer:eui.UILayer) {
			this.layer = layer;
			
		}
		public enterStartScreen():void{
			this.layer.removeChildren();
			this.layer.addChild(StartScreen.Shared());
		}

		public enterGameScreen():void{
			this.layer.removeChildren();
			this.layer.addChild(GameScreen.Shared());
		}


		public showSettingWindow(type:string="setting"):void{
			console.log("setting");
		}
	}
}