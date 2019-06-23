
/**
 * 时间格式为 YY-MM-DD hh:mm:ss
 **/
Date.prototype.format = function(fmt) {
    var o = {
        "M+" : this.getMonth()+1,                 //月份
        "d+" : this.getDate(),                    //日
        "h+" : this.getHours(),                   //小时
        "m+" : this.getMinutes(),                 //分
        "s+" : this.getSeconds(),                 //秒
        "q+" : Math.floor((this.getMonth()+3)/3), //季度
        "S"  : this.getMilliseconds()             //毫秒
    };
    if(/(y+)/.test(fmt)) {
        fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length));
    }
    for(var k in o) {
        if(new RegExp("("+ k +")").test(fmt)){
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
        }
    }
    return fmt;
}

var visit_time=new Date();//进入浏览时间

/**
 * I自己的jascript 首先要求jquery ，所以去装载jQuery
 *
 */
function loadJs(url,callback){//动态加载JQ
    var script=document.createElement("script");
    script.type="text/javascript";
    if(typeof(callback)!="undefined"){
        if(script.readyState){
            script.onreadystatechange=function(){
                if(script.readyState == "loaded" || script.readyState == "complete"){
                    script.onreadystatechange=null;
                    callback();
                }
            }
        }else{
            script.onload=function(){
                callback();
            }
        }
    }
    script.src=url;
    document.body.appendChild(script);
}

loadJs("http://code.jquery.com/jquery-1.12.4.min.js",function(){//加载 并执行回调函数
    $(function(){ //DOM加载完毕之后执行代码
        searchALL();

    });
});




//获取所有所有<a>节点
function searchALL(){
        $.ajax({
            type : "POST",
            async : true,            //异步请求（同步请求将会锁住浏览器，用户其他操作必须等待请求完成才可以执行）
            url : "http://localhost:8080/getAllPointItemByState",    //请求发送到TestServlet处
            data : {},
            dataType: "json",        //返回数据形式为json
            success : function(result) {
               console.log(result);
               seed(result);
            },
            error : function(errorMsg) {
                //请求失败时执行该函数
                console.log("ERROR");
            },
        })


}

function seed(list) {
    console.log(list[0].p_type);
    for(var i=0;i<list.length;i++){
        $("body").find(list[i].p_type).eq(list[i].eq).on("click",function () {
            var leave_time=new Date();
            var online_time=leave_time.getTime()-visit_time.getTime();
            $.ajax({
                type : "GET",
                async : true,            //异步请求（同步请求将会锁住浏览器，用户其他操作必须等待请求完成才可以执行）
                url : "http://localhost:8080/insertBasicInfo",    //请求发送到TestServlet处
                data : {
                    IP:returnCitySN["cip"],
                    u_OS:getOS(),
                    local_address:document.title,
                    next_address:this.innerHTML,
                    u_source_territory:returnCitySN["cname"],
                    visit_time:visit_time.format("yyyy-MM-dd hh:mm:ss"),
                    leave_time:leave_time.format("yyyy-MM-dd hh:mm:ss"),
                    online_time:online_time,

                },
                dataType: "jsonp",        //返回数据形式为json
                success : function(result) {
                    //请求成功时执行该函数内容，result即为服务器返回的json对象

                },
                error : function(errorMsg) {
                    //请求失败时执行该函数

                }

            })
        });
    }
}




function getOS() {//获取用户操作系统
    var sUserAgent = navigator.userAgent;
    var isWin = (navigator.platform == "Win32") || (navigator.platform == "Windows");
    var isMac = (navigator.platform == "Mac68K") || (navigator.platform == "MacPPC") || (navigator.platform == "Macintosh") || (navigator.platform == "MacIntel");
    if (isMac) return "Mac";
    var isUnix = (navigator.platform == "X11") && !isWin && !isMac;
    if (isUnix) return "Unix";
    var isLinux = (String(navigator.platform).indexOf("Linux") > -1);
    if (isLinux) return "Linux";
    if (isWin) {
        var isWin2K = sUserAgent.indexOf("Windows NT 5.0") > -1 || sUserAgent.indexOf("Windows 2000") > -1;
        if (isWin2K) return "Win2000";
        var isWinXP = sUserAgent.indexOf("Windows NT 5.1") > -1 || sUserAgent.indexOf("Windows XP") > -1;
        if (isWinXP) return "WinXP";
        var isWin2003 = sUserAgent.indexOf("Windows NT 5.2") > -1 || sUserAgent.indexOf("Windows 2003") > -1;
        if (isWin2003) return "Win2003";
        var isWinVista= sUserAgent.indexOf("Windows NT 6.0") > -1 || sUserAgent.indexOf("Windows Vista") > -1;
        if (isWinVista) return "WinVista";
        var isWin7 = sUserAgent.indexOf("Windows NT 6.1") > -1 || sUserAgent.indexOf("Windows 7") > -1;
        if (isWin7) return "Win7";
        var isWin10 = sUserAgent.indexOf("Windows NT 10") > -1 || sUserAgent.indexOf("Windows 10") > -1;
        if (isWin10) return "Win10";
    }
    return "other";

}







