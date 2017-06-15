// TypeScript file
var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var game;
(function (game) {
    var ApplicationFacade = (function (_super) {
        __extends(ApplicationFacade, _super);
        function ApplicationFacade() {
            return _super.call(this) || this;
        }
        ApplicationFacade.getInstance = function () {
            if (this.instance == null)
                this.instance = new ApplicationFacade();
            return (this.instance);
        };
        ApplicationFacade.prototype.initializeController = function () {
            _super.prototype.initializeController.call(this);
            this.registerCommand(ApplicationFacade.STARTUP, game.StartupCommand);
        };
        ApplicationFacade.prototype.startUp = function (view) {
            this.sendNotification(ApplicationFacade.STARTUP, view);
            this.removeCommand(ApplicationFacade.STARTUP);
        };
        return ApplicationFacade;
    }(puremvc.Facade));
    ApplicationFacade.STARTUP = "startup";
    game.ApplicationFacade = ApplicationFacade;
    __reflect(ApplicationFacade.prototype, "game.ApplicationFacade", ["puremvc.IFacade", "puremvc.INotifier"]);
})(game || (game = {}));
//# sourceMappingURL=ApplicationFacade.js.map