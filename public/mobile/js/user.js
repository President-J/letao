$(function () {

    var currentPage = 1;
    var pageSize = 5;
    var isDelet;
    var id;

    render();
    function render() {
        // 1. 页面加载后,在页面渲染第一屏用户数据
        $.ajax({
            url: '/user/queryUser',
            type: 'get',
            data: {
                page: currentPage,
                pageSize: pageSize
            },
            dataType: 'json',
            success: function (info) {
                console.log(info);
                // template 接受的数据必须是对象,在模板中使用的属性名
                $('tbody').html(template('tmp',info));

                // 分页: 根据后台数据总数,每页数据条数,推算出页码的个数 
                $('#paginator').bootstrapPaginator({
                    bootstrapMajorVersion:3,//默认是2，如果是bootstrap3版本，这个参数必填
                    currentPage:currentPage,//当前页
                    totalPages:Math.ceil(info.total/info.size),//总页数
                    onPageClicked:function(_, _, _,page){
                    //为按钮绑定点击事件 page:当前点击的按钮值
                    currentPage = page;
                    render();
                    }
                });
            }
        })
    }

    // 点击按钮,显示模态框,记录当前用户id
    // 动态生成的用户,使用事件委托
    $('tbody').on('click','.btn-user',function() {
        // 显示模态框
        $('#addModal').modal('show');
        id = $(this).parent().data('id');
        console.log(id);
        // 记录用户是要禁用还是启用, 通过按钮的颜色判断 1 启用  0  禁用
        isDelet = $(this).hasClass('btn-success') ? 1 : 0;
    });

    // 点击模态框的确定按钮,去操作对应id的数据
    $('.btn-ok').click(function() {
        // 操作对应id的数据,进行禁用或启用
        $.ajax({
            url: '/user/updateUser',
            type: 'post',
            data: {
                id: id,
                isDelete: isDelet
            },
            dataType: 'json',
            success: function(info) {
                console.log(info);
                if(info.success) {
                    // 隐藏模态框
                    $('#addModal').modal('hide');
                    // 重新渲染页面
                    render();
                }
            }
        })
    });

})