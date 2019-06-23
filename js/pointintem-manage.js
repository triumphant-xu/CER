
//从后台获取埋点信息并添加入网页
loadPointItem=function(){
	    $.ajax({
        type : "POST",
        async : true,            //异步请求（同步请求将会锁住浏览器，用户其他操作必须等待请求完成才可以执行）
        url : "http://localhost:8080/getAllPointItem",    //请求发送到TestServlet处
        data : {},
        dataType : "json",        //返回数据形式为json
        success : function(result) {
           for(var i=0;i<result.length;i++){
			   	var tr=$('#user-table').find('tbody').find('tr').eq(0).clone(true);
			   	tr.prop("hidden",false);
			   	tr.find('th').eq(0).text(result[i].p_name);   //
			   	
			   	tr.find('th').eq(0).click(function(){
			   		showPointVisit($(this));
			   	});
			   		   	
			   	tr.find('th').eq(1).text(result[i].p_id);    //
			   	tr.find('th').eq(2).text(result[i].eq);  //
			   	tr.find('th').eq(3).text(Math.floor(Math.random()*6000)+3000);
			   	if(result[i].p_state==1){
			   		tr.find('th').eq(4).find('input').prop("checked",true); 
			   	}   		
	   			$('#user-table').find('tbody').append(tr);   	
	        }
            $('#user-table').find('input').click(function(){
            	if($(this).prop("checked")){          		
            		updatePointItemToOne($(this).parent().parent().find('th').eq(2).text());
            	}else{
            		updatePointItemToZero($(this).parent().parent().find('th').eq(2).text());		
            	}  	
            });
	        
        },
        error : function(errorMsg) {
            alert("请求数据失败!");   
        }
    })
}


addItemList =function(){
	   var table= $("<table  id=\"user-table\" class=\"table stylish-table\" ><thead > <tr><th colspan=\"1\">埋点内容</th><th>埋点id</th><th>eq</th><th>近七日点击次数</th><th>是否收集该埋点数据</th></tr></thead><tbody > </tbody></table>");
	   var table_li=$("<tr hidden=\"true\"> <th >埋点</th><th>埋点id</th><th>eq</th><th>近七日点击次数</th><th><input type='checkbox' /></th></tr> ");
       table.find('tbody').append(table_li);                             
                                    
	   $('#main-center-echart').empty();
	   $('#main-center-echart').append(table);  
	    
	   loadPointItem();
	    
	   //表格头部固定方法
	   $("#main-center-echart").scroll(function(){
		if($(this).attr("style").indexOf("overflow")>-1){
			var scrollTop = this.scrollTop;
			$(this).find("thead").attr("style","transform: translateY(" + scrollTop + "px);")
		};
	});
}

//清空样式
removeEcharts('main-center-echart');
addItemList();		
		
		
		
//名单的导出
 $("#output-select").click(function () {    
                $("#user-table").table2excel({    
                    exclude  : ".noExl", //过滤位置的 css 类名    
                    filename : "埋点名单" + new Date().getTime() + ".xls", //文件名称    
                    name: "Excel Document Name.xlsx",    
                    exclude_img: true,    
                    exclude_links: true,    
                    exclude_inputs: true    
                });    
});  


//把eq埋点改为不收集数据
updatePointItemToZero=function(eq){
 	$.ajax({
        type : "POST",
        async : true,            //异步请求（同步请求将会锁住浏览器，用户其他操作必须等待请求完成才可以执行）
        url : "http://localhost:8080/updatePointItem",    //请求发送到TestServlet处
        data : {eq:eq},
        dataType : "json",        //返回数据形式为json
        success : function(result) {
          	    console.log('eq='+eq+'节点修改成功');    
        },
        error : function(errorMsg) {
            
        }
   })
}

//把eq结点改为收集数据
updatePointItemToOne=function(eq){
 	$.ajax({
        type : "POST",
        async : true,            //异步请求（同步请求将会锁住浏览器，用户其他操作必须等待请求完成才可以执行）
        url : "http://localhost:8080/updatePointItemToOne",    //请求发送到TestServlet处
        data : {eq:eq},
        dataType : "json",        //返回数据形式为json
        success : function(result) {      	 
        },
        error : function(errorMsg) {      
        }
   })
}

//展现埋点近期七日访问情况
showPointVisit=function(th){
	$('#point-item-chart').prop('hidden',false);	
	$('#point-item-chart').css("top",th.offset().top+40);
	$('#point-item-chart').css("left",th.offset().left+30);
	PointVisit(th.text(),7,1,'point-item-chart-body');
}



//埋点近期日访问情况的点击隐藏
$('#point-item-chart-close').click(function(){
	$('#point-item-chart').attr("hidden",true);
})

