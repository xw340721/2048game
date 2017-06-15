module game {
	export class TileUI extends egret.Bitmap {
		public location:any;
		private _value:number;


		public constructor() {
			super()
			this.location = {x:0,y:0};
		}

		public get value():number{
			return this._value;
		}

		public set value(value:number){
			if(value==this._value){
				return;
			}
			this._value = value;
			this.updateValue();
		}

		private updateValue():void{
			var mi:number = Math.log(this._value)/Math.log(2);
			this.texture = RES.getRes("tile_json.tile_"+mi);
		}

		public playScale(merged:boolean = false):void{
			//todo 理解
			if(!merged){
				this.scaleX = this.scaleY = 0.1;
				egret.Tween.get(this).to({
					scaleX:1,
					scaleY:1
				},100);
			}else{
				var self:TileUI = this;
				var fun:Function = function(){
					egret.Tween.get(self).to({
						scaleX:1,
						scaleY:1
					})
				}
				this.scaleX = this.scaleY = 1;
				egret.Tween.get(self).to({
					scaleX:1.3,
					scaleY:1.3
				}).call(fun);
			}
		}

		/**
		 * 移动格子
		 */
		public playMove(xTo:number,yTo:number){
			var self :TileUI = this;
			egret.Tween.get(self).to({
				x:xTo,
				y:yTo
			})
		}

	}
}