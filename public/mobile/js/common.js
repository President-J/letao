$(function () {

    // ajax的全局事件函数
    // .ajaxComplete ajax请求完成时触发
    // .ajaxSend ajax请求发送之前触发
    // .ajaxError ajax 请求触发时触发
    // .ajaxSuccess 请求成功时触发
    // .ajaxStart 页面中第一个ajax请求发送时触发
    // .ajaxStop 页面中所有的ajax都完成时触发

    NProgress.configure({showSpinner: false})

    // 实现功能
    // 页面发送第一个请求时,进度条开始动画
    // 页面请求最后一个请求结束时,进度条终止动画

    $(document).ajaxStart(function() {
        NProgress.start();
    });

    $(document).ajaxStop(function() {
        setTimeout(function () {
            NProgress.done();
        },500)
    });

    // 其他页面的公共功能
    // 1. 点击切换  分类菜单
    // 2. 点击切换  侧边栏
    // 3. 点击退出  退出后台管理系统

    // 1.点击切换  分类菜单
    $('.category').click(function() {
        $('.child').slideToggle();
    })


    // 2. 点击菜单按钮 切换侧边栏 (hiddenMenu)
    $('.top-menu').click(function () {
        $('.lt-aside').toggleClass('hiddenMenu');
        $('.lt-main').toggleClass('hiddenMenu');
    })

    // 3. 点击退出  退出后台管理系统

    $('.top-logout').click(function() {
        $.ajax({
            url: '/employee/employeeLogout',
            dataType: 'json',
            success: function(info) {
                console.log(info);
                if(info.success) {
                    // 跳转到登录页
                    location.href = 'login.html';
                }
            }
        })
    });
});