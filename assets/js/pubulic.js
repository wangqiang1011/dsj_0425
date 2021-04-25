$(function(){
    $.ajaxPrefilter(function(options){
        // console.log(options);
        options.url = 'http://api-breakingnews-web.itheima.net'+options.url
        // /my开头的请求路径，需要在请求头中携带 Authorization 身份认证字段，才能正常访问成功
        options.headers=function(){
            if(options.url.indexOf('/my/') !== -1){
                //查询options下的url里面的my开头的不为-1那么证明存在
                //那么就进行身份认证
                Authorization:localStorage.getItem('token')
            }
        }
    })
})