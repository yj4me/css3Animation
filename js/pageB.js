function pageB(element, callback) {

    //公主
    var $princess = element.find(".princess");
     //狗狗
    var $dog = element.find(".dog");

    var animationEnd = "animationend webkitAnimationEnd"

    /**
     * 女孩动作
     * @return {[type]} [description]
     */
    var princessAction = {
        //走路
        walk: function() {
            var dfd = $.Deferred();
            $princess.transition({
                "right": "4.5rem"
            }, 4000, "linear", function() {
                dfd.resolve()
            });
            return dfd;
        },
         //停止走路
        stopWalk: function() {
            $princess.removeClass("princess-walk");
            $princess.addClass("princess-stand");
        },
    }

    //开始走路
    princessAction.walk()
        .then(function() {
             //停止走路
            princessAction.stopWalk();
            // 动画结束，执行回调函数
                // callback && callback();
       
        });

         /**
     *狗狗动作
     * @return {[type]} [description]
     */
    var dogAction = {
        //狗狗抬头
        standUp: function() {
            var dfd = $.Deferred();
            setTimeout(function(){
                $dog.addClass("dog-standUp"); 
                 // 必须有这一句才会执行then方法中的语句！！！
                dfd.resolve()        
            },400)
            return dfd;
        },
        //走路
        walk: function(callback) {
            var dfd = $.Deferred();
			//狗狗
            $dog.addClass("dog-walk");
			$dog.transition({
			        "left": "7.0rem"
			}, 4000, "linear", function() {
			        dfd.resolve()
			 })
			 return dfd;
        },
        //停止走路
        stopWalk: function() {
             $dog.addClass("dog-stand")
                 .removeClass("dog-standUp")
                 .removeClass("dog-walk")   
         }  
    }
    dogAction
        .standUp()
        .then(function() {
            return dogAction.walk().then(function(){
				dogAction.stopWalk();
			});
        })

}
