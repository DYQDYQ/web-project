<template>
  <div class="manage">
      <div class="left">
        <div class="title">
          构件筛选
          <div class="title-icon">
            <Icon type="android-funnel"></Icon>
          </div>
        </div>
        <div class="filterform">
          <div class="list">
              <div class="title">
                选择类型状态
              </div>
              <i-select :model.sync="model1" style="width:200px">
                  <i-option v-for="item in sailist" :value="item.value">{{ item.label }}</i-option>
              </i-select>         
          </div>
          <div class="list">
              <div class="title">
                选择空间
              </div>
              <i-select :model.sync="model1" style="width:200px">
                  <i-option v-for="item in sailist" :value="item.value">{{ item.label }}</i-option>
              </i-select>         
          </div>
          <div class="list">
              <div class="title">
                构件编号
              </div>
              <i-select :model.sync="model1" style="width:200px">
                  <i-option v-for="item in sailist" :value="item.value">{{ item.label }}</i-option>
              </i-select>         
          </div>
        </div>
        <i-button type="primary">筛选</i-button>
      </div>
      <div class="right">
        <div class="head">
          <div>构件查询</div>
          <div>导出</div>
          <div>转出</div>
        </div>
        <div class="body">
           <i-table border :columns="listline" :data="goulist"></i-table>
           <Page :total="1" show-elevator></Page>
        </div>
        


      </div>

    <div class="model">
          <Modal
              v-model="showgou"
              title="构件追踪过程">
              <div class="head"><span>构件编号【地下一框地下结构混凝土】</span><span>类型【地下结构混凝土】</span></div>
              <Steps :current="3" direction="vertical">
                  <Step v-for="item in 4">
                      <Card style="width:350px">
                        <p slot="title">
                            支撑拆除
                        </p>
                        <a href="#" slot="extra" @click.prevent="changeLimit">
                            
                        </a>
                        <i-button type="primary" slot="extra">修改记录</i-button>
                        <i-button type="error" slot="extra">删除记录</i-button>
                        <div class="content">
                            <div><span>人员：</span>李四</div>
                            <div><span>完成百分比：</span>100%</div>
                            <div><span>时间：</span>2019/03/21 08:30</div>
                            <div><span>备注：</span>暂无</div>
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
      model1:'123'
    }
  },
  methods:{
    show(){
      this.showgou = true;
    }
  }
}
</script>
<style scoped>
    .manage {padding: 22px;background-color: #dae3ef;height: 100%}
</style>