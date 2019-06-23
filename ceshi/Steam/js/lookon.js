//function createDiv(){
//	console.log("ok")
//	var  i=$("<div id='a1'><font color='aqua'>aasasas</font></div>");
//	$("body").append(i);
//}
//
//createDiv()
var item;
var chartDiv=$("<div hidden=\"true\" id=\"point-item-chart\" style=\" width:160px; height: 80px; border: solid 1px #009EFB; background:#fff; position:absolute; top:50%; left:50%;border-radius: 5px;\"></div> ");
var Node=$("<h5 id=\"title\" style=\"margin:5px;color:#353b53\"  ></h5>");
var btn=$("<div style=\"width:160px; height:50px;margin-left:30px;margin-top:20px;\"></div>")
var sure=$("<input type='button' value='确认'  />");
var cancel=$("<input type='button' value='取消'  />");
$('body').append(chartDiv);
chartDiv.append(Node);
chartDiv.append(btn);
btn.append(sure);
btn.append(cancel);
$('a').mousemove(function(e){
    var i=$(e.target);
    item=i;
    $('#point-item-chart').prop('hidden',false);
    $('#point-item-chart').find("#title").text(i.text()+"(是否埋点)")
	$('#point-item-chart').css("top",i.offset().top+i.height());
	$('#point-item-chart').css("left",i.offset().left+i.width()); 		
});
sure.click(function(){
	item.css("background-color","brown");
	$(this).parent().parent().prop('hidden',true);
	
});
cancel.click(function(){
	$(this).parent().parent().prop('hidden',true);
	
});
