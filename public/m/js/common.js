$(function() {
  // mui实现的选择器, 可以生成mui实例, 就可以调用 mui实例的方法
  mui('.mui-scroll-wrapper').scroll({
    deceleration: 0.0005, //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
    indicators: false //是否显示滚动条
  });

  //获得slider插件对象
  var gallery = mui('.mui-slider');
  gallery.slider({
    interval: 5000 //自动轮播周期，若为0则不自动播放，默认为0；
  });

});

// 专门通过传递的参数, 可以解析出地址栏的参数值
window.CT = {};

CT.getParamsByUrl = function(){
  //以对象存储地址信息
  var params ={};
  var search =location.search;
  if(search){
    search = search.replace('?','');
    //如果有多个键值对
    var arr =search.split('&');
   
    arr.forEach(function(item,i){
      var itemArr = item.split('=');
      params[itemArr[0]]=itemArr[1];
    })
  }
 
  return params;
}
//JSON IE6.7 json2.js不支持
CT.serialize2object = function(serializeStr){
var obj = {};
//key=vale&k=v
if(serializeStr){
  var arr = serializeStr.split('&');
  arr.forEach(function(item,i){
    var itemArr = item.split('=');
    obj[itemArr[0]] = itemArr[1];
  })
}
return obj;
console.log(obj);
}
//获取id对应的商品数据
CT.getItemById = function(arr,id){
  var obj = null;
  arr.forEach(function(item,i){
    if(item.id == id){
      obj = item;
    }
  });
  return obj;
}
//拦截未登录用户
CT.loginUrl = '/m/user/login.html';
CT.cartUrl = '/m/user/cart.html';
CT.userUrl = '/m/user/index.html';
CT.loginAjax = function(params){
$.ajax({
  url:params.url ||'#',
  type:params.type ||'get',
  data:params.data||'',
  dataType:params.dataType || 'json',
  success:function(data){
    if(data.error ==400){
      location.href = CT.loginUrl+'?returnUrl='+ location.href; 
      return false;
    }else{
      params.success && params.success(data)
    }
  },
  error:function(){
    mui.toast('服务器繁忙');
  }
})
}


