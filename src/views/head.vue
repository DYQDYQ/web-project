<template>
  <div class="head">
    <div class="title">
       1 
    </div>
    <div class="menu">
        <div @click="changeroute(item)" v-for="item in menulist" class="item" :class="item.active ? 'itemactive' : ''">
            <img :src="item.icon">
            <div>{{item.title}}</div>
        </div>
    </div>
    <div class="message">4</div>
    <div class="user">3</div>
  </div>
</template>
<script>
    export default {
        data(){
            return{
                menulist:[
                    {
                        title: '首页',
                        name: 'home',
                        icon: require('../assets/img/head.png'),
                        active: true
                    },
                    {
                        title: '进度管理',
                        name: 'process',
                        icon: require('../assets/img/process.png'),
                        active: false
                    },
                    {
                        title: '质量管理',
                        name: 'quality',
                        icon: require('../assets/img/quality.png'),
                        active: false
                    },
                    {
                        title: '安全管理',
                        name: 'safe',
                        icon: require('../assets/img/safe.png'),
                        active: false
                    },
                    {
                        title: '文件管理',
                        name: 'file',
                        icon: require('../assets/img/file.png'),
                        active: false
                    },
                    {
                        title: '会议管理',
                        name: 'meeting',
                        icon: require('../assets/img/meeting.png'),
                        active: false
                    },
                    {
                        title: '项目简介',
                        name: 'projectview',
                        icon: require('../assets/img/projectview.png'),
                        active: false
                    },
                    {
                        title: '项目公告',
                        name: 'projectnotice',
                        icon: require('../assets/img/notice.png'),
                        active: false
                    },
                ]
            }
        },
        methods:{
            changeroute(item){
                this.$router.push({name:item.name});
                this.menulist.forEach(v => {
                    v.active = false;
                    if(v.name == item.name){
                        v.active = true;
                    }
                })
            }
        }
    }
</script>
<style scoped>
    .head {
        width: 100%;
        height: 100px;
        background-color: #3385ff;
        color: #ffffff;
    }
    .title {
        width:300px;
        height: 100px;
        line-height: 100px;
        float: left;
    }
    .menu {
        height: 100px;
        line-height: 100px;
        float: left;
    }
    .menu .item {
        display: flex;
        width: 120px;
        border-right: 1px solid #f0f0f0;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        float: left;
        height: 100px;
        cursor:pointer;

    }
    .menu .item div{
        width: 120px;
        height: 16px;
        line-height: 16px;
        margin-top: 10px;

    }
    .menu .item img{
        display: block;

    }
    .menu .itemactive {
        background-color: #418DE9;
    }
    .user {
        width: 190px;
        height: 100px;
        line-height: 100px;
        float: right;
    }
    .message {
        width: 120px;
        height: 100px;
        line-height: 100px;
        float: right;
    }
</style>
