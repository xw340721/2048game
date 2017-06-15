module game {
	export class ModelPrepCommand extends puremvc.MacroCommand implements puremvc.ICommand {
		public constructor() {
			super();
		}

		public execute(notification:puremvc.Notification):void{
			this.facade.registerProxy(new GameProxy());
			this.facade.registerProxy(new GridProxy());
		}
	}
}