$(function () {
    var currentPage = 1;
    var pageSize = 5;

    // 一进入页面, 请求第一屏的数据并渲染
    render();
    function render() {
        $.ajax({
            url: '/category/queryTopCategoryPaging',
            type: 'get',
            data: {
                page: currentPage,
                pageSize: pageSize
            },
            dataType: 'json',
            success: function(info) {
                console.log(info);
                // 开始渲染
                $('tbody').html(template('tmp',info));
                // 进行分页
                $('#paginator').bootstrapPaginator({
                    bootstrapMajorVersion: 3,
                    currentPage: currentPage,
                    totalPages: Math.ceil(info.total / info.size),
                    onPageClicked: function(_,_,_,page) {
                        // 记录当前页
                        currentPage = page;
                        // 渲染点击的页面
                        render();
                                                                          
                    }
                });
            }
        })
    }



    // 验证一级分类名称不能位空
    $('#form').bootstrapValidator({

        //1. 指定不校验的类型，默认为[':disabled', ':hidden', ':not(:visible)'],可以不设置
        excluded: [':disabled', ':hidden', ':not(:visible)'],

        //2. 指定校验时的图标显示，默认是bootstrap风格
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        // 验证字段
        fields: {
            // 验证规则
            categoryName: {
                validators: {
                    notEmpty: {
                        message: '一级分类名称不能为空'
                    }
                }
            }
        }
    });


    // 点击提交按钮并且数据验证通过的情况下,向后台发送ajax请求(阻止submit默认行为),提交数据
    $("#form").on('success.form.bv', function (e) {
        e.preventDefault();
        //使用ajax提交逻辑
        $.ajax({
            url: '/category/addTopCategory',
            type: 'post',
            data:$('#form').serialize(),
            dataType: 'json',
            success: function(info) {
                console.log(info);
                // 添加成功 模态框隐藏,页面重新渲染第一页 (可以看到最新的数据),重置表单
                if(info.success) {
                    $('#addModal').modal('hide');
                    currentPage = 1;
                    render();

                    // 重置模态框
                    $('#form').data('bootstrapValidator').resetForm(true);                
                }
            }
        });
    });
})