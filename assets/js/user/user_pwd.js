$(function(){
   //先定义正则表达密码6-12位
   layui.form.verify({
       pass: [
        /^[\S]{6,12}$/
        ,'密码必须6到12位，且不能出现空格'
      ],
   //判断用户输入的密码不得与原密码重复
      samePwd:function(value,item){
          if (value === $('[name = oldPwd]').val()){
              return '新密码不得与原密码一致'
          } {
              
          }
      },
   //判断用户确认的密码和第一次输入的密码是否保持一致
   xtPwd:function(value,item){
       if(value !== $('[name = newPwd]').val()){
           return '新密码不一致请重新输入'
       }
   }     
   })
   //layui-form提交事件,将数据传入服务器
   $('.layui-form').on('submit',function(e){
       //阻止默认提交
       e.preventDefault()
       //获取form表单数据
       var data = $(this).serialize()
       $.ajax({
           type:'post',
           url:'/my/updatepwd',
           data:data,
           success:function(res){
              if(res.status!==0){
                  return layui.layer.msg(res.message,{icon:5})
              }
              //数据提交成功给出提示
              layui.layer.msg(res.message,{icon:6},function(){
                  //清除form表单内容
                  $('.layui-form')[0].reset()
              })
           }
       })
   })
 
})