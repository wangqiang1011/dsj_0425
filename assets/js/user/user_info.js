$(function(){
    getData()
    //先获取数据渲染页面
    function getData(){
        $.ajax({
            type:'get',
            url:'/my/userinfo',
            success:function(res){
                //判断是否成功获取数据
                if(res.status !== 0){
                    return layui.layer.msg('获取数据失败',{icon:5})
                }
                //获取数据成功那么渲染到页面
               /*  $('[name = username]').val(res.data.username)
                $('[name = nickname]').val(res.data.nickname)
                $('[name = email]').val(res.data.email) */
                layui.form.val('formUserInfo',res.data)
            }
        })
    }
    //正则用户输入的用户名不得超过6位
    layui.form.verify({
        username:function(value,item){
            if (value.length > 6) {
                return '用户名不得超过6位'
            }
        }
    })
    //点击重置按钮将数据进行清空
    $('#btnReset').on('click',function(e){
        //清除默认行为,不让清除数据
        e.preventDefault()
        //重新调用渲染页面
        getData()
    })
    //点击提交按钮将数据进行提交
    $('.layui-form').on('submit',function(e){
        //阻止默认提交
        e.preventDefault()
        //获取form表单收集数据
        var data = $(this).serialize()
        //将数据发送至服务器
        $.ajax({
            type:'post',
            url:'/my/userinfo',
            data:data,
            success:function(res){
                if(res.status!==0){
                    return layui.layer.msg('修改数据失败',{icon:5})
                }
                //修改数据成功
                layui.layer.msg('修改数据成功',{icon:6})
                //将数据同步更改到文本用户名上
                //利用window.parent可以获取父元素里的方法
                window.parent.getData()
            }
        })
    })
})