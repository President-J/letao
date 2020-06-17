$(function () {
    //初始化校验插件
    $('#login').bootstrapValidator({
        //配置校验的不同状态下显示的图标
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',//校验成功
            invalid: 'glyphicon glyphicon-remove',//校验失败
            validating: 'glyphicon glyicon-refresh'//正在校验
        },
        //需要配置的表单元素，通过表单元素的name
        fields: {
            // 对应表单元素的name
            username: {
                // 校验规则，多个校验规则
                validators: {
                    notEmpty: {
                        message: '请输入用户名'
                    },
                    callback: {
                        //自定义一个校验规则  
                        message: '用户名不存在'
                    }
                }
                

            },
            password: {
                validators: {
                    notEmpty: {
                        message: '请输入密码'
                    },
                    stringLength: {
                        min: 6,
                        max: 12,
                        message: '用户名长度必须在6-12之间'
                    },
                    callback: {
                        //自定义一个校验规则  
                        message: '密码错误'
                    }
                }
            }
        }
    }).on('success.form.bv', function (e) {
        //组织表单的默认提交
        e.preventDefault();
        //校验成功将密码和用户名提交给后台
        var $form = $(e.target);
        $.ajax({
            type: 'post',
            url: '/employee/employeeLogin',
            data: $form.serialize(),
            dataType: 'json',
            success: function (data) {
                //业务成功
                if (data.success == true) {
                    //跳转到后台首页
                    location.href = '/admin/';
                } else {
                    //业务失败
                    if (data.error == 1000) {
                        //用户名错误 
                        //校验的表单，校验更改状态，使用哪个校验规则
                       
                        $form.data('bootstrapValidator').updateStatus('username', 'INVALID', 'callback')
                      
                    } else if (data.error == 1001) {
                        //密码错误
                        $form.data('bootstrapValidator').updateStatus('password', 'INVALID', 'callback')
                    }
                }
            }
        })
    })
})