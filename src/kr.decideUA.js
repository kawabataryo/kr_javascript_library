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

