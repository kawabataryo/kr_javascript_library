/**
 * kr JavaScript Library
 * MIT license
 * https://github.com/kawabataryo/kr_javascript_library
 *
 * @namespace kr
 */
var kr = kr || {};


;(function(){

	/**
	 * ユーティリティ関数群
	 * kr.utils.[関数名]の形でアクセス
	 */
	kr.utils = {

		/**
		 * ページ内に指定した要素があるか判定する
		 * @param  {String}  selector セレクター
		 * @return {Boolean}
		 */
		hasElement: function (selector){
			var el = document.querySelector(selector);
			if(el !== null){
				return true;
			}
			return false;
		},

		/**
		 * 指定した要素のクラスを取得する
		 * @param  {String} selector
		 * @return {String}
		 */
		getElementClass: function(selector) {
			var el = document.querySelector(selector);
			if(el !== null){
				return el.className;
			}
		},

		/**
		 * 指定した要素のIDを取得する
		 * @param  {String} selector
		 * @return {String}
		 */
		getElementId: function(selector) {
			var el = document.querySelector(selector);
			if(el !== null){
				return el.id;
			}
		},

		/**
		 * URLを取得
		 * @return {string}
		 */
		getRootURL: function() {
			return location.protocol + "//" + location.host;
		},

		/**
		 * ページのURLを取得
		 * @return {string}
		 */
		getCurrentURL: function() {
			return this.getRootURlL + location.pathname;
		},

		/**
		 * プロトタイプを継承
		 * @param  {Function} ctor      サブクラスのコンストラクタ関数
		 * @param  {Function} superCtor スーパークラスのコンストラクタ関数
		 */
		inherits: function(ctor, superCtor) {
			ctor.super_ = superCtor;
			ctor.prototype = Object.create(superCtor.prototype, {
				constructor: {
					value: ctor,
					enumerable: false,
					writable: true,
					configurable: true
				}
			});
		}

	}

})();


;(function(ns){

	/**
	 * ユーザーエージェントを判定
	 */
	ns.DecideUA =  function(){
		this.name = window.navigator.userAgent.toLowerCase();
	}

	ns.DecideUA.prototype = {

		/**
		 * @param  {Strihg} str 判定するデバイスの文字列
		 * @return {Boolean}
		 */
		match: function(str){
			return (this.name.indexOf(str) !== -1);
		}

	}

})(kr);


(function(ns){

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
		this.adjustPosition = adjustPosition || 0;
		this.hashTable = this.generateObj();
	}

	ns.GetElementsOffsetTop.prototype = {

		generateObj: function(){
			var hashObj = {};
			for(var i = 0; i < this.len; i++){
				hashObj[this.idAry[i]] = this.getXPosition(i) + this.adjust;
			}
			return hashObj;
		},

		getPosition: function(i){
			var el = document.getElementById(this.idAry[i]);
			if(el){
				return el.offsetTop;
			}
		}

	}

})(kr);

