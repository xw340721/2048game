module game {
	export class GameScreenMediator extends puremvc.Mediator implements puremvc.IMediator {
		public static NAME: string = "GameScreenMediator";

		public constructor(viewComponent: any) {
			super(GameScreenMediator.NAME, viewComponent);

			//pc和移动端设置不同的移动策略
			if (egret.MainContext.deviceType != egret.MainContext.DEVICE_MOBILE) {
				var self = this;
				document.addEventListener("keydown", function (event: KeyboardEvent) {
					switch (event.keyCode) {
						case 38:
							self.doMove(0);
							break;
						case 39:
							self.doMove(1);
							break;
						case 40:
							self.doMove(2);
							break;
						case 37:
							self.doMove(3);
							break;

					}
				})
			} else {
				this.gameScene.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.mouseDownHandle, this);
			}
		}

		private downPoint: egret.Point;
		private movePoint: egret.Point;
		private mouseDownHandle(event: egret.TouchEvent): void {
			var main = egret.MainContext.instance.stage;
			main.once(egret.TouchEvent.TOUCH_MOVE, this.stage_mouseMoveHandler, this);
			main.once(egret.TouchEvent.TOUCH_END, this.stage_mouseUpHandler, this);
			main.once(egret.TouchEvent.LEAVE_STAGE, this.stage_mouseUpHandler, this);
			this.downPoint = this.gameScene.globalToLocal(event.stageX, event.stageY);
		}


		private needMove: boolean
		private stage_mouseMoveHandler(event: egret.TouchEvent): void {
			if (!this.movePoint)
				this.movePoint = new egret.Point();
			//为了优化 没必要每次都算出来
			this.movePoint.x = event.stageX;
			this.movePoint.y = event.stageY;
			if (this.needMove)
				return;
			this.needMove = true;
		}

		private stage_mouseUpHandler(event: egret.TouchEvent): void {
			if (this.needMove) {
				this.updateWhenMouseUp();
				this.needMove = false;
			}
		}

		private updateWhenMouseUp(): void {
			this.gameScene.globalToLocal();
			var p: egret.Point = this.gameScene.globalToLocal(this.movePoint.x, this.movePoint.y);
			var offSetX: number = p.x - this.downPoint.x;
			var offSetY: number = p.y - this.downPoint.y;

			if (offSetY < 0 && Math.abs(offSetY) > Math.abs(offSetX))  //上
			{
				this.doMove(0);
			}
			else if (offSetX > 0 && offSetX > Math.abs(offSetY))  //右
			{
				this.doMove(1);
			}
			else if (offSetY > 0 && offSetY > Math.abs(offSetX))  //下
			{
				this.doMove(2);
			}
			else if (offSetX < 0 && Math.abs(offSetX) > Math.abs(offSetY))  //左
			{
				this.doMove(3);
			}
		}

		/**
		 * @param director  方向 0上 1右 2下 3左
		 */
		private doMove(director: number): void {
			if (CommonData.isRuning && (egret.getTimer() - this.lastMoveTile) >= 150) {
				switch (director) {
					case 0:
						this.sendNotification(GameCommand.MOVE_TILE, 0);    //上
						break;
					case 1:
						this.sendNotification(GameCommand.MOVE_TILE, 1);    //右
						break;
					case 2:
						this.sendNotification(GameCommand.MOVE_TILE, 2);    //下
						break;
					case 3:
						this.sendNotification(GameCommand.MOVE_TILE, 3);    //左
						break;
				}
			}
			this.lastMoveTile = egret.getTimer();
		}


		/**
		 * 上次移动的时间
		 */
		private lastMoveTile: number = 0;

		public get gameScene(): GameScreen {
			return <GameScreen>(this.viewComponent);
		}
	}
}
