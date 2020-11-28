 /**
 * Created by zx on 2017/8/31.
 */


//柱状图
var barChart = function (chartdata,box) {
    myChart = echarts.init(box);
    var series = [];
    var legend = [];
    for (var i = 0; i < chartdata.data.length; i++) {
        legend.push(chartdata.data[i].name)
        series.push({
            name:chartdata.data[i].name,
            type:'bar',
            data:chartdata.data[i].value
        })
    }    
    var option = {
        title: {
            text: chartdata.chart_title
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'cross'
            }
        },
        legend: {
            type:'scroll',
            top:'20px',
            left:'50px',
            right:'50px',
            data: legend
        },
        xAxis: {
            type: "category",
            data:chartdata.legend
        },
        yAxis: {
            type: "value"
        },
        series: series
    };
    myChart.clear();
    myChart.setOption(option);
};


//堆叠柱状图
var barUpChart = function (chartdata,box) {
    myChart = echarts.init(box);
    var series = [];
    var legend = [];
    for (var i = 0; i < chartdata.data.length; i++) {
        legend.push(chartdata.data[i].name)
        series.push({
            name:chartdata.data[i].name,
            type:'bar',
            stack:'总成绩',
            data:chartdata.data[i].value
        })
    }
    var sumdata = [];
    for (var j = 0; j < chartdata.data[0].value.length; j++) {
        var sumdata_c = 0;
        for (var i = 0; i < chartdata.data.length; i++) {
            sumdata_c += Number(chartdata.data[i].value[j])
            // console.log(sumdata_c)
        }
        sumdata.push(sumdata_c)
    };
    var y_max = 0;
    for (var i = 0; i < sumdata.length; i++) {
        if (y_max < sumdata[i]) {
            y_max = sumdata[i]
        }
    }   
    var option = {
        title: {
            text: chartdata.chart_title
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow'
            }
        },
        legend: {
            type:'scroll',
            top:'20px',
            left:'50px',
            right:'50px',
            data: legend
        },
        xAxis: {
            type: "category",
            data: chartdata.legend
        },
        yAxis: {
            type: "value",
            max: y_max
        },
        series: series
    };
    myChart.clear();
    myChart.setOption(option);
};


//百分比堆叠柱状图
var barUpPercentChart = function (chartdata,box) {
    myChart = echarts.init(box);
    var series = [];
    var legend = [];
    var sumdata = [];
    for (var j = 0; j < chartdata.data[0].value.length; j++) {
        var sumdata_c = 0;
        for (var i = 0; i < chartdata.data.length; i++) {
            sumdata_c += Number(chartdata.data[i].value[j])
        }
        sumdata.push(sumdata_c)
    };
    var y_max = 0;
    for (var i = 0; i < sumdata.length; i++) {
        if (y_max < sumdata[i]) {
            y_max = sumdata[i]
        }
    }   
    for (var i = 0; i < chartdata.data.length; i++) {
        legend.push(chartdata.data[i].name)
        series.push({
            name:chartdata.data[i].name,
            type:'bar',
            stack:'总成绩',
            data:chartdata.data[i].value,
            label: {
                normal: {
                    show: true,
                    formatter:function (params) {
                        var sum = 0;
                        for(var j = 0;j < chartdata.data.length;j++){
                            sum += Number(chartdata.data[j].value[params.dataIndex])
                        }
                        // console.log(sum,params.value)
                        return Math.round((params.value / sum) * 100) + '%'
                    }
                }
            }
        })
    }
    var option = {
        title: {
            text: chartdata.chart_title
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'cross'
            }
        },
        legend: {
            type:'scroll',
            top:'20px',
            left:'50px',
            right:'50px',
            data: legend
        },
        xAxis: {
            type: "category",
            data: chartdata.legend
        },
        yAxis: {
            type: "value",
            max: y_max
        },
        series: series
    };
    myChart.clear();
    myChart.setOption(option);
};


