<template>
  <div class="manage">
      <div class="left">
        <div class="all-title">
          类型筛选
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
                专业
              </div>
              <i-select :model.sync="model1" style="width:200px">
                  <i-option v-for="item in sailist" :value="item.value">{{ item.label }}</i-option>
              </i-select>         
          </div>
          <div class="list">
              <div class="title">
                空间
              </div>
              <i-select :model.sync="model1" style="width:200px">
                  <i-option v-for="item in sailist" :value="item.value">{{ item.label }}</i-option>
              </i-select>         
          </div>
          <div class="list">
              <div class="title">
                责任单位
              </div>
              <i-select :model.sync="model1" style="width:200px">
                  <i-option v-for="item in sailist" :value="item.value">{{ item.label }}</i-option>
              </i-select>         
          </div>
          <div class="list">
              <div class="title">
                生效时间
              </div>
               <Date-picker type="date" placeholder="创建时间" style="width: 200px"></Date-picker>        
          </div>
          <div class="list">
              <div class="title">
                标签
              </div>
              <i-select :model.sync="model1" style="width:200px">
                  <i-option v-for="item in sailist" :value="item.value">{{ item.label }}</i-option>
              </i-select>         
          </div>
        </div>
          <i-button style="float: right;margin-top: 20px;margin-left: 10px">重置</i-button>
          <i-button type="primary" style="float: right;margin-top: 20px;">确认</i-button>
          
        
      </div>
      <div class="right">
        <div class="head">
          <div class="title"><Checkbox>全选</Checkbox><span><Icon type="ios-funnel" />排序</span></div>
          <div class="lookfor"><Input search placeholder="关键词查询" /></div>
          <i-button type="primary">导出</i-button>
          <i-button type="primary"  @click="newitem()" style="margin-right: 10px">新增</i-button>
        </div>
        <div class="body">
            <div class="list" v-for="item in 7">
                <Checkbox class="check"></Checkbox>
                <div class="bianhao">QT-7748</div>
                <div class="file-name">v2-0bf2215c60319f7b8d571c14257a3a19_r.jpg</div>
                <div class="time">2019-03-19</div>
                <div class="name">王俊</div>
           </div>

           
        </div>
        <Page class="page" :total="1" show-elevator></Page>


      </div>

<!--     <div class="model">
          <Modal
              v-model="showgou"
              title="事宜处理">
              <div class="head">
                <div class="line">
                  <div class="title">编号</div>
                  <div class="content">ZL-1903072027-673</div>
                </div>
                <div class="line2" v-for="item in testlist">
                  <div class="title">发起人</div>
                  <div class="content">ZL-1903072027-673</div>
                </div>
                <div class="line">
                  <div class="title">处理意见</div>
                  <div class="content">
                    <i-input type="textarea" :rows="2" placeholder="请输入"></i-input>
                  </div>
                </div>
                <div class="line">
                  <div class="title">附件</div>
                  <div class="content">
                    <Upload action="#">
                        <i-button type="ghost" icon="ios-cloud-upload-outline">上传文件</i-button>
                    </Upload>
                  </div>
                </div>
                <div>
                  <i-button type="primary">确认</i-button>
                  <i-button type="text">取消</i-button>
                </div>
              </div>
              <div>事件处理进度</div>
              <Steps :current="0" direction="vertical">
                  <Step v-for="item in 1">
                      <Card style="width:350px">
                        <p slot="title">
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
              v-model="showgou"
              title="发起质量事宜"
              @on-ok="add(true)"
              @on-cancel="add(false)">
              <i-form :model="addItem" :label-width="60">
                  <Form-item label="输入框">
                      <i-input v-model=="formItem.input" placeholder="请输入"></i-input>
                  </Form-item>
                  <FormItem label="问题分类">
                      <Select v-model="formItem.select">
                          <Option value="ces">测试</Option>
                      </Select>
                  </FormItem>
                  <Form-item label="描述">
                      <i-input type="textarea" :rows="2" v-model="formItem.input" placeholder="请输入"></i-input>
                  </Form-item>
                  <Form-item label="添加附件">
                      <Upload action="#">
                        <i-button type="ghost" icon="ios-cloud-upload-outline">上传文件</i-button>
                      </Upload>
                  </Form-item>
                  <FormItem label="处理流程">
                      <Select v-model="formItem.select">
                          <Option value="ces">测试</Option>
                      </Select>
                  </FormItem>
                  <FormItem label="优先级">
                      <Select v-model="formItem.select">
                          <Option value="ces">测试</Option>
                      </Select>
                  </FormItem>
                  <FormItem label="截止时间">
                      <Date-picker type="date" placeholder="更新时间"></Date-picker>
                  </FormItem>
                  <FormItem label="管理元素">
                      <Select v-model="formItem.select">
                          <Option value="ces">测试</Option>
                      </Select>
                  </FormItem>
              </i-form>
            
          </Modal>
        </div> -->


  </div>
</template>

<script>

export default {
  components: {

  },
  data(){
    return {
      showgou:false,
      addnew: false,
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
    .manage {padding: 22px;background-color: #dae3ef;height: 100%;text-align: left;}
    .manage .left {width: 240px;float: left;height: 100%;background-color: #ffffff;padding: 0px 20px;overflow-y: auto;border-right: 1px solid #c5c8ce}
    .manage .left .all-title{height: 60px;line-height: 60px;font-size: 18px;font-weight: 600;text-align: left;}
    .manage .left .filterform .list{text-align: left;}
    .manage .left .filterform .list .title{height: 40px;line-height: 40px;font-size: 17px;font-weight: 400;float: left;}
    .manage .left .saibutton{margin-top: 10px;float: right;}
    .manage .left .tree{text-align: left;}
    .manage .left .filterform .filterlist {width: 100%;display: flex;height:30px;line-height: 30px;flex-direction: row }
    .manage .left .filterform .filterlist div{width: calc(100% / 3);height:30px;line-height: 30px;font-size: 16px;text-align: center;border-radius: 3px;cursor: pointer;}
    .manage .left .filterform .filterlist div:hover{background-color:#5c9dff; }
    .manage .left .filterform .filterlist .active {background-color: #5c9dff}
    .manage .right{width: calc(100% - 240px);float: right;height: 100%;background-color: #ffffff;font-size: 14px}
    .manage .right .head{height: 60px;text-align:left;padding: 0px 30px;background-color: #ffffff}
    .manage .right .head .title{display: inline-block;font-size: 16px;line-height: 60px;height: 60px;}
    .manage .right .head .lookfor {width: 200px;display: inline-block;margin-left: 50px;}
    .manage .right .head button {display: inline-block;float: right;margin-top: 10px}
    .manage .right .body {height:calc(100% - 110px);overflow-y: auto;background-color: #ffffff}
    .manage .right .body .list{height: 40px;display: flex;flex-direction: row;font-size: 16px;width: 100%;}
    .manage .right .body .list:nth-child(odd) {background: #dae3ef54}
    .manage .right .body .list .check {width: 60px;height: 40px;line-height: 40px;padding-left: 30px;}
    .manage .right .body .list .bianhao {width: 100px;height: 40px;line-height: 40px;}
    .manage .right .body .list .file-name {width: calc(100% - 300px);height: 40px;line-height: 40px;}
    .manage .right .body .list .time {width: 100px;height: 40px;line-height: 40px;}
    .manage .right .body .list .name {width: 60px;height: 40px;line-height: 40px;}
    .manage .right .page {float: right;margin-top: 10px;padding-right: 20px;margin-bottom: 5px}
</style>