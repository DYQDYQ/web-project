<template>
    <div class="file">
    <div class="header-v2">
        <div class="header-bg-v2">
            <span class="title-v2 line_height32">资料管理</span>
            <a href="/task/ziliao/gatherAll/" target="_blank"><div class="tuzhi-jump-btn">图纸汇总</div></a>
            <a href="/task/ziliao/addFile/" target="_blank"><div class="tuzhi-jump-btn">新增</div></a>
        </div>
    </div>
    <a class="file-a-jump" href="/task/ziliao/information/" target="_blank"><div class="tuzhi-jump-btn">资料检索</div></a>
    <div id="elfinder"></div>
    <a download="" href=""  id="downhref" target="_blank"></a>  
    <input type="hidden" id="startPathHash" value="{{startPathHash}}" />
    </div>
</template>
<script>
    export default{
        data(){
            return{

            }
        }
    }
</script>
<style>
    #elfinder-elfinder-cwd-thead tr{  background:#dddddd;  }
    .search-v2{position: absolute; top:5px; right: 15px; }
    .search-v2 input{color:#3B4047;padding-left: 10px;border:1px solid #ccc;}
    #click-v2{position: absolute; top: 6px; right: 5px; color: #dddddd; cursor: pointer;}
    .wenjian-li{width: 100%}
    .f-left{line-height: 48px;font-size: 15px;color: #3B4047;min-width: 195px;overflow: hidden;text-overflow:ellipsis;height: 48px;}
    .f-right{line-height: 60px;color: #3B4047;height: 48px;text-align: right;margin-right: 30px;}
    .tuzhi-jump-btn{
        float: right;
        margin-left: 15px;
        color: #fff;
        background-color: #d05354;
        border-color: #d05354;
        border: 1px solid transparent;
        display: inline-block;
        margin-bottom: 0;
        font-weight: 400;
        text-align: center;
        vertical-align: middle;
        cursor: pointer;
        white-space: nowrap;
        line-height: 1.5;
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
        padding: 6px 15px;
        font-size: 12px;
        border-radius: 4px;
        transform: translate3d(0,0,0);
        transition: color .2s linear,background-color .2s linear,border .2s linear;
    }
    #elfinder{  height: calc(100% - 76px)!important;  }
    .file-a-jump{  position: absolute;  top: 80px;  right: 18px;  z-index: 100;  }
    .file-a-jump>.tuzhi-jump-btn{  padding: 2px 7px;  }
</style>