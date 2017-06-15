
var game_file_list = [
    //以下为自动修改，请勿修改
    //----auto game_file_list start----
	"libs/modules/egret/egret.js",
	"libs/modules/egret/egret.native.js",
	"libs/modules/game/game.js",
	"libs/modules/res/res.js",
	"libs/modules/eui/eui.js",
	"libs/modules/tween/tween.js",
	"libs/modules/puremvc/puremvc.js",
	"polyfill/promise.js",
	"bin-debug/game/model/common/Level.js",
	"bin-debug/game/utils/ObjectPool.js",
	"bin-debug/game/ApplicationFacade.js",
	"bin-debug/game/controller/commands/GameCommand.js",
	"bin-debug/game/controller/commands/SceneCommand.js",
	"bin-debug/game/controller/ControllerPrepCommand.js",
	"bin-debug/game/controller/ModelPrepCommand.js",
	"bin-debug/game/controller/StartupCommand.js",
	"bin-debug/game/controller/ViewPrepCommand.js",
	"bin-debug/game/model/common/CommonData.js",
	"bin-debug/AssetAdapter.js",
	"bin-debug/game/model/GameProxy.js",
	"bin-debug/game/model/GridProxy.js",
	"bin-debug/game/model/vos/TileVO.js",
	"bin-debug/game/AppContainer.js",
	"bin-debug/game/view/ApplicationMediator.js",
	"bin-debug/game/view/GameMenuMediator.js",
	"bin-debug/game/view/GameSceneMediator.js",
	"bin-debug/game/view/GameScreenMediator.js",
	"bin-debug/game/view/panel/GameMenuUI.js",
	"bin-debug/game/view/panel/GameScene.js",
	"bin-debug/game/view/panel/GameScreen.js",
	"bin-debug/game/view/panel/StartScreen.js",
	"bin-debug/game/view/panel/TileUI.js",
	"bin-debug/game/view/StartScreenMediator.js",
	"bin-debug/LoadingUI.js",
	"bin-debug/Main.js",
	"bin-debug/ThemeAdapter.js",
	//----auto game_file_list end----
];

var window = this;

egret_native.setSearchPaths([""]);

egret_native.requireFiles = function () {
    for (var key in game_file_list) {
        var src = game_file_list[key];
        require(src);
    }
};

egret_native.egretInit = function () {
    if(egret_native.featureEnable) {
        //控制一些优化方案是否开启
        var result = egret_native.featureEnable({
            
        });
    }
    egret_native.requireFiles();
    //egret.dom为空实现
    egret.dom = {};
    egret.dom.drawAsCanvas = function () {
    };
};

egret_native.egretStart = function () {
    var option = {
        //以下为自动修改，请勿修改
        //----auto option start----
		entryClassName: "Main",
		frameRate: 30,
		scaleMode: "showAll",
		contentWidth: 640,
		contentHeight: 960,
		showPaintRect: false,
		showFPS: false,
		fpsStyles: "x:0,y:0,size:12,textColor:0xffffff,bgAlpha:0.9",
		showLog: false,
		logFilter: "",
		maxTouches: 2,
		textureScaleFactor: 1
		//----auto option end----
    };

    egret.native.NativePlayer.option = option;
    egret.runEgret();
    egret_native.Label.createLabel("/system/fonts/DroidSansFallback.ttf", 20, "", 0);
    egret_native.EGTView.preSetOffScreenBufferEnable(true);
};