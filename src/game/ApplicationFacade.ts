// TypeScript file

module game{
    export class ApplicationFacade extends puremvc.Facade implements puremvc.IFacade{
        public constructor(){
            super();
        }

        public static STARTUP:string="startup";

        public static getInstance():ApplicationFacade{
            if(this.instance==null) this.instance = new ApplicationFacade();
            return  <ApplicationFacade>(this.instance)
        }

        public initializeController(){
            super.initializeController();
            this.registerCommand(ApplicationFacade.STARTUP,StartupCommand)
        }

        public startUp(view:game.AppContainer){
            this.sendNotification(ApplicationFacade.STARTUP,view);
            this.removeCommand(ApplicationFacade.STARTUP)
        }
    }
}