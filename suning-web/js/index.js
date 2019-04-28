$(function () {
//    入口函数
//    轮播图
    banner();
});
// 无缝滚动 点对应改变 手势切换
var banner = function () {
//    获取需要操作的元素
//    大容器
    var $banner = $('.sn_banner');
    var width = $banner.width();
//    图片容器
    var $image = $banner.find('ul:first');
//    点盒子
    var $point = $banner.find('ul:eq(1)');
//    所有的点
    var $points = $point.find('li');

    var animateFun = function () {
        $image.animate({'transform': `translateX(${-index * width}px)`}, 200, 'linear', function () {
            //    判断索引来进行无缝滚动
            if (index >= 9) {
                index = 1;
                $image.css({'transform': `translateX(${-index * width}px)`});
            } else if (index <= 0) {
                index = 8;
                $image.css({'transform': `translateX(${-index * width}px)`});
            }
            $points.removeClass('now').eq(index - 1).addClass('now');
        })
    };
// 实现轮播功能
    var index = 1;
    var timer = setInterval(function () {
        index++;
        //四个参数
        // 需要改变的属性 执行的时间 执行的速度 完成后的回调
        animateFun();
        //    点对应改变

    }, 5000);

//    实现手势切换
    $banner.on('swipeRight', function () {
        index--;
        // 动画切换
        animateFun();
    });
    $banner.on('swipeLeft', function () {
        index++;
        animateFun();
    })
};