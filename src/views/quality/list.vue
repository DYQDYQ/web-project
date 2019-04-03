<template>
  <div class="quality-list">
      <div class="left">
        <div class="all-title">
            流程筛选
            <img src="../../assets/img/zhankai.png" style="float:right;padding-top:20px">
            <div class="title-icon">
                <Icon type="android-funnel"></Icon>
            </div>
        </div>
        <div class="tree">
          <Tree :data="treedata" show-checkbox></Tree>
        </div>
        <div class="filterform">
          <div class="list">
              <div class="title">
                <img src="../../assets/img/levels.png" alt="" style="width:17px">
                  优先级
              </div>
              <div class="filterlist">
                <div>严重</div>
                <div>一般</div>
                <div>轻微</div>
              </div>        
          </div>
          <div class="list">
              <div class="title">
                  <img src="../../assets/img/peoples.png" alt="" style="width:18px">
                负责方
              </div>
              <i-select :model.sync="model1" style="width:200px">
                  <i-option v-for="item in sailist" :value="item.value">{{ item.label }}</i-option>
              </i-select>         
          </div>
          <div class="list">
              <div class="title">
                  <img src="../../assets/img/people.png" alt="" style="width:13px">
                  发起人
              </div>
              <i-select :model.sync="model1" style="width:200px">
                  <i-option v-for="item in sailist" :value="item.value">{{ item.label }}</i-option>
              </i-select>         
          </div>
          <div class="list">
              <div class="title">
                  <img src="../../assets/img/time2.png" alt="" style="width:16px">
                创建时间
              </div>
              <Date-picker type="date" placeholder="创建时间" style="width: 200px"></Date-picker>
          </div>
          <div class="list">
              <div class="title">
                  <img src="../../assets/img/time2.png" alt="" style="width:16px">
                更新时间
              </div>
              <Date-picker type="date" placeholder="更新时间" style="width: 200px"></Date-picker>
          </div>
          <div class="list">
              <div class="title">
                  <img src="../../assets/img/time2.png" alt="" style="width:16px">
                截止时间
              </div>
              <Date-picker type="date" placeholder="截止时间" style="width: 200px"></Date-picker>
          </div>
        </div>
          <i-button style="float: right;margin-top: 20px;margin-left: 10px">重置</i-button>
          <i-button type="primary" style="float: right;margin-top: 20px;">确认</i-button>
      </div>
      <div class="right">
          <div class="head">
              <div class="title">构件查询(10)</div>
              <div class="paixu"><img src="../../assets/img/shaixuan.png" style="margin-right:5px">排序</div>
              <div class="lookfor"><Input search placeholder="关键词查询" /></div>
              <i-button type="primary" @click="newitem()">新增</i-button>
          </div>
          <div class="body">
            <div class="list" v-for="item in 7">
                 <div class="top">
                   <div class="idname">
                       <img src="../../assets/img/level_red.png" v-if="item % 2 == 0" style="margin:0 5px">
                       <img src="../../assets/img/level_yellow.png" v-else-if="item % 3 == 0" style="margin:0 5px">
                       <img src="../../assets/img/level_blue.png" v-else style="margin:0 5px">
                       673
                   </div>
                   <div class="content">测试问题分类</div>
                 </div>
                 <div class="bottom">
                   <div class="line">处理质量整改单</div>
                   <div class="line"><img src="../../assets/img/people2.png"> 潘古兵</div>
                   <div class="line"><img src="../../assets/img/icon_time.png">2019-03-07</div>
                   <div class="line"><img src="../../assets/img/icon_wu.png">无</div>
                   <div class="show-fzr"><img src="../../assets/img/icon_zhipai.png">潘古兵,邱嘉,邓英杞,王俊,陈亚楠,罗炯</div>
                   <div class="line" style="margin-left:60px">2019-12-07</div>
                 </div>
                 <div class="do">
                    <div class="show-do" @click="dothing(item)"><img src="../../assets/img/right.png"></div>
                    <div class="show-do" @click="dothing(item)"><img src="../../assets/img/pingjia.png"></div>
                    <div class="show-do" @click="dothing(item)"><img src="../../assets/img/delete.png"></div>
                 </div>
           </div>
        </div>
          <Page class="page" :total="1" show-elevator></Page>
      </div>
      <div class="model">
          <Modal
              v-model="showgou"
              title="事宜处理"
              width="700">
              <div class="model-padding dothing-head">
                <div class="line">
                  <div class="title">编号</div>
                  <div class="content">ZL-1903072027-673</div>
                </div>
                <div class="line2" v-for="item in testlist">
                  <div class="title">{{item.name}}</div>
                  <div class="content">{{item.content}}</div>
                </div>
                <div class="line">
                  <div class="title">处理意见</div>
                  <div class="content-add">
                    <i-input type="textarea" :rows="2" placeholder="请输入"></i-input>
                  </div>
                </div>
                <div class="line">
                  <div class="title">附件</div>
                  <div class="content-add">
                    <Upload action="#">
                        <Button icon="ios-cloud-upload-outline">上传文件</Button >
                    </Upload>
                  </div>
                </div>
                <div class="deal-button">
                  <i-button type="primary">确认</i-button>
                  <i-button type="text">取消</i-button>
                </div>
              </div>
              <div class="model-padding deal-list-head">事件处理进度</div>
              <Steps class="model-padding deal-list" :current="0" direction="vertical">
                  <Step v-for="item in 1">
                      <Card>
                        <p slot="title" style="text-align:center;font-size: 17px">
                            支撑拆除
                        </p>
                        <div class="content">
                            <div><span>人员：</span>李四</div>
                            <div><span>完成百分比：</span>100%</div>
                            <div><span>时间：</span>2019/03/21 08:30</div>
                            <div><span>备注：</span>暂无</div>
                            <img src="#">
                        </div>
                    </Card>
                  </Step>
              </Steps>
          </Modal>


          <Modal
              v-model="addnew"
              title="发起质量事宜"
              @on-ok="add(true)"
              @on-cancel="add(false)">
              <Form  :model="addItem" :label-width="60">
                  <Form-item label="输入框">
                      <i-input placeholder="请输入"></i-input>
                  </Form-item>
                  <FormItem label="问题分类">
                      <Select >
                          <Option value="ces">测试</Option>
                      </Select >
                  </FormItem>
                  <Form-item label="描述">
                      <i-input type="textarea" :rows="2" placeholder="请输入"></i-input>
                  </Form-item>
                  <Form-item label="添加附件">
                      <Upload action="#">
                        <i-button type="ghost" icon="ios-cloud-upload-outline">上传文件</i-button>
                      </Upload>
                  </Form-item>
                  <FormItem label="处理流程">
                      <Select>
                          <Option value="ces">测试</Option>
                      </Select>
                  </FormItem>
                  <FormItem label="优先级">
                      <Select>
                          <Option value="ces">测试</Option>
                      </Select>
                  </FormItem>
                  <FormItem label="截止时间">
                      <Date-picker type="date" placeholder="更新时间"></Date-picker>
                  </FormItem>
                  <FormItem label="管理元素">
                      <Select>
                          <Option value="ces">测试</Option>
                      </Select>
                  </FormItem>
              </Form >
            
          </Modal>
        </div>
  </div>
