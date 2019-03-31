<template>
  <div class="process">
    <div class="tab">
        <div class="processroute" v-for="route in routelist" @click="choseroute(route.name)">
            {{route.title}}
        </div>
    </div>
    <div class="body">
        <router-view/>
    </div>
  </div>
</template>

<script>
import chart from 'vue-echarts'

export default {
  components: {
    chart
  },
  data(){
    return {
        routelist:[
            {
                title:'首页',
                name:'/process/process-main'
            },
            {
                title:'进度录入',
                name:'/process/process-lurujindu'
            },
            {
                title:'构件查询',
                name:'/process/process-element'
            },
        ]
    }
  },
  methods:{
    choseroute(name){
        this.$router.push(name)
    }
  }
}
</script>
<style scoped>
    .process {height: calc(100% - 100px)}
    .tab {width: 100%;height: 60px;}
    .body {width:100%;height:calc(100% - 60px);}
    .processroute {height: 60px;line-height: 60px;float: left;width: 100px;font-size: 16px;cursor: pointer;}
</style>