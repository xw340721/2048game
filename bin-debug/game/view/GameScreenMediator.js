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
    var GameScreenMediator = (function (_super) {
        __extends(GameScreenMediator, _super);
        function GameScreenMediator(viewComponent) {
            var _this = _super.call(this, GameScreenMediator.NAME, viewComponent) || this;
            /**
             * 上次移动的时间
             */
            _this.lastMoveTile = 0;
            //pc和移动端设置不同的移动策略
            if (egret.MainContext.deviceType != egret.MainContext.DEVICE_MOBILE) {
                var self = _this;
                document.addEventListener("keydown", function (event) {
                    switch (event.keyCode) {
                        case 38:
                            self.doMove(0);
                            break;
                        case 39:
                            self.doMove(1);
                            break;
                        case 40:
                            self.doMove(2);
                            break;
                        case 37:
                            self.doMove(3);
                            break;
                    }
                });
            }
            else {
                _this.gameScene.addEventListener(egret.TouchEvent.TOUCH_BEGIN, _this.mouseDownHandle, _this);
            }
            return _this;
        }
        GameScreenMediator.prototype.mouseDownHandle = function (event) {
            var main = egret.MainContext.instance.stage;
            main.once(egret.TouchEvent.TOUCH_MOVE, this.stage_mouseMoveHandler, this);
            main.once(egret.TouchEvent.TOUCH_END, this.stage_mouseUpHandler, this);
            main.once(egret.TouchEvent.LEAVE_STAGE, this.stage_mouseUpHandler, this);
            this.downPoint = this.gameScene.globalToLocal(event.stageX, event.stageY);
        };
        GameScreenMediator.prototype.stage_mouseMoveHandler = function (event) {
            if (!this.movePoint)
                this.movePoint = new egret.Point();
            //为了优化 没必要每次都算出来
            this.movePoint.x = event.stageX;
            this.movePoint.y = event.stageY;
            if (this.needMove)
                return;
            this.needMove = true;
        };
        GameScreenMediator.prototype.stage_mouseUpHandler = function (event) {
            if (this.needMove) {
                this.updateWhenMouseUp();
                this.needMove = false;
            }
        };
        GameScreenMediator.prototype.updateWhenMouseUp = function () {
            this.gameScene.globalToLocal();
            var p = this.gameScene.globalToLocal(this.movePoint.x, this.movePoint.y);
            var offSetX = p.x - this.downPoint.x;
            var offSetY = p.y - this.downPoint.y;
            if (offSetY < 0 && Math.abs(offSetY) > Math.abs(offSetX)) {
                this.doMove(0);
            }
            else if (offSetX > 0 && offSetX > Math.abs(offSetY)) {
                this.doMove(1);
            }
            else if (offSetY > 0 && offSetY > Math.abs(offSetX)) {
                this.doMove(2);
            }
            else if (offSetX < 0 && Math.abs(offSetX) > Math.abs(offSetY)) {
                this.doMove(3);
            }
        };
        /**
         * @param director  方向 0上 1右 2下 3左
         */
        GameScreenMediator.prototype.doMove = function (director) {
            if (game.CommonData.isRuning && (egret.getTimer() - this.lastMoveTile) >= 150) {
                switch (director) {
                    case 0:
                        this.sendNotification(game.GameCommand.MOVE_TILE, 0); //上
                        break;
                    case 1:
                        this.sendNotification(game.GameCommand.MOVE_TILE, 1); //右
                        break;
                    case 2:
                        this.sendNotification(game.GameCommand.MOVE_TILE, 2); //下
                        break;
                    case 3:
                        this.sendNotification(game.GameCommand.MOVE_TILE, 3); //左
                        break;
                }
            }
            this.lastMoveTile = egret.getTimer();
        };
        Object.defineProperty(GameScreenMediator.prototype, "gameScene", {
            get: function () {
                return (this.viewComponent);
            },
            enumerable: true,
            configurable: true
        });
        return GameScreenMediator;
    }(puremvc.Mediator));
    GameScreenMediator.NAME = "GameScreenMediator";
    game.GameScreenMediator = GameScreenMediator;
    __reflect(GameScreenMediator.prototype, "game.GameScreenMediator", ["puremvc.IMediator", "puremvc.INotifier"]);
})(game || (game = {}));
//# sourceMappingURL=GameScreenMediator.js.map