</template>

<script>

export default {
  components: {

  },
  data(){
    return {
      showgou:false,
      showadd:false,
      addnew: false,
      addItem:{},
      treedata: [
        {
          title: '161监理-质量整改单',
          expand: true,
          selected: true,
          children: [
              {
                  title: '发起质量整改单',
                  expand: true,
                  
              },
              {
                  title: '处理质量整改单',
                  expand: false,
                  
              }
          ]
        }
      ],
      listline:[
        {
          title: '构件编号',
          key: 'k',
          sortable: true
        },
        {
          title: '构件状态',
          key: 'key1',
          sortable: true
        },
        {
          title: '验收人员',
          key: 'key2',
          sortable: true
        },
        {
          title: '单位工程',
          key: 'key3',
          sortable: true
        },
        {
          title: '标高',
          key: 'key4',
          sortable: true
        },
        {
          title: '专业',
          key: 'key5',
          sortable: true
        },
        {
          title: '构件类型',
          key: 'key6',
          sortable: true
        },
        {
          title: '操作',
          key: 'key7',
          width: 150,
          align: 'center',
          render: (h, params) => {
              return h('div', [
                  h('Button', {
                      props: {
                          type: 'primary',
                          size: 'small'
                      },
                      style: {
                          marginRight: '5px'
                      },
                      on: {
                          click: () => {
                              this.show(params.index)
                          }
                      }
                  }, '追踪'),
                  h('Button', {
                      props: {
                          type: 'primary',
                          size: 'small'
                      },
                      on: {
                          click: () => {
                              // this.remove(params.index)
                          }
                      }
                  }, '二维码')
              ]);
            }
        }
      ],
      goulist:[
        {
          k:'BS-03-FS-1-1-1220',
          key1:'土方开挖',
          key2:'曹强',
          key3:'2017-05-10 09:34:00',
          key4:'',
          key5:'土建工程',
          key6:'基础混凝土',
        },
        {
          k:'BS-03-FS-1-1-1220',
          key1:'土方开挖',
          key2:'曹强',
          key3:'2017-05-10 09:34:00',
          key4:'',
          key5:'土建工程',
          key6:'基础混凝土',
        },
        {
          k:'BS-03-FS-1-1-1220',
          key1:'土方开挖',
          key2:'曹强',
          key3:'2017-05-10 09:34:00',
          key4:'',
          key5:'土建工程',
          key6:'基础混凝土',
        },
        {
          k:'BS-03-FS-1-1-1220',
          key1:'土方开挖',
          key2:'曹强',
          key3:'2017-05-10 09:34:00',
          key4:'',
          key5:'土建工程',
          key6:'基础混凝土',
        }
      ],
      sailist:[
          {
              value: 'ces',
              label: '测试'
          },
      ],
      model1:'123',
      testlist: [
        {
          name:'发起人',
          content: '李四'
        },
        {
          name:'发起时间',
          content: '2019-03-19'
        },
        {
          name:'当前步骤',
          content: '处理质量整改单'
        },
        {
          name:'优先级',
          content: '一般'
        },
        {
          name:'关联元素',
          content: 'COCC房间5F层'
        },
        {
          name:'专业',
          content: '土建工程'
        },
        {
          name:'截止时间',
          content: '2018-03-01'
        },
        {
          name:'问题描述',
          content: '土建工程'
        },

      ]
    }
  },
  methods:{
    dothing(){
      this.showgou = true;
    },
    newitem(){
      this.addnew = true;
    },
    add(value){
      if(value){
        this.$Message.info('发起成功！');
      }else {
        this.$Message.info('取消发起！');
      }
      
    }
  }
}
</script>
<style scoped>
    .quality-list {padding: 22px;background-color: #dae3ef;height: 100%;text-align: left;}
    .quality-list .left {width: 240px;float: left;height: 100%;background-color: #ffffff;padding: 0px 20px;overflow-y: auto;}
    .quality-list .left .all-title{height: 60px;line-height: 60px;font-size: 18px;font-weight: 600;text-align: left;}
    .quality-list .left .filterform .list{text-align: left;}
    .quality-list .left .filterform .list .title{height: 40px;line-height: 40px;font-size: 16px;font-weight: 400;float: left;}
    .quality-list .left .saibutton{margin-top: 10px;float: right;}
    .quality-list .left .tree{text-align: left;}
    .quality-list .left .filterform .filterlist {width: 100%;display: flex;height:30px;line-height: 30px;flex-direction: row}
    .quality-list .left .filterform .filterlist div{width: calc(100% / 3);height:30px;line-height: 30px;font-size: 14px;text-align: center;border-radius: 3px;cursor: pointer;}
    .quality-list .left .filterform .filterlist div:hover{background-color:#5c9dff; }
    .quality-list .left .filterform .filterlist .active {background-color: #5c9dff}
    .quality-list .right{width: calc(100% - 240px);float: right;height: 100%;background-color: #ffffff;font-size: 14px}
    .quality-list .right .head{height: 60px;text-align:left;padding: 0px 20px;background-color: #ffffff}
    .quality-list .right .head .title{display: inline-block;font-size: 18px;font-weight: 600;line-height: 60px;height: 60px;}
    .quality-list .right .head .paixu {display:inline-block;margin-left:150px}
    .quality-list .right .head .lookfor {width: 200px;display: inline-block;margin-left: 20px;}
    .quality-list .right .head button {display: inline-block;float: right;margin-top: 20px}
    .quality-list .right .body {height:calc(100% - 110px);overflow-y: auto;background-color: #ffffff}
    .quality-list .right .body .list{height: 80px;padding: 10px 20px;}
    .quality-list .right .body .list:nth-child(odd){background-color: #f3f7ff}
    .quality-list .right .body .list .top,.bottom {height: 30px;line-height: 30px;text-align: left;width: calc(100% - 140px);display: inline-block;}
    .quality-list .right .body .list .top .idname {width: 70px;text-align: left;height: 30px;line-height: 30px;display: inline-block;vertical-align: top;}
    .quality-list .right .body .list .top .content {width: calc(100% - 70px);text-align: left;height: 30px;line-height: 30px;display: inline-block}
    .quality-list .right .body .list .bottom{padding-left: 70px;}
    .quality-list .right .body .list .bottom .line {width: calc(calc(100% - 270px) / 5);display: inline-block;vertical-align: top;}
    .quality-list .right .body .list .bottom .line img {max-width:14px;margin-right:5px}
    .quality-list .right .body .list .bottom .show-fzr {width: 200px;display: inline-block;overflow: hidden;text-overflow:ellipsis;white-space: nowrap;}
    .quality-list .right .body .list .bottom .show-fzr img{max-width:18px;margin:0 5px}
    .quality-list .right .body .list .do {width: 140px;float: right;height: 80px;display: flex;justify-content: center;align-items: center;margin-top: -40px;}
    .quality-list .right .body .list .do .show-do {margin:0 5px}
    .quality-list .right .body .list .do .show-do img {max-width:16px}
    .quality-list .right .page {float: right;margin-top: 10px;padding-right: 20px;margin-bottom: 5px}


    /*事宜处理*/
    .dothing-head .line {height: 60px;line-height: 60px;width: 100%;padding: 0px 20px;}
    .dothing-head .line .title {width: 60px;height: 60px;line-height: 60px;display: inline-block;vertical-align: top;}
    .dothing-head .line .content {width: calc(100% - 60px);height: 30px;line-height: 30px;display: inline-block;vertical-align: middle;background: #dcdee2;border-radius: 5px;padding-left: 5px;}
    .dothing-head .line2 {height: 60px;line-height: 60px;width: 50%;display: inline-block;vertical-align: top;padding: 0px 20px;}
    .dothing-head .line2 .title {width: 60px;height: 60px;line-height: 60px;display: inline-block;vertical-align: top;}
    .dothing-head .line2 .content {width: calc(100% - 60px);height: 30px;line-height: 30px;display: inline-block;vertical-align: middle;background: #dcdee2;border-radius: 5px;padding-left: 5px;}
    .dothing-head .line .content-add {width: calc(100% - 60px);height: 30px;line-height: 30px;display: inline-block;vertical-align: middle;}
    .deal-list-head {padding: 0px 40px;width: 100%;font-size: 17px;font-weight: 600;height: 40px;line-height: 40px;}
    .deal-list .content div{display: inline-block;height: 30px;line-height: 30px;vertical-align: top;width: 50%;font-weight:600;}
    .deal-button {text-align:center;}
    .model-padding {padding: 0px 20px;}
</style>