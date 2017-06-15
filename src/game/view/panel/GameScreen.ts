module game {
	export class GameScreen  extends eui.Component{
		public static shared:GameScreen;

		public static Shared(){
			if(GameScreen.shared==null){
				GameScreen.shared = new GameScreen();
			}
			return GameScreen.shared;
		}
		public constructor() {
			super();
			this.skinName="GameScreenSkins";
			this.addEventListener(eui.UIEvent.CREATION_COMPLETE,this.createComponent,this);
		}

		public createComponent(){
			ApplicationFacade.getInstance().registerMediator(new GameScreenMediator(this));
			this.addChild(GameMenuUI.Shared());
			this.addChild(GameScene.Shared());
		}
	}
}