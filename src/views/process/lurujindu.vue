<template>
  <div class="luru">
    <div class="left">
        <div class="head">
          <div class="title">录入进度</div>
          <i-button type="text" class="down">
            下载模板
            <Icon type="ios-cloud-download-outline"></Icon>
          </i-button>
        </div>
        <div class="chose">
          <i-button class="gou" type="primary">选择构件</i-button>
          <i-button class="in">导入构件</i-button>
          <i-button class="del" type="error">全部删除</i-button>
        </div>
        <div class="chosetable">
          <i-table height="200" :columns="chosetable" :data="chosedata"></i-table>
        </div>
        <div class="fromlist">
          <i-form :model="processItem" :label-width="60">
                <Form-item label="选择状态">
                  <i-select :model.sync="processItem.state" placeholder="请选择">
                  </i-select>
                </Form-item>
                <Form-item label="上传文件">
                    <Upload action="#" style="float: left;">
                        <i-button icon="ios-cloud-upload-outline">上传文件</i-button>
                    </Upload>
                </Form-item>
                <Form-item label="验收备注">
                    <i-input :value.sync="processItem.beizhu" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="请输入..."></i-input>
                </Form-item>
                <Form-item label="选择仓位">
                  <i-select :model.sync="processItem.cangwei" placeholder="请选择">
                  </i-select>
                </Form-item>
                <Form-item>
                  <i-button type="primary" style="float: right;">提交</i-button>
                </Form-item>
          </i-form>
        </div>
    </div>
    <div class="right">
        <bim></bim>
    </div>
  </div>
</template>

<script>
import bim from '@/components/bim.vue'

export default {
  components: {
    bim
  },
  data(){
    return {
      chosetable:[
            {
              title:'构件编码',
              key: 'gj'
            },
            {
              title:'完成工作量',
              key: 'wc'
            },
            {
              title:'构件类型',
              key: 'lx'
            },
            {
              title:'当前进度',
              key: 'jd'
            },
            {
              title:'操作',
              key: 'gj'
            },
      ],
      chosedata:[

      ],
      processItem:{
        state:1,
        beizhu: "",
        cangwei:2,
      }
    }
  }
}
</script>
<style scoped>
    .luru {padding: 22px;background-color: #dae3ef;height: 100%}
    .left {width: 780px;height: 100%;float: left;background-color: #ffffff;padding: 0px 20px;}
    .right {width: calc(100% - 780px);height: 100%;float: right;}
    .left .head {height: 70px;line-height: 70px;border-bottom: 1px solid #e8eaec}
    .left .head .title {font-size: 18px;float: left;}
    .left .head .down {font-size: 14px;float: right;margin-top: 15px;}
    .chose {height: 70px;line-height: 70px;padding: 10px 10px 0px 10px;}
    .chose .gou,.in {float: left;margin-right: 10px;font-size: 16px;}
    .chose .del {float: right;font-size: 16px;}
    .fromlist {margin-top: 20px;}
</style>