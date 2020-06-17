
$(function () {
  // 1.页面初始化的时候，关键字在输入框内显示
  //获取关键字

  var urlParams = CT.getParamsByUrl();
  var $input = $('input').val(urlParams.key || '');
  //2.页面初始化的时候，根据关键字查询第一页数据4条

  //3.用户点击搜索的时候，根据新的关键字搜索商品，重置排序功能
  $('.ct_search a').on('tap', function () {
    var key = $.trim($input.val());
    if (!key) {
      mui.toast('请输入关键字');
      console.log(123)
      return false;
    }
  })
  //4.点击排序的时候，根据排序的选项去进行排序（默认降序，再次点击升序）
  $('.ct_order a').on('tap', function () {
    var $this = $(this);
    //改变当前样式
    if (!$this.hasClass('now')) {
      $this.addClass('now').siblings().removeClass('now')
        .find('span').removeClass('fa-angle-up').addClass('fa-angle-down');
    } else {
      if ($this.find('span').hasClass('fa-angle-down')) {
        $this.find('span').removeClass('fa-angle-down').addClass('fa-angle-up');
      } else {
        $this.find('span').removeClass('fa-angle-up').addClass('fa-angle-down');
      }
    }
    //获取当前点击的排序参数 price1 2  num 1 2(只做了价格和销量)
    var order = $this.attr('data-order');
    var orderVal = $this.find('span').hasClass('fa-angle-up') ? 1 : 2;
    var key = $.trim($input.val());
    if (!key) {
      mui.toast('请输入关键字');
      console.log(123)
      return false;
    }
    //获取数据
    var params = {
      proName: key,
      page: 1,
      pageSize: 4
    };
    params[order] = orderVal;
    getSearchData(params, function (data) {
      //渲染数据
      $('.ct_product').html(template('list', data));
    })

  });
  //5.用户下拉的时候，根据当前条件刷新
  mui.init({
    pullRefresh: {
      container: "#refreshContainer",//下拉刷新容器标识，querySelector能定位的css选择器均可，比如：id、.class等
      down: {
        //自动加载
        auto: true,
        //必选，刷新函数，根据具体业务来编写，比如通过ajax从服务器获取新数据；
        callback: function (data) {
          //that相当于组件对象
          var that = this;
          var key = $.trim($input.val());
          if (!key) {
            mui.toast('请输入关键字');
            console.log(123)
            return false;
          }
          //渲染数据
          var params = {
            proName: key,
            page: 1,
            pageSize: 4
          };
          //  排序功能也重置
          $('.ct_order a').removeClass('now').find('span').removeClass('fa-angle-up')
            .addClass('fa-angle-down');
          getSearchData(params, function (data) {
            setTimeout(function () {
              //渲染数据
              $('.ct_product').append(template('list', data));
              //停止下拉刷新
              // mui('#refreshContainer').pullRefresh().endPulldown();该方法有问题
              that.endPulldownToRefresh();
              that.refresh(true);
            }, 1000)
          })

        }
      },
      // 上拉加载
      up: {
        height: 50,//可选.默认50.触发上拉加载拖动距离
        auto: true,//可选,默认false.自动上拉加载一次
        contentrefresh: "正在加载...",//可选，正在加载状态时，上拉加载控件上显示的标题内容
        contentnomore: '没有更多数据了',//可选，请求完毕若没有更多数据时显示的提醒内容；
        callback: function () {
          window.page++;
          var that = this;
          var key = $.trim($input.val());
          if (!key) {
            mui.toast('请输入关键字');
            console.log(123)
            return false;
          }
          //获取当前点击的排序参数 price1 2  num 1 2(只做了价格和销量)
          var order = $('.ct_order a.now').attr('data-order');
          var orderVal = $('.ct_order a.now').find('span').hasClass('fa-angle-up') ? 1 : 2;
          //渲染数据
          var params = {
            proName: key,
            page: window.page,
            pageSize: 4
          };
          params[order] = orderVal;
          getSearchData(params, function (data) {
            setTimeout(function () {
              //渲染数据
              $('.ct_product').append(template('list', data));
              //停止下拉刷新
              if (data.data.length) {
                that.endPullupToRefresh()
              } else {
                //没有更多数据了，传true,默认false
                that.endPullupToRefresh(true)
              }

            }, 1000)
          })
        } //必选，刷新函数，根据具体业务来编写，比如通过ajax从服务器获取新数据；
      }
    }
  });
  //6.用户上拉的时候，加载下一页（没有数据不去加载）

});
var getSearchData = function (params, callback) {
  $.ajax({
    url: '/product/queryProduct',
    type: 'get',
    data: params,
    dataType: 'json',
    success: function (data) {
      window.page = data.page;
      callback && callback(data);
     
    }
  })

}