/*
formdiv即代表存放表格的div
dayflow     用户各时间段访问统计表格
userdistribution    用户地区分布表格
 */

//var formdiv=document.getElementById('content'); //放表的div
//var myChart = echarts.init(formdiv);

 //产生一组随机数据，基准，浮动，数组长度
dataGeneration=function(baseNumber,floatNumber,day){
	//将开始时间设置为day天前
			data=[];
			for(i=0;i<day;i++){
				data.push( baseNumber+Math.floor(Math.random()*(day*10+floatNumber)));
			}
			return data;
}



//产生一组日期，1：天为单位   0：时为单位,
//sday int  日期的开始    在今天的sday前开始
//eday  int  日期的结束  在今天的 eday前结束
dateGeneration=function(datetype,sday,eday){
	//将开始时间设置为day天前
			var p=new Date();
			xdate=[];
			p.setDate(p.getDate()-sday);		
			for(i=0;i<sday-eday;i++){
				if(i==0||(p.getMonth()==0&&p.getDate()==1)){
					xdate.push(p.getFullYear()+"/"+(p.getMonth()+1)+"/"+p.getDate());									
				}
				else{
					xdate.push((p.getMonth()+1)+"/"+p.getDate());
					
				}				
				p.setDate(p.getDate()+1);
			}
			
			return xdate;
}
			



/*解决图标在应用模式下宽度不正常问题，
内容框page-wrapper的左边距为240px(右移240px显示出左边菜单栏),width=body.width-240px(css属性)
当在应用模式下时,width=body.width(由js设置);但是echart图标的width=body.width-240px(继承pafe-wrapper基础属性);
所以在应用模式下,将page-wrapper的css设为body.width,即100%,目的让其echarts的宽度也为100%,图表正常显示
当body.width<482px时，进入手机应用模式
*/




$(function(){
	var i=0;var p;
	for(i=0;i<$(".page-wrapper").length;i++){
		p=$(".page-wrapper").eq(i);
        if($("body").width()<482){    
        	p.css("width","100%");
        }
	}
});


function removeEcharts(name){
	var formdiv=document.getElementById(name); 
	var myChart = echarts.init(formdiv);
	 myChart.clear();
}

//sday~eday日期(2019-1-1)  用户名name，ID为存放表格div的id。显示用户的访问路径
userRoad=function(name,sday,eday,id){
	
	
}

//近day日埋点点击次数,flag=1加载对比数据，0不加载，id为存放表格div的id,name为埋点的名字
function PointVisit(name,day,flag,id){  
	//加载表格得div
	var formdiv=document.getElementById(id); 
    var myChart = echarts.init(formdiv);
    myChart.clear();
    myChart.setOption ({
        title: {
            text: name+'近'+day+'日点击次数',
            subtext:''
        },
        tooltip: {
            trigger: 'axis'
        },
       legend: {
        data:[name+'近'+day+'日点击次数','同比数据']
       },
        toolbox: {
            show: true,
            feature: {
                dataZoom: {
                    yAxisIndex: 'none'
                },
                dataView: {readOnly: false},
                magicType: {type: ['line', 'bar']},
                restore: {},
                saveAsImage: {}
            }
        },
        xAxis: {
            name:'日期',
            boundaryGap : false,
            data: []
        },
        yAxis: {
            name:'人次',
            boundaryGap:[0,0.05],//y轴下端留空0%，上端留空5%
        },
        series: [
            {
                name:name+'近'+day+'日点击次数',
                type:'line',
                smooth:'true',
                data:[],
                markPoint: {
                    data: [
                        {type: 'max', name: '最大值'},
                        {type: 'min', name: '最小值'}
                    ]
                },
                markLine: {
                    data: [
                        {type: 'average', name: '平均'}
                    ]
                },
                itemStyle: {normal: {areaStyle: {type: 'default'}}},
            },
            {
                name:'同比数据',
                type:'line',
                smooth:'true',
                data:[],
                markPoint: {
                    data: [
                        {type: 'max', name: '最大值'},
                        {type: 'min', name: '最小值'}
                    ]
                },
                markLine: {
                    data: [
                        {type: 'average', name: '平均'}
                    ]
                },
                itemStyle: {normal: {areaStyle: {type: 'default'}}},
            }
        ]
    });
    myChart.showLoading();    //数据加载完之前先显示一段简单的loading动画

    var names=[];    // X轴
    var nums=[];    //  第一组数据
    var nums2=[];     //  第二组数据

    $.ajax({
        type : "GET",
        async : true,            //异步请求（同步请求将会锁住浏览器，用户其他操作必须等待请求完成才可以执行）
        url : "http://localhost:8080/getPointVisit",    //请求发送到TestServlet处
        data : {day:flag?2*day:day},
        dataType : "json",        //返回数据形式为json
        success : function(result) {
            //请求成功时执行该函数内容，result即为服务器返回的json对象
            //请求成功时执行该函数内容，result即为服务器返回的json对象
            if (result) {
            	console.log(result);
                for(var i=0;i<result.length;i++){
                    names.push(result[i].day);    //取出类目
                }
                for(var i=0;i<result.length;i++){
                    nums.push(result[i].count);    //取出数据
                    nums2.push(result[i+day]);
                }
                myChart.hideLoading();    //隐藏加载动画
                myChart.setOption({        //加载数据图表
                    xAxis: {
                        data: names
                    },
                    series: [{
                        // 根据名字对应到相应的系列
                        name: '近'+day+'日点击次数',
                        data: nums
                    }]
                });
            }
        },
        error : function(errorMsg) {
           //请求失败时执行该函数
           // alert("ERROR:图表请求数据失败!");
            dataGeneration(10000,3000,day);
            myChart.hideLoading();          
            myChart.setOption({        //加载数据图表
                    xAxis: {
                        data:xdate,
                    },
                    series: [{
                        // 根据名字对应到相应的系列
                        name: name+'近'+day+'日点击次数',
                        data:data1
                    },{
                    	name: '同比数据',
                        data: data2
                    }]
                });    
        }
    });
    
    
    
};



