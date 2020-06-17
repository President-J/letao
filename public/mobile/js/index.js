$(function () {
    // 注册人数
    // 基于准备好的dom,初始化echarts实例
    var myChart1 = echarts.init(document.getElementById('person'));

    // 指定图标的配置项和数据
    var option1 = {
        title: {
            text: '2019年注册人数'
        },
        tooltip: {},
        legend: {
            data:['人数']
        },
        xAxis: {
            data: ['一月','二月','三月','四月','五月','六月']
        },
        yAxis: {},
        series: [{
            name: '人数',
            type: 'line',
            data: [5,20,34,56,14,20]
        }]
    };

    // 使用刚指定的配置项和数据显示图表 
    myChart1.setOption(option1);

    // 品牌可视化
    // 基于准备好的dom,初始化eChart实例
    var myChart2 = echarts.init(document.getElementById('number'));

    // 指定图表的配置项和数据
    var option2 = {
        title: {
            text: '2019热销品牌',
            subtext: '可能是真的',
            x: 'center',
            textStyle: {
                color: 'red'
            }
        },
        legend: {
            trigger: 'item',
            formatter: "{a} -- {b} :: {c} - ({d}%)"
        },
        legend: {
            orient: 'vertical',
            left: 'left',
            data: ['AJ','阿迪','回力','匡威','耐克','老北京']
        },
        series: [{
            name: '热销品牌',
            type: 'pie',
            radius: '55%',
            center: ['50%','50%'],
            data: [
                {value:335, name:'AJ'},
                {value:310, name:'阿迪'},
                {value:154, name:'回力'},
                {value:555, name:'匡威'},
                {value:105, name:'耐克'},
                {value:225, name:'老北京'},
            ],
            itemStyle: {
                emphasis: {
                    shadowBlur:100,
                    shadowOffsetX: 0,
                    shadowColor: 'yellow'
                }
            }
        }]
    };

    // 使用刚指定的配置项和数据显示图表
    myChart2.setOption(option2);
})