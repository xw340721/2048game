// TypeScript file

module game{
    export class StartupCommand extends puremvc.MacroCommand{
        public constructor(){
            super();
        }

        public initializeMacroCommand(){
            this.addSubCommand(ControllerPrepCommand);
            this.addSubCommand(ViewPrepCommand);
        }
    }
}