//复合查询
function multivariateQuery(day,id){   
	var formdiv=document.getElementById(id); 
    var myChart = echarts.init(formdiv);
    
    myChart.clear();
    myChart.setOption ({
        title: {
            text: '苍耳统计',
            subtext:''
        },
        tooltip: {
            trigger: 'axis' ,
            formatter:"{b}<br />{a0}:{c0}<br/>",
        },
        legend: {
        	data:["访问量-全国-所有设备"]
       	},
        toolbox: {
            show: true,
            feature: {
                dataZoom: {
                    yAxisIndex: 'none'
                },
                dataView: {readOnly: false},
                magicType: {type: ['line', 'bar']},
                restore: {},
                saveAsImage: {}
            }
        },
        xAxis: {
            name:'日期',
            boundaryGap : false,
            data: []
        },
        yAxis: {
            name:'人次',
            boundaryGap:[0,0.05],//y轴下端留空0%，上端留空5%
        },
        series: [
            {
                name:'访问量-全国-所有设备',
                type:'line',              
                data:[],
                markPoint: {
                    data: [
                        {type: 'max', name: '最大值'},
                        {type: 'min', name: '最小值'}
                    ]
                },
                markLine: {
                    data: [
                        {type: 'average', name: '平均'}
                    ]
                },
               
            },          
        ]
    });
    myChart.showLoading();    //数据加载完之前先显示一段简单的loading动画

    var names=[];    // X轴
    var nums=[];    //  第一组数据
    var nums2=[];     //  第二组数据

    $.ajax({
        type : "GET",
        async : true,            //异步请求（同步请求将会锁住浏览器，用户其他操作必须等待请求完成才可以执行）
        url : "http://localhost:8080/getDataOfDay",    //请求发送到TestServlet处
        data : {},
        dataType : "json",        //返回数据形式为json
        success : function(result) {
            //请求成功时执行该函数内容，result即为服务器返回的json对象
            //请求成功时执行该函数内容，result即为服务器返回的json对象
            if (result) {
            	console.log(result);
                for(var i=0;i<result.length;i++){
                    names.push(result[i].day);    //取出类目
                }
                for(var i=0;i<result.length;i++){
                    nums.push(result[i].count);    //取出数据
                    nums2.push(result[i+day]);
                }
                myChart.hideLoading();    //隐藏加载动画
                myChart.setOption({        //加载数据图表
                    xAxis: {
                        data: names
                    },
                    series: [{
                        // 根据名字对应到相应的系列
                        name: '近'+day+'日访问量',
                        data: nums
                    }]
                });
            }
    },
        error : function(errorMsg) {
            //请求失败时执行该函数
            
            var data1= dataGeneration(10000,5000,day);         
            var xdate=dateGeneration(1,day,0);
            //alert("ERROR:图表请求数据失败!");
            myChart.hideLoading();
            
            
            
            myChart.setOption({        //加载数据图表
                    xAxis: {
                        data:xdate,
                    },
                    series: [{
                        // 根据名字对应到相应的系列
                        name: '访问量-全国-所有设备',
                        data: data1,
                    }]
                });         
        }
    });
};


/*向div为id且已有echart的表格添加入一组数据*/
function addSeries(name,baseNumber){     //需要放入表的div   1/0  是否清空表格
	//加载表格得div
	var formdiv=document.getElementById("main-center-echart");
	var myChart = echarts.init(formdiv);	
	var myOption=myChart.getOption();    //图表的设置	 
	var myformatter="{b}<br />";        //图表悬浮指示框
	var ndata=dataGeneration(baseNumber,baseNumber/2,myOption.series[0].data.length) ;//数据组
	var myseries;                         //准备插入的数据
	

    
    myOption.legend[0].data.push(name);    //将新的数据名插入
    
    myseries= jQuery.extend(true,{}, myOption.series[0]);   //对数据进行赋值
    myseries.name=name;
    myseries.data=ndata;
    myOption.series.push(myseries);
    
   
    var i;
    for(i=0;i<myOption.series.length;i++){        //对图标悬浮指示框进行重写
    	myformatter=myformatter+"{a"+i+"}:"+"{c"+i+"}<br/>";
    } 
    myOption.tooltip[0].formatter=myformatter;    //应用
    myChart.setOption(myOption);                 //应用
    
    
    console.log(myOption);
}


//移除一组数据
function delSeries(name){
	var formdiv=document.getElementById("main-center-echart");
	var myChart = echarts.init(formdiv);
	var myOption =jQuery.extend(true,{},myChart.getOption());    //复刻option，因为等下需要清空option,所以不能简单地引地址
	var myformatter="{b}<br />";         //图表悬浮指示框
	var i;
	
	console.log(myOption);

	for(i=0;i<myOption.series.length;i++){  //删除数据series
		if(myOption.series[i].name==name){
			myOption.series.splice(i,1);
			console.log("删除数据成功")
			break;
		}
	}
	
	
	for(i=0;i<myOption.series.length;i++){   //对图标悬浮指示框进行重写
    	myformatter=myformatter+"{a"+i+"}:"+"{c"+i+"}<br/>";
  	}
	
	
	myOption.tooltip[0].formatter=myformatter;    //应用
	
	myChart.clear();  //清空mycharts数据,否则需要删除的数据会残留，必须清空重写
    myChart.setOption(myOption);                //应用
	
}

/*近day日访问量,flag=1加载对比数据，0不加载,id为加载表div的id*/
function DayVisit(day,flag,id){   
	var formdiv=document.getElementById(id); 
    var myChart = echarts.init(formdiv);
    var formatter;
    if(flag==1){
    	formatter='{b}<br />当&emsp;日 :{c0}人次<br />'+day+'天前 : {c1}人次';
    }else{
    	formatter='{b}<br />当&emsp;日 :{c0}人次<br />';
    }
    myChart.clear();
    myChart.setOption ({
        title: {
            text: '近'+day+'日访问量',
            subtext:''
        },
        tooltip: {
            trigger: 'axis' ,
            formatter: formatter,
        },
       legend: {
        data:['近'+day+'日访问量','同比']
       },
        toolbox: {
            show: true,
            feature: {
                dataZoom: {
                    yAxisIndex: 'none'
                },
                dataView: {readOnly: false},
                magicType: {type: ['line', 'bar']},
                restore: {},
                saveAsImage: {}
            }
        },
        xAxis: {
            name:'日期',
            boundaryGap : false,
            data: []
        },
        yAxis: {
            name:'人次',
            boundaryGap:[0,0.05],//y轴下端留空0%，上端留空5%
        },
        series: [
            {
                name:'近'+day+'日访问量',
                type:'line',              
                data:[],
                markPoint: {
                    data: [
                        {type: 'max', name: '最大值'},
                        {type: 'min', name: '最小值'}
                    ]
                },
                markLine: {
                    data: [
                        {type: 'average', name: '平均'}
                    ]
                },
               
            },
            {
                name:'同比',
                type:'line',             
                data:[],
                markPoint: {
                    data: [
                        {type: 'max', name: '最大值'},
                        {type: 'min', name: '最小值'}
                    ]
                },
                markLine: {
                    data: [
                        {type: 'average', name: '平均'}
                    ]
                },
                
            }
        ]
    });
    myChart.showLoading();    //数据加载完之前先显示一段简单的loading动画

    var names=[];    // X轴
    var nums=[];    //  第一组数据
    var nums2=[];     //  第二组数据

    $.ajax({
        type : "GET",
        async : true,            //异步请求（同步请求将会锁住浏览器，用户其他操作必须等待请求完成才可以执行）
        url : "http://localhost:8080/getDataOfDay",    //请求发送到TestServlet处
        data : {day:flag?2*day:day},
        dataType : "json",        //返回数据形式为json
        success : function(result) {
            //请求成功时执行该函数内容，result即为服务器返回的json对象
            //请求成功时执行该函数内容，result即为服务器返回的json对象
            if (result) {
            	console.log(result);
                for(var i=0;i<result.length;i++){
                    names.push(result[i].day);    //取出类目
                }
                for(var i=0;i<result.length;i++){
                    nums.push(result[i].count);    //取出数据
                    nums2.push(result[i+day]);
                }
                myChart.hideLoading();    //隐藏加载动画
                myChart.setOption({        //加载数据图表
                    xAxis: {
                        data: names
                    },
                    series: [{
                        // 根据名字对应到相应的系列
                        name: '近'+day+'日访问量',
                        data: nums
                    }]
                });
                
                //flag==1,加载同比数据
                if(flag==1){
            	myChart.setOption({        //加载对比数据
                    series: [{
                    	name: '同比',
                        data: nums2,
                    }]
                });	       	
            }
            }
    },
        error : function(errorMsg) {
            //请求失败时执行该函数
            
            var data1= dataGeneration(10000,5000,day);
            var data2=dataGeneration(10000,5000,day);
            var xdate=dateGeneration(1,day,0);
            //alert("ERROR:图表请求数据失败!");
            myChart.hideLoading();
            
            
            
            myChart.setOption({        //加载数据图表
                    xAxis: {
                        data:xdate,
                    },
                    series: [{
                        // 根据名字对应到相应的系列
                        name: '近'+day+'日访问量',
                        data: data1,
                    }]
                });
            if(flag==1){
            	console.log("加载同比数据");
            	myChart.setOption({        //加载对比数据
                    series: [{
                    	name: '同比',
                        data: data2,
                    }]
                });	       	
            }
            
        }
    });
     if(flag==0){
    	var myOption=myChart.getOption();
    	myOption.legend[0].data[1]=null;
    	//myOption.series[1];
    	myChart.setOption(myOption);
    	console.log(myOption);
    }
};

