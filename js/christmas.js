$(function () {
    Christmas();
});
// 中间调用
var Christmas = function(){

	// 页面容器元素
	var $pageA = $(".page-a");
	var $pageB = $(".page-b");
	var $pageC = $(".page-c");

	// 观察者(事件的分发和订阅)
	var observer = new Observer();

	// A场景页面
	var a = new pageA($pageA);

	// 执行动画之后，回调函数
	a.run(function(){
		observer.publish('completeA');
	})

	// 页面A-B场景切换
	observer.subscribe("completeA",function(){
		changePage($pageA,"effect-out",function(){
			observer.publish("pageB");
		});
	});

	// 进入B场景（订阅消息）
	observer.subscribe("pageB",function(){

		// 执行动画之后，执行回调函数

		var b = new pageB($pageB,function(){

			observer.publish("completeB");
		});
		
	});

	// 页面B-C场景切换
	observer.subscribe("completeB",function(){
		changePage($pageC,"effect-in",function(){
			observer.publish("pageC");
		});
	});
	
	// 进入C场景（订阅消息）
	observer.subscribe("pageC",function(){
		// C场景页面
		new pageC($pageC);
	});
			
}

// 镜头切换效果
// 元素、效果、回调函数
function changePage(element,effect,callback){
	element
	.addClass(effect)
	// 动画结束执行回调函数
	.one("animationend webkitAnimationEnd",function(){
		// 如果有回调执行回调函数
		callback && callback();
	})
}