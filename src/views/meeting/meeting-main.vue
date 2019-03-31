<template>
  <div class="process">
    <div class="tab">
        <div class="processroute" v-for="route in routelist" @click="choseroute(route.name)">
            {{route.title}}
        </div>
    </div>
    <div class="body">
        <router-view/>
    </div>
<!-- 添加会议弹框 -->
    <div class="model">
          <Modal
              v-model="showgou"
              title="添加会议"
              @on-ok="addmeeting(true)"
              @on-cancel="addmeeting(false)">
              <Form :model="formItem" :label-width="80">
                    <FormItem label="会议类型">
                        <Select>
                            <Option value="beijing">test</Option>
                        </Select>
                    </FormItem>
                    <FormItem label="会议名称">
                        <Select>
                            <Option value="beijing">test</Option>
                        </Select>
                    </FormItem>
                    <FormItem label="会议主题">
                        <Select>
                            <Option value="beijing">test</Option>
                        </Select>
                    </FormItem>
                    <FormItem label="会议室">
                        <Select>
                            <Option value="beijing">test</Option>
                        </Select>
                    </FormItem>
                    <FormItem label="参会人员">
                        <Row>
                            <Col span="11">
                                <Tree :data="testpeople" show-checkbox></Tree>
                            </Col>
                            <Col span="2"></Col>
                            <Col span="11">
                            </Col>
                        </Row>
                    </FormItem>
                    <FormItem label="选择日期">
                        <DatePicker type="date" placeholder="选择会议日期"></DatePicker>
                    </FormItem>
                    <FormItem label="时间段">
                        <Row>
                            <Col span="11">
                                <TimePicker type="time" placeholder="选择开始时间"></TimePicker>
                            </Col>
                            <Col span="2" style="text-align: center">-</Col>
                            <Col span="11">
                                <TimePicker type="time" placeholder="选择结束时间"></TimePicker>
                            </Col>
                        </Row>
                    </FormItem>
                    <FormItem label="文件上传">
                        <Upload action="#">
                            <Button icon="ios-cloud-upload-outline">选择文件</Button>
                        </Upload>
                    </FormItem>


                    
              </Form>
          </Modal>

        </div>

  </div>
</template>

<script>
import chart from 'vue-echarts'

export default {
  components: {
    chart
  },
  data(){
    return {
        routelist:[
            {
                title:'首页',
                name:'/process/process-main'
            },
            {
                title:'进度录入',
                name:'/process/process-lurujindu'
            },
            {
                title:'构件查询',
                name:'/process/process-element'
            },
        ],
        testpeople:[
            {
                title: 'BIM咨询',
                expand: false,
                children: [
                    {
                        title: '测试用户'
                    }
                ]
            },
            {
                title: 'BIM咨询2',
                expand: false,
                children: [
                    {
                        title: '测试用户2'
                    }
                ]
            },
        ]
    }
  },
  methods:{
    choseroute(name){
        this.$router.push(name)
    },
    addmeeting(value){

    }
  }
}
</script>
<style scoped>
    .process {height: calc(100% - 100px)}
    .tab {width: 100%;height: 60px;}
    .body {width:100%;height:calc(100% - 60px);}
    .processroute {height: 60px;line-height: 60px;float: left;width: 100px;font-size: 16px;cursor: pointer;}
</style>