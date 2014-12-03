;(function(ns){

	/**
	 * 要素の縦の位置を取得する
	 * @param {Array} idAry          位置を取得したい要素のID名を配列で ※必須
	 * @param {Number} adjust 位置を調整 [初期値=0]
	 *
	 * 取得したデータの呼び出し [インスタンス名].hashTalbe;
	 */
	ns.GetElementsOffsetTop = function(idAry,adjust){
		this.idAry = idAry;
		this.len = this.idAry.length;
		this.adjust = adjust || 0;
		this.hashTable = this.generateObj();
	}

	ns.GetElementsOffsetTop.prototype = {

		generateObj: function(){
			var hashObj = {};
			for(var i = 0; i < this.len; i++){
				hashObj[this.idAry[i]] = this.getOffsetTop(i) + this.adjust;
			}
			return hashObj;
		},

		getOffsetTop: function(i){
			var el = document.getElementById(this.idAry[i]);
			if(el){
				return el.offsetTop;
			}
		}
	}

})(kr);

