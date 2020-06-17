$(function() {

  // 渲染一级分类
  getFirstCategoryData (function(data){
    
    $('.cate_left ul').html(template('firstTemplate',data));
    var categoryId=$('.cate_left ul li:first-child').find('a').attr('data-id');
   //绑定事件
   initSecondTapHandle();
    //渲染二级分类
    render(categoryId);
  
  })
  // 点击一级分类加载二级分类
  var initSecondTapHandle=function(){
    $('.cate_left ul li a').on('tap',function(e){
      //当已经有了样式之后，不用加载了
      if($(this).parent().hasClass('now')) return false;
      $('.cate_left li').removeClass('now');
      $(this).parent().addClass('now');
      var categoryId=$(this).attr('data-id');
      render(categoryId);
    })
  }
  
  
});
//获取一节分类的数据
var getFirstCategoryData = function(callback){
  $.ajax({
    url:'/category/queryTopCategory',
    type:'get',
    data:'',
    dataType:'json',
    success:function(data){
      callback&&callback(data);
     
    }
  })
  
}
// 获取二级分类的数据
  //params={id:1}
  var getSecondCategoryData = function(params,callback){
    $.ajax({
      url:'/category/querySecondCategory',
      type:'get',
      data:params,
      dataType:'json',
      success:function(data){
        callback&&callback(data);
      }
    })
  }

//封装一个render方法
var render =function(categoryId){
  getSecondCategoryData({id:categoryId},function(data){
    $('.cate_right ul').html(template('secondTemplate',data));
  })
}