//条状图
var stripChart = function (chartdata,box) {
    myChart = echarts.init(box);
    var series = [];
    var legend = [];
    for (var i = 0; i < chartdata.data.length; i++) {
        legend.push(chartdata.data[i].name)
        series.push({
            name:chartdata.data[i].name,
            type:'bar',
            data:chartdata.data[i].value
        })
    }    
    var option = {
        title: {
            text: chartdata.chart_title
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
            type: 'cross'
        }
        },
        legend: {
            type:'scroll',
            top:'20px',
            left:'50px',
            right:'50px',
            data: legend
        },
        xAxis: {
            type: "value"
        },
        yAxis: {
            type: "category",
            data: chartdata.legend
        },
        series: series
    };
    myChart.clear();
    myChart.setOption(option);
};


//堆叠条状图
var stripUpChart = function (chartdata,box) {
    myChart = echarts.init(box);
    var series = [];
    var legend = [];
    for (var i = 0; i < chartdata.data.length; i++) {
        legend.push(chartdata.data[i].name)
        series.push({
            name:chartdata.data[i].name,
            type:'bar',
            stack:'总成绩',
            data:chartdata.data[i].value
        })
    }
    var sumdata = [];
    for (var j = 0; j < chartdata.data[0].value.length; j++) {
        var sumdata_c = 0;
        for (var i = 0; i < chartdata.data.length; i++) {
            sumdata_c += Number(chartdata.data[i].value[j])
        }
        sumdata.push(sumdata_c)
    };
    var y_max = 0;
    for (var i = 0; i < sumdata.length; i++) {
        if (y_max < sumdata[i]) {
            y_max = sumdata[i]
        }
    }   
    var option = {
        title: {
            text: chartdata.chart_title
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'cross'
            }
        },
        legend: {
            type:'scroll',
            top:'20px',
            left:'50px',
            right:'50px',
            data: legend
        },
        xAxis: {
            type: "value",
            max: y_max
        },
        yAxis: {
            type: "category",
            data: chartdata.legend
        },
        series: series
    };
    myChart.clear();
    myChart.setOption(option);
};


//百分比堆叠条状图
var stripUpPercentChart = function (chartdata,box) {
    myChart = echarts.init(box);
    var series = [];
    var legend = [];
    var sumdata = [];
    for (var j = 0; j < chartdata.data[0].value.length; j++) {
        var sumdata_c = 0;
        for (var i = 0; i < chartdata.data.length; i++) {
            sumdata_c += Number(chartdata.data[i].value[j])
        }
        sumdata.push(sumdata_c)
    };
    var y_max = 0;
    for (var i = 0; i < sumdata.length; i++) {
        if (y_max < sumdata[i]) {
            y_max = sumdata[i]
        }
    }   
    for (var i = 0; i < chartdata.data.length; i++) {
        legend.push(chartdata.data[i].name)
        series.push({
            name:chartdata.data[i].name,
            type:'bar',
            stack:'总成绩',
            data:chartdata.data[i].value,
            label: {
                normal: {
                    show: true,
                    formatter:function (params) {
                        var sum = 0;
                        for(var j = 0;j < chartdata.data.length;j++){
                            sum += Number(chartdata.data[j].value[params.dataIndex])
                        }
                        // console.log(sum,params.value)
                        return Math.round((params.value / sum) * 100) + '%'
                    }
                }
            }
        })
    }
    var option = {
        title: {
            text: chartdata.chart_title
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'cross'
            }
        },
        legend: {
            type:'scroll',
            top:'20px',
            left:'50px',
            right:'50px',
            data: legend
        },
        xAxis: {
            type: "value",
            max: y_max
        },
        yAxis: {
            type: "category",
            data: chartdata.legend
        },
        series: series
    };
    myChart.clear();
    myChart.setOption(option);
};


