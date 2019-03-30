<template>
    <div class="quality-chart">
        <div class="sort">
            <div class="head">
                <div class="title">问题分类统计</div>
                <i-button type="primary">一级分类</i-button>
                <i-button type="primary">二级分类</i-button>
            </div>
            <chart :options="sort" style="width:100%;height:100%"></chart>
        </div>
        <div class="time">
            <div class="head">
                <div class="title">问题次数统计</div>
            </div>
            <chart :options="time" style="width:100%;height:100%"></chart>
        </div>
        <div class="noclose">
            <div class="head">
                <div class="title">当前未关闭问题统计</div>
            </div>
            <chart :options="noclose" style="width:100%;height:100%"></chart>
        </div>
        <div class="changetime">
            <div class="head">
                <div class="title">各专业按时整改率统计</div>
            </div>
            <chart :options="changetime" style="width:100%;height:100%"></chart>
        </div>
        <div class="grade">
            <div class="head">
                <div class="title">问题等级统计</div>
            </div>
            <chart :options="grade" style="width:100%;height:100%"></chart>
        </div>
    </div>
</template>
<script>
    import chart from 'vue-echarts'
    export default{
        components:{
            chart
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
                    series: [{
                        data: [20%],
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
                        data:['轻微','一般','严重']
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