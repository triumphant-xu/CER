$(function(){
	roadAnalysis();
})


$('#canger-form-select').change(function(){		
		if($('#canger-form-select').children('option:selected').val()==1){  //用户群名单查询		
				roadAnalysis();		
		}else if($('#canger-form-select').children('option:selected').val()==2){  //用户列表查询
				eventAnalysis("main-center-echart",7);
		}
});