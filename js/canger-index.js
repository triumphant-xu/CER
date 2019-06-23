$(function(){
	$.ajax({
        type : "GET",
        async : true,               
        url : "http://localhost:8080/getDataOfDay",    //请求发送到TestServlet处
        data : {day:2},
        dataType : "json",        //返回数据形式为json
        success : function(result) {
                  
        },
        error : function(errorMsg) {
            //请求失败时执行该函数
            //alert("今日浏览量获取失败!");
            $('#visitor-today-number').text('342');
            $('#visitor-change-icon').attr("class", "ti-arrow-down");
            
            $('#pv-today-number').text('56');
            $('#pv-change-icon').attr("class", "ti-arrow-up");
            
            $('#newVisitor-today-number').text('21');
            $('#newVisitor-change-icon').attr("class", "ti-arrow-up");
			 		
        }
   })

   DayVisit(7,1,'main-center-echart');
   
   
   //主界面切换表格
   activityLevel("main-footer-echarts-1");
   $('#canger-form-select').change(function(){
			if($(this).children('option:selected').val()==1){
				DayVisit(7,1,'main-center-echart');
			}else if($(this).children('option:selected').val()==2){
				DayNewVisitor(7,1,'main-center-echart');
			}else if($(this).children('option:selected').val()==3){
				DayVisitor(7,1,'main-center-echart');
			}	
		});	
		
	userRetain("retain-tbody","",7);
})
