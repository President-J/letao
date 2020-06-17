$(function () {
  
 //初始化上下拉
  mui.init({
   pullRefresh: { container: "#refreshContainer",
    down: {
      auto: true,
      callback: function () {
        var that = this;
        setTimeout(function () {
          getCartData(function (data) {
            
            //渲染页面
            $('.mui-table-view').html(template('cart', data));
            //加载状态隐藏
            that.endPulldownToRefresh();
          })

        }, 1000);
      }
    }
   }
  });
  //侧滑的时候。点击编辑，弹出对话框，确认框
  $('.mui-table-view').on('tap','.mui-icon-compose',function(){
    //把静态渲染内容拿出来
    //confirm在使用字符串作为内容的时候/n会自动加上<br>,\t默认空格
    //获取当前按钮对应的商品数据，根据id去缓存区取
    var id = $(this).parent().attr('data-id');
    var item = CT.getItemById(window.cartData.data,id);
    var html = template('edit',item);
    console.log(item)
    mui.confirm(html.replace(/\n/g,''),'商品编辑',['确认','取消'],function(e){
     if(e.index==0){
        //发送请求
        var size = $('.btn_size.now').html();
        var num =$('.p_number input').val();
        CT.loginAjax({
          type:'post',
          url:'/cart/updateCart',
          data:{
            id:id,
            size:size,
            num:num
          },
          dataType:'json',
          success:function(data){
            console.log(data)//{success:true}
            console.log(item)
            if(data.success == true){
              //列表更新
             
              console.log(item)
              //item是data数据中的一条,item = CT.getItemById(window.cartData.data,id)
              item.num = num;
              item.size = size;
              //渲染页面
              $('.mui-table-view').html(template('cart',window.cartData));
            
            }
          }
        })
      }else{

      }
    })
  })
//点击删除
$('.mui-table-view').on('tap','.mui-icon-trash',function(){
  //把静态渲染内容拿出来
  //confirm在使用字符串作为内容的时候/n会自动加上<br>,\t默认空格
  //获取当前按钮对应的商品数据，根据id去缓存区取
  var $this = $(this)
  var id = $this.parent().attr('data-id');
  mui.confirm('你确认删除该商品？','删除商品',['确认','取消'],function(e){
   if(e.index==0){
      //发送请求
   CT.loginAjax({
        type:'get',
        url:'/cart/deleteCart',
        data:{
          id:id
        },
        dataType:'json',
        success:function(data){
       if(data.success == true){
         $this.parent().parent().remove();
         setAmount()
          }
        }
      })
    }
  })
})
  //尺码的选择,tap是封装的，click是原生的
  $('body').on('tap','.btn_size',function(){
$(this).addClass('now').siblings().removeClass('now');
  });
  $('body').on('tap','.p_number span',function(){
   
    var $input = $(this).siblings('input');
   
      var currNum = $input.val();
      console.log(currNum);
      //取值出的是字符串的2和10.相当于2和1比较，所以需要取整
      var maxNum = parseInt($input.attr('data-max'));
      console.log($input.attr('data-max'));
      if ($(this).hasClass('jian')) {
        if (currNum <=1) {
          mui.toast('至少需要一件商品');
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
 //点击复选框。计算总金额
 $('.mui-table-view').on('change','[type=checkbox]',function(){
   
  setAmount()
 })
});
var setAmount = function(){
  var $checkedBox = $('[type=checkbox]:checked');
  var amountSum = 0;
  $checkedBox.each(function(i,item){
    var id =$(this).attr('data-id');
    var item = CT.getItemById(window.cartData.data,id);
    var num = item.num;
    var price =item.price;
    var amount =num*price;
    amountSum+=amount;
    console.log(amountSum);
  })
  if(Math.floor(amountSum*100)%10){
    amountSum = Math.floor(amountSum*100)/100;
  }else{
    amountSum = Math.floor(amountSum*100)/100;
   
  }
  
  console.log(amountSum);
  $('#cartAmount').html(amountSum);
}
var getCartData = function (callback) {
  CT.loginAjax({
    type: 'get',
    url: '/cart/queryCartPaging',
    data: {
      page: 1,
      //不产生分页，需要修改接口
      pageSize: 100
    },
    dataType: 'json',
    success: function (data) {
      console.log(data)//想要的数据
     window.cartData = data;
     console.log(window.cartData)
      callback && callback(data);
      
    }
  })
}