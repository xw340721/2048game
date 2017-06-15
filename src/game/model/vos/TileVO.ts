module game {
	export class TileVO {
		/**
		 * 行
		 */
		public x:number;

		/**
		 * 列
		 */
		public y:number;

		/**
		 * 数值
		 */
		public value :number;

		/**
		 * 是否已合并
		 */
		public merged:boolean;

		public constructor(){

		}


		public clone():TileVO{
			var tileVO:TileVO = new TileVO();
			tileVO.x = this.x;
			tileVO.y = this.y;
			tileVO.value = this.value;
			// if(this.pre)
			tileVO.merged = this.merged;
			return tileVO;
		}

	}
}