//后台管理系统公共js文件
$(function () {
    NProgress.configure({ showSpinner: false });
    $(window).ajaxStart(function () {
        //开始进度条
        NProgress.start();
    });
    $(window).ajaxComplete(function () {
        //结束进度条
        NProgress.done();
    });
    //2.侧边栏的显示隐藏 二级菜单的显示隐藏
    $('[data-menu]').on('click', function () {
        //toggle()没有参数是和hide.show一样表示显示和隐藏
        //toggleClass()表示添加或者移除已有样式
        $('.ad_aside').toggle();
        $('.ad_section').toggleClass('menu');
    });
    $('.menu [href="javascript:;"]').on('click', function () {
        //siblings() 方法返回被选元素的所有同级元素。除了自己
        //slideToggle() 方法通过使用滑动效果（高度变化）来切换元素的可见状态。
        $(this).siblings('.child').slideToggle();
    })
    //3.退出功能
    var html = ' <div class="modal fade" id="logoutModal">' +
        '        <div class="modal-dialog modal-sm">' +
        '            <div class="modal-content">' +
        '                <div class="modal-header">' +
        '                    <button type="button" class="close" data-dismiss="modal"><span>&times;</span></button>' +
        '                    <h4 class="modal-title">温馨提示</h4>' +
        '                </div>' +
        '                <div class="modal-body">' +
        '                    <p class="text-danger"><span class="glyphicon glyphicon-info-sign"></span>您确定要退出后台管理系统吗？</p>' +
        '                </div>' +
        '                <div class="modal-footer">' +
        '                    <button type="button" class="btn btn-default" data-dismiss="modal">取消</button>' +
        '                    <button type="button" class="btn btn-primary">确定</button>' +
        '                </div>' +
        '            </div>' +
        '        </div>' +
        '    </div>';
    $('body').append(html);
    $('[data-logout]').on('click', function () {
        var $logoutModal = $('#logoutModal');
        $logoutModal.modal('show').find('.btn-primary').on('click', function () {
            //退出业务
            $.ajax({
                type: 'get',
                url: '/employee/employeeLogout',
                data: '',
                dataType: 'json',
                success: function (data) {
                    if (data.success = true) {
                        $logoutModal.modal('hide');
                        //跳转登录页
                        location.href = '/admin/login.html';
                    }
                }
            })
            $logoutModal.modal('hide');
        })

    })

})