function CreateHistoryCharts(respondData)
{
    var dom = document.getElementById("history");
    var myChart = echarts.init(dom);
    var app = {};
    option = null;

    var timeData =respondData.timeData;

    timeData = timeData.map(function (str) {
        return str.replace('2009/', '');
    });

    option = {
        title: {
            text: '人流量分布图',
            subtext: '数据来自服务器',
            x: 'center'
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                animation: false
            }
        },
        legend: {
            data:['进入','出去'],
            x: 'left'
        },
        toolbox: {
            feature: {
                dataZoom: {
                    yAxisIndex: 'none'
                },
                restore: {},
                saveAsImage: {},
            }
        },
        axisPointer: {
            link: {xAxisIndex: 'all'}
        },
        dataZoom: [
            {
                show: true,
                realtime: true,
                start: 30,
                end: 70,
                xAxisIndex: [0, 1]
            },
            {
                type: 'inside',
                realtime: true,
                start: 30,
                end: 70,
                xAxisIndex: [0, 1]
            }
        ],
        grid: [{
            left: 50,
            right: 50,
            height: '35%'
        }, {
            left: 50,
            right: 50,
            top: '55%',
            height: '35%'
        }],
        xAxis : [
            {
                type : 'category',
                boundaryGap : false,
                axisLine: {onZero: true},
                data: timeData
            },
            {
                gridIndex: 1,
                type : 'category',
                boundaryGap : false,
                axisLine: {onZero: true},
                data: timeData,
                position: 'top'
            }
        ],
        yAxis : [
            {
                name : '进入(人/h)',
                type : 'value',
                max : 500
            },
            {
                gridIndex: 1,
                name : '出去(人/h)',
                type : 'value',
                inverse: true,
                max : 500
            }
        ],
        series : [
            {
                name:'进入',
                type:'line',
                symbolSize: 8,
                hoverAnimation: false,
                data:respondData.data[0]
            },
            {
                name:'出去',
                type:'line',
                xAxisIndex: 1,
                yAxisIndex: 1,
                symbolSize: 8,
                hoverAnimation: false,
                data:respondData.data[1]
            }
        ]
    };;
    if (option && typeof option === "object") {
        myChart.setOption(option, true);
    }
}

function CreateRealTimeCharts(respondData)
{

    var dom = document.getElementById("realTime");
    var myChart = echarts.init(dom);
    var app = {};
    option = null;
    app.title = '多 X 轴示例';
    
    var colors = ['#5793f3', '#d14a61', '#675bba'];
    
    
    option = {
        color: colors,
    
        tooltip: {
            trigger: 'none',
            axisPointer: {
                type: 'cross'
            }
        },
        legend: {
            data:['进入人数', '出去人数']
        },
        toolbox: {
            feature: {
                dataZoom: {
                    yAxisIndex: 'none'
                },
                restore: {},
                myTool : {
                    show : true,
                    title : '关闭',  
                    icon : 'image://./close.png',
                    itemSize: 30,
                    onclick : function (){  
                        close();  
                    }  
                }
            }
        },
        grid: {
            top: 70,
            bottom: 50
        },
        xAxis: [
            {
                type: 'category',
                axisTick: {
                    alignWithLabel: true
                },
                axisLine: {
                    onZero: false,
                    lineStyle: {
                        color: colors[1]
                    }
                },
                axisPointer: {
                    label: {
                        formatter: function (params) {
                            return '降水量  ' + params.value
                                + (params.seriesData.length ? '：' + params.seriesData[0].data : '');
                        }
                    }
                },
                data: respondData.data[0]
            },
            {
                type: 'category',
                axisTick: {
                    alignWithLabel: true
                },
                axisLine: {
                    onZero: false,
                    lineStyle: {
                        color: colors[0]
                    }
                },
                axisPointer: {
                    label: {
                        formatter: function (params) {
                            return '降水量  ' + params.value
                                + (params.seriesData.length ? '：' + params.seriesData[0].data : '');
                        }
                    }
                },
                data: respondData.data[0]
            }
        ],
        yAxis: [
            {
                type: 'value'
            }
        ],
        series: [
            {
                name:'2015 降水量',
                type:'line',
                xAxisIndex: 1,
                smooth: true,
                data: respondData.data[1]
            },
            {
                name:'2016 降水量',
                type:'line',
                smooth: true,
                data: respondData.data[2]
            }
        ]
    };
    ;
    if (option && typeof option === "object") {
        myChart.setOption(option, true);
    }
}