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

