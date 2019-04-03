<template>
    <div class="quality-chart">
        <div class="sort">
            <div class="chart-title">问题分类统计</div>
            <div class="chart-button">
                <i-button type="primary" size="small">一级分类</i-button>
                <i-button type="primary" size="small">二级分类</i-button>
            </div>
            <chart  class="issue1" :options="sort"></chart>
        </div>
        <div class="normal">
            <div class="head">
                <div class="chart-title">问题次数统计</div>
            </div>
            <chart :options="time" style="width:100%;height:100%"></chart>
        </div>
        <div class="normal">
            <div class="head">
                <div class="chart-title">当前未关闭问题统计</div>
            </div>
            <chart :options="noclose" style="width:100%;height:100%"></chart>
        </div>
        <div class="normal">
            <div class="head">
                <div class="chart-title">各专业按时整改率统计</div>
            </div>
            <chart :options="changetime" style="width:100%;height:100%"></chart>
        </div>
        <div class="normal">
            <div class="head">
                <div class="chart-title">问题等级统计</div>
            </div>
            <chart :options="grade" style="width:100%;height:100%"></chart>
        </div>
    </div>
</template>
<script>
    import echarts from 'vue-echarts'
    export default{
        components:{
            chart:echarts
        },
        data(){
            return{
                sort: {
                    xAxis: {
                        type: 'category',
                        data: ['混凝土', '模板', '砌筑', '抹灰', '地面', '门窗', '外立面','栏杆', '防火门', '防雷接地', '管道桥架', '临时用电', '综合管线', '电气安装','给排水', '暖通', '消防', '智能化', '太阳能', '室外配套', '量化工程']
                    },
                    yAxis: {
                        type: 'value'
                    },
                    grid: {
                        left: '3%',
                        right: '2%',
                        bottom: '3%',
                        containLabel: true
                    },
                    series: [{
                        data: [4, 2,3, 1, 0, 0, 0,5,4, 2,3, 1, 0, 0, 0,4, 2,3, 1, 0, 0],
                        type: 'bar',
                        itemStyle: {
                            normal: {
                                color: new echarts.graphic.LinearGradient(
                                    0, 0, 0, 1,
                                    [
                                        {offset: 0, color: '#83bff6'},
                                        {offset: 0.5, color: '#188df0'},
                                        {offset: 1, color: '#188df0'}
                                    ]
                                )
                            },
                            emphasis: {
                                color: new echarts.graphic.LinearGradient(
                                    0, 0, 0, 1,
                                    [
                                        {offset: 0, color: '#2378f7'},
                                        {offset: 0.7, color: '#2378f7'},
                                        {offset: 1, color: '#83bff6'}
                                    ]
                                )
                            }
                        },
                    }]
                },
                time: {
                    xAxis: {
                        type: 'category',
                        data: ['2018/11/01-2018/12/01', '2018/12/01-2019/01/01', '2019/01/01-2018/2/01']
                    },
                    yAxis: {
                        type: 'value'
                    },
                    grid: {
                        left: '6%',
                        right: '3%',
                        bottom: '3%',
                        containLabel: true
                    },
                    series: [{
                        data: [2, 3, 5, 8, 1, 2, 5],
                        type: 'line',
                        smooth: true
                    }]
                },
                noclose:{
                    xAxis: {
                        type: 'category',
                        data: ['总体概念']
                    },
                    yAxis: {
                        type: 'value'
                    },
                    grid: {
                        left: '6%',
                        right: '3%',
                        bottom: '3%',
                        containLabel: true
                    },
                    series: [{
                        data: [15],
                        type: 'bar',
                        itemStyle: {
                            normal: {
                                color: new echarts.graphic.LinearGradient(
                                    0, 0, 0, 1,
                                    [
                                        {offset: 0, color: '#83bff6'},
                                        {offset: 0.5, color: '#188df0'},
                                        {offset: 1, color: '#188df0'}
                                    ]
                                )
                            },
                            emphasis: {
                                color: new echarts.graphic.LinearGradient(
                                    0, 0, 0, 1,
                                    [
                                        {offset: 0, color: '#2378f7'},
                                        {offset: 0.7, color: '#2378f7'},
                                        {offset: 1, color: '#83bff6'}
                                    ]
                                )
                            }
                        },
                    }]
                },
                changetime:{
                    xAxis: {
                        type: 'category',
                        data: ['土建工程']
                    },
                    yAxis: {
                        type: 'value'
                    },
                    grid: {
                        left: '6%',
                        right: '3%',
                        bottom: '3%',
                        containLabel: true
                    },
                    series: [{
                        data: ['20%'],
                        type: 'bar',
                        itemStyle: {
                            normal: {
                                color: new echarts.graphic.LinearGradient(
                                    0, 0, 0, 1,
                                    [
                                        {offset: 0, color: '#83bff6'},
                                        {offset: 0.5, color: '#188df0'},
                                        {offset: 1, color: '#188df0'}
                                    ]
                                )
                            },
                            emphasis: {
                                color: new echarts.graphic.LinearGradient(
                                    0, 0, 0, 1,
                                    [
                                        {offset: 0, color: '#2378f7'},
                                        {offset: 0.7, color: '#2378f7'},
                                        {offset: 1, color: '#83bff6'}
                                    ]
                                )
                            }
                        },
                    }]
                },
                grade:{
                    legend: {
                        data:['轻微','一般','严重'],
                        align: 'right',
                        right: 20,
                        top:20
                    },
                    grid: {
                        left: '6%',
                        right: '3%',
                        bottom: '3%',
                        containLabel: true
                    },
                    xAxis : [
                        {
                            type : 'category',
                            data : ['土建工程']
                        }
                    ],
                    yAxis : [
                        {
                            type : 'value'
                        }
                    ],
                    series: [
                        {
                            name:'轻微',
                            type:'bar',
                            data:[256]
                        },
                        {
                            name:'一般',
                            type:'bar',
                            data:[90]
                        },
                        {
                            name:'严重',
                            type:'bar',
                            data:[12]
                        },
                    ]
                }
            }
        }

    }
</script>
<style scoped>
    .quality-chart{position: absolute;top: 160px;left: 0px;bottom: 0px;right: 0px;}
    .quality-chart .normal{width: 50%;height:  calc(50vh - 108px);display: inline-block;vertical-align: top; position: relative; margin-bottom: 20px}
    .quality-chart .sort{  width: 100%;height:  calc(50vh - 108px); position: relative;  margin-bottom: 20px}
    .chart-button{  position: absolute;  right: 20px;  top: 15px; z-index: 10;}
    .chart-button button {margin-left: 10px;}
    .chart-title{ position: absolute;  left: 60px;  top: 15px; z-index: 10; background: url('../../assets/img/chart-head.png') no-repeat;width: 275px;height: 30px;background-size: 100% auto;line-height: 30px;font-size: 17px;font-weight: 400;text-align: left;padding-left: 10px;color: #ffffff}
    .quality-chart .sort .issue1{  position: absolute;bottom: 0px; top: 15px;  width: 100%;}
</style>