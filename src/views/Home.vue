<template>
  <div class="home">
    <div class="bim">
        <bim></bim>
    </div>
    <div class="echart">
        <div id="process">
            <chart :options="process" style="width:100%;height:100%"></chart>
        </div>
        <div id="safe">
            <chart :options="safe" style="width:100%;height:100%"></chart>
        </div>
        <div id="quality">
            <chart :options="quality" style="width:100%;height:100%"></chart>
        </div>
    </div>
  </div>
</template>

<script>
import bim from '@/components/bim.vue'
import chart from 'vue-echarts'

export default {
  name: 'home',
  components: {
    bim,
    chart
  },
  data(){
    return {
        process:{
            title : {
                text: '进度统计',
                x:'left'
            },
            tooltip : {
                trigger: 'item',
                formatter: "{a} <br/>{b} : {c} ({d}%)"
            },
            legend: {
                orient: 'vertical',
                top: '30px',
                left: 'left',
                data: ['现场存储','已安装','未生产','生产中','厂内存储']
            },
            series : [
                {
                    name: '访问来源',
                    type: 'pie',
                    radius : '55%',
                    center: ['50%', '60%'],
                    data:[
                        {value:157, name:'现场存储'},
                        {value:59, name:'已安装'},
                        {value:127, name:'未生产'},
                        {value:108, name:'生产中'},
                        {value:451, name:'厂内存储'}
                    ],
                    itemStyle: {
                        emphasis: {
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                        }
                    }
                }
            ]
        },
        safe:{
            title : {
                text: '安全问题',
                x:'left'
            },
            tooltip: {
                trigger: 'item',
                formatter: "{a} <br/>{b}: {c} ({d}%)"
            },
            legend: {
                orient: 'horizontal',
                bottom: '10px',
                data:['检疫办公','报关增税','入场现场','海关B1-6'],
                selected: {
                    '检疫办公':true
                }
            },
            series: [
                {
                    name:'安全问题',
                    type:'pie',
                    radius: ['60%', '70%'],
                    avoidLabelOverlap: false,
                    label: {
                        normal: {
                            show: false,
                            position: 'center'
                        },
                        emphasis: {
                            show: true,
                            textStyle: {
                                fontSize: '16',
                                fontWeight: 'bold'
                            }
                        }
                    },
                    labelLine: {
                        normal: {
                            show: false
                        }
                    },
                    data:[
                        {value:3840, name:'检疫办公'},
                        {value:556, name:'报关增税'},
                        {value:3840, name:'入场现场'},
                        {value:556, name:'海关B1-6'},
                    ]
                }
            ]
        },
        quality:{
            title : {
                text: '质量问题',
                x:'left'
            },
            tooltip: {
                trigger: 'item',
                formatter: "{a} <br/>{b}: {c} ({d}%)"
            },
            legend: {
                orient: 'horizontal',
                bottom: '10px',
                data:['检疫办公','报关增税','入场现场','海关B1-6']
            },
            series: [
                {
                    name:'质量问题',
                    type:'pie',
                    radius: ['60%', '70%'],
                    avoidLabelOverlap: false,
                    label: {
                        normal: {
                            show: false,
                            position: 'center'
                        },
                        emphasis: {
                            show: true,
                            textStyle: {
                                fontSize: '16',
                                fontWeight: 'bold'
                            }
                        }
                    },
                    labelLine: {
                        normal: {
                            show: false
                        }
                    },
                    data:[
                        {value:3840, name:'检疫办公'},
                        {value:556, name:'报关增税'},
                        {value:3840, name:'入场现场'},
                        {value:556, name:'海关B1-6'},
                    ]
                }
            ]
        },
    }
  }
}
</script>
<style scoped>
    .home {
        padding: 22px;
        background-color: #dae3ef;
        height: calc(100% - 100px);
    }
    .bim {
        width: calc(100% - 500px);
        margin-right: 20px;
        float: left;
        height: 100%;
    }
    .echart {
        width: 480px;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        float: right;
        height: 100%;

    }
    .echart div {
        width: 100%;
        background-color: #ffffff;
        height: calc( calc(100% - 32px) / 3);
    }
    #safe {
        margin: 16px 0;
    }
</style>
