


$('body').find('#creat').click(function(){
	$('#creat-win').attr("hidden",false);
	$('#creat-win').css("top",$(this).offset().top);
	$('#creat-win #tenant-group-name').val("");
	$(".huo").find("li").eq($(".huo").find("li").length-1).prevAll().remove();
});


//分群窗口的退出
exitTenantGroup=function(p){
	$(p).parent().parent().parent().attr("hidden",true);
}

//点击新建且条件
createConditionQie=function(p){
	var li=$("#condition-mode").find("li").eq(0).clone(true);
	li.find(".qie").find(li)
	$(p).parent().before(li);
}

//点击新建或条件
createConditionHuo=function(p){
	var li=$("#condition-mode").find("li").eq(1).clone(true);
	createConditionQie(li.find(".qie").find("li").find("div").eq(0));
	$(p).parent().before(li);
}

//退出编辑事件
exitEdit=function(p){
	$(p).parent().parent().parent().attr("hidden",true);
}


//删除条件
deleteCondition=function(p){
	
	if($(p).parent().parent().parent().find("li").length==2){
		$(p).parent().parent().parent().parent().remove();
	}
	$(p).parent().parent().remove();
}

var list=[];   //装载所有条件数组



//新创建分群，会将分群的条件信息放进list数组,list最后的元素存储分群的名称
doCondition=function(){	
	var i,j;
	var h,q;    //h存代表当前新建群中或的集合，q代表某一条或中且的集合
	
	h=$(".huo").find("li");
	for(i=0;i<h.length-1;i++){
		var qlist=[]; //存放一条或中的所有且条件
		q=h.eq(i).find(".qie").find("li");
		for(j=0;j<q.length-1;j++){
			qlist.push({
				mode:q.eq(j).find("#select-mode").children('option:selected').val(),
				startDate:q.eq(j).find("#start-date").val(),
				endDate:q.eq(j).find("#end-date").val(),
				startTime:q.eq(j).find("#start-time").val(),
				endTime:q.eq(j).find("#end-time").val(),
				compare:q.eq(j).find("#compare").val(),
				scopeNumber:q.eq(j).find("#scope-number").val()
			});
		}
		if(qlist.length>0)   //即该条或里有至少一条且元素
		   list.push(qlist);
	}
	
	//判断有无分群名称
	if($("#tenant-group-name").val()==""){
		alert("请输入分群名称");	
		return;
	}
	
	list.push($("#tenant-group-name").val());    //获取用户方分群的名称
	var newtr= $("#tenant-group-table").find("tbody").find("tr").eq(0).clone(true);
	newtr.attr("hidden",false);
	newtr.attr("name",list);
	newtr.find("th").eq(0).text(list[list.length-1]);
	newtr.find("th").eq(1).text(Math.floor(Math.random()*10)+10);
	newtr.find("th").eq(2).text("2019/"+(new Date().getMonth()+1)+"/"+ new Date().getDate()+"\t"+new Date().getHours()+":"+new Date().getMinutes());
    newtr.find("th").eq(3).text("无");
    newtr.find("th").eq(4).text("user");
    //添加点击分群名称提供编辑分群能力的按钮
	newtr.find('th').eq(0).click(function(){
		findOneTenantGroup(list);
	});
	
	//点击用户数量加载用户群名单
	newtr.find('th').eq(1).click(function(){
		location.href = "user-list.html?tenantGroupName="+$(this).parent().find("th").eq(0).text();//location.href实现客户端页面的跳转  
	});
	
	$("#tenant-group-table").find("tbody").append(newtr);
	$('#creat-win').attr("hidden",true);
}

