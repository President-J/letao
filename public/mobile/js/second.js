$(function() {
    var currentPage = 1;
    var pageSize = 5;

    // 进入页面,请求第一屏的数据并渲染
    render();
    function render() {
        $.ajax({
            url:'/category/querySecondCategoryPaging',
            type: 'get',
            data: {
                page:currentPage,
                pageSize: pageSize
            },
            dataType: 'json',
            success: function(info) {
                console.log(info);
                // 开始渲染
                $('tbody').html(template('tmp',info));
                // 进行分页
                $("#pagintor").bootstrapPaginator({
                    bootstrapMajorVersion:3,//默认是2，如果是bootstrap3版本，这个参数必填
                    currentPage:currentPage,//当前页
                    totalPages:Math.ceil(info.total/info.size),//总页数
                    onPageClicked:function(_, _, _,page){
                        //为按钮绑定点击事件 page:当前点击的按钮值
                        currentPage = page;
                        // 重新渲染
                        render();
                    }
              
              });
            }
        })
    }




    // 验证一级分类名称不能为空
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
            categoryName: {
                validators: {
                    notEmpty: {
                        message: '一级分类名称不能为空'
                    }
                }
            }
        }

    });

    // 点击提交按钮并且数据验证通过的情况下,向后台发送ajax请求(阻止sublime默认行为),提交数据
    $("#form").on('success.form.bv', function (e) {
        e.preventDefault();
        //使用ajax提交逻辑
        $.ajax({
            url:'/category/addSecondCategoryPic',
            type:'post',
            data: {
                page:1,
                pageSize: 1000
            },
            dataType: 'json',
            success: function(info) {
                console.log(info);
                // 渲染列表
                $('.cate-list').html(template('tmp-cate'.info));
            }
        });

        // 点击下拉列表,显示选中结果
        $('.cate-list').on('click','a',function() {
            // 获取当前a标签的id和文本
            $('.cate-text').text($(this).text());
            $('.categoryId').val($(this).data('id'));

            // 将校验结果改为校验成功
            $('#form').data('bootsrapValidator').updateStatus('categoryId','VALID');
        });

        // 上传二级分类照片
        $("#fileupload").fileupload({
            dataType:"json",
            //e：事件对象
            //data：图片上传后的对象，通过data.result.picAddr可以获取上传后的图片地址
            done:function (e, data) {
              console.log(data);
            }
      });
    });
})