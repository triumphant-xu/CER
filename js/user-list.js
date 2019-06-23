
$(function(){
	findUserList();
	$("#tenant-group-name").val($.getUrlParam("tenantGroupName"));
	
	//结束时间设置为今天
	var d=new Date();
	var month=("0" + (d.getMonth() + 1)).slice(-2);
	var day=("0" + (d.getDate() + 1)).slice(-2);
	$("#end-date").val(new Date().getFullYear()+"-"+month+"-"+day);
	
	//开始时间设置为七天前
	var d2 = new Date(d);
    d2.setDate(d.getDate()-7);
	var month2=("0" + (d2.getMonth() + 1)).slice(-2);
	var day2=("0" + (d2.getDate() + 1)).slice(-2);
	$("#start-date").val(d2.getFullYear()+"-"+month2+"-"+day2);
	
	
	$("#user-table").find("tbody").find("tr").click(function(){
		insertPersonas(this);
	});
		
})


//在tr下面显示的用户画像
insertPersonas=function(tr){
	
	if($(tr.nextSibling).attr("name")=="personas"){ //已经显示了用户画像,再次点击删除画像
		$(tr.nextSibling).remove();
		console.log("清除"+$(tr).find("th").eq(0).text()+"用户画像");		
	}else if($(tr).attr("name")!="personas"){ //未点击用户画像，点击添加用户画像
		console.log("显示"+$(tr).find("th").eq(0).text()+"用户画像");		
		var cr=$(tr).clone(true);
		cr.empty();
		
		//让九列合并成一列
		cr.append("<th colspan='9'></th>");
		cr.css("height","900px");
		cr.attr("name","personas");
	    var p=$(".as").eq(0).clone(true);
	    
		p.attr("hidden",false);
		p.css("width","100%");
		p.css("height","900px");
		
		
			
		p.appendTo(cr.find("th"));
	    $(tr).after(cr);		
	    
	    console.log(p.children(".asd").find(".asd").eq(1).get(0));
	    visitorsLike(p.children(".asd").find(".asd").eq(1).get(0));
	    roadone(p.find("#123").get(0));
	}		
}

//获取请求里携带的参数
$.getUrlParam = function (name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        if (r != null)
            return decodeURI(r[2]); // decodeURI(r[2]); 解决参数是中文时的乱码问题
        return null;
}


//添加查看数据事件
$("#check").click(function(){
	$("#win").attr("hidden",false);
	black=$("<div id=\"black-backGroud\" ></div>");
	black.css("width","100%");
	black.css("height","100%");
	black.css("background-color","rgba(0,0,0,0.3)");
	black.css("position","absolute");
	black.css("z-index",100);
	black.css("top",0);
	black.css("right",0);
	$("body").append(black);
});
$("#check-echart").click(function(){
	if($("#select-chart-mode").children('option:selected').val()==1){
		DayVisit(7,0,"user-list-echart");
	} else if($("#select-chart-mode").children('option:selected').val()==3){
	   console.log("显示用户画像");
	}
	
});
$("#exit").click(function(){
	$("#win").attr("hidden",true);
	$("#black-backGroud").remove();
});
	
//点击查询
doselect=function(){
		var startdate=$(this).parent().parent().find('#date-start').val();
		var enddate=$(this).parent().parent().find('#date-end').val();
		var starttime=$(this).parent().parent().find('#start-time').val();
		var endtime= $(this).parent().parent().find('#end-time').val();
		var minyear= $(this).parent().parent().find('#start-year').val();
		var maxyear= $(this).parent().parent().find('#end-year').val();
		
		
		findUserList();
};	

