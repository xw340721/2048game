module game {
	export class ObjectPool {
		private static pool:Object={};
		private className:string;
		private list:Array<any>;
		public constructor(className:string) {
			this.className = className;
			this.list = [];
		}

		public borrowObj():any{
			if(this.list.length>0){
				return this.list.shift();
			}
			var clazz:any = egret.getDefinitionByName(this.className);
			return new clazz();
		}

		public returnObj(value:any):void{
			this.list.push(value);
		}

		public static getPool(className:string):ObjectPool{
			if(!ObjectPool.pool[className]){
				//通过static 创建多个自己
				ObjectPool.pool[className] = new ObjectPool(className);
			}
			return ObjectPool.pool[className];
		}
	}
}