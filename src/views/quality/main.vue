<template>
  <div class="quality">
    <div class="tab">
        <div class="qualityroute" v-for="route in routelist" @click="choseroute(route)" :class="route.state ? 'choseitem' : '' ">
            {{route.title}}
        </div>
    </div>
    <div class="body">
        <router-view/>
    </div>
  </div>
</template>

<script>
export default {
  components: {
  },
  data(){
    return {
        routelist:[
            {
                title:'质量问题',
                name:'/quality/quality-list',
                state:true
            },
            {
                title:'质量问题统计',
                name:'/quality/quality-chart',
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
    .quality {height: calc(100% - 100px)}
    .tab {width: 100%;height: 60px;}
    .body {width:100%;height:calc(100% - 60px);}
    .qualityroute {float:left;height: 60px;line-height: 60px; width: 100px;font-size: 16px;cursor: pointer;}
    .choseitem {border-bottom: 3px solid #418DE9;box-sizing: border-box; }
</style>