//加载单个用户行为日志
findUserLog=function(){
	   var table= $("<table  id=\"user-table\" class=\"table stylish-table\" ><thead > <tr><th colspan=\"1\">操作</th><th>操作日期</th><th>操作IP</th><th>操作地点</th><th>标签</th> </tr></thead><tbody > </tbody></table>");
	   var table_li=$("<tr hidden=\"true\"><th>操作</th><th>操作日期</th><th>操作IP</th><th>操作地点</th><th>标签</th></tr> ");
       table.find('tbody').append(table_li);  
        
       
       //清除容器内容
       removeEcharts('main-center-echart');
	   $('#main-center-echart').empty();
	   $('#main-center-echart').append(table);
       
       
        var i=0;
        for(i=0;i<24;i++){
		   	var tr=$('#user-table').find('tbody').find('tr').eq(0).clone(true);
		   	tr.prop("hidden",false);
		   	tr.find('th').eq(0).text(function(){
		   		var i=Math.floor(Math.random()*7);
		   		if(i==0){
		   			return "商店"
		   		}
		   		else if(i==1){
		   			return "社区"
		   		}
		   		else if(i==2){
		   			return "购物车"
		   		}
		   		else if(i==3){
		   			return "黑魂"
		   		}
		   		else if(i==4){
		   			return "收藏"
		   		}
		   		else if(i==5){
		   			return "直播"
		   		}
		   		else if(i==6){
		   			return "服务"
		   		}
		   		else if(i==7){
		   			return "帮助"
		   		}   		
		   	});   //
		   	tr.find('th').eq(1).text("2019-3-3 "+(24-i)+":"+Math.floor(Math.random()*6)+Math.floor(Math.random()*10));    //
		   	tr.find('th').eq(2).text("211.140.166.178");  //
		   	tr.find('th').eq(3).text("未知");  //
		   	tr.find('th').eq(4).text("");  //
		   	
		   	//将新增节点加入table
		   	table.find('tbody').append(tr);	
	    }
        //文件导出时过滤掉模板
	   var tr=$('#user-table').find('tbody').find('tr').eq(0).addClass('noExl');
	   $('#main-center-echart').append(table);
	   
	   //表格头部固定方法
	   $("#main-center-echart").scroll(function(){
		if($(this).attr("style").indexOf("overflow")>-1){
			var scrollTop = this.scrollTop;
			$(this).find("thead").attr("style","transform: translateY(" + scrollTop + "px);")
		};
		});
}


