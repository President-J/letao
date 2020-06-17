// 一进入页面,就判断用户是否登录,如果登录了就继续访问,没有登录就跳转到登录页
$.ajax({
    url: '/employee/checkRootLogin',
    dataType: 'json',
    success: function (info) {
        console.log(info);
        if(info.error) {
            // 未登录
            location.href = 'login.html';
        }
        if(info.success) {
            console.log('已登录');
        }
    }
})