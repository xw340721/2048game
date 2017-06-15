module game {
	export class ApplicationMediator extends puremvc.Mediator implements puremvc.IMediator {
		public static NAME:string="ApplicationMediator"
		public constructor(viewComponent:any) {
			super(ApplicationMediator.NAME,viewComponent);
		}


		public get main():AppContainer{
			return <AppContainer>this.viewComponent
		}
	}
}