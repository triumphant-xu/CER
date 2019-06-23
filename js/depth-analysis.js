
$(function(){
	findUserList();
})



	$(".date-start").datetimepicker({//选择年月日
　　　　　　format: 'yyyy-mm-dd',
　　　　　　language: 'zh-CN',
　　　　　　weekStart: 1,
　　　　　　todayBtn: 1,//显示‘今日’按钮
　　　　　　autoclose: 1,
　　　　　　todayHighlight: 1,
　　　　　　startView: 2,
　　　　　　minView: 2,  //Number, String. 默认值：0, 'hour'，日期时间选择器所能够提供的最精确的时间选择视图。
　　　　　　clearBtn:true,//清除按钮

　　　　　　forceParse: 0
　});
	$('.date-start').focus(function(){
	　　　　　　$(this).blur();//不可输入状态
	});
	$(".date-end").datetimepicker({//选择年月日
	　　　　　　format: 'yyyy-mm-dd',
	　　　　　　language: 'zh-CN',
	　　　　　　weekStart: 1,
	　　　　　　todayBtn: 1,//显示‘今日’按钮
	　　　　　　autoclose: 1,
	　　　　　　todayHighlight: 1,
	　　　　　　startView: 2,
	　　　　　　minView: 2,  //Number, String. 默认值：0, 'hour'，日期时间选择器所能够提供的最精确的时间选择视图。	
	　　　　　　clearBtn:true,//清除按钮
	　　　　　　forceParse: 0
	　});
	$('.date-end').focus(function(){
	　　　　　　$(this).blur();//不可输入状态
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
                    filename : "用户群名单_" + new Date().getMonth()+"月-"+ new Date().getDate()+"日-"+new Date().getHours()+"时.xls", //文件名称    
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