//折线图
var lineChart = function (chartdata,box) {
    myChart = echarts.init(box);
    var series = [];
    var legend = [];
    for (var i = 0; i < chartdata.data.length; i++) {
        legend.push(chartdata.data[i].name)
        series.push({
            name:chartdata.data[i].name,
            type:'line',
            data:chartdata.data[i].value
        })
    }    
    var option = {
        title: {
            text: chartdata.chart_title
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'cross'
            }
        },
        legend: {
            type:'scroll',
            top:'20px',
            left:'50px',
            right:'50px',
            data: legend
        },
        xAxis: {
            type: "category",
            data: chartdata.legend
        },
        yAxis: {
            type: "value",
            min:'dataMin'
        },
        series: series
    };
    myChart.clear();
    myChart.setOption(option);
};


//无节点折线图
var lineChart2 = function (chartdata,box) {
    // console.log(chartdata)
    myChart = echarts.init(box);
    var option = {
        title: {
            text: chartdata.chart_title
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'cross'
            }
        },
        xAxis: {
            type: "category",
            data: chartdata.legend
        },
        yAxis: {
            type: "value",
            min:'dataMin'
        },
        series: {
            type:'line',
            symbolSize: 0,
            data:chartdata.data
        }
    };
    myChart.clear();
    myChart.setOption(option);
};


//平滑折线图
var lineChart3 = function (chartdata,box) {
    myChart = echarts.init(box);
    var option = {
        title: {
            text: chartdata.chart_title
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'cross'
            }
        },
        xAxis: {
            type: "category",
            data: chartdata.legend
        },
        yAxis: {
            type: "value",
            min:'dataMin'
        },
        series: {
            type:'line',
            smooth: true,
            symbolSize: 0,
            data:chartdata.data
        }
    };
    myChart.clear();
    myChart.setOption(option);
};


//点线图
var lineChart4 = function (chartdata,box) {
    myChart = echarts.init(box);
    var option = {
        title: {
            text: chartdata.chart_title
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'cross'
            }
        },
        xAxis: {
            type: "category",
            data: chartdata.legend
        },
        yAxis: {
            type: "value",
            min:'dataMin'
        },
        series: [{
            type:'line',
            symbolSize: 10,
            data:chartdata.data.y1
        },{
            type:'scatter',
            data:chartdata.data.y2
        }]
    };
    myChart.clear();
    myChart.setOption(option);
};

// 碎石图
var screetChart = function (chartdata,box) {
    myChart = echarts.init(box);
    var data_x = chartdata.x;
    var data = chartdata.value;
    // console.log(data_x,data)
    var option = {
        title: {text: '碎石图'},
        xAxis: {
            type: 'category',
            data:data_x
        },
        yAxis: {
            type:'value'
        },
        series: {
            data:data,
            type: 'line',
            symbol: 'rect',
            symbolSize: 10,
            lineStyle: {
                width: 2,
                type: 'dashed'
            },
            itemStyle: {
                borderWidth: 1,
                borderColor: 'black',
                color: 'white'
            }
        }
    }
    myChart.clear();
    myChart.setOption(option);
}



// 箱线图
var boxplotChart = function (chartdata,box) {
    myChart = echarts.init(box);
    var data = echarts.dataTool.prepareBoxplotData(chartdata.value);
    var data_x = chartdata.x;
    var option = {
        backgroundColor: '#000',
        textStyle: {
            color: 'rgb(255, 255, 255)'
        },
        title: [
            {
                text: '箱线图',
                left: 'left',
                textStyle: {
                    color: 'rgb(255, 255, 255)'
                },
            },
            {
                text: 'upper: Q3 + 1.5 * IRQ \nlower: Q1 - 1.5 * IRQ',
                borderColor: '#999',
                borderWidth: 1,
                textStyle: {
                    fontSize: 12,
                    color: 'rgb(255,255,255)'
                },
                left: '10%',
                top: '90%'
            }
        ],
        tooltip: {
            trigger: 'item',
            axisPointer: {
                type: 'shadow'
            }
        },
        grid: {
            left: '10%',
            right: '10%',
            bottom: '20%'
        },
        xAxis: {
            type: 'category',
            axisLine: {
                lineStyle: {
                    color: '#fff'
                }
            },
            data: data_x
        },
        yAxis: {
            axisLine: {
                lineStyle: {
                    color: '#fff'
                }
            },
            type: 'value'
        },
        series: [{
            type: 'boxplot',
            data: data.boxData,
            tooltip: {
                formatter: function (param) {
                    return [
                        'Experiment ' + param.name + ': ',
                        'upper: ' + param.data[5],
                        'Q3: ' + param.data[4],
                        'median: ' + param.data[3],
                        'Q1: ' + param.data[2],
                        'lower: ' + param.data[1]
                    ].join('<br/>')
                }
            }
        },
        {
            name: 'outlier',
            type: 'scatter',
            data: data.outliers
        }]
    };
    myChart.clear();
    myChart.setOption(option);
}

