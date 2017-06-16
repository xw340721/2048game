module game {
	export class GameProxy extends puremvc.Proxy implements puremvc.IProxy {
		public static NAME: string = "GameProxy";

		/**
		 * 更新得分
		 */
		public static SCORE_UPDATE: string = "score_update";

		/**
		 * 游戏重置
		 */
		public static SCORE_RESERT: string = "score_reset";

		private won: boolean = false;
		private over: boolean = false;

		public constructor() {
			super(GameProxy.NAME);
		}

		private _score = 0;

		public get score(): number {
			return this._score;
		}


		public reset() {
			this._score = 0;
			this.won = false;
			this.over = false;
			CommonData.isRuning = true;
			this.sendNotification(GameProxy.SCORE_RESERT);
		}

		/**
		 * 更新计分板
		 */

		public updateScore(addScore: number): void {
			if (addScore != 0) {
				this._score += addScore;
				if (this._score > CommonData.highScore)
					CommonData.highScore = this._score;
				this.sendNotification(GameProxy.SCORE_UPDATE, { totalScore: this.score, highScore: CommonData.highScore, addScore: addScore });
			}
		}

	}
}