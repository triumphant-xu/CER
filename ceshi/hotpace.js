var item;
var chartDiv=$("<div hidden=\"true\" id=\"point-item-chart\" style=\" width:150px; height: 80px; border: solid 1px #009EFB; background:#fff; position:absolute; top:50%; left:50%;border-radius: 5px;\"></div> ");
var Node=$("<h5 id=\"title\" style=\"margin:5px;color:#353b53\"  ></h5>");
var Data=$("<div style=\"width:160px; height:50px;margin-left:5px;margin-top:10px;\"></div>")
var pv=Math.floor(Math.random()*3000)
var Today=$("<p>今日点击量:"+pv+"</p>")
var Weed=$("<p>近7日点击量:"+pv*5+"</p>")
$('body').append(chartDiv);
chartDiv.append(Node);
chartDiv.append(Data);
Data.append(Today);
Data.append(Weed);
$(function(){
	
	for(var i=10;i<30;i++){
		$('body').find('a').eq(i).css('background-color','rgba(255,0,0,'+Math.random()*1+')');
	
	}
	
})


$('a').mouseover(function(e){
    var i=$(e.target);
    item=i;
    $('#point-item-chart').prop('hidden',false);
    $('#point-item-chart').find("#title").text(i.text()+"(埋点情况)")
	$('#point-item-chart').css("top",i.offset().top+i.height());
	$('#point-item-chart').css("left",i.offset().left+i.width()); 	
	$('#point-item-chart').css("z-index",2147483647);
});
//sure.click(function(){
//	item.parent().css("background-color","brown");
//	$(this).parent().parent().prop('hidden',true);
//	
//});
//cancel.click(function(){
//	$(this).parent().parent().prop('hidden',true);
//	
//});