//面积图
var areaChart = function (chartdata,box) {
    myChart = echarts.init(box);
    var series = [];
    var legend = [];
    for (var i = 0; i < chartdata.data.length; i++) {
        legend.push(chartdata.data[i].name)
        series.push({
            name:chartdata.data[i].name,
            type:'line',
            areaStyle: {normal: {}},
            data:chartdata.data[i].value
        })
    }
    var option = {
        title: {
            text: chartdata.chart_title
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'cross'
            }
        },
        legend: {
            type:'scroll',
            top:'20px',
            left:'50px',
            right:'50px',
            data: legend
        },
        xAxis: {
            type: "category",
            data: chartdata.legend
        },
        yAxis: {
            type: "value"
        },
        series: series
    };
    myChart.clear();
    myChart.setOption(option);
};


//折柱图
var barLineChart = function (chartdata,box) {
    myChart = echarts.init(box);
    var legend = [];
    var series = [];
    for (var i = 0; i < chartdata.data0.length; i++) {
        legend.push(chartdata.data0[i].name)
        series.push({
            name: chartdata.data0[i].name,
            type: 'line',
            data: chartdata.data0[i].value
        })
    }
    for (var j = 0; j < chartdata.data.length; j++) {
        legend.push(chartdata.data[j].name)
        series.push({
            name: chartdata.data[j].name,
            type: 'bar',
            data: chartdata.data[j].value
        })
    }
    var option = {
        title: {
            text: chartdata.chart_title
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'cross'
            }
        },
        legend: {
            type:'scroll',
            top:'20px',
            left:'50px',
            right:'50px',
            data: legend
        },
        xAxis: {
            type: "category",
            data: chartdata.legend
        },
        yAxis: [{
            type: "value"
        },
            {
            type: "value"
        }],
        series: series
    };
    myChart.clear();
    myChart.setOption(option);
};


//散点图
var scatterChart = function (chartdata) {
    // console.log(chartdata);
    myChart = echarts.init(document.getElementById("sdt"));
    var series = [];
    var legend = [];

    for(var i = 0;i < chartdata.series.length;i++){
        series.push({
            name: chartdata.series[i].name,
            type: "scatter",
            data: chartdata.series[i].value
        })
    }

    for(var i = 0;i < chartdata.series.length;i++){
        legend.push(chartdata.series[i].name);
    }

    var option = {
        title: {
            text: chartdata.chart_title
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'cross'
            }
        },
        legend: {
            type:'scroll',
            data: legend
        },
        xAxis: {
            type: "value"
        },
        yAxis: {
            type: "value"
        },
        series:series
    };
    myChart.setOption(option);
};

//散点图1
var scatterChart1 = function (chartdata) {
    // console.log(chartdata);
    myChart = echarts.init(document.getElementById("sdt2"));
    var option = {
        title: {
            text: chartdata.chart_title
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
            type: 'cross'
            }
        },
        xAxis: {
            type: "value"
        },
        yAxis: {
            type: "value"
        },
        series: {
            type: "scatter",
            data: chartdata.series
        }
    };
    myChart.setOption(option);
};