//近day日独立访客 ,flag=1加载对比数据，为0不加载
function DayVisitor(day,flag,id){  
	//加载表格得div
	var formdiv=document.getElementById(id); 
    var myChart = echarts.init(formdiv);
    var formatter;
    if(flag==1){
    	formatter='{b}<br />当&emsp;日 :{c0}人次<br />'+day+'天前 : {c1}人次';
    	
    }else{
    	formatter='{b}<br />当&emsp;日 :{c0}人次<br />';
    }
    myChart.clear();
    myChart.setOption ({
        title: {
            text: '近'+day+'日独立访客',
            subtext: ''
        },
        tooltip: {
            trigger: 'axis',
            formatter: formatter,
        },
       legend: {
        data:['近'+day+'日', '同比']
       },
        toolbox: {
            show: true,
            feature: {
                dataZoom: {
                    yAxisIndex: 'none'
                },
                dataView: {readOnly: false},
                magicType: {type: ['line', 'bar']},
                restore: {},
                saveAsImage: {}
            }
        },
        xAxis: {
            name:'日期',
            boundaryGap : false,
            data: []
        },
        yAxis: {
            name:'人次',
            boundaryGap:[0,0.05],//y轴下端留空0%，上端留空5%
        },
        series: [
            {
                name:'近'+day+'日',
                type:'line',
                data:[],
                markPoint: {
                    data: [
                        {type: 'max', name: '最大值'},
                        {type: 'min', name: '最小值'}
                    ]
                },
                markLine: {
                    data: [
                        {type: 'average', name: '平均'}
                    ]
                },       
            },
            {
                name:'同比',
                type:'line',
                data:[],
                markPoint: {
                    data: [
                        {type: 'max', name: '最大值'},
                        {type: 'min', name: '最小值'}
                    ]
                },
                markLine: {
                    data: [
                        {type: 'average', name: '平均'}
                    ]
                },            
            }
        ]
    });
    myChart.showLoading();    //数据加载完之前先显示一段简单的loading动画

    var names=[];    // X轴
    var nums=[];    //  第一组数据
    var nums2=[];     //  第二组数据

    $.ajax({
        type : "GET",
        async : true,            //异步请求（同步请求将会锁住浏览器，用户其他操作必须等待请求完成才可以执行）
        url : "http://localhost:8080/getDataOfDay",    //请求发送到TestServlet处
        data : {day:day+flag*day},
        dataType : "json",        //返回数据形式为json
        success : function(result) {
            //请求成功时执行该函数内容，result即为服务器返回的json对象
            //请求成功时执行该函数内容，result即为服务器返回的json对象
            if (result) {
                for(var i=0;i<day;i++){
                    names.push(result[i].day);    //取出类目
                }
                for(var i=0;flag=1&&i<day;i++){
                    nums.push(result[i].count);    //取出数据
                    nums2.push(result[i+7])
                }
                myChart.hideLoading();    //隐藏加载动画
                myChart.setOption({        //加载数据图表
                    xAxis: {
                        data: names
                    },
                    series: [{
                        // 根据名字对应到相应的系列
                        name: '近'+day+'日',
                        data: nums
                    }]
                });
            }
        },
        error : function(errorMsg) {
            //请求失败时执行该函数
			var data1= dataGeneration(10000,5000,day);
            var data2=dataGeneration(10000,5000,day);
            var xdate=dateGeneration(1,day,0);			
           // alert("ERROR:图表请求数据失败!");
            myChart.hideLoading();
            
            myChart.setOption({        //加载数据图表
                    xAxis: {
                        data: xdate,
                    },
                    series: [{
                        // 根据名字对应到相应的系列
                        name: '近'+day+'日',
                        data: data1,
                    },{
                    	name: '同比',
                        data: data2,
                    }]
                });
            
        }
    })
};