//加载用户分群列表
findTenantGroup=function(){
	   var table= $("<table  id=\"tenant-group-table\" class=\"table stylish-table\" ><thead > <tr><th colspan=\"1\">分群名称</th><th>用户数量</th><th>创建日期</th><th>上次修改日期</th><th>创建者</th></tr></thead><tbody > </tbody></table>");
	   var table_li=$("<tr hidden=\"true\"><th>分群名称</th><th>用户数量</th><th>创建日期</th><th>上次修改日期</th><th>创建者</th></tr> ");
       table.find('tbody').append(table_li);                             
         
       removeEcharts('main-center-echart');
	   $('#main-center-echart').empty();
	   $('#main-center-echart').append(table);
	   
	   
	   var trlist= $("<tr ><th>静默用户</th><th>15</th><th>2019/5/12	11:12</th><th>无</th><th>user</th></tr><tr ><th>高消费用户</th><th>15</th><th>2019/5/12	10:13</th><th>无</th><th>user</th></tr><tr ><th>高忠诚用户</th><th>13</th><th>2019/5/12	11:13</th><th>无</th><th>user</th></tr><tr ><th>活跃用户</th><th>19</th><th>2019/5/20	11:45</th><th>无</th><th>user</th></tr>")
	   table.find('tbody').append(trlist);  
	  
	  
	  //点击用户数量加载用户群名单
		trlist.find('th').click(function(){
			location.href = "user-list.html?tenantGroupName="+$(this).parent().find("th").eq(0).text();//location.href实现客户端页面的跳转  
		});
	   
	   
	   //表格头部固定方法
	   $("#main-center-echart").scroll(function(){
		if($(this).attr("style").indexOf("overflow")>-1){
			var scrollTop = this.scrollTop;
			$(this).find("thead").attr("style","transform: translateY(" + scrollTop + "px);")
		};
		});   
}
//查看用户分群的筛选信息，并提供编辑功能
findOneTenantGroup=function(list){
	
	console.log("构建编辑页面");
	console.log(list);
	//清空窗口
	$(".editWin").children("li:last-child").prevAll().remove();
	console.log($(".editWin").find("li"));
	var i,j;
	
	//创建或条目
	for(i=0;i<list.length-1;i++){   
		
		var h=$("#condition-mode").find("li").eq(1).clone(true);   //新建一个或条目			
		//创建且条目
		for(j=0;j<list[i].length;j++){
			var q=$("#condition-mode").find("li").eq(0).clone(true);       //新建一个且条目
			
			q.find("#select-mode").find("option[value='"+list[i][j].condition+"']").attr("selected",true);                                                         //list[i][j]为一个且条件的集合
			q.find("#start-date").val(list[i][j].startDate);
			q.find("#end-date").val(list[i][j].endDate);
			q.find("#start-time").val(list[i][j].startTime);
			q.find("#end-time").val(list[i][j].endTime);
			q.find("#compare").find("option[value='"+list[i][j].compare+"']").attr("selected",true);  
			q.find("#scope-number").val(list[i][j].scopeNumber);		
			//向且ul中加入且的li
			h.find(".qie").children("li:last-child").before(q);
		}
		
		//向装在或条件列表ul中加入或条件条目li
		$(".editWin").children("li:last-child").before(h);
	}
	
	$("#edit-win").find("#tenant-group-name").val(list[list.length-1]);	
	//显示出窗口
	$('#edit-win').attr("hidden",false);
	//设置窗口位置
	$('#edit-win').css("top",$("#creat").offset().top);
}

//查询方式的切换
$('#select-date-mode').change(function(){		
		if($('#select-date-mode').children('option:selected').val()==1){  //用户群名单查询		
				findTenantGroup();				
		}else if($('#select-date-mode').children('option:selected').val()==2){  //用户列表查询
				$('#echart-select-list').find('li').eq(0).attr("hidden",true);	
		        $('#echart-select-list').find('li').eq(1).attr("hidden",false);	
		}
});

//网页资源准备完毕
$(function(){
	findTenantGroup();	
		//结束时间设置为今天
	var d=new Date();
	var month=("0" + (d.getMonth() + 1)).slice(-2);
	var day=("0" + (d.getDate() + 1)).slice(-2);
	$("#end-date").val(new Date().getFullYear()+"-"+month+"-"+day);
});
