<template>
  <div class="manage">
      <div class="left">
        <div class="title">
          流程筛选
          <div class="title-icon">
            <Icon type="android-funnel"></Icon>
          </div>
        </div>
        <div class="tree">
          <Tree :data="treedata"></Tree>
          <Tree :data="treedata"></Tree>
        </div>
        <div class="filterform">
          <div class="list">
              <div class="title">
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
                负责方
              </div>
              <i-select :model.sync="model1" style="width:200px">
                  <i-option v-for="item in sailist" :value="item.value">{{ item.label }}</i-option>
              </i-select>         
          </div>
          <div class="list">
              <div class="title">
                发起人
              </div>
              <i-select :model.sync="model1" style="width:200px">
                  <i-option v-for="item in sailist" :value="item.value">{{ item.label }}</i-option>
              </i-select>         
          </div>
          <div class="list">
              <div class="title">
                创建时间
              </div>
               <Date-picker type="date" placeholder="创建时间" style="width: 200px"></Date-picker>        
          </div>
          <div class="list">
              <div class="title">
                更新时间
              </div>
               <Date-picker type="date" placeholder="更新时间" style="width: 200px"></Date-picker>        
          </div>
          <div class="list">
              <div class="title">
                截止时间
              </div>
               <Date-picker type="date" placeholder="截止时间" style="width: 200px"></Date-picker>        
          </div>
        </div>
        <i-button type="primary">确认</i-button>
        <i-button type="text">重置</i-button>
      </div>
      <div class="right">
        <div class="head">
          <div>构件查询(10)</div>
          <div><Input search placeholder="关键词查询" /></div>
        </div>
        <div class="body">
            <div class="list" v-for="item in 10">
                 <div class="top">
                   <div class="idname">673</div>
                   <div class="content">测试问题分类</div>
                 </div>
                 <div class="bottom">
                   <div class="title_now">处理质量整改单</div>
                   <div class="show-fqr">潘古兵</div>
                   <div class="show-time">2019-03-07</div>
                   <div class="show-gj">无</div>
                   <div class="show-fzr">潘古兵,邱嘉,邓英杞,王俊,陈亚楠,罗炯</div>
                   <div class="time">2019-12-07</div>
                 </div>
                 <div class="do">
                    <div class="show-do" @click="dothing(item)">操作</div>
                    <div class="show-do" @click="dothing(item)">删除</div>
                 </div>
           </div>

           <Page :total="1" show-elevator></Page>
        </div>
        


      </div>

    <div class="model">
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
      treedata: [
        {
          title: 'parent 1',
          expand: true,
          selected: true,
          children: [
              {
                  title: 'parent 1-1',
                  expand: true,
                  children: [
                      {
                          title: 'leaf 1-1-1',
                          disabled: true
                      },
                      {
                          title: 'leaf 1-1-2'
                      }
                  ]
              },
              {
                  title: 'parent 1-2',
                  expand: true,
                  children: [
                      {
                          title: 'leaf 1-2-1',
                          checked: true
                      },
                      {
                          title: 'leaf 1-2-1'
                      }
                  ]
              }
          ]
        }
      ]
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
    }
  }
}
</script>
<style scoped>
    .manage {padding: 22px;background-color: #dae3ef;height: 100%}
</style>