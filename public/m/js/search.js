$(function(){
  $('.ct_search a').on('tap',function(){
    console.log(1)
    // 跳转去搜索列表页，并且要带上关键字
    var key=$.trim($('input').val());
    //判断没有关键字就提示用户输入关键字
    if(!key){
      //mui消失提示
      mui.toast('请输入关键字');
    }
    //如果合法
    //采用url传参的方式传递到后台
    location.href = 'searchList.html?key='+key; 
  })
})