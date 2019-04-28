// 所有操作都在页面加载后运行
window.onload = function () {
    //   搜索
    search();
    //    轮播图
    banner();
    //    倒计时
    downTime();
};
var search = function () {
//    页面初始化的时候 距离顶部是0的时候，透明度是0
//    当页面滚动的时候，随着页面距离顶部的距离变大，透明度同时变大
//    当滚动的距离超过了轮播图的距离的时候，保持不变
// 获取dom元素
    var search = document.querySelector('.jd_search_box');
    var banner = document.querySelector('.jd_banner');
//    获取轮播图高
    var height = banner.offsetHeight;
    let opacity = 0;

//    监听滚动事件
    window.onscroll = function () {
        //    获取当前页面滚动的距离
        let top = document.body.scrollTop; //谷歌浏览器
        if (top > height) {
            //    当滚动距离超过了轮播图高度后
            opacity = 0.85;
        } else {
            //    轮播图内滚动，透明度变大
            opacity = 0.85 * top / height;
        }
        //    设置盒子颜色
        search.style.background = `rgba(216,80,92,${opacity})`;

    }

};

var banner = function () {
// 1. 无缝滚动和无缝滑动（定时器，过渡位移属性）
//  2. 点盒子对应改变图片（改变当前样式）
//  3. 实现点击滑动效果  （使用touch事件 监听触摸点坐标改变距离 测量位移）
//    4. 手指离开的时候吸附回去或跳到下一张 （过渡位移 判断滑动方向）

//    获取需要操作的dom元素
//    大容器
    var banner = document.querySelector('.jd_banner');
    var width = banner.offsetWidth;
//    图片容器
    var imageBox = document.querySelector('ul:first-child');
//    点容器
    var pointBox = document.querySelector('ul:last-child');
//    获取所有点
    var points = pointBox.querySelectorAll('li');

    // 将冗余的代码提取到一个公用的方法里面
    // 加过渡
    var addTransition = function () {
        imageBox.style.transition = 'all 0.2s';
        imageBox.style.webkitTransition = 'all 0.2s';
    };
    // 清过渡
    var removeTransition = function () {
        imageBox.style.transition = 'none';
        imageBox.style.webkitTransition = 'none';
    };
    // 设置位移
    var setTranslateX = function (translateX) {
        imageBox.style.transform = `translateX(${translateX}px)`; //移动当前屏幕的宽度
        imageBox.style.webkitTransform = `translateX(${translateX}px)`;
    };

//    无缝滚动和滑动
    let index = 1;  //默认显示索引为1的图片，第二张
    let timer = setInterval(function () {
        index++;
        //    给元素加上过渡
        addTransition();
        //  加上位移
        setTranslateX(-index * width);

    }, 3000);
    //   监听过渡结束事件 transitionend animationend
    imageBox.addEventListener('transitionend', function () {
        if (index >= 9) {
            // 瞬间定位到第一张
            index = 1;
            // 在位移之前需要清除过渡，不然还会出现动画
            removeTransition();
            setTranslateX(-index * width);
        } else if (index <= 0) {
            //    实现无缝的滑动
            index = 8;
            removeTransition();
            setTranslateX(-index * width);
        }
        //    index取值范围为1-8，对应点0-7
        setPoint();
    });

    // 实现点对点功能
    var setPoint = function () {
        //    去除所有的now样式
        points.forEach(item => {
            item.classList.remove('now');
        });
        //    给对应的加上
        points[index - 1].classList.add('now')
    };
//    实现滑动功能

    var startX = 0;  //用来记录开始的X坐标
    var distantX = 0;
    // 为了严谨起见，需要设定一个判断是非移动过
    var isMove = false;

    imageBox.addEventListener('touchstart', function (e) {
        //    清除定时器
        clearInterval(timer);
        //    记录开始的位移
        startX = e.touches[0].clientX;
    });
    imageBox.addEventListener('touchmove', function (e) {
        var moveX = e.touches[0].clientX;
        distantX = moveX - startX;
        //    大于0时向右滑动

        //    基于当前的位置来进行滑动的动画
        var translateX = -index * width + distantX; //计算出将要定位到的位置（即手指移动到的位置）
        //    要取消自动过渡
        removeTransition();
        setTranslateX(translateX);
        isMove = true;
    });
    imageBox.addEventListener('touchend', function (e) {
        //    滑动事件结束之后，来判断滑动的距离
        //    设定一个大于三分之一就切换，反之吸附回原位置
        if (isMove) {
            if (Math.abs(distantX) < width / 3) {
                //    吸附回去
                //    设置过渡，设置位移
                addTransition();
                setTranslateX(-index * width);
            } else {
                //    移动
                if (distantX > 0) {
                    //    向右滑
                    index--;
                } else {
                    //    向左滑
                    index++
                }
                addTransition();
                setTranslateX(-index * width);
            }
        }
        //    触摸结束之后要重新加上计时器,加之前再清除一次，保障只加一次
        clearInterval(timer);
        timer = setInterval(function () {
            index++;
            //    给元素加上过渡
            addTransition();
            //  加上位移
            setTranslateX(-index * width);
        }, 3000);
        //    重置所有参数
        startX = 0;
        distantX = 0;
        isMove = false;
    });
};

var downTime = function () {
//    模拟倒计时的事件
//    利用定时器，一秒一次重新渲染时间框
    var time = 11 * 60 * 60;
    var skTime = document.querySelector('.sk_time');
    var spans = skTime.querySelectorAll('span');
    var timer = setInterval(function () {
        time--;
        //    格式化时间
        var h = Math.floor(time / 3600); //向下取整
        var m = Math.floor(time % 3600 / 60);
        var s = time % 60;
        //    设置时间
        spans[0].innerHTML = Math.floor(h / 10);
        spans[1].innerHTML = h % 10;

        spans[3].innerHTML = Math.floor(m / 10);
        spans[4].innerHTML = m % 10;

        spans[6].innerHTML = Math.floor(s / 10);
        spans[7].innerHTML = s % 10;

        if (time <= 0) {
            clearInterval(timer);
        }
    }, 1000)
};