//散点图2
var scatterChart2 = function (chartdata,box) {
    // console.log(chartdata)
    myChart = echarts.init(box);
    var option = {
        title: {
            text: chartdata.chart_title
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'cross'
            }
        },
        legend: {
            type:'scroll',
            top:'20px',
            left:'50px',
            right:'50px',
            data: chartdata.legend
        },
        xAxis: {
            type: "value"
        },
        yAxis: {
            type: "value"
        },
        series:{
            name: chartdata.legend,
            data: chartdata.data,
            type: 'scatter',
            symbolSize: 20,
            label: {
                emphasis: {
                    show: true,
                    formatter: function (param) {
                        return param.data[2];
                    },
                    position: 'top'
                }
            },
            itemStyle: {
                normal: {
                    shadowBlur: 10,
                    shadowColor: 'rgba(120, 36, 50, 0.5)',
                    shadowOffsetY: 5,
                    color: new echarts.graphic.RadialGradient(0.4, 0.3, 1, [{
                        offset: 0,
                        color: 'rgb(251, 118, 123)'
                    }, {
                        offset: 1,
                        color: 'rgb(204, 46, 72)'
                    }])
                }
            }
        }
    };
    myChart.clear();
    myChart.setOption(option);
    // var picBase64Info = myChart.getDataURL();/*获取图片信息*/
};



//气泡图
var bubbleChart = function (chartdata,box) {
    myChart = echarts.init(box);
    indexData = [];
    for (var i = 0; i < chartdata.data.length; i++) {
        indexData.push(chartdata.data[i][2]);
    }
    indexMin = Math.min.apply(null,indexData);
    indexMax = Math.max.apply(null,indexData);
    var option = {
        title: {
            text: chartdata.chart_title
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'cross'
            }
        },
        xAxis: {
            type: "value"
        },
        yAxis: {
            type: "value"
        },
        series:{
            data: chartdata.data,
            type: 'scatter',
            symbolSize: function (data) {
                return (data[2] - indexMin)/(indexMax - indexMin) * 50 + 10;
            },
            label: {
                emphasis: {
                    show: true,
                    formatter: function (param) {
                        return param.data[3];
                    },
                    position: 'top'
                }
            },
            itemStyle: {
                normal: {
                    shadowBlur: 10,
                    shadowColor: 'rgba(120, 36, 50, 0.5)',
                    shadowOffsetY: 5,
                    color: new echarts.graphic.RadialGradient(0.4, 0.3, 1, [{
                        offset: 0,
                        color: 'rgb(251, 118, 123)'
                    }, {
                        offset: 1,
                        color: 'rgb(204, 46, 72)'
                    }])
                }
            }
        }
    };
    myChart.clear();
    myChart.setOption(option);
};


//饼图
var pieChart = function (chartdata,box) {
    // console.log(chartdata)
    myChart = echarts.init(box);
    var option = {
        title: {
            text: chartdata.chart_title
        },
        tooltip: {
            trigger: 'item',
            formatter: '{a} <br>{b} : {c} ({d}%)'
        },
        legend: {
            type:'scroll',
            top:'20px',
            left:'50px',
            right:'50px',
            data:chartdata.legend
        },
        series: {
            radius : '80%',
            center: ['50%', '55%'],
            type: "pie",
            data: chartdata.data
        }
    };
    myChart.clear();
    myChart.setOption(option);
};


//雷达图
var radarChart = function (chartdata,box) {
    // console.log(chartdata)
    myChart = echarts.init(box);
    var legend = [];
    var category = [];
    var max = [];
    var max_data = chartdata.data[0].value[0]
    for (var k = 0; k < chartdata.data.length; k++) {
        for(var i = 0;i < chartdata.data[k].value.length;i++){
            if (Number(max_data) < Number(chartdata.data[k].value[i])) {
                max_data = chartdata.data[k].value[i]
            }
        }
    }
    for(var i = 0;i < chartdata.data.length;i++){
        legend.push(chartdata.data[i].name)
    }

    for(var i = 0;i < chartdata.legend.length;i++){
        category.push({name:chartdata.legend[i],max:max_data})
    }
    // console.log(category)
    var option = {
        title: {
            text: chartdata.chart_title
        },
        tooltip: {},
        legend: {
            type:'scroll',
            orient: 'vertical',
            top:'50px',
            left:'20px',
            bottom:'50px',
            data: legend
        },
        radar: {
            radius : '90%',
            center: ['50%', '52%'],
            indicator: category,
            shape: 'circle',
            splitArea: {
                show: true
            }
        },
        series: [{
            type: 'radar',
            data : chartdata.data
        }]
    };
    myChart.clear();
    myChart.setOption(option);
};


