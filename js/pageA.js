// 构造函数
function pageA(rootElem){
	 //根元素
	this.$root = rootElem;
	//南瓜马车
	this.$princess = this.$root.find(".lit-princess");


}

/**
 * 运行下一个动画
 * @return {Function} [description]
 */
pageA.prototype.next = function(options) {
    var dfd = $.Deferred();
    // 需要jquery.transit.min.js文件
    this.$princess.transition(options.style, options.time, "linear",function() {
        dfd.resolve()
    });
    return dfd;
}
/**
 * 停止走路
 * @return {[type]} [description]
 */
pageA.prototype.stopWalk = function(){
    this.$princess.removeClass("pumpkin-car")
}


/**
 * 路径
 * @return {[type]} [description]
 */
pageA.prototype.run = function(callback){

    var that = this;
    var next = function() {
        return this.next.apply(this, arguments);
    }.bind(this)

    // 动画1（从右侧飞出到左侧）
    next({
        "time": 10000,
        "style": {
            "top": "4rem",
            "right": "16rem",
            "scale": "1.2"
        }
    })
    // 动画2（Y轴方向快速旋转180deg,转向）
    .then(function() {
       return next({
            "time":500,
            "style": {
               "rotateY" : "-180",
               "scale": "1.5"
            }
        })
    }) 
    // 动画3（从左侧运动到窗户那）
    .then(function(){
        return next({
            "time": 4000,
            "style": {
                "top": "6.4rem",
                "rotateY" : "-180",
                "right": "2rem",
                "scale": "1.5"
            }
        })
    })   
   // 动画4（人停止运动，窗户打开,并在所有动画执行完后回调）
    .then(function(){
        that.stopWalk();
        setTimeout(function(){
             // 动画结束，执行回调函数
            callback && callback();
        },400);
       
    })  

}