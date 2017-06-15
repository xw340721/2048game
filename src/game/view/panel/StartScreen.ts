module game {
	export class StartScreen extends eui.Component {
		private index:number = 0;
		private btn_start:eui.Button;
		private btn_level:eui.Button;
		private btn_setting:eui.Button;
		public static shared:StartScreen;
		public static Shared():StartScreen{
			if(StartScreen.shared==null){
				StartScreen.shared = new StartScreen();
			}
			return StartScreen.shared;
		}
		public constructor() {
			super();
			this.skinName = "BeginSkins";
			this.btn_level.addEventListener(egret.TouchEvent.TOUCH_END,this.onclick_level,this);
			this.btn_level.addEventListener(egret.TouchEvent.TOUCH_BEGIN,this.onclick_level_begin,this);
		}
		
		public onclick_level_begin(){
			this.btn_level.currentState = "down";
		}
		public onclick_level(){
			var level = ["level_easy","level_normal","level_special"];
			this.btn_level.currentState = level[this.index++%3];
		}
	}
}