//漏斗图
var funnelChart = function (chartdata,box) {
    myChart = echarts.init(box);
    var legend = [];
    for (var i = 0; i < chartdata.data.length; i++) {
        legend.push(chartdata.data[i].name)
    }
    var option = {
        title: {
            text: chartdata.chart_title
        },
        tooltip: {
            trigger: 'item',
        },
        legend: {
            type:'scroll',
            top:'20px',
            left:'50px',
            right:'50px',
            data: legend
        },
        series: {
            type: 'funnel',
            left: '10%',
            top: 60,
            //x2: 80,
            bottom: 60,
            width: '80%',
            // height: {totalHeight} - y - y2,
            min: 0,
            minSize: '0%',
            maxSize: '100%',
            sort: 'descending',
            label: {
                normal: {
                    show: true,
                    position: 'inside'
                },
                emphasis: {
                    textStyle: {
                        fontSize: 20
                    }
                }
            },
            labelLine: {
                normal: {
                    length: 10,
                    lineStyle: {
                        width: 1,
                        type: 'solid'
                    }
                }
            },
            itemStyle: {
                normal: {
                    borderColor: '#fff',
                    borderWidth: 0
                }
            },
            data: chartdata.data
        }
    };
    myChart.clear();
    myChart.setOption(option);
};


//地图
var mapChart = function (chartdata,box) {
    myChart = echarts.init(box);
    var series = [];
    var legend = [];

    for(var i = 0;i < chartdata.series.length;i++){
        series.push({
            name: chartdata.series[i].name,
            type: 'map',
            mapType: chartdata.map,
            label: {
                normal: {
                    show: true
                },
                emphasis: {
                    show: true
                }
            },
            data:chartdata.series[i].value
        })
    }

    for(var i = 0;i < chartdata.series.length;i++){
        legend.push(chartdata.series[i].name)
    }

    option = {
        title: {
            text: chartdata.chart_title
        },
        tooltip: {
            trigger: 'item'
        },
        legend: {
            data:legend
        },
        visualMap: {
            min: 0,
            max: 2500,
            left: 'left',
            top: 'bottom',
            text: ['高','低'],           // 文本，默认为数值文本
            calculable: true
        },
        series: series
    };
    myChart.clear();
    myChart.setOption(option);
};


