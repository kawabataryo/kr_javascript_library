/**
 * kr JavaScript Library
 * MIT license
 * https://github.com/kawabataryo/kr_javascript_library
 *
 * @namespace kr
 */
var kr = kr || {};
kr.ImgRollover = {};


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


;(function($, ns){

	/**
	 * スムーズスクロール
	 * @param {String} el     対象のセレクター ※必須
	 * @param {Number} sub    スクロール位置を調整 [初期値=0]
	 * @param {Number} time   スクロールするスピード [初期値=200]
	 * @param {String} easing イージング [初期値='swing']
	 */
	ns.PageScroll = function(el, sub, time, easing){
		this.$el = $(el);
		this.sub = sub || 0;
		this.time = time || 200;
		this.easing = easing || 'swing';
		this.event();
	}

	ns.PageScroll.prototype = {

		event: function(){
			var that = this;
			this.$el.on('click', function(e){
				e.preventDefault();
				that.animation(this);
			});
		},

		animation: function(self){
			var $html = $('html,body');
			$html.animate({
				scrollTop: this.getPosition(self) - this.sub
			}, this.time, this.easing);
		},

		getPosition: function(self){
			var target = $(self).attr('href');
			return $(target).offset().top;
		}

	}
})(jQuery, kr);


/**
 * 画像ロールオーバー
 * @param {String} el     セレクター
 * @param {String} suffix 接尾語
 * @param {Number time    フェード時間
 */
;(function($,ns){

	/**
	 * 共通の処理を管理
	 */
	ns.Utils = function(el,suffix,time){
		this.el = el || '.imgOver';
		this.suffix = suffix || '_o';
		if(time === undefined){
			this.time = 200;
		}else{
			this.time = time;
		}
	}


	ns.Utils.prototype = {

		getSrc: function($self){
			return $self.attr('src');
		},

		addSuffix: function($self){
			return this.getSrc($self).replace(/^(.+)(\.[a-z]+)$/, '$1' + this.suffix + '$2');
		},

		removeSuffix: function($self){
			return this.getSrc($self).replace(this.suffix,'');
		}

	}

	/**
	 * 通常のロールオーバー機能
	 */
	ns.Default = function(el,suffix){
		this.utils = new ns.Utils(el,suffix);
		this.el = $(this.utils.el);
		this.preload();
		this.event();
	}

	ns.Default.prototype = {

		event: function(){
			var that = this;
			that.el.on({
				mouseover: function(){
					var $self = $(this);
					$self.attr('src', that.utils.addSuffix($self));
				},
				mouseleave: function(){
					var $self = $(this);
					$self.attr('src', that.utils.removeSuffix($self));
				}
			});
		},

		preload: function(){
			var that = this;
			that.el.each(function(){
				var $self = $(this);
				$('<img />').attr('src',that.utils.addSuffix($self));
			});
		}

	}

	/**
	 * フェード付きのロールオーバー機能
	 */
	ns.Fade = function(el,suffix,time){
		this.utils = new ns.Utils(el,suffix,time);
		this.el = $(this.utils.el);
		this.time = this.utils.time;
		this.setting();
		this.event();
	}

	ns.Fade.prototype = {

		event: function(){
			var that = this;
			that.el.on({
				mouseover: function(){
					$(this).stop().fadeTo(that.time, 0);
				},
				mouseleave: function(){
					$(this).stop().fadeTo(that.time, 1);
				}
			});
		},

		setting: function(){
			var that = this;
			that.el.each(function(){
				var $self = $(this);
				var $parent = $self.parent();
				var $overImg = that.cloneImg($self);
				that.setOverImg($parent, $overImg);
				that.setParentStyle($parent);
				that.setImgStyle($self, 'absolute', 20);
				that.setImgStyle($overImg, 'relative', 10);
			});
		},

		cloneImg: function($self){
			return $self.clone().attr('src', this.utils.addSuffix($self));
		},

		setOverImg: function($parent, $overImg){
			$parent.append($overImg)
		},

		setParentStyle: function($parent){
			$parent.css({
				'position': 'relative',
				'display': 'block'
			});
		},

		setImgStyle: function($el,position,z){
			$el.css({
				'position': position,
				'zIndex': z,
				'top': 0,
				'left': 0
			});
		}

	}

})(jQuery, kr.ImgRollover);

