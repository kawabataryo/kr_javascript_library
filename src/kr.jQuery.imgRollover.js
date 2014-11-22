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

