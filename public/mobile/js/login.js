
//入口函数 
$(function () {
    // 表单验证
    // 1. 用户名不能为空
    // 2. 用户名长度2-6
    // 3. 用户密码不能为空
    // 4. 用户密码长度为6-12位
    //bootstrapValidator提交给表单验证方法
    $('#form').bootstrapValidator({

        //1-指定校验时的图标显示，默认是bootstrap风格
        //valid: 验证通过 
        //invalid :验证失败
        //validating： 验证中
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },

        // 实现验证的逻辑
        // 2-要被验证字段（数据）
        fields: {
            //对应表单的name属性            
            username: {
                //用户名对应的验证规则
                validators: {
                    // 非空
                    notEmpty: {
                       message: '用户名不能为空哦！'
                    },
                    // 长度限制
                    stringLength: {
                        min: 2,
                        max: 6,
                        message: '长度必须是2-6位哦！'
                    },
                    //配置给回调使用验证规则
                    callback: {
                        message: '用户名不存在！'
                    }
               } 
            },
            password: {
                validators: {
                    notEmpty: {
                        message: '密码不能为空！'
                    },
                    stringLength: {
                        min: 6,
                        max: 12,
                        message: '长度必须为6-12位！'
                    },
                    callback: {
                        message: '密码错误'
                    }
                }
            }
        }
    });

    //当用户数据验证通过后，向后台发送ajax请求，验证用户名密码是否正确
    // bootstrapValidator插件 在我们点击submit按钮是，会对表单进行验证，如果验证成会触发 success.form.bv 表单验证成功的事件；
    $('#form').on('success.form.bv', function (e) {
        //阻止submit的默认行为
        e.preventDefault();
        console.log('我只执行了');        
        //向后台发送ajax请求， 验证用户名和密码是否正确
        //表单序列化： $('#form').serialize()  本质：将表单name和value属性的进行了拼接
        $.ajax({
            type: 'post',
            url: '/employee/employeeLogin',
            data: $('#form').serialize(),
            dataType: 'json',
            success: function (info) {
                console.log(info);    
                //判断用户登录结果
                // 5- 如果后台返回的是登录失败，对应的数据状态应该有验证通过，变成验证失败；	 
                //  updateStatus(field, status, validatorName)
                // 参数一： 要更新的字段
                // 参数二： 要改变的状态
                // 参数三： 提示那个验证功能信息

                // NOT_VALIDATED：未校验的
                // VALIDATING：校验中的
                // INVALID ：校验失败的
                // VALID：校验成功的。
                if (info.error == 1000) {
                    $('#form').data('bootstrapValidator').updateStatus('username', 'INVALID', 'callback');
                }

                if (info.error == 1001) {
                    $('#form').data('bootstrapValidator').updateStatus('password', 'INVALID', 'callback');
                }

                if (info.success) {
                    location.href = 'index.html';
                }
            }
        })
    });


    // 重置表单功能
    $('.btn-reset').click(function () {
        //reset按钮的默认行为是重置表单内容
        $('#form').data('bootstrapValidator').resetForm();  //重置表单的验证效果 图标 样式 会重置
    });
});