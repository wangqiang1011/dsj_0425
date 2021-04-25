$(function(){
   //当用户点击了去注册,将登陆页面隐藏,注册页面显示
   $('#link_reg').on('click',function(){
    //将登陆页面隐藏,注册页面显示
    $('.login-box').hide()
    $('.reg-box').show()
   })
   //点击去登录,将注册页面隐藏,登陆页面显示
   $('#link_login').on('click',function(){
       $('.reg-box').hide()
       $('.login-box').show()
   })
   //正则用户输入的密码必须6-12位
   layui.form.verify({
       pass:[
        /^[\S]{6,12}$/
        ,'密码必须6到12位，且不能出现空格'
      ],
      //判断确认密码和第一次输入密码是否一致
      rePass:function(value,item){
          if(value !==  $('#form_reg [name = password]').val()){
             return '两次密码不一致'
          }
      }
   })
   //点击注册按钮向服务器发送数据
   $('#form_reg').on('submit',function(e){
       //阻止父级自动提交
       e.preventDefault()
       //收集form表单数据
       var data = $(this).serialize()
    //    console.log(data);
       //请求数据提交$.ajax
       $.ajax({
           type:'post',
           url:'/api/reguser',
           data:data,
           success:function(res){
               console.log(res);
               if(res.status!==0){
                   return layui.layer.msg('注册失败',{icon:5})
               }
               //那么就是注册成功给出提示并且自动跳转登陆页面
               layui.layer.msg('注册成功',{icon:6},function(){
                //  跳转到登录页
                $('#link_login').click()
               })
           }
       })
   })
   //点击登录页面向服务器发送用户输入数据判断是否正确
   $('#form_login').on('submit',function(e){
       //阻止form表单自动提交
       e.preventDefault()
       //获取form表单数据
       var data = $(this).serialize()
       //向服务器发送请求
       $.ajax({
           type:'post',
           url:'/api/login',
           data:data,
           success:function(res){
               console.log(res);
               if(res.status !== 0){
                   return layui.layer.msg('登陆失败:用户名或密码可能出现错误',{icon:5})
               }
               //登陆成功将数据保存至本地并且进行页面的跳转
               layui.layer.msg('登陆成功:即将进行页面跳转',{icon:6},function(){
                   //保存数据至本地
                   localStorage.setItem('token',res.token)
                   //进行页面的跳转
                   location.href='/index.html'
               })
           }
       })
   })
})