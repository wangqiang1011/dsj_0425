$(function(){
    $.ajaxPrefilter(function(options){
        // console.log(options);
        options.url = 'http://api-breakingnews-web.itheima.net'+options.url
        // /my开头的请求路径，需要在请求头中携带 Authorization 身份认证字段，才能正常访问成功
        if(options.url.indexOf('/my/') !== -1){
            // 证明有my开头的数据那么就进行身份认证
            options.headers = {
                Authorization:localStorage.getItem('token')
            }
        }
        options.complete=function(res){
            //如果登录个人信息页面的时候,后台响应数据为认证失败
            //那么就强制退出,并且清除本地缓存数据
           if(res.responseJSON.status===1 && res.responseJSON.message==='身份认证失败！'){
               //清除本地数据
               localStorage.removeItem('token')
               //强制退出
               location.href='/login.html'
           }
        }
    })
})