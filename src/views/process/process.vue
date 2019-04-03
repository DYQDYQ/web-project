<template>
  <div class="process">
    <div class="tab">
        <div class="processroute" v-for="route in routelist" @click="choseroute(route)" :class="route.state ? 'choseitem' : '' ">
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
    chart,
  },
  data(){
    return {
        routelist:[
            {
                title:'首页',
                name:'/process/process-main',
                state:true
            },
            {
                title:'进度录入',
                name:'/process/process-lurujindu',
                state:false
            },
            {
                title:'构件查询',
                name:'/process/process-element',
                state:false
            },
        ]
    }
  },
  methods:{
    choseroute(route){
        this.$router.push(route.name);
        this.routelist.forEach(value => {
            value.state = false;
            if(route.name == value.name){
                value.state = true;
            }
        })

    }
  }
}
</script>
<style scoped>
    .process {height: calc(100% - 100px)}
    .tab {width: 100%;height: 60px;}
    .body {width:100%;height:calc(100% - 60px);}
    .processroute {float:left;height: 60px;line-height: 60px; width: 100px;font-size: 16px;cursor: pointer;}
    .choseitem {border-bottom: 3px solid #418DE9;box-sizing: border-box; }
</style>