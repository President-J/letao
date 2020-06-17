$(function () {
  var id = CT.getParamsByUrl().productId;
  getProductData(id, function (data) {
    // 清除加载状态
    console.log(1)
    $('.mui-icon-spinner').remove();
    //渲染商品详情
    $('.mui-scroll').html(template('detail', data));
    //轮播图
    mui('.mui-slider').slider({
      interval: 2000
    });
    //区域滚动
    mui('.mui-scroll-wrapper').scroll({
      indicators: false
    });
    //尺码的选择,tap是封装的，click是原生的

    $('.btn_size').on('tap', function () {
      $(this).addClass('now').siblings().removeClass('now');
    });
    //数量的选择
    $('.p_number span').on('tap', function () {
      var $input = $(this).siblings('input');
      var currNum = $input.val();
      //取值出的是字符串的2和10.相当于2和1比较，所以需要取整
      var maxNum = parseInt($input.attr('data-max'));
      if ($(this).hasClass('jian')) {
        if (currNum == 0) {
          return false;
        }
        currNum--;
        $input.val(currNum)
      } else {
        if (currNum >= maxNum) {
          //击穿事件。同时点击一个，延时处理
          setTimeout(function () {
            mui.toast('库存不足');
          }, 100)

          return false;
        }
        currNum++;
        $input.val(currNum)
      }
    })
    //加入购物车
    $('.btn_addCart').on('tap', function () {
      //数据校验
      var $changeBtn = $('.btn_size.now');
      if (!$changeBtn.length) {
        mui.toast('请选择尺码');
      }
      var num = $('.p_number input').val();
      if (num <= 0) {
        mui.toast('请选择一件商品');
        return false;
      }
      CT.loginAjax({
        url: '/cart/addCart',
        type: 'post',
        data: {
          productId: id,
          num: num,
          size: $changeBtn.html()
        },
        dataType: 'json',
        success: function (data) {
          console.log(data);
          if (data.success == true) {
            var btnArray = ['是', '否'];
            mui.confirm('添加成功，去购物车查看？', '温馨提示', btnArray, function (e) {
              if (e.index == 0) {
                location.href = CT.cartUrl;
              } else {
                info.innerText = 'MUI没有得到你的认可，继续加油'
              }
            })
          }

        }
      })
    });
  })
});
var getProductData = function (productId, callback) {
  $.ajax({
    url: '/product/queryProductDetail',
    type: 'get',
    data: {
      id: productId
    },
    dataType: 'json',
    success: function (data) {
      console.log(data)
      callback && callback(data);
    }
  })
}