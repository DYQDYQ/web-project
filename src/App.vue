<template>
  <div id="app">
    <nowhead></nowhead>
    <router-view/>
  </div>
</template>

<script>
  import nowhead from './views/head.vue'
  export default {
    data(){
      return {

      }
    },
    components:{
      nowhead
    }
  }
</script>

<style lang="less">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
html,body {
  height: 100%;
}
#app {
  height: 100%;
}
</style>
