$(function(){
    //出现剪裁框
    // 1.1 获取裁剪区域的 元素对象
    var $image = $('#image')
    // 1.2 配置选项
    const options = {
      // 纵横比
      aspectRatio: 1,
      // 指定预览区域
      preview: '.img-preview'
    }
    // 1.3 创建裁剪区域
    $image.cropper(options)

    //点击上传自动触发file文件的上传
    $('#btnChooseImage').on('click',function(){
        //让file文件上传文件
        $('#file').click()
    })
    //给file上传文件添加一个change事件
    $('#file').on('change',function(){
        //获取文件列表
        var fileList = this.files
        console.log(fileList);
        //判断用户是否上传头像
        if(fileList.length === 0){
            return layui.layer.msg('请选择文件图片上传')
        }
        //获取用户上传的文件图片
        var file = fileList[0]
        console.log(file);
        //将选中文件生成一个路径
        var newImgURL = URL.createObjectURL(file)
        console.log(newImgURL);
        // 3. 重新初始化裁剪区域
        $image
        .cropper('destroy') // 销毁旧的裁剪区域
        .attr('src',newImgURL) // 重新设置图片路径
        .cropper(options) // 重新初始化裁剪区域
    })
    //点击确定将头像渲染到服务器并改变页面头像
    $('#btnUpload').on('click',function(){
            //判断用户是否上传图片,如果没有上传就进行提示
        var fileList = $('#file')[0].files
        console.log(fileList);
        //如果fileList的长度为0,那么就是没有选择文件
        if(fileList.length === 0){
            return layui.layer.msg('很抱歉,数据提交失败',{icon:5})
        }
        var dataURL = $image
        //图片转为base64
        .cropper('getCroppedCanvas', {
          // 创建一个 Canvas 画布
          width: 100,
          height: 100
        })
        .toDataURL('image/png')
       $.ajax({
           type:'post',
           url:'/my/update/avatar',
           data:{avatar:dataURL},
           success:function(res){
            if(res.status !== 0){
                return layui.layer.msg(res.message,{icon:5})
            }
            //获取数据成功
            layui.layer.msg(res.message,{icon:6},function(){
                //重新调用window方法渲染头像
                window.parent.getData()
            })
        }
       })
    })
})