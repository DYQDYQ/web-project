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
          }},
      methods:{
          resizeScale(){
              let width = document.documentElement.clientWidth;
              let height = document.documentElement.clientHeight;
              console.log(width,height);
              document.body.style.transform =  'scale(' + (width/1920).toFixed(4) + ','+ (height/1009).toFixed(4)+')';
              window.addEventListener('resize',function(){
                  let width = document.documentElement.clientWidth;
                  let height = document.documentElement.clientHeight;
                  document.body.style.transform = 'scale(' + (width/1920).toFixed(4) + ','+ (height/1009).toFixed(4)+')';
              });
              window.innerWidth=1920;
              window.innerHeight=1009;
          }
      },
      mounted(){
          this.resizeScale();
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
