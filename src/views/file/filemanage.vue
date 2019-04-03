<template>
    <div class="filemanage">
        <div class="header-v2">
                <a class="file-a-jump" href="#" target="_blank"><div class="tuzhi-jump-btn">资料检索</div></a>
                <a class="file-a-jump" href="#" target="_blank"><div class="tuzhi-jump-btn">图纸汇总</div></a>
                <a class="file-a-jump" href="#" target="_blank"><div class="tuzhi-jump-btn">新增</div></a>

        </div>
       
        <div id="elfinder"></div>
        <a download="" href=""  id="downhref" target="_blank"></a>
    <!-- <input type="hidden" id="startPathHash" value="{{startPathHash}}" /> -->


    <!-- 模态框 -->

<!--     <Model
    v-model="showadd"
    title="本地资料上传"
    @on-ok="okupload"
    @on-cancel="cancelupload">
        <Upload
        multiple
        type="drag"
        action="#">
            <div style="padding: 20px 0">
                <Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
                <p>可拖放文件，文件夹到这里</p>
            </div>
        </Upload>
        <div class="chosebuttin">
            <i-button type="上传文件">上传文件</i-button>
            <i-button type="text">上传文件夹</i-button>
        </div>
        <div class="title">
            一.基础属性
        </div>
        <Form :model="baseItem" :label-width="80" inline>
            <FormItem label="名称">
                <Input v-model="baseItem.name" placeholder="默认为上传文件名称"></Input>
            </FormItem>
            <FormItem label="文件类型">
                 <Select v-model="formItem.type">
                    <Option value="beijing">test</Option>
                </Select>
            </FormItem>
            <FormItem label="编号">
                <Input v-model="baseItem.number" placeholder="默认为根据文件类型数量提供"></Input>
            </FormItem>
            <FormItem label="专业">
                 <Select v-model="formItem.type">
                    <Option value="beijing">test</Option>
                </Select>
            </FormItem>
            <FormItem label="关联文件">
                <Select v-model="formItem.type">
                    <Option value="beijing">test</Option>
                </Select>
            </FormItem>
            <FormItem label="关联元素">
                 <Select v-model="formItem.type">
                    <Option value="beijing">test</Option>
                </Select>
            </FormItem>
            <FormItem label="附件">
                 <Select v-model="formItem.type">
                    <Option value="beijing">test</Option>
                </Select>
            </FormItem>

        </Form>
        <div class="title">
            二.高级属性
        </div>
        <Form :label-width="80" inline>
            <FormItem label="生效日期">
                <DatePicker type="date" placeholder="Select date"></DatePicker>
            </FormItem>
            <FormItem label="责任单位">
                 <Select>
                    <Option value="beijing">test</Option>
                </Select>
            </FormItem>
            <FormItem label="标签">
                 <Select>
                    <Option value="beijing">test</Option>
                </Select>
            </FormItem>
            <FormItem label="关联文件">
                <Input type="备注" :autosize="{minRows: 2,maxRows: 5}" placeholder="默认为上传文件名称"></Input>          
            </FormItem>

        </Form>

    </Model> -->
    </div>
</template>
<script>
    export default{
        data(){
            return{
                showadd:false,
                baseItem:{},
                formItem:{}
            }
        },
        methods:{
            okupload(){

            },
            cancelupload(){
                
            }
        },
        mounted(){
            this.$nextTick(() => {
                startfinder(process.env.NODE_ENV);
            })
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
        background-color: #3385ff;
        border-color: #3385ff;
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
        width: 64px;
    }
    #elfinder{  height: 100% !important;  }
    .file-a-jump{  margin-left: 10px; }
    .file-a-jump>.tuzhi-jump-btn{  padding: 2px 7px; margin-top: 6px; }
    .elfinder-toolbar .elfinder-button-icon {color: #3385ff !important}
    .elfinder-ltr .elfinder-navbar-icon {color: #3385ff !important}
    .elfinder-toolbar {border: 1px solid #ccc }
</style>
<style scoped>
    .filemanage {height: 100%;padding: 22px;background-color: #dae3ef;}
    .filemanage .header-v2 {position: absolute;z-index: 9999;right: 32px}
</style>