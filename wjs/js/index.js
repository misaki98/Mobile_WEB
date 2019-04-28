$(function () {
    // 文档加载完成后再执行
    banner();
    initTab();
    //初始化页面上的工具提示
    $('[data-toggle="tooltip"]').tooltip();
});
// 完成轮播图根据页面大小动态加载
var banner = function () {
//    需求分析：
//    准备数据（从后台获取）
//    判断当前设备（是否为移动端）768px
//    根据设备去动态渲染html
//    监听页面尺寸改变重新渲染
//    移动端手势切换功能

//    获取DOM元素(轮播图，点容器，图片容器，窗口对象)
    var $banner = $('.carousel');
    var $point = $banner.find('.carousel-indicators');
    var $image = $banner.find('.carousel-inner');
    var $window = $(window);
    // 模拟图片数据
    var data = [
        {
            pcSrc: 'images/slide_01_2000x410.jpg',
            mSrc: 'images/slide_01_640x340.jpg'
        },
        {
            pcSrc: 'images/slide_02_2000x410.jpg',
            mSrc: 'images/slide_02_640x340.jpg'
        },
        {
            pcSrc: 'images/slide_03_2000x410.jpg',
            mSrc: 'images/slide_03_640x340.jpg'
        },
        {
            pcSrc: 'images/slide_04_2000x410.jpg',
            mSrc: 'images/slide_04_640x340.jpg'
        }
    ];
    var render = function () {
        var isMobile = $window.width() < 768;

        var pointHtml = '';

        var imgHtml = '';

        //    根据数据来拼接
        $.each(data, function (index, item) {
            //点内容的拼接
            pointHtml += `<li data-target="#carousel-example-generic" data-slide-to="${index}" class="${index === 0 ? 'active' : ''}"></li>\n`
            //    图片内容的拼接
            imgHtml += `<div class="item ${index === 0 ? 'active' : ''}">`;
            if (isMobile) {
                imgHtml += `<a class="m_imgBox" href = "#" ><img src="${item.mSrc}" alt = "${index}" />`
            } else {
                imgHtml += `<a href="#" class="pc_imgBox" style="background-image:url(${item.pcSrc});"></a>`
            }
            imgHtml += `</a></div>`
        });
        $point.html(pointHtml);
        $image.html(imgHtml);
    };

//    在更改屏幕大小时动态渲染
    $window.on('resize', function () {
        render();
    }).trigger('resize');
//    trigger主动触发事件

//    移动端绑定手势事件 左右滑动
    var startX = 0;
    var distanceX = 0;
    var isMove = false;
    $banner.on('touchstart', function (e) {
        startX = e.originalEvent.touches[0].clientX;
    }).on('touchmove', function (e) {
        var moveX = e.originalEvent.touches[0].clientX;
        distanceX = moveX - startX;
        isMove = true;
    }).on('touchend', function (e) {
        if (Math.abs(distanceX) >= 50 && isMove) {
            if (distanceX > 0) {
                //    右滑 上一张
                $banner.carousel('prev')
            } else {
                $banner.carousel('next')
            }
        }

        startX = 0;
        distanceX = 0;
        isMove = false;
    })
};
var initTab = function () {
//    把所有的页签在一行显示  设置父容器宽度为所有子容器宽度之和
//    满足区域滚动的Html结构要求  大容器包含小容器
//    实现滑动功能  使用插件 iscroll

    let tabs = $('.wjs_product .nav-tabs'); //定位到父容器
    // 找到所有的子容器  获取得到的是Html代码
    let liList = tabs.find('li');
    // 计算宽度之和
    // innerWidth 获取内容和内边距的宽度
    // outerWidth 获取内容内边距和边框的宽度
    // outerWidth（true） 获取内容内边距和边框和外边距的宽度
    var width = 0;
    $.each(liList,function (index, item) {
        width += $(item).outerWidth(true);
    });
    tabs.width(width);

    new IScroll('.nav-tabs-parent',{
        scrollX:true,
        scrollY:false
    });
};