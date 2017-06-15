module game {
	export class CommonData {
		public static winValue:number = 2048

		public static get size():number{
			switch(CommonData.level){
				case Level.EASY:
					return 6;
				case Level.NORMAL:
					return 5;
				case Level.SPECIAL:
					return 4;
				default:
					return 6;
			}
		}

		/**
		 * 游戏当前等级
		 */
		public static level:string = Level.NORMAL;

		/**
		 * 最高分
		 */
		public static highScore:number = 0;

		/**
		 * 游戏是否开始
		 */
		public static isRuning :boolean = false;

		public constructor(){

		}

	}
}