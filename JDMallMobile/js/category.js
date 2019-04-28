window.onload = function () {
//    左侧滑动
    leftSwipe();
//    右侧滑动
    rightSwipe();
};
var leftSwipe = function () {
//实现上下的滑动
//    结合touch相关事件和位移
    var parentBox = document.querySelector('.cate_left');

    var childBox = parentBox.querySelector('ul');

    var startY = 0;
    var distanceY = 0;

    //程序的核心点
    var currentY = 0;

    childBox.addEventListener('touchstart', function (e) {
        startY = e.touches[0].clientY;
    });
    childBox.addEventListener('touchmove', function (e) {
        var moveY = e.touches[0].clientY;
        distanceY = moveY - startY;

        var translateY = currentY + distanceY;  //将要定位到的位置
        childBox.style.transform = `translateY(${translateY}px)`;
        childBox.style.webkitTransform = `translateY(${translateY}px)`;
    });
    childBox.addEventListener('touchend', function () {
        currentY += distanceY;  //把移动后的位置记录下来
    });

};
var rightSwipe = function () {

};