$(function(){
	
	userChannel(7,"main-center-echart");
	
});



  $('#canger-form-select').change(function(){
  	
  			var day;
  			day=$("div.select-day.btn-success").attr("value");  //获得选择的天数
  			
 //如果未实例化则进行实例化过程,在此期间会在div容器生成一个 _echarts_instance_ 属性, 该属性值其实就是当前echarts的ID,然后进行后边的渲染操作...
//当我们刷新已经实例化的echarts图表时,echarts会先匹配改div容器上的_echarts_instance_属性值是否与实例对象的ID一样,如果一样则会在原有的结构上进行渲染,但是因为我破坏了原有的结构,所以无法重新渲染出表格内容,所以我们可以执行如下代码:
			$("#main-center-echart").empty();
  			$("#main-center-echart").attr('_echarts_instance_', '')
  				
			if($(this).children('option:selected').val()==1){
				userChannel(day,"main-center-echart");
			}else if($(this).children('option:selected').val()==2){
				userDivice(day,"main-center-echart");
			}else if($(this).children('option:selected').val()==4){
				yonhuliucun("main-center-echart",day);
			}else if($(this).children('option:selected').val()==5){
				
			}	
});	



$(".select-day").click(function(){
	$(".select-day").removeClass("btn-success");
	$(".select-day").addClass("btn-normal");
	
	$(this).removeClass("btn-normal");
	$(this).addClass("btn-success");
	 $('#canger-form-select').change();	
})