//加载用户名单
findUserList =function(){
	   var table= $("<table  id=\"user-table\" class=\"table stylish-table\" ><thead > <tr><th colspan=\"1\">用户名</th><th>年龄</th><th>注册日期</th><th>上次登录日期</th><th>上次退出日期</th><th>上次登录IP</th><th>上次登录地点</th><th>近七日访问时长</th><th>标签</th> </tr></thead><tbody > </tbody></table>");
	   var table_li=$("<tr hidden=\"true\"> <th >用户名</th><th>年龄</th><th>注册日期</th><th>上次登录日期</th><th>上次退出日期</th><th>上次登录IP</th><th>上次登录地点</th><th>近七日访问时长</th> <th>标签</th></tr> ");
       table.find('tbody').append(table_li);                             
         
       removeEcharts('main-center-echart');
	   $('#main-center-echart').empty();
	   $('#main-center-echart').append(table);
	      
	   
	   for(var i=0;i<1;i++){
	   	var tr=$('#user-table').find('tbody').find('tr').eq(0).clone(true);
	   	tr.prop("hidden",false);
	   	tr.find('th').eq(0).text("张三");   //
	   	tr.find('th').eq(1).text("21");    //
	   	tr.find('th').eq(2).text("2019-3-3");  //
	   	tr.find('th').eq(3).text("2019-2-23  18:24:25");  //
	   	tr.find('th').eq(4).text("2019-2-23  18:37:17");  //
	   	tr.find('th').eq(5).text("192.0.0.1");  //
	   	tr.find('th').eq(6).text("未知");  //
	   	tr.find('th').eq(7).text("43.5");  //
	   	tr.find('th').eq(8).text("活跃用户");  //

	   	table.find('tbody').append(tr);	
	   	
	   	var tr=$('#user-table').find('tbody').find('tr').eq(0).clone(true);
	   	tr.prop("hidden",false);
	   	tr.find('th').eq(0).text("李四");   //
	   	tr.find('th').eq(1).text("21");    //
	   	tr.find('th').eq(2).text("2019-1-3");  //
	   	tr.find('th').eq(3).text("2019-4-1  18:24:25");  //
	   	tr.find('th').eq(4).text("2019-4-1  19:37:17");  //
	   	tr.find('th').eq(5).text("192.0.0.1");  //
	   	tr.find('th').eq(6).text("未知");  //
	   	tr.find('th').eq(7).text("40.5");  //
	   	tr.find('th').eq(8).text("活跃用户");  //

	   	table.find('tbody').append(tr);	
	   	
	   	var tr=$('#user-table').find('tbody').find('tr').eq(0).clone(true);
	   	tr.prop("hidden",false);
	   	tr.find('th').eq(0).text("王五");   //
	   	tr.find('th').eq(1).text("21");    //
	   	tr.find('th').eq(2).text("2019-3-3");  //
	   	tr.find('th').eq(3).text("2019-1-3  14:24:25");  //
	   	tr.find('th').eq(4).text("2019-1-3  14:37:17");  //
	   	tr.find('th').eq(5).text("192.0.0.1");  //
	   	tr.find('th').eq(6).text("未知");  //
	   	tr.find('th').eq(7).text("3.5");  //
	   	tr.find('th').eq(8).text("沉默用户");  //

	   	table.find('tbody').append(tr);	
	   	
	   	var tr=$('#user-table').find('tbody').find('tr').eq(0).clone(true);
	   	tr.prop("hidden",false);
	   	tr.find('th').eq(0).text("赵六");   //
	   	tr.find('th').eq(1).text("21");    //
	   	tr.find('th').eq(2).text("2019-3-13  ");  //
	   	tr.find('th').eq(3).text("2019-3-13  8:24:25");  //
	   	tr.find('th').eq(4).text("2019-3-13  10:37:17");  //
	   	tr.find('th').eq(5).text("192.0.0.1");  //
	   	tr.find('th').eq(6).text("未知");  //
	   	tr.find('th').eq(7).text("13.5");  //
	   	tr.find('th').eq(8).text("普通用户");  //

	   	table.find('tbody').append(tr);	
	   	
	   	
	    var tr=$('#user-table').find('tbody').find('tr').eq(0).clone(true);
	   	tr.prop("hidden",false);
	   	tr.find('th').eq(0).text("鬼脚七");   //
	   	tr.find('th').eq(1).text("21");    //
	   	tr.find('th').eq(2).text("2019-2-23   ");  //
	   	tr.find('th').eq(3).text("2019-2-23  11:25:55");  //
	   	tr.find('th').eq(4).text("2019-2-3  10:37:17");  //
	   	tr.find('th').eq(5).text("192.0.0.1");  //
	   	tr.find('th').eq(6).text("未知");  //
	   	tr.find('th').eq(7).text("0.5");  //
	   	tr.find('th').eq(8).text("沉默用户");  //

	   	table.find('tbody').append(tr);	
	   	
	   	
        var tr=$('#user-table').find('tbody').find('tr').eq(0).clone(true);
	   	tr.prop("hidden",false);
	   	tr.find('th').eq(0).text("小七");   //
	   	tr.find('th').eq(1).text("21");    //
	   	tr.find('th').eq(2).text("2019-2-23   ");  //
	   	tr.find('th').eq(3).text("2019-2-23  11:25:55");  //
	   	tr.find('th').eq(4).text("2019-2-3  10:37:17");  //
	   	tr.find('th').eq(5).text("192.0.0.1");  //
	   	tr.find('th').eq(6).text("未知");  //
	   	tr.find('th').eq(7).text("0.5");  //
	   	tr.find('th').eq(8).text("沉默用户");  //

	   	table.find('tbody').append(tr);
	   	
	    var tr=$('#user-table').find('tbody').find('tr').eq(0).clone(true);
	   	tr.prop("hidden",false);
	   	tr.find('th').eq(0).text("asd");   //
	   	tr.find('th').eq(1).text("21");    //
	   	tr.find('th').eq(2).text("2019-1-3");  //
	   	tr.find('th').eq(3).text("2019-4-1  18:24:25");  //
	   	tr.find('th').eq(4).text("2019-4-1  19:37:17");  //
	   	tr.find('th').eq(5).text("192.0.0.1");  //
	   	tr.find('th').eq(6).text("未知");  //
	   	tr.find('th').eq(7).text("40.5");  //
	   	tr.find('th').eq(8).text("活跃用户");  //

	   	table.find('tbody').append(tr);	
	   	
	   	var tr=$('#user-table').find('tbody').find('tr').eq(0).clone(true);
	   	tr.prop("hidden",false);
	   	tr.find('th').eq(0).text("wer324");   //
	   	tr.find('th').eq(1).text("21");    //
	   	tr.find('th').eq(2).text("2019-3-3");  //
	   	tr.find('th').eq(3).text("2019-1-3  14:24:25");  //
	   	tr.find('th').eq(4).text("2019-1-3  14:37:17");  //
	   	tr.find('th').eq(5).text("192.0.0.1");  //
	   	tr.find('th').eq(6).text("未知");  //
	   	tr.find('th').eq(7).text("3.5");  //
	   	tr.find('th').eq(8).text("沉默用户");  //

	   	table.find('tbody').append(tr);	
	   	
	   	var tr=$('#user-table').find('tbody').find('tr').eq(0).clone(true);
	   	tr.prop("hidden",false);
	   	tr.find('th').eq(0).text("dfg56");   //
	   	tr.find('th').eq(1).text("21");    //
	   	tr.find('th').eq(2).text("2019-3-13  ");  //
	   	tr.find('th').eq(3).text("2019-3-13  8:24:25");  //
	   	tr.find('th').eq(4).text("2019-3-13  10:37:17");  //
	   	tr.find('th').eq(5).text("192.0.0.1");  //
	   	tr.find('th').eq(6).text("未知");  //
	   	tr.find('th').eq(7).text("13.5");  //
	   	tr.find('th').eq(8).text("普通用户");  //

	   	table.find('tbody').append(tr);	
	   	
	   	
	    var tr=$('#user-table').find('tbody').find('tr').eq(0).clone(true);
	   	tr.prop("hidden",false);
	   	tr.find('th').eq(0).text("aqd");   //
	   	tr.find('th').eq(1).text("21");    //
	   	tr.find('th').eq(2).text("2019-2-23   ");  //
	   	tr.find('th').eq(3).text("2019-2-23  11:25:55");  //
	   	tr.find('th').eq(4).text("2019-2-3  10:37:17");  //
	   	tr.find('th').eq(5).text("192.0.0.1");  //
	   	tr.find('th').eq(6).text("未知");  //
	   	tr.find('th').eq(7).text("0.5");  //
	   	tr.find('th').eq(8).text("沉默用户");  //

	   	table.find('tbody').append(tr);	
	   	
	   	
        var tr=$('#user-table').find('tbody').find('tr').eq(0).clone(true);
	   	tr.prop("hidden",false);
	   	tr.find('th').eq(0).text("阿罗");   //
	   	tr.find('th').eq(1).text("21");    //
	   	tr.find('th').eq(2).text("2019-2-23   ");  //
	   	tr.find('th').eq(3).text("2019-2-23  11:25:55");  //
	   	tr.find('th').eq(4).text("2019-2-3  10:37:17");  //
	   	tr.find('th').eq(5).text("192.0.0.1");  //
	   	tr.find('th').eq(6).text("未知");  //
	   	tr.find('th').eq(7).text("0.5");  //
	   	tr.find('th').eq(8).text("沉默用户");  //

	   	table.find('tbody').append(tr);
	   	
	   		   	var tr=$('#user-table').find('tbody').find('tr').eq(0).clone(true);
	   	tr.prop("hidden",false);
	   	tr.find('th').eq(0).text("阿黄");   //
	   	tr.find('th').eq(1).text("21");    //
	   	tr.find('th').eq(2).text("2019-1-3");  //
	   	tr.find('th').eq(3).text("2019-4-1  18:24:25");  //
	   	tr.find('th').eq(4).text("2019-4-1  19:37:17");  //
	   	tr.find('th').eq(5).text("192.0.0.1");  //
	   	tr.find('th').eq(6).text("未知");  //
	   	tr.find('th').eq(7).text("40.5");  //
	   	tr.find('th').eq(8).text("活跃用户");  //

	   	table.find('tbody').append(tr);	
	   	
	   	var tr=$('#user-table').find('tbody').find('tr').eq(0).clone(true);
	   	tr.prop("hidden",false);
	   	tr.find('th').eq(0).text("阿龙");   //
	   	tr.find('th').eq(1).text("21");    //
	   	tr.find('th').eq(2).text("2019-3-3");  //
	   	tr.find('th').eq(3).text("2019-1-3  14:24:25");  //
	   	tr.find('th').eq(4).text("2019-1-3  14:37:17");  //
	   	tr.find('th').eq(5).text("192.0.0.1");  //
	   	tr.find('th').eq(6).text("未知");  //
	   	tr.find('th').eq(7).text("3.5");  //
	   	tr.find('th').eq(8).text("沉默用户");  //

	   	table.find('tbody').append(tr);	
	   	
	   	var tr=$('#user-table').find('tbody').find('tr').eq(0).clone(true);
	   	tr.prop("hidden",false);
	   	tr.find('th').eq(0).text("阿黄");   //
	   	tr.find('th').eq(1).text("21");    //
	   	tr.find('th').eq(2).text("2019-3-13  ");  //
	   	tr.find('th').eq(3).text("2019-3-13  8:24:25");  //
	   	tr.find('th').eq(4).text("2019-3-13  10:37:17");  //
	   	tr.find('th').eq(5).text("192.0.0.1");  //
	   	tr.find('th').eq(6).text("未知");  //
	   	tr.find('th').eq(7).text("13.5");  //
	   	tr.find('th').eq(8).text("普通用户");  //

	   	table.find('tbody').append(tr);	
	   	
	   	
	    var tr=$('#user-table').find('tbody').find('tr').eq(0).clone(true);
	   	tr.prop("hidden",false);
	   	tr.find('th').eq(0).text("阿丁");   //
	   	tr.find('th').eq(1).text("21");    //
	   	tr.find('th').eq(2).text("2019-2-23   ");  //
	   	tr.find('th').eq(3).text("2019-2-23  11:25:55");  //
	   	tr.find('th').eq(4).text("2019-2-3  10:37:17");  //
	   	tr.find('th').eq(5).text("192.0.0.1");  //
	   	tr.find('th').eq(6).text("未知");  //
	   	tr.find('th').eq(7).text("0.5");  //
	   	tr.find('th').eq(8).text("沉默用户");  //

	   	table.find('tbody').append(tr);	
	   	
	   	
        var tr=$('#user-table').find('tbody').find('tr').eq(0).clone(true);
	   	tr.prop("hidden",false);
	   	tr.find('th').eq(0).text("阿凯");   //
	   	tr.find('th').eq(1).text("21");    //
	   	tr.find('th').eq(2).text("2019-2-23   ");  //
	   	tr.find('th').eq(3).text("2019-2-23  11:25:55");  //
	   	tr.find('th').eq(4).text("2019-2-3  10:37:17");  //
	   	tr.find('th').eq(5).text("192.0.0.1");  //
	   	tr.find('th').eq(6).text("未知");  //
	   	tr.find('th').eq(7).text("0.5");  //
	   	tr.find('th').eq(8).text("沉默用户");  //

	   	table.find('tbody').append(tr);
	   }   
	   
	   //文件导出时过滤掉模板
	   var tr=$('#user-table').find('tbody').find('tr').eq(0).addClass('noExl');
	   $('#main-center-echart').append(table);
	   
	   //表格头部固定方法
	   $("#main-center-echart").scroll(function(){
		if($(this).attr("style").indexOf("overflow")>-1){
			var scrollTop = this.scrollTop;
			$(this).find("thead").attr("style","transform: translateY(" + scrollTop + "px);")
		};
		});
}

//名单的导出
 $("#output-select").click(function () {    
                $("#user-table").table2excel({    
                    exclude  : ".noExl", //过滤位置的 css 类名    
                    filename : "用户群："+$("#tenant-group-name").val()+"名单——" +(1+ new Date().getMonth())+"月-"+ new Date().getDate()+"日-"+new Date().getHours()+"时.xls", //文件名称    
                    name: "Excel Document Name.xlsx",    
                    exclude_img: true,    
                    exclude_links: true,    
                    exclude_inputs: true    

                });    
        });  


//数据呈现方式改变
$('#select-date-mode').change(function(){		
		if($('#select-date-mode').children('option:selected').val()==1){  //用户群名单查询		
				$('#echart-select-list').find('li').eq(0).attr("hidden",false);	
		        $('#echart-select-list').find('li').eq(1).attr("hidden",true);
					
		}else if($('#select-date-mode').children('option:selected').val()==2){  //用户列表查询
				$('#echart-select-list').find('li').eq(0).attr("hidden",true);	
		        $('#echart-select-list').find('li').eq(1).attr("hidden",false);	
		}
});