$(function () {

  $('#submit').on('tap', function () {

    // serialize() 方法创建以标准 URL 编码表示的文本字符串。
    // 它的操作对象是代表表单元素集合的 jQuery 对象。
    //1.get form serialize data,表单必须具有name属性

    var data = $('form').serialize();

    var dataObject = CT.serialize2object(data);

    //校验
    if (!dataObject.username) {
      mui.toast('请输入用户名');
      return false;
    }
    if (!dataObject.password) {
      mui.toast('请输入密码');
      return false;
    }
    $.ajax({
      type: 'post',
      url: '/user/login',
      data: dataObject,
      dataType: 'json',
      success: function (data) {
        //如果有地址，根据地址跳转，如果没有地址，默认跳转到个人中心页
        if (data.success == true) {
          var returnUrl = location.search.replace('?returnUrl=', '');
          if (returnUrl) {
            location.href = returnUrl;

          } else {
            location.href = CT.userUrl;
          }
        }else{
          //业务不成功
          mui.toast(data.message);
        }
      }
    })
  })


})