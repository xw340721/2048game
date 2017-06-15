// TypeScript file

module game {
    export class GameMenuUI extends eui.Component {
        public label_score: eui.Label;
        public btn_setting: eui.Button;
        public group_pannel: eui.Group;

        public static shared: GameMenuUI;

        public static Shared() {
            if (this.shared == null) {
                GameMenuUI.shared = new GameMenuUI();
            }
            return GameMenuUI.shared;
        }

        public constructor() {
            super();
            this.skinName = "GameMenuUISkins";
            this.once(eui.UIEvent.CREATION_COMPLETE, this.createCompleteEvent, this)
        }

        public createCompleteEvent() {
            ApplicationFacade.getInstance().registerMediator(new GameMenuMediator(this))
        }
    }
}