//近day日新增用户
function DayNewVisitor(day,flag,id){  
	//加载表格得div
	var formdiv=document.getElementById(id); 
    var myChart = echarts.init(formdiv);
    var formatter;
    if(flag==1){
    	formatter='{b}<br />当&emsp;日 :{c0}人次<br />'+day+'天前 : {c1}人次';
    }else{
    	formatter='{b}<br />当&emsp;日 :{c0}人次<br />';
    }
    myChart.clear();
    myChart.setOption ({
        title: {
            text: '近'+day+'日新增用户',
            subtext: ''
        },
        tooltip: {
            trigger: 'axis',
            formatter: formatter,
        },
       legend: {
        data:['近'+day+'日', '同比']
       },
        toolbox: {
            show: true,
            feature: {
                dataZoom: {
                    yAxisIndex: 'none'
                },
                dataView: {readOnly: false},
                magicType: {type: ['line', 'bar']},
                restore: {},
                saveAsImage: {}
            }
        },
        xAxis: {
            name:'日期',
            boundaryGap : false,
            data: []
        },
        yAxis: {
            name:'人次',
            boundaryGap:[0,0.05],//y轴下端留空0%，上端留空5%
        },
        series: [
            {
                name:'近'+day+'日',
                type:'line',
                data:[],
                markPoint: {
                    data: [
                        {type: 'max', name: '最大值'},
                        {type: 'min', name: '最小值'}
                    ]
                },
                markLine: {
                    data: [
                        {type: 'average', name: '平均'}
                    ]
                },
            },
            {
                name:'同比',
                type:'line',
                data:[],
                markPoint: {
                    data: [
                        {type: 'max', name: '最大值'},
                        {type: 'min', name: '最小值'}
                    ]
                },
                markLine: {
                    data: [
                        {type: 'average', name: '平均'}
                    ]
                },
            }
        ]
    });
    myChart.showLoading();    //数据加载完之前先显示一段简单的loading动画

    var names=[];    // X轴
    var nums=[];    //  第一组数据
    var nums2=[];     //  第二组数据

    $.ajax({
        type : "GET",
        async : true,            //异步请求（同步请求将会锁住浏览器，用户其他操作必须等待请求完成才可以执行）
        url : "http://localhost:8080/getDataOfDay",    //请求发送到TestServlet处
        data : {day:14},
        dataType : "json",        //返回数据形式为json
        success : function(result) {
            //请求成功时执行该函数内容，result即为服务器返回的json对象
            //请求成功时执行该函数内容，result即为服务器返回的json对象
            if (result) {
                for(var i=0;i<result.length/2+1;i++){
                    names.push(result[i].day);    //取出类目
                }
                for(var i=0;i<result.length/2+1;i++){
                    nums.push(result[i].count);    //取出数据
                    nums2.push(result[i+7])
                }
                myChart.hideLoading();    //隐藏加载动画
                myChart.setOption({        //加载数据图表
                    xAxis: {
                        data: names
                    },
                    series: [{
                        // 根据名字对应到相应的系列
                        name: '近'+day+'日',
                        data: nums
                    }]
                });
            }
        },
        error : function(errorMsg) {
            //请求失败时执行该函数
			var data1= dataGeneration(10000,5000,day);
            var data2=dataGeneration(10000,5000,day);
            var xdate=dateGeneration(1,day,0);
           // alert("ERROR:图表请求数据失败!");
            myChart.hideLoading();
            
            myChart.setOption({        //加载数据图表
                    xAxis: {
                        data:xdate,
                    },
                    series: [{
                        // 根据名字对应到相应的系列
                        name: '近'+day+'日',
                        data:data1,
                    },{
                    	name: '同比',
                        data: data2,
                    }]
                });
            
        }
    });
    
    
    if(flag==0){
    	var myOption=myChart.getOption();
    	myOption.legend[0].data[1].remove();
    	myOption.series[1].remove();
    	myChart.setOption(myOption);
    }
};


//用户地区分布
function UserDistribution(id){
	    var formdiv=document.getElementById(id); 
        var myChart = echarts.init(formdiv);
        myChart.clear();
        myChart.setOption({
            title: {
                text: '各地区用户人数统计',
                subtext: '苍耳统计',
                left: 'center'
            },
            tooltip: {
                trigger: 'item'
            },
            legend: {
                orient: 'vertical',
                left: 'left',       
            },
            visualMap: {
                min: 0,
                max: 2500,
                left: 'left',
                top: 'bottom',
                text: ['高','低'],           // 文本，默认为数值文本
                calculable: true
            },
            toolbox: {
                show: true,
                orient: 'vertical',
                left: 'right',
                top: 'center',
                feature: {
                    dataView: {readOnly: false},
                    restore: {},
                    saveAsImage: {}
                }
            },
            series: [
                {
                    name: '用户人数',
                    type: 'map',
                    mapType: 'china',
                    roam: false,
                    label: {
                        normal: {
                            show: true
                        },
                        emphasis: {
                            show: true
                        }
                    },
                    data:[]
                },
            ]
        })
        myChart.showLoading();    //数据加载完之前先显示一段简单的loading动画

        var names=[];    //类别数组（实际用来盛放X轴坐标值）
        var nums=[];    //销量数组（实际用来盛放Y坐标值）

        $.ajax({
            type : "get",
            async : true,            //异步请求（同步请求将会锁住浏览器，用户其他操作必须等待请求完成才可以执行）
            url : "http://localhost:8080/getCityOfUser",    //请求发送到TestServlet处
            data : {},
            dataType : "json",        //返回数据形式为json
            success : function(result) {
                //请求成功时执行该函数内容，result即为服务器返回的json对象
                if (result) {
                	console.log(result);
                    for(var i=0;i<result.length;i++){  //挨个取出类别并填入类别数组
                        nums.push({
                            name : result[i].name,
                            value : result[i].num,
                         });
                    }                  
                    myChart.hideLoading();    //隐藏加载动画
                    myChart.setOption({        //加载数据图表
                        series: [{
                            // 根据名字对应到相应的系列 
                            data:[nums]
                        }]
                    });

                }

            },
            error : function(errorMsg) {
                //请求失败时执行该函数
                //alert("ERROR:图表请求数据失败!");
                myChart.hideLoading();
                myChart.setOption({
                	series:[{
                	  data:[{value:1231,name:"北京"},
                            {value:4231,name:"安徽"},
                            {value:7231,name:"河南"},
                            {value:6231,name:"江西"},
                            {value:7631,name:"江苏"},
                            {value:8231,name:"广东"},
                            {value:1231,name:"上海"},
                            {value:1231,name:"天津"},            
                           ].sort(function (a, b) { return a.value - b.value; })
                	  }
                ],
                visualMap: {
                  min: 1000,
                  max: 8231,
                  left: 'right',
               
                 },
                });
            }
        })
};
   
//操作系统分布
function osStatistics(name){
	var formdiv=document.getElementById("main-footer-echarts-1"); 
    var myChart = echarts.init(formdiv);
    myChart.clear();
    myChart.setOption({
        title : {
            text: '用户操作系统',
            x:'center'
        },
        tooltip : {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
            orient : 'vertical',
            x : 'left',
            data:[]
        },
        toolbox: {
            show : true,
            feature : {
                mark : {show: true},
                dataView : {show: true, readOnly: false},
                magicType : {
                    show: true,
                    type: ['pie', 'funnel'],
                    option: {
                        funnel: {
                            x: '25%',
                            width: '50%',
                            funnelAlign: 'left',
                            max: 1548
                        }
                    }
                },
                restore : {show: true},
                saveAsImage : {show: true}
            }
        },
        calculable : true,
        series : [
            {
                name:'用户操作系统',
                type:'pie',
                radius : '55%',
                center: ['55%', '60%'],
                data:[]
            }
        ]
    });
    myChart.showLoading();    //数据加载完之前先显示一段简单的loading动画

    var names=[];    //   存放操作系统
    var nums=[];    //存放 操作系统,值

    $.ajax({
        type : "post",
        async : true,            //异步请求（同步请求将会锁住浏览器，用户其他操作必须等待请求完成才可以执行）
        url : "OSStatistics",    //请求发送到TestServlet处
        data : {},
        dataType : "json",        //返回数据形式为json
        success : function(result) {
            //请求成功时执行该函数内容，result即为服务器返回的json对象
            if (result) {
                for(var i=0;i<result.length;i++){  //挨个取出类别并填入类别数组
                    names[i]=result[i].name,
                        nums.push({
                            name : result[i].name,   //键   操作系统
                            value : result[i].value,  //值   数量
                        });
                }
                myChart.hideLoading();    //隐藏加载动画
                myChart.setOption({        //加载数据图表
                    legend:{
                        data:names,
                    },
                    series: [{
                        // 根据名字对应到相应的系列
                        data:nums
                    }]
                });
            }
        },
        error : function(errorMsg) {
            //请求失败时执行该函数
            //alert("ERROR:图表请求数据失败!");
            myChart.hideLoading();
            myChart.setOption({        //加载数据图表
                    legend:{
                        data:['win7','win10','winXP','linux','ios','andriod','win8','其他'],
                    },
                    series: [{
                        // 根据名字对应到相应的系列
                        data:[
                        	  {value:123,name:"其他"},
                        	  {value:423,name:"win8"},
                              {value:2123,name:"andriod"},
                              {value:2741,name:"ios"},
                              {value:4532,name:"win7"},
                              {value:4534,name:"win10"},
                              {value:1167,name:"linux"},
                              {value:867,name:"winXP"},].sort(function (a, b) { return a.value - b.value; })
                    }],  
                });
        }
    })
}


