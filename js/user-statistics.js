
$(function(){
	multivariateQuery(30,"main-center-echart");
	$("#select-list").find(".btn").click(function(){
			
			if($(this).parent().index()==0){          //点击修改呈现方式
				console.log("1");
			}else if($(this).parent().index()==1){    //点击查询目标			
				if($(this).hasClass("btn-success")){
					$(this).removeClass("btn-success");
					$(this).addClass("btn-normal");
					var i,j;
					var btnlist=$("#select-list").find("h4").eq(3).find(".btn-success");
					var btnlist1=$("#select-list").find("h4").eq(4).find(".btn-success");				
					for(i=0;i<btnlist.length;i++){
						for(j=0;j<btnlist1.length;j++){					
							delSeries($(this).text()+"-"+btnlist.eq(i).text()+"-"+btnlist1.eq(j).text());
						}
					}
				}else{
					$(this).removeClass("btn-normal");
					$(this).addClass("btn-success");
					var i,j;
					var btnlist=$("#select-list").find("h4").eq(3).find(".btn-success");
					var btnlist1=$("#select-list").find("h4").eq(4).find(".btn-success");				
					for(i=0;i<btnlist.length;i++){
						for(j=0;j<btnlist1.length;j++){					
							addSeries($(this).text()+"-"+btnlist.eq(i).text()+"-"+btnlist1.eq(j).text(),5000);
						}
					}
				}								
			}else if($(this).parent().index()==2){     //点击查询时间段
				console.log($(this).parent().index());
			}else if($(this).parent().index()==3){   //点击地域
				if($(this).hasClass("btn-success")){  //取消选定
					$(this).removeClass("btn-success");
					$(this).addClass("btn-normal");
					var i,j;
					var btnlist=$("#select-list").find("h4").eq(1).find(".btn-success");
					var btnlist1=$("#select-list").find("h4").eq(4).find(".btn-success");
					for(i=0;i<btnlist.length;i++){
						for(j=0;j<btnlist1.length;j++){					
							delSeries(btnlist.eq(i).text()+"-"+$(this).text()+"-"+btnlist1.eq(j).text());
						}
					}			
				}else{                                //按钮被选中
					$(this).removeClass("btn-normal");
					$(this).addClass("btn-success");
					var i,j;
					var btnlist=$("#select-list").find("h4").eq(1).find(".btn-success");
					var btnlist1=$("#select-list").find("h4").eq(4).find(".btn-success");
					for(i=0;i<btnlist.length;i++){
						for(j=0;j<btnlist1.length;j++){					
							addSeries(btnlist.eq(i).text()+"-"+$(this).text()+"-"+btnlist1.eq(j).text(),3000);
						}
					}
				}				
			}else if($(this).parent().index()==4){     //点击设备				
				if($(this).hasClass("btn-success")){
					$(this).removeClass("btn-success");
					$(this).addClass("btn-normal");
					var i,j;
					var btnlist=$("#select-list").find("h4").eq(1).find(".btn-success");
					var btnlist1=$("#select-list").find("h4").eq(3).find(".btn-success");
					for(i=0;i<btnlist.length;i++){
						for(j=0;j<btnlist1.length;j++){					
							delSeries(btnlist.eq(i).text()+"-"+btnlist1.eq(j).text()+"-"+$(this).text());
						}
					}
					
				}else{
					$(this).removeClass("btn-normal");
					$(this).addClass("btn-success");				
					var i,j;
					var btnlist=$("#select-list").find("h4").eq(1).find(".btn-success");
					var btnlist1=$("#select-list").find("h4").eq(3).find(".btn-success");
					for(i=0;i<btnlist.length;i++){
						for(j=0;j<btnlist1.length;j++){					
							addSeries(btnlist.eq(i).text()+"-"+btnlist1.eq(j).text()+"-"+$(this).text(),1500);
						}
					}
				}			
			}
	});
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
	
osStatistics("main-footer-echarts-1");
visitorsYears("main-footer-echarts-2");




//数据呈现方式改变
$('#select-date-mode').change(function(){
		var first=$('#echart-select-list').find('li').eq(0);
		var last=$('#echart-select-list').find('li').eq($('#echart-select-list').find('li').length-1);
		$('#echart-select-list').empty("li");
		$('#echart-select-list').append(first);
		$('#echart-select-list').append(last);
		removeEcharts('main-center-echart');
		$('#main-center-echart').empty();
		addServer();			
});



findUserList =function(){
	   var table= $("<table  id=\"user-table\" class=\"table stylish-table\" ><thead > <tr><th colspan=\"1\">用户名</th><th>年龄</th><th>注册日期</th><th>上次登录日期</th><th>上次退出日期</th><th>上次登录IP</th><th>上次登录地点</th><th>近七日访问时长</th><th>标签</th> </tr></thead><tbody > </tbody></table>");
	   var table_li=$("<tr hidden=\"true\"> <th >用户名</th><th>年龄</th><th>注册日期</th><th>上次登录日期</th><th>上次退出日期</th><th>上次登录IP</th><th>上次登录地点</th><th>近七日访问时长</th> <th>标签</th></tr> ");
       table.find('tbody').append(table_li);                             
                                    
	   $('#main-center-echart').empty();
	   $('#main-center-echart').append(table);
	      
	   
	   for(var i=0;i<39;i++){
	   	var tr=$('#user-table').find('tbody').find('tr').eq(0).clone(true);
	   	tr.prop("hidden",false);
	   	tr.find('th').eq(0).text("张三");   //
	   	tr.find('th').eq(1).text("21");    //
	   	tr.find('th').eq(2).text("2019-3-3");  //
	   	tr.find('th').eq(3).text("2019-4-3  18:24:25");  //
	   	tr.find('th').eq(4).text("2019-4-3  18:37:17");  //
	   	tr.find('th').eq(5).text("192.0.0.1");  //
	   	tr.find('th').eq(6).text("未知");  //
	   	tr.find('th').eq(7).text("43.5");  //
	   	tr.find('th').eq(8).text("管理员");  //

	   	table.find('tbody').append(tr);
	   	
	   }   
	   $('#main-center-echart').append(table);
	   
	   //表格头部固定方法
	   $("#main-center-echart").scroll(function(){
		if($(this).attr("style").indexOf("overflow")>-1){
			var scrollTop = this.scrollTop;
			$(this).find("thead").attr("style","transform: translateY(" + scrollTop + "px);")
		};
		});

}

    		


