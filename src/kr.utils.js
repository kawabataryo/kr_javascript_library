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

