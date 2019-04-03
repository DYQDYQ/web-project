<template>
  <div class="projectnotice">
    <div class="tab">
      <p class="title">公告管理</p>
      <i-button type="primary" class="btn" @click="addbox = true">发布公告</i-button>
    </div>
    <div class="content">
      <i-table stripe :columns="noticeColumns" :data="noticeData"></i-table>
      <Page :current="2" :total="50" simple style="position: absolute;right:20px;bottom:20px"></Page>
    </div>
    <Modal v-model="addbox" title="发布公告" width="520px" @ok="ok" @cancel="cancel">
      <i-form ref="noticeForm" :modal="noticeForm" :rules="formValidate" :label-width="80">
        <Form-item label="公告内容" prop="content">
          <i-input v-model="noticeForm.content" type="textarea" :rows="3" placeholder="请输入公告内容"></i-input>
        </Form-item>
        <Form-item label="截止日期" prop="time">
          <date-picker v-model="noticeForm.time" type="date" placeholder="选择日期"></date-picker>
        </Form-item>
        <Form-item label="参会人员" prop="checkedpeople">
          <div class="addpeople">
            <div class="addhead">可选人员<span>(点击添加)</span></div>
            <div class="addbody">
              <Tree :data="personlist" show-checkbox @on-check-change="checkpeople"></Tree>
            </div>
          </div>
          <div class="people">
            <div class="peoplehead">已选人员</div>
            <div class="peoplebody">
              <div class="peoplename" v-for="it in noticeForm.checkedpeople">
                <span>{{it.name}}</span>
              </div>
            </div>
          </div>
        </Form-item>
        <Form-item label="添加附件">
          <Upload ref="upload"
                  action="">
            <i-button type="ghost" icon="ios-cloud-upload-outline">上传文件</i-button>
          </Upload>
        </Form-item>
      </i-form>
    </Modal>
  </div>
</template>

<script>

export default {
    name: 'projectnotice',
    data(){
        return{
            addbox:false,
            noticeColumns:[
                {
                    title:'发布者',
                    key:'creator',
                    align:'center',
                    width:'120'
                },
                {
                    title:'发布内容',
                    key:'content',
                    align:'center'
                },
                {
                    title:'发布时间',
                    key:'time',
                    align:'center'
                },
                {
                    title:'过期时间',
                    key:'endtime',
                    align:'center'
                },
                {
                    title:'附件',
                    key:'file',
                    align:'center'
                },
                {
                    title: '操作',
                    key :'action',
                    width: 150,
                    align: 'center',
                    render: (h, params) => {
                        return h('div', [
                            h('Button', {
                                props: {
                                    type: 'error',
                                    size: 'small'
                                },
                                on: {
                                    click: () => {
                                        this.remove(params.index)
                                    }
                                }
                            }, '删除')
                        ]);
                    }
                }
            ],
            noticeData:[
                {
                    creator:'王王王',
                    content:'今天天气真好呀',
                    time:'2019-04-02',
                    endtime:'2019-04-15',
                    file:'notice-28-20190402-1.jpg'
                },
                {
                    creator:'王王王',
                    content:'今天天气真好呀',
                    time:'2019-04-02',
                    endtime:'2019-04-15',
                    file:'notice-28-20190402-1.jpg'
                },
                {
                    creator:'王王王',
                    content:'今天天气真好呀',
                    time:'2019-04-02',
                    endtime:'2019-04-15',
                    file:'notice-28-20190402-1.jpg'
                },
                {
                    creator:'王王王',
                    content:'今天天气真好呀',
                    time:'2019-04-02',
                    endtime:'2019-04-15',
                    file:'notice-28-20190402-1.jpg'
                },
                {
                    creator:'王王王',
                    content:'今天天气真好呀',
                    time:'2019-04-02',
                    endtime:'2019-04-15',
                    file:'notice-28-20190402-1.jpg'
                }
            ],
            noticeForm:{
                content:'',
                time:'',
                checkedpeople:[]
            },
            formValidate:{
                content:[
                    { required: true, message: '公告内容不能为空', trigger: 'blur' },
                    { type: 'string', min: 5, max: 200, message: '公告内容5-200个字', trigger: 'blur'}
                ],
                time:[{ required:true, type:'date', message:'截止时间不能为空',trigger:'change'}],
                checkedpeople:[{required:true,type:'array',trigger:'blur'}],
            },
            personlist:[
                {
                    title:'BIM咨询',
                    expand:false,
                    children:[
                        {title: '张三'},
                        {title:'李四'}
                    ]
                },
                {
                    title:'BIM咨询',
                    expand:false,
                    children:[
                        {title: '张三'},
                        {title:'李四'}
                    ]
                },
                {
                    title:'BIM咨询',
                    expand:false,
                    children:[
                        {title: '张三'},
                        {title:'李四'}
                    ]
                },
                {
                    title:'BIM咨询',
                    expand:false,
                    children:[
                        {title: '张三'},
                        {title:'李四'}
                    ]
                },
            ],
        }
    },
    methods:{
        checkpeople(root) {
            let that = this;
            that.noticeForm.checkedpeople = [];
            root.forEach(function(value){
                if(!value.children) {
                    value.name = value.title;
                    that.noticeForm.checkedpeople.push(value);
                }
            })
        },
        ok(){

        },
        cancel(){

        }
    }
}
</script>
<style scoped>
  .projectnotice {padding: 22px;background-color: #dae3ef;height: calc(100% - 100px);}
  .tab {width: 100%;height: 60px;background-color: #ffffff;position: relative}
  .title {height:60px;line-height:60px;font-size:16px;font-weight:bold;text-align: left;padding-left:20px}
  .btn{position:absolute;right:20px;top:15px;}
  .content{width:100%;height:calc(100% - 60px);background-color: #ffffff;position: relative}

  .addpeople {width:50%;height:260px;display: inline-block;}
  .addhead {height: 20px;line-height: 20px;}
  .addbody {height: 240px;overflow-y: auto;border: 1px solid #dddee1;border-radius: 4px;padding: 0px 10px}
  .people {width: 45%;height: 260px;display: inline-block;float: right;}
  .peoplehead {height: 20px;line-height: 20px;}
  .peoplebody {height: 240px;overflow-y: auto;border: 1px solid #dddee1;border-radius: 4px;padding: 10px;}
  .peoplename {min-height: 20px;}
  .ivu-tree ul li {margin:0}
  .ivu-btn-ghost {color:#989898}
  .ivu-modal-body {padding:15px 50px 15px 50px}

  /*.content tr:nth-child(odd) {background-color:#F4F9FF;;}*/
</style>
<style>
  .ivu-table th{
    background-color:#F4F9FF;
  }
  .ivu-table-stripe .ivu-table-body tr:nth-child(2n) td, .ivu-table-stripe .ivu-table-fixed-body tr:nth-child(2n) td{
    background-color:#F4F9FF
  }
</style>