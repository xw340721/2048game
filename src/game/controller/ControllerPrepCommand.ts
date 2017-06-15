module game {
	export class ControllerPrepCommand extends puremvc.SimpleCommand implements puremvc.ICommand {
		public constructor() {
			super();
		}
		
		public execute():void{
			(new SceneCommand()).register()
		}

	}
}