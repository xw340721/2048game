// TypeScript file

module game {
    export class GameMenuUI extends eui.Component {
        public label_score: eui.Label;
        public btn_setting: eui.Button;
        public group_pannel: eui.Group;
        public label_high_score: eui.Label;
        public label_level: eui.Label;
        public img_level_icon: eui.Image;

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

        public reset() {
            this.label_score.text = 0 + "";
            this.label_high_score.text = 0 + "";
            this.label_level.text = CommonData.level.toUpperCase();
            this.img_level_icon.texture = RES.getRes("gamemenu_json.level_small_"+CommonData.level);
        }


        public update(data:any):void{
            this.label_score.text = data.totalScore;
            this.label_high_score.text = data.highScore;
        }



        public createCompleteEvent() {
            this.label_high_score = <eui.Label>this.group_pannel.getChildByName("label_high_score");
            this.img_level_icon = <eui.Image>this.group_pannel.getChildByName("img_level_icon");
            this.label_level = <eui.Label>this.group_pannel.getChildByName("label_level");
            ApplicationFacade.getInstance().registerMediator(new GameMenuMediator(this));
        }
    }
}