//热力图
var heatMapChart = function (chartdata,box) {
    myChart = echarts.init(box);
    var xAxis = [];
    var yAxis = [];
    var data = [];
    var values = [];
    function sortValue(a,b) {
        if(a>b){
            return 1
        }else if(a<b){
            return -1
        }else {
            return 0
        }
    }
    for (var i = 0; i < chartdata.legend.length; i++) {
        xAxis.push(chartdata.legend[i]);
    }
    for (var i = 0; i < chartdata.data.length; i++) {
        yAxis.push(chartdata.data[i].name);
        for (var j = 0; j < chartdata.data[i].value.length; j++) {
            values.push(chartdata.data[i].value[j]);
        }
    }
    // console.log(yAxis,xAxis,values)
    xAxis.sort(sortValue);
    yAxis.sort(sortValue);
    valueMin = Math.min.apply(null,values);
    valueMax = Math.max.apply(null,values);
    for(var i = 0;i < chartdata.data.length;i++){
        for (var k = 0; k < chartdata.data[i].value.length; k++) {
            data.push([k,i,chartdata.data[i].value[k]])
            // data.push([+chartdata.data[i].name,chartdata.legend[k],chartdata.data[i].value[k]])
            // console.log(i,k)
        }
    }
    option = {
        title:{
            text:chartdata.chart_title
        },
        tooltip: {
            trigger: 'item',
            formatter:function (params) {
                return '('+[xAxis[params.value[0]],yAxis[params.value[1]],params.value[2]]+')'
            }
        },
        animation: false,
        xAxis: {
            type: 'category',
            data: xAxis,
            splitArea: {
                show: true
            }
        },
        yAxis: {
            type: 'category',
            data: yAxis,
            splitArea: {
                show: true
            }
        },
        visualMap: {
            min: valueMin,
            max: valueMax,
            calculable: true,
            orient: 'horizontal',
            left: 'center'
        },
        series: [{
            type: 'heatmap',
            data: data,
            label: {
                normal: {
                    show: true
                }
            },
            itemStyle: {
                emphasis: {
                    shadowBlur: 10,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
            }
        }]
    };
    myChart.clear();
    myChart.setOption(option);
};


//词频图
var wordCloudChart = function (chartdata,box) {
    myChart = echarts.init(box);

    var option = {
        title:{
            text:chartdata.chart_title
        },
        tooltip: {
            trigger: 'item'
        },
        series : [ {
            type : 'wordCloud',
            shape:'smooth',
            gridSize : 2,
            sizeRange : [ 50, 100 ],
            rotationRange : [ 46, 80 ],
            textStyle : {
                normal : {
                    color : function() {
                        return 'rgb('
                                + [ Math.round(Math.random() * 160),
                                        Math.round(Math.random() * 160),
                                        Math.round(Math.random() * 160) ]
                                        .join(',') + ')';
                    }
                }
            },
            data : chartdata.series
        } ]
    };
    myChart.clear();
    myChart.setOption(option);
};


//ROC曲线
var ROCChart = function (chartdata,obj) {
    var symbolSize = 5;
    echarts.dispose(document.getElementById(obj))
    myChart = echarts.init(document.getElementById(obj));
    // console.log(chartdata);
    //数据源
    var data1 = [0, 0];
    var data = chartdata;
    var data3 = [1.0, 1.0];
    data.push(data3);
    data.splice(0, 0, data1);
    var data4 = data;
    var data2 = [[0, 0], [1.0, 1.0]];
    option_ROC = {
        tooltip: {
                formatter: '{c}'
        },
        grid: {},
        xAxis: {
            min: 0,
            max: 1,
            type: 'value',
            axisLine: {onZero: false}
        },
        yAxis: {
            min: 0,
            max: 1,
            type: 'value',
            axisLine: {onZero: false}
        },
        series: [
            {
                id: 'a',
                name: 'a',
                type: 'line',
                smooth: true,
                //itemStyle : { normal: {label : {show: true}}},
                label: {normal: {show: false}},
                symbolSize: symbolSize,
                data: data4
            },
            {
                id: 'b',
                name: 'b',
                type: 'line',
                smooth: false,
                symbolSize: symbolSize,
                itemStyle: {
                    normal: {
                        lineStyle: {
                            width: 2,
                            type: 'dotted'  //'dotted'虚线 'solid'实线
                        }
                    }
                },
                data: data2
            }
        ]
    };
    myChart.clear();
    myChart.setOption(option_ROC);
};


//趋势预测图
var TrendForecast = function (chartdata) {
    myChart = echarts.init(document.getElementById("box2"));
    //     console.log(chartdata);
        var valueX = chartdata[1][1][0];
        var valueY = chartdata[1][1][1];
        var markLineOpt = {
            animation: false,
            label: {
                normal: {
                    formatter: chartdata[2][0],
                    textStyle: {
                        align: 'right'
                    }
                }
            },
            lineStyle: {
                normal: {
                    type: 'solid'
                }
            },
            tooltip: {
                formatter: chartdata[2][0]
            },
            data: [[{
                coord: chartdata[1][0],
                symbol: 'none'
            }, {
                coord: chartdata[1][1],
                symbol: 'none'
            }]]
        };

        option = {
            title: {
                text: chartdata[0],
                x: 'left',
                y: 0
            },
            grid: [
                {x: '7%', y: '7%', width: '80%', height: '80%'}
            ],
            tooltip: {
                formatter: 'Group {a}: ({c})'
            },
            xAxis: [
                {
                    gridIndex: 0,
                    max: valueX ,
                    splitLine:{show: false}
                }
            ],
            yAxis: [
                {
                    gridIndex: 0,
                    max: valueY,
                    splitLine:{show: false}
                }
            ],
            series: [
                {
                    name: 'I',
                    type: 'scatter',
                    xAxisIndex: 0,
                    yAxisIndex: 0,
                    data: chartdata[3],
                    markLine: markLineOpt
                }
            ]
        };

    myChart.setOption(option);
};



// //树图
// var graphChart = function (chartdata) {
//     myChart = echarts.init(document.getElementById("middle_box"));
//     var data = [];
//     var links = [];
//     for(var i = 0;i < chartdata.series.value.length;i++){
//         data[i] = {name:chartdata.category.value[i],value:chartdata.series.value[i]};
//     }
//     option = {
//     title: {
//         text: 'Graph 简单示例'
//     },
//     tooltip: {},
//     animationDurationUpdate: 1500,
//     animationEasingUpdate: 'quinticInOut',
//     series : {
//         type: 'graph',
//         layout: 'none',
//         symbolSize: 50,
//         roam: true,
//         label: {
//             normal: {
//                 show: true
//             }
//         },
//         edgeSymbol: ['circle', 'arrow'],
//         edgeSymbolSize: [4, 10],
//         edgeLabel: {
//             normal: {
//                 textStyle: {
//                     fontSize: 20
//                 }
//             }
//         },
//         data: data,
//         links: links
//     }
//     };
//     myChart.setOption(option);
// };


//气泡地图
// var mapChart = function(chartdata) {
//     myChart = echarts.init(document.getElementById("middle_box"));
//     var series = [];
//     var legend = [];
//     for(var i = 0;i < chartdata.series.length;i++){
//         series.push({
//         name: chartdata.series[i].name,
//         type: "scatter",
//         coordinateSystem: 'geo',
//         itemStyle:{
//             normal:{label:{show:true}},
//             emphasis:{label:{show:true}}
//         },
//         data:chartdata.series[i].data
//         })
//     };
//     for(var i = 0;i < chartdata.series.length;i++){
//         legend.push(chartdata.series[i].name)
//     }
//     var option = {
//     title : {
//         text: chartdata.chart_title,
//         subtext: '',
//         x:'center'
//     },
//     tooltip : {
//         trigger: 'item',
//         formatter: function (params) {
//             return params.name + ' : ' + params.value[2];
//         }
//     },
//     legend: {
//         orient: 'vertical',
//         x:'left',
//         data:legend
//     },
//     toolbox: {
//         show: true,
//         orient : 'vertical',
//         x: 'right',
//         y: 'center',
//         feature : {
//             mark : {show: true},
//             dataView : {show: true, readOnly: false},
//             restore : {show: true},
//             saveAsImage : {show: true}
//         }
//     },
//     visualMap: {
//         min: 0,
//         max: 200,
//         calculable: true,
//         inRange: {
//             color: ['#50a3ba', '#eac736', '#d94e5d']
//         },
//         textStyle: {
//             color: '#fff'
//         }
//     },
//     geo: {
//         map: chartdata.map,
//         label: {
//             emphasis: {
//                 show: false
//             }
//         },
//         itemStyle: {
//             normal: {
//                 areaColor: '#323c48',
//                 borderColor: '#111'
//             },
//             emphasis: {
//                 areaColor: '#2a333d'
//             }
//         }
//     },
//
//     series :series
// };
//
//
//     myChart.setOption(option);
// };