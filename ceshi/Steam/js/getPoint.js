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




//遍历所有<a>标签
function searchALL(){
    var label=$("body").find("a");
    var i=label.length;
    var _list=[];
    var a=new Array();
    for(var x=0;x<i;x++){
    	if(label.eq(x).text()!=""){
    	console.log(x);
        a[x]={};
        a[x].p_type="a";
        a[x].p_id=label.eq(x).attr("id");
        a[x].p_name=label.eq(x).text();
        a[x].eq=x;
        _list.push(a[x]);
      }
    }

    $.ajax({
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        type : "POST",
        async : true,            //异步请求（同步请求将会锁住浏览器，用户其他操作必须等待请求完成才可以执行）
        url : "http://localhost:8080/insertPointItem",    //请求发送到TestServlet处
        traditional:true,
        data :JSON.stringify(_list),
        dataType: "json",        //返回数据形式为jsonp
        success : function(result) {
            //请求成功时执行该函数内容，result即为服务器返回的json对象
            console.log("success");
        },
        error : function(errorMsg) {
            //请求失败时执行该函数
            console.log("error");
        }

    })







}
