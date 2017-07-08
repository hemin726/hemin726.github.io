/*
 * @Author: zhengwei
 * @Date:   2016-11-21 09:31:23
 * @Last Modified by: TinyMark
 * @Last Modified time: 2017-06-25 15:59:09
 */

$(function () {
    //1. 点击菜单的时候, 主页和左侧菜单栏往右移动
    //2. 获取点击菜单的元素
    //3. 添加点击事件
    //4. 把主页往右移动 200px ,同时遮罩层显示
    //5. 左侧菜单栏往右移动 200px
    //6. 点击遮罩层任意位置, 左侧菜单栏往左移动200px
    //7. 主页同时也往左移动200px, 并且遮罩层隐藏


    // 获取点击菜单元素
    var menu = $('.icon-menu');
    // 获取左侧菜单元素
    var leftMenu = $('.left-menu');
    // 获取主页容器元素
    var layout = $('.layout');
    // 获取遮罩层
    var mask = $('.mask');

    // 给菜单添加点击事件
    menu.on('click', function () {
        layout.css("transform", "translateX(200px)");
        mask.addClass("show");
        leftMenu.css("transform", "translateX( 0px)");
    });
    mask.on('click', function () {
        layout.css("transform", "translateX(0px)");
        mask.removeClass("show");
        leftMenu.css("transform", "translateX( -200px)");
    });

    /*  1. 请求轮播图的API
        2. 将请求到的轮播图数据, 给模板去生成html
        3. 把生成好的html 放到 carousel-inner 轮播图每一项的容器里面*/

    getSlide();

    function getSlide() {
        /*1. 请求轮播图API
          2. 发送一个请求
        参数:    url:是请求的API的地址
             success:是请求成功的回调函数
        */

        $.ajax({
            /*1. 发送请求报文并获取响应报文*/

            // url: "http://192.168.112.112:8888/api/getlunbo",
            url: "http://139.199.192.48:9091/api/getlunbo",

            success: function (data) {
                //如果执行了success的回调函数说明请求成功
                console.log(data);
                //将请求回来的数组包到一个对象的list属性身上

                /*2. 渲染数据到页面*/

                //给模板去生成html
                //调用template方法, 第一个参数是 模板的ID, 第二个参数是 数据;
                var html = template('slideTmp', {
                    "list": data
                });
                //把 html 放到carousel-inner的容器中
                // 注意 如果直接替换里面的每一项轮播，可能会出现轮播图看不见
                // 原因是轮播项需要一个active才能显示
                $('.carousel-inner').html(html);

                // 给轮播项的第一项添加一个active类名
                // 获取给轮播项的第一张轮播图，添加一个active类名
                $('.carousel-inner .item').eq(0).addClass('active');
            }
        })
    }

    /*
    1. 实现轮播图的滑动
        a. 当手指从左往右滑动的时候，轮播图要切换到上一张
        b. 当手指从右往左滑动的时候，轮播图要切换到下一张
    
    1 添加滑动事件
    2 获取滑动开始的位置
    3 获取滑动结束的位置
    4 用滑动结束的位置 - 开始的位置 = 滑动的距离 ，有一个正值和负值
    5 通过滑动的距离判断，是 从左往右 还是 从右往左
    6 当手指从左往右滑动的时候，轮播图要切换到上一张
    7 当手指从右往左滑动的时候，轮播图要切换到下一张
    */

    // 获取轮播图容器
    var slide = $('#slide');
    // 给轮播图容器掉添加滑动事件

    // 滑动开始的位置
    var startX = 0;
    // 滑动结束的位置
    var endX = 0;
    slide.on('touchstart', function (e) {
        startX = e.originalEvent.touches[0].clientX;
    });
    slide.on('touchend', function (e) {
        endX = e.originalEvent.changedTouches[0].clientX;
        // console.log(endX);
        //如果 滑动距离是负值, 表示是从右往左滑动
        //如果 滑动距离是正值, 表示是从左往右滑动
        if (endX - startX > 0) {
            //正值 表示从左往右滑动 切换到上一张
            $('.carousel').carousel("prev");
        } else {
            //负值 表示从右往左滑动 切换到下一张
            $('.carousel').carousel("next");
        }
    });

    //1. 当点击tab栏标题的时候要显示标题对应的数据
    //2. 注册点击事件， 给所有的tab栏标题注册点击事件
    //3. 在点击事件里面获取这个标题对应的数据
    //4. 根据标题的对应的type类型， 传入到API里面获取对应的数据
    /*数据类型参数type：传入如下1-4中的任何一个数值来获取不同标签页中的数据
        1：新增连载 
        2：新增完结
        3：推荐连载 
        4：推荐完结
    */
    //5. 将这个数据类型type的值，关联到tab栏标题上
    //6. 当点击某个tab标题的时候获取标题对应的data-type的值
    //7. 请求API同时将这个data-type的值传到API的后面
    //8. 请求完成后，将这个数据绑定到对应的tab栏里面
    //9. 因为tab栏标题对应的tab栏面板，标题和面板是通过a标签的href属性来关联的
    //10. 要拿到标题对应的面板容器，就要获取a标签对应的href属性的值，通过这个值获取这个面板
    //11. 拿到这个面板把 ul 里面的 li 替换成 数据生成好的html模板

    var tabTitle = $('#cartoom > div > .nav-tabs > li > a');
    tabTitle.on('click', function () {
        //原生获取自定义属性的值
        // console.log(this.dataset['type']);

        // jquery的方式获取自定义属性的值
        // console.log($(this).data('type'));

        // attr(); 是jquery获取属性的方式
        // this.getAttribute(); 是原生的获取属性方式
        getCartoonList($(this).data('type'), $(this).attr('href'));
    });


    //获取动漫列表的函数
    getCartoonList(1, "#home");

    function getCartoonList(type, href) {
        $.ajax({

            /*1. 发送请求报文并获取响应报文*/

            // url:"http://192.168.112.112:8888/api/gethometab/" + type,
            url: "http://139.199.192.48:9091/api/gethometab/" + type,
            success: function (data) {
                /*2. 渲染数据到页面*/
                var html = template('cartoonListTmp', {
                    "list": data
                });
                // console.log(html);
                //将模板放到对应的ul里面 
                $(href).html(html);
                $('.tab-content > .tab-pane > ul > li > a > img').lazyload();                
            }
        });
    }

});