//用户周活跃时长统计
function activityLevel(name){
    var formdiv=document.getElementById(name); 
    var myChart = echarts.init(formdiv);
    myChart.setOption({
        title: {
        	
            text: '用户活跃时长（近七日）',
            textStyle:{//标题内容的样式
					//color:'#e4393c',//京东红
					fontStyle:'normal',//主标题文字字体风格，默认normal，有italic(斜体),oblique(斜体)
					fontWeight:"lighter",//可选normal(正常)，bold(加粗)，bolder(加粗)，lighter(变细)，100|200|300|400|500...
					fontFamily:"san-serif",//主题文字字体，默认微软雅黑
					fontSize:12//主题文字字体大小，默认为18px
				},          
        },
		legend:{
               orient:'vertical',
               right:'4%',
               
        },              
        tooltip : {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
        },

        visualMap: {
            show: false,
            min: 80,
            max: 600,
            inRange: {
                colorLightness: [0, 1]
            }
        },
        series : [
            {
                name:'活跃时长',
                type:'pie',
                radius : '55%',
                center: ['50%', '50%'],
                data:[].sort(function (a, b) { return a.value - b.value; }),
                roseType: 'radius',
                label: {
                    normal: {
                        textStyle: {
                            color: 'rgba(1, 1,1, 1)'
                        }
                    }
                },
                labelLine: {
                    normal: {
                        lineStyle: {
                            color:'rgba(1, 1,1, 1)'
                        },
                        smooth: 0.2,
                        length: 10,
                        length2: 20
                    }
                },
                itemStyle: {
                    normal: {
                        color: '#5bc0de',
                        shadowBlur: 200,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                },

                animationType: 'scale',
                animationEasing: 'elasticOut',
                animationDelay: function (idx) {
                    return Math.random() * 200;
                }
            }
        ]
    });
    myChart.showLoading();    //数据加载完之前先显示一段简单的loading动画

    var names=[];    //   类目
    var nums=[];    //存放 类目-值

    $.ajax({
        type : "GET",
        async : true,            //异步请求（同步请求将会锁住浏览器，用户其他操作必须等待请求完成才可以执行）
        url : "activityLevel",    //请求发送到TestServlet处
        data : {},
        dataType : "json",        //返回数据形式为json
        success : function(result) {
            //请求成功时执行该函数内容，result即为服务器返回的json对象
            if (result) {
                for(var i=0;i<result.length;i++){  //挨个取出类别并填入类别数组
                    names[i]=result[i].name,
                        nums.push({
                            name : result[i].name,   //键   操作系统
                            value : result[i].value,  //值   数量
                        });
                }
                myChart.hideLoading();    //隐藏加载动画
                myChart.setOption({        //加载数据图表
                    legend:{
                        data:names,
                       
                    },
                    series: [{
                        // 根据名字对应到相应的系列
                        data:nums.sort(function (a, b) { return a.value - b.value; })
                    }],
                    visualMap:{   //根据数值来自适应变化颜色的范围
                        min:nums[0].value,
                        max:nums[nums.length-1].value*1.1,
                    }
                });
            }
        },
        error : function(errorMsg) {
            //请求失败时执行该函数
            //alert("ERROR:图表请求数据失败!");
            myChart.hideLoading();
            myChart.setOption({        //加载数据图表
                    legend:{
                        data:['>48','36~48','24~36','16~24','8~16','4~8','2~4','0.5~2','<0.5'],
                    },
                    series: [{
                        // 根据名字对应到相应的系列
                        data:[
                        	  {value:123,name:">48"},
                        	  {value:423,name:"36~48"},
                              {value:2123,name:"24~36"},
                              {value:2741,name:"16~24"},
                              {value:4532,name:"8~16"},
                              {value:4534,name:"4~8"},
                              {value:1167,name:"2~4"},
                              {value:867,name:"0.5~2"},
                              {value:1167,name:"<0.5"},].sort(function (a, b) { return a.value - b.value; })
                    }],
                    visualMap:{   //根据数值来自适应变化颜色的范围
                        min:534,
                        max:7000,
                    }
                });
            
            
        }
    })

}
//用户留存
function userRetain(name,startday,number){
	var today=new Date();
	today.setDate(today.getDate()-number);
	for(var i=0;i<number;i++){
		$("."+name+" tr").eq(i).find('td').eq(0).text(today.getFullYear()+"/"+(today.getMonth()+1)+"/"+today.getDate());
		$("."+name+" tr").eq(i).find('td').eq(1).text(200+Math.floor(Math.random()*100));
		$("."+name+" tr").eq(i).find('td').eq(1).css('background-color','rgba(0,0,255,0.4)');
		for(var j=2;j<1+number-i;j++){
			$("."+name+" tr").eq(i).find('td').eq(j).text(100-j*10+Math.floor(Math.random()*10)+"%");
			$("."+name+" tr").eq(i).find('td').eq(j).css('background-color','rgba(0,0,255,'+((number-j)*0.03)+')');
		}	
		today.setDate(today.getDate()+1);
	}
}

//用户年龄统计
function visitorsYears(name){
	//操作系统分布
	var formdiv=document.getElementById(name); 
    var myChart = echarts.init(formdiv);
    myChart.clear();
    myChart.setOption({
        title : {
            text: '用户年龄',
            x:'center'
        },
        tooltip : {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
            orient : 'vertical',
            x : 'left',
            data:[]
        },
        toolbox: {
            show : true,
            feature : {
                mark : {show: true},
                dataView : {show: true, readOnly: false}, 
                magicType : {
                    show: true,
                    type: ['pie', 'funnel'],
                    option: {
                        funnel: {
                            x: '25%',
                            width: '50%',
                            funnelAlign: 'left',
                            max: 1548
                        }
                    }
                },
                restore : {show: true},
                saveAsImage : {show: true}
            }
        },
        calculable : true,
        series : [
            {
                name:'用户年龄',
                type:'pie',
                radius : '55%',
                center: ['55%', '60%'],
                data:[]
            }
        ]
    });
    myChart.showLoading();    //数据加载完之前先显示一段简单的loading动画

    var names=[];    //   存放操作系统
    var nums=[];    //存放 操作系统,值

    $.ajax({
        type : "post",
        async : true,            //异步请求（同步请求将会锁住浏览器，用户其他操作必须等待请求完成才可以执行）
        url : "OSStatistics",    //请求发送到TestServlet处
        data : {},
        dataType : "json",        //返回数据形式为json
        success : function(result) {
            //请求成功时执行该函数内容，result即为服务器返回的json对象
            if (result) {
                for(var i=0;i<result.length;i++){  //挨个取出类别并填入类别数组
                    names[i]=result[i].name,
                        nums.push({
                            name : result[i].name,   //键   操作系统
                            value : result[i].value,  //值   数量
                        });
                }
                myChart.hideLoading();    //隐藏加载动画
                myChart.setOption({        //加载数据图表
                    legend:{
                        data:names,
                    },
                    series: [{
                        // 根据名字对应到相应的系列
                        data:nums
                    }]
                });
            }
        },
        error : function(errorMsg) {
            //请求失败时执行该函数
            //alert("ERROR:图表请求数据失败!");
            myChart.hideLoading();
            myChart.setOption({        //加载数据图表
                    legend:{
                        data:['<18岁','18~22岁','22~25岁','25~30岁','30~35岁','35~40岁','40~50岁','50~60岁','60~70岁','>70岁'],
                    },
                    series: [{
                        // 根据名字对应到相应的系列
                        data:[
                        	  {value:623,name:"<18岁"},
                        	  {value:423,name:">70岁"},
                              {value:2123,name:"18~22岁"},
                              {value:2741,name:"22~25岁"},
                              {value:4532,name:"25~30岁"},
                              {value:4534,name:"30~35岁"},
                              {value:8167,name:"35~40岁"},
                              {value:867,name:"40~50岁"},
                              {value:867,name:"50~60岁"},
                              {value:467,name:"60~70岁"},
                        ].sort(function (a, b) { return a.value - b.value; })
                    }],  
                });
        }
    })
}


function visitorsLike(formdiv){
	//操作系统分布
    var myChart = echarts.init(formdiv);
    myChart.clear();
    myChart.setOption({
        title : { 
            text: '用户偏好',
            x:'center'
        },
        tooltip : {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
            orient : 'vertical',
            x : 'left',
            data:[]
        },
        toolbox: {
            show : true,
            feature : {
                mark : {show: true},
                dataView : {show: true, readOnly: false},
                magicType : {
                    show: true,
                    type: ['pie', 'funnel'],
                    option: {
                        funnel: {
                            x: '25%',
                            width: '50%',
                            funnelAlign: 'left',
                            max: 1548
                        }
                    } 
                },
                restore : {show: true},
                saveAsImage : {show: true}
            }
        },
        calculable : true,
        series : [
            {
                name:'用户偏好',
                type:'pie',
                radius : '55%',
                center: ['55%', '60%'],
                data:[]
            }
        ]
    });
    myChart.showLoading();    //数据加载完之前先显示一段简单的loading动画

    var names=[];    //   存放操作系统
    var nums=[];    //存放 操作系统,值

    $.ajax({
        type : "post",
        async : true,            //异步请求（同步请求将会锁住浏览器，用户其他操作必须等待请求完成才可以执行）
        url : "OSStatistics",    //请求发送到TestServlet处
        data : {},
        dataType : "json",        //返回数据形式为json
        success : function(result) {
            //请求成功时执行该函数内容，result即为服务器返回的json对象
            if (result) {
                for(var i=0;i<result.length;i++){  //挨个取出类别并填入类别数组
                    names[i]=result[i].name,
                        nums.push({
                            name : result[i].name,   //键   操作系统
                            value : result[i].value,  //值   数量
                        });
                }
                myChart.hideLoading();    //隐藏加载动画
                myChart.setOption({        //加载数据图表
                    legend:{
                        data:names,
                    },
                    series: [{
                        // 根据名字对应到相应的系列
                        data:nums
                    }]
                });
            }
        },
        error : function(errorMsg) {
            //请求失败时执行该函数
            //alert("ERROR:图表请求数据失败!");
            myChart.hideLoading();
            myChart.setOption({        //加载数据图表
                    legend:{
                        data:['行情资金流','每日复盘','涨停分析','量化策略分析','A股财务报表'],
                    },
                    series: [{
                        // 根据名字对应到相应的系列
                        data:[
                        	  {value:623,name:"行情资金流"},
                        	  {value:423,name:"每日复盘"},
                              {value:2123,name:"涨停分析"},
                              {value:2741,name:"量化策略分析"},
                              {value:4532,name:"A股财务报表"},
                        ].sort(function (a, b) { return a.value - b.value; })
                    }],  
                });
        }
    })
}


//用户渠道
function userChannel(day,id){   
	//加载表格得div
	var formdiv=document.getElementById(id); 
    var myChart = echarts.init(formdiv);
    myChart.clear();
    
    var data1=["直接进入"];
    var data2=["百度进入"];
    var data3=["360搜索进入"];
    var data4=["微信广告进入"];
    var data5=["网页广告进入"];
    var data6=["其他"];
    var xdate=["product"]; 
    
    
    //数组拼接
      $.merge(data1,dataGeneration(4000,2000,day));         //直接进入          
      $.merge(data2,dataGeneration(3000,2000,day));       //百度进入    
      $.merge(data3,dataGeneration(1000,700,day));   //360搜索进入    
      $.merge(data4,dataGeneration(2000,1000,day));        //微信广告
      $.merge(data5,dataGeneration(3000,1500,day));         //网页广告
      $.merge(data6,dataGeneration(1700,700,day));      //其他
      $.merge(xdate,dateGeneration(1,day,0)); 
    
    
	     option = {
	     	title : { 
	            text: '近' +day+'天用户访问渠道',
	            x:'center'
        	},
	       legend: {
	        	top:30
	        },
	        tooltip: {
	            trigger: 'axis',
	            alwaysShowContent:true,
	        },
	        toolbox:{
	        	show : true,
	        	feature: {
		            dataZoom: {
		                yAxisIndex: 'none'
		            },
		            dataView: {readOnly: false},
		            magicType: {type: ['line', 'bar']},
		            restore: {},
		            saveAsImage: {}
		        }
	        },
	        dataset: {
	            source: [
	                xdate,
	                data1,
	                data2,
	                data3,
	                data4,
	                data5,
	                data6,
	            ]
	        },
	        xAxis: {type: 'category'},
	        yAxis: {gridIndex: 0},
	        grid: {top: '65%'},
	        series: [
	            {type: 'line', smooth: true, seriesLayoutBy: 'row'},
	            {type: 'line', smooth: true, seriesLayoutBy: 'row'},
	            {type: 'line', smooth: true, seriesLayoutBy: 'row'},
	            {type: 'line', smooth: true, seriesLayoutBy: 'row'},
	            {type: 'line', smooth: true, seriesLayoutBy: 'row'},
	            {type: 'line', smooth: true, seriesLayoutBy: 'row'},
	            {
	                type: 'pie',
	                id: 'pie',
	                radius: '30%',
	                center: ['50%', '30%'],
	                label: {
	                    formatter: '{b}: {@2012} ({d}%)'
	                },
	                encode: {
	                    itemName: 'product',
	                    value: '2012',
	                    tooltip: '2012'
	                }
	            }
	        ]
	    };
	
	    myChart.on('updateAxisPointer', function (event) {
	        var xAxisInfo = event.axesInfo[0];
	        if (xAxisInfo) {
	            var dimension = xAxisInfo.value + 1;
	            myChart.setOption({
	                series: {
	                    id: 'pie',
	                    label: {
	                        formatter: '{b}: {@[' + dimension + ']} ({d}%)'
	                    },
	                    encode: {
	                        value: dimension,
	                        tooltip: dimension
	                    }
	                }
	            });
	        }
	    });
	    myChart.setOption(option);
        
        
};


//用户设备
function userDivice(day,id){   
	//加载表格得div
	var formdiv=document.getElementById(id); 
    var myChart = echarts.init(formdiv);
    myChart.clear();
    
    var data1=["iPhone 8 plus"];
    var data2=["华为 p30 PRO"];
    var data3=["iPhone 8 "];
    var data4=["iPhone x"];
    var data5=["小米 9"];
    var data6=["荣耀 v20"];
    var data7=["samsung Galaxy S10"];
    var data8=["vivo IQOO"];
    var xdate=["product"]; 
    
    
    //数组拼接
      $.merge(data1,dataGeneration(3000,2000,day));         //直接进入          
      $.merge(data2,dataGeneration(2000,2000,day));       //百度进入    
      $.merge(data3,dataGeneration(1000,700,day));   //360搜索进入    
      $.merge(data4,dataGeneration(2000,1000,day));        //微信广告
      $.merge(data5,dataGeneration(2000,1500,day));         //网页广告
      $.merge(data6,dataGeneration(1700,700,day));      //其他
      $.merge(data7,dataGeneration(1700,700,day));      //其他
      $.merge(data8,dataGeneration(1700,700,day));      //其他
      $.merge(xdate,dateGeneration(1,day,0)); 
    
    
	     option = {
	     	title : { 
	            text: '近' +day+'天用户访问设备',
	            x:'center'
        	},
	       legend: {
	        	top:30
	        },
	        tooltip: {
	            trigger: 'axis',
	            alwaysShowContent:true,
	        },
	        toolbox:{
	        	show : true,
	        	feature: {
		            dataZoom: {
		                yAxisIndex: 'none'
		            },
		            dataView: {readOnly: false},
		            magicType: {type: ['line', 'bar']},
		            restore: {},
		            saveAsImage: {}
		        }
	        },
	        dataset: {
	            source: [
	                xdate,
	                data1,
	                data2,
	                data3,
	                data4,
	                data5,
	                data6,
	                data7,
	                data8,
	            ]
	        },
	        xAxis: {type: 'category'},
	        yAxis: {gridIndex: 0},
	        grid: {top: '65%'},
	        series: [
	            {type: 'line', smooth: true, seriesLayoutBy: 'row'},
	            {type: 'line', smooth: true, seriesLayoutBy: 'row'},
	            {type: 'line', smooth: true, seriesLayoutBy: 'row'},
	            {type: 'line', smooth: true, seriesLayoutBy: 'row'},
	            {type: 'line', smooth: true, seriesLayoutBy: 'row'},
	            {type: 'line', smooth: true, seriesLayoutBy: 'row'},
	            {type: 'line', smooth: true, seriesLayoutBy: 'row'},
	            {type: 'line', smooth: true, seriesLayoutBy: 'row'},
	            {
	                type: 'pie',
	                id: 'pie',
	                radius: '30%',
	                center: ['50%', '30%'],
	                label: {
	                    formatter: '{b}: {@2012} ({d}%)'
	                },
	                encode: {
	                    itemName: 'product',
	                    value: '2012',
	                    tooltip: '2012'
	                }
	            }
	        ]
	    };
	
	    myChart.on('updateAxisPointer', function (event) {
	        var xAxisInfo = event.axesInfo[0];
	        if (xAxisInfo) {
	            var dimension = xAxisInfo.value + 1;
	            myChart.setOption({
	                series: {
	                    id: 'pie',
	                    label: {
	                        formatter: '{b}: {@[' + dimension + ']} ({d}%)'
	                    },
	                    encode: {
	                        value: dimension,
	                        tooltip: dimension
	                    }
	                }
	            });
	        }
	    });
	    myChart.setOption(option);
        
        
};


yonhuliucun=function(name,day){
	var table=$("<table></table>");
	var thead=$("<thead><tr><td >日期</td><td >首次使用</td></tr></thead>");
	var tbody=$("<tbody></tbody>");
	var i=0,j=0;
	day=day-1;
	
	if(day>30){
		alert("数据异常!");
		return;
	}
	
	
	for(i=0;i<day;i++){
		var td=$("<td>第"+(i+1)+"天</td>");
		thead.find("tr").append(td);
	};
	for(i=0;i<day;i++){
		var tr=thead.find("tr").clone(false);		
		tr.find("td").text("");
		tbody.append(tr);
	}	
	table.append(thead);
	table.append(tbody);
	
	
					var today=new Date();
					var num=day;
					today.setDate(today.getDate()-num);
					for(i=1;i<num+1;i++){
						table.find("tr").eq(i).find('td').eq(0).text(today.getFullYear()+"/"+(today.getMonth()+1)+"/"+today.getDate());
						table.find("tr").eq(i).find('td').eq(1).text(200+Math.floor(Math.random()*100));
						table.find("tr").eq(i).find('td').eq(1).css('background-color','rgba(0,0,255,0.4)');
						
						//行赋值
						for(j=2;j<(num-i+3);j++){							
							table.find("tr").eq(i).find('td').eq(j).text(Math.floor((1-(j-2)/num)*(80+Math.floor(Math.random()*10)))+"%");
							table.find("tr").eq(i).find('td').eq(j).css('background-color','rgba(0,0,255,'+((1-j/num)*0.4+0.1)+')');
						}	
						today.setDate(today.getDate()+1);
					}
					
					
	$("#"+name).empty();
	
	
	table.css("width","100%");
	table.css("height","50%");
	$("#"+name).append(table);
}



eventAnalysis=function(name,day){
	var formdiv=document.getElementById(name); 
    var myChart = echarts.init(formdiv);
    myChart.clear();
    var data1=[Math.floor(Math.random()*200)-60,Math.floor(Math.random()*5000)+3000,"点击金融游戏"];
    var data2=[Math.floor(Math.random()*200)-60,Math.floor(Math.random()*5000)+3000,"点击K线分析"];
    var data3=[Math.floor(Math.random()*200)-60,Math.floor(Math.random()*5000)+3000,"在线时长>20h"];
    var data4=[Math.floor(Math.random()*200)-60,Math.floor(Math.random()*5000)+3000,"购买晓鲸白问"];
    var data5=[Math.floor(Math.random()*200)-60,Math.floor(Math.random()*5000)+3000,"回购"];
    var data6=[Math.floor(Math.random()*200)-60,Math.floor(Math.random()*5000)+3000,"购买投资管理"];
    var data7=[Math.floor(Math.random()*200)-60,Math.floor(Math.random()*5000)+3000,"点击进入行情"];
    var data8=[Math.floor(Math.random()*200)-60,Math.floor(Math.random()*5000)+3000,"智能AI"];
    
    
    var option = {
    	title : { 
	            text: '近' +day+'日事件统计',
	            x:'center'
        	},
         tooltip: {
	            trigger: 'axis',
	            formatter: function (params){		
	            	if(params[0].data[0]>0){
	            		return params[0].data[2]+"<br>触&emsp;&emsp;发："+params[0].data[1]+"次<br>同比增长："+params[0].data[0]+"次";
	            	}else{
	            		return params[0].data[2]+"<br>触&emsp;&emsp;发："+params[0].data[1]+"次<br>同比下降："+(-params[0].data[0])+"次";
	            	}
				    
				}
	        },
    	dataset: {
	    	source: [
		            ['score', 'amount', 'product'],
		           data1,
		           data2,
		           data3,
		           data4,
		           data5,
		           data6,
		           data7,
		           data8,
		        ]
	    },
	    grid: {containLabel: true},
	    xAxis: {name: '触发次数'},
	    yAxis: {type: 'category',name: '事件名称'},
	    visualMap: {
	        orient: 'horizontal',
	        left: 'center',
	        min: -100,
	        max: 100,
	        text: ['相比增长', '相比下降'],
	        // Map the score column to color
	        dimension: 0,
	        inRange: {
	            color: ['#009eFB', '#E15457']
	        }
	    },
	    series: [
	        {
	            type: 'bar',
	            encode: {
	                // Map the "amount" column to X axis.
	                x: 'amount',
	                // Map the "product" column to Y axis
	                y: 'product'
	            }
	        }
	    ]
	};
	
	myChart.setOption(option);

	
	
}

function roadAnalysis(){
	var formdiv=document.getElementById('main-center-echart'); 
	var myChart = echarts.init(formdiv);
	myChart.setOption(
option = {
	
	
	tooltip: {
            trigger: 'item',
            triggerOn: 'mousemove'
        },
    series: {
        type: 'sankey',
        layout:'none',
        focusNodeAdjacency: 'allEdges',
        data: [{
            name: '服务市场'
        }, {
            name: '涨停分析'
        },
         {
            name: '自选股组件'
        },
         {
            name: '量化因子库'
        },{
            name: '相似K线'
        }, {
            name: '每日复盘'
        }, {
            name: '私募门户合规建站'
        },{
            name: '行情策略'
        },{
            name: '小凡智讯'
        }],
        links: [{
            source: '服务市场',
            target: '涨停分析',
            value: 4850
        },{
             source: '服务市场',
            target: '量化因子库',
            value: 1850
        },
        {
             source: '服务市场',
             target: '相似K线',
             value: 2250
        },
        {
             source: '行情策略',
            target: '小凡智讯',
            value: 750
        },
        {
            source: '服务市场',
            target: '私募门户合规建站',
            value: 6980
        }, {
            source: '服务市场',
            target:'行情策略',
            value: 548
        }, {
            source: '服务市场',
            target: '小凡智讯',
            value: 4780
        }, {
            source: '服务市场',
            target: '每日复盘',
            value: 2280
        }]
    }
}
	);
}


function roadone(formdiv){
    	
var data = [];
var dataCount = 200;
var startTime =+new Date();
var categories = ['xuk'];
var types = [
    {name: '行情', color: '#7b9ce1'},
    {name: '咨询', color: '#bd6d6c'},
    {name: '投资管理', color: '#75d874'},
    {name: '智能AI', color: '#e0bc78'},
    {name: '模拟仿真', color: '#dc77dc'},
    {name: '金融游戏', color: '#72b362'}
];

// Generate mock data
echarts.util.each(categories, function (category, index) {
    var baseTime = startTime;
    for (var i = 0;(new Date(baseTime-startTime+60000000).getHours())<22;i++) {
        var typeItem = types[Math.round(Math.random() * (types.length - 1))];
        var duration = Math.round(300000+Math.random() * 2000000);
        data.push({
            name: typeItem.name,
            value: [
                index,
                baseTime,
                baseTime += duration,
                duration
            ],
            itemStyle: {
                normal: {
                    color: typeItem.color
                }
            }
        });
        baseTime +=Math.round(Math.random() * 100000);
    }
});

function renderItem(params, api) {
	    var categoryIndex = api.value(0);
	    var start = api.coord([api.value(1), categoryIndex]);
	    var end = api.coord([api.value(2), categoryIndex]);
	    var height = api.size([0, 1])[1] * 0.3;
	
	    var rectShape = echarts.graphic.clipRectByRect({
		        x: start[0],
		        y: start[1] - height / 2,
		        width: end[0] - start[0],
		        height: height
		    }, {
		        x: params.coordSys.x,
		        y: params.coordSys.y,
		        width: params.coordSys.width,
		        height: params.coordSys.height
		    });
		
		    return rectShape && {
		        type: 'rect',
		        shape: rectShape,
		        style: api.style()
		    };
		}
	
	
	option = {
	    tooltip: {
	        formatter: function (params) {
	            return params.marker+ "在"+ params.name + '停留' +Math.floor(params.value[3]/1000)+ 's';
	        }
	    },
	    title: {
	        text: '用户路径追踪',
	        left: 'center'
	    },
	    legend: {
	        data:["金融游戏"]
	      },
	    dataZoom: [{
	        type: 'slider',
	        filterMode: 'weakFilter',
	        showDataShadow: false,
	        top: 400,
	        height: 10,
	        borderColor: 'transparent',
	        backgroundColor: '#e2e2e2',
	        handleIcon: 'M10.7,11.9H9.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4h1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7v-1.2h6.6z M13.3,22H6.7v-1.2h6.6z M13.3,19.6H6.7v-1.2h6.6z', // jshint ignore:line
	        handleSize: 20,
	        handleStyle: {
	            shadowBlur: 6,
	            shadowOffsetX: 1,
	            shadowOffsetY: 2,
	            shadowColor: '#aaa'
	        },
	        labelFormatter: ''
	    }, {
	        type: 'inside',
	        filterMode: 'weakFilter'
	    }],
	    grid: {
	        height:300
	    },
	    xAxis: {
	    	name:"时间",
	        min: startTime,
	        scale: true,
	        axisLabel: {
	            formatter: function (val) {
	            	d=new Date(val);
	            	h=("0" + (d.getHours())).slice(-2);
	            	m=("0" + (d.getMinutes())).slice(-2);
	            	s=("0" + (d.getSeconds())).slice(-2);
	            
	                return h+': '+m+" : "+s;        
	            }
	        }
	    },
	    yAxis: {
	    	name:"用户",
	        data: categories
	    },
	    series: [{
	        type: 'custom',
	        renderItem: renderItem,
	        itemStyle: {
	            normal: {
	                opacity: 0.8,
	            }
	        },
	        encode: {
	            x: [1, 2],
	            y: 0
	        },
	        data: data
	    }]
	};
	
	var myChart = echarts.init(formdiv);
	myChart.setOption(option);
}
