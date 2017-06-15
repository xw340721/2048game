module game{
	export class GameScreenMediator extends puremvc.Mediator implements puremvc.IMediator{
		public static NAME:string="GameScreenMediator";

		public constructor(viewComponent:any){
			super(GameScreenMediator.NAME,viewComponent);
		}

		public get gameScene(): GameScreen {
            return <GameScreen>(this.viewComponent);
        }
	}
}
