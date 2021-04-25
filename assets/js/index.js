$(function(){
    getData()

    //点击退出将数据页面退出并且跳转到登陆页面
    $('#logout').on('click',function(){
        layer.confirm('确定退出登录?', {icon: 3, title:'提示'}, function(index){
            //清除本地存储
            localStorage.removeItem('token')
            //页面的跳转
            location.href='/login.html'
            layer.close(index);
          });
    })
   //封装获取本地数据
   function getData(){
    $.ajax({
        type:'get',
        url:'/my/userinfo',
        success:function(res){
            console.log(res);
            if(res.status !== 0){
                return layui.layer.msg(res.message)
            }
            //那么数据获取成功
            // layui.layer.msg(res.message)
            upData(res.data)
        },
    })
   }
   //页面数据的渲染,头像和文本的渲染
   function upData(data){
       //判断用户自己是否设置了名称
       var name = data.nickname || data.username
      //如果用户自己设置了那么优先渲染用户的
      $('#welcome').html('欢迎&nbsp'+name)
      //判断用户自己是否设置了头像
      if(data.user_pic !== null){
          //如果不为空那么优先设置用户自己的头像
          $('.layui-nav-img').attr('src',data.user_pic).show()
            //让文本头像隐藏
          $('.text-avatar').hide()
      }else{
          
          //如果为空,那么设置文本头像
          //先让名称的首字母默认大写
          var first = name[0].toUpperCase()
          //那么让文本图片显示
          $('.text-avatar').html(first).show()
          //让图片隐藏
          $('.layui-nav-img').hide()
      }
   }
   
})