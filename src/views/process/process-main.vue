<template>
  <div class="home">
    <div class="bim">
        <bim></bim>
    </div>
    <div class="rightleft">
        <div class="attribute">
            <div class="head">构件属性</div>
            <div class="body" v-for="item in attrlist"><span>{{item.name}}:</span>&nbsp;&nbsp;<span>{{item.value}}</span></div>
            <div class="footer">
                <i-button type="primary">打印身份证</i-button>
                <i-button type="primary">过程追踪</i-button>
            </div>
        </div>
        <div class="file">
            <div class="head">管理文件</div>
            <div class="body" v-for="item in filelist">
                <span><Icon type="ios-folder" style="padding:0 5px"></Icon>{{item.name}}</span>
                <span style="padding-right:40px">{{item.value}}</span></div>
            
        </div>
        <div class="componentlist">
            <div class="head">构件列表</div>
            <div class="body">
                <div class="list" v-for="item in componentlist">
                    <span>{{item.name}}</span>
                    <span style="padding-right:20px">{{item.value}}</span></div>
            </div>
            
        </div>
    </div>
  </div>
</template>

<script>
import bim from '@/components/bim.vue'
import chart from 'vue-echarts'

export default {
  components: {
    bim,
    chart
  },
  data(){
    return {
        attrlist:[
            {
                name:'编号',
                value:'xxxxxxx'
            },
            {
                name:'状态',
                value:'xxxxxxx'
            },
            {
                name:'累计完成百分比',
                value:'xxxxxxx'
            },
            {
                name:'类型',
                value:'xxxxxxx'
            },
            {
                name:'空间',
                value:'xxxxxxx'
            },
            {
                name:'备注',
                value:'xxxxxxx'
            },
        ],
        filelist:[
            {
                name:'工程设计资料1',
                value:'2019-03-21'
            },
            {
                name:'工程设计资料2',
                value:'2019-03-22'
            },
            {
                name:'工程设计资料3',
                value:'2019-03-23'
            },
        ],
        componentlist:[
            {
                name:'底板1-1区基础混凝土',
                value:'混凝土养护'
            },
            {
                name:'底板1-1区基础混凝土',
                value:'混凝土养护'
            },
            {
                name:'底板1-1区基础混凝土',
                value:'混凝土养护'
            },
            {
                name:'底板1-1区基础混凝土',
                value:'混凝土养护'
            },
            {
                name:'底板1-1区基础混凝土',
                value:'混凝土养护'
            },
            {
                name:'底板1-1区基础混凝土',
                value:'混凝土养护'
            },
            {
                name:'底板1-1区基础混凝土',
                value:'混凝土养护'
            },
        ],

    }
  }
}
</script>
<style scoped>
    .home {padding: 22px;background-color: #dae3ef;height: 100%}
    .bim {width: calc(100% - 500px);margin-right: 20px;float: left;height: 100%;}
    .rightleft {width: 480px;display: flex;align-items: center;justify-content: center;flex-direction: column;float: right;height: 100%;}
    .rightleft .attribute,.file,.componentlist{width: 100%;background-color: #ffffff;padding: 0px 20px;}
    .attribute .head {height: 70px;line-height: 70px;text-align: left;font-size: 18px;padding-left: 20px;font-weight: bold}
    .attribute .body {height: 40px;line-height: 40px;text-align: left;padding-left: 20px;font-size: 16px;color: #2A2A2A;}
    .attribute .body:nth-child(even){background-color: #F4F9FF;}
    .attribute .footer button{margin-right: 10px;font-size: 16px;}
    .file{height:190px;overflow-y: auto; }
    .file .head {height: 70px;line-height: 70px;text-align: left;font-size: 18px;padding-left: 20px;font-weight: bold}
    .file .body {height: 40px;line-height: 40px;text-align: left;padding-left: 20px;font-size: 16px;color: #2A2A2A;display: flex;justify-content: space-between}
    .file .body:nth-child(even){background-color: #F4F9FF;}
    .componentlist{height:calc(100% - 540px);overflow-y: hidden;}
    .componentlist .head {height: 70px;line-height: 70px;text-align: left;font-size: 18px;padding-left: 20px;font-weight: bold}
    .componentlist .body {height:calc(100% - 70px);overflow-y: auto;}
    .componentlist .body .list {height: 40px;line-height: 40px;text-align: left;padding-left: 20px;font-size: 16px;color: #2A2A2A;display: flex;justify-content: space-between}
    .componentlist .body .list:nth-child(odd){background-color: #F4F9FF;}
</style>
