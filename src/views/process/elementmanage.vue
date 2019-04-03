<template>
  <div class="manage" ref="box">
      <div class="left">
          <div class="all-title">
                <span>构件筛选</span>
                <span class="title-icon" >
                    <img src="../../assets/img/menu.svg" alt="" ref="img">
                </span>
            </div>
            <div class="filterform">
              <div class="list">
                  <div class="title">
                      <img src="../../assets/img/icon_status.png" alt="" style="max-width:15px;margin-right:10px">
                      <span>选择类型状态</span>
                  </div>
                  <i-select :model.sync="model1">
                      <i-option v-for="item in sailist" :value="item.value">{{ item.label }}</i-option>
                  </i-select>
              </div>
              <div class="list">
                  <div class="title">
                      <img src="../../assets/img/icon_kongjian.png" alt=""  style="max-width:15px;margin-right:10px">
                      <span>选择空间</span>
                  </div>
                  <i-select :model.sync="model1">
                      <i-option v-for="item in sailist" :value="item.value">{{ item.label }}</i-option>
                  </i-select>
              </div>
              <div class="list">
                  <div class="title">
                      <img src="../../assets/img/icon_kongjian.png" alt=""  style="max-width:15px;margin-right:10px">
                      <span>构件编号</span>
                  </div>
                  <i-select :model.sync="model1">
                      <i-option v-for="item in sailist" :value="item.value">{{ item.label }}</i-option>
                  </i-select>
              </div>
            </div>
              <i-button class="saibutton" type="primary">筛选</i-button>
      </div>
      <div class="right">
        <div class="body">
           <i-table border :columns="listline" :data="goulist" :height="tableheight"></i-table>
           <Page class="page" :total="1" show-elevator></Page>
        </div>
      </div>
      <div>
          <Modal
              v-model="showgou"
              title="构件追踪过程"
              width="700"
              >
              <div class="model-head">
                  <span class="line1"><i-icon type="collection_fill" />构件编号</span>
                  【地下一框地下结构混凝土】&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  <span class="line1">类型</span>
                  【地下结构混凝土】
              </div>
              <Steps :current="3" direction="vertical">
                  <Step v-for="item in 4">
                      <Card>
                        <p slot="title" style="font-size: 16px">
                            支撑拆除
                        </p>
                        <i-button type="primary" slot="extra" size="small">修改记录</i-button>
                        <i-button type="error" slot="extra" size="small" style="margin-left: 10px;">删除记录</i-button>
                        <div class="model-content">
                            <div><span class="model-content-title">人员：</span>李四</div>
                            <div><span class="model-content-title">完成百分比：</span>100%</div>
                            <div><span class="model-content-title">时间：</span>2019/03/21 08:30</div>
                            <div><span class="model-content-title">备注：</span>暂无</div>
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
      model1:'123',
      tableheight:0,
    }
  },
  methods:{
    show(){
      this.showgou = true;
    }
  },
  mounted(){
    this.tableheight = this.$refs.box.clientHeight - 100;
  }
}
</script>
<style scoped>
    .manage {padding: 22px;background-color: #dae3ef;height: 100%;}
    .manage .left {width: 240px;float: left;height: 100%;background-color: #ffffff;padding: 0px 20px;}
    .manage .left .all-title{height: 60px;line-height: 60px;font-size: 18px;font-weight: 600;text-align: left;}
    .manage .left .all-title .title-icon {height: 70px;line-height: 70px;float: right;}
    .manage .left .all-title .title-icon img {margin-left: 12px;height: 25px;transform: rotateY(180deg);cursor: pointer}
    .manage .left .filterform .list{text-align: left;}
    .manage .left .filterform .list .title{height: 40px;line-height: 40px;font-size: 15px;font-weight: 400;float: left;}
    .manage .left .saibutton{margin-top: 10px;float: right;}
    .manage .right {width: calc(100% - 240px);height: 100%;background-color: #ffffff;float: right;}
    .manage .right .body{width: 100%;height: 100%;}
    .manage .right .body .page{float: right;margin-top: 10px;padding-right: 20px}
    .model-head{font-size: 15px;padding-left:40px}
    .model-head .line1 {font-weight: 900;}
    .model-content {height: 40px;}
    .model-content div {width: 50%;float: left;height:20px;line-height: 20px;}
    .model-content div .model-content-title {font-weight: 600;}
    .title-icon img {margin-left: 12px;height: 25px;transform: rotateY(180deg);cursor: pointer}

</style>
<style>
  .manage .right .body .ivu-table th {background-color: #cddbf1;font-size: 16px;}
  .manage .right .body .ivu-table .ivu-table-tbody .ivu-table-row:nth-child(even) td {background-color: #f3f7ff}
  .ivu-modal-header-inner {font-size: 18px;font-weight: 600}
  .ivu-modal-body {padding:16px 45px 16px 36px}
</style>