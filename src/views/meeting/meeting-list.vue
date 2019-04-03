<template>
    <div class="meetinglist">
        <i-button type="primary" class="btn" @click="addbox = true">添加会议模板</i-button>
        <i-table stripe :columns="detailline" :data="detaillist" ></i-table>

        <Modal v-model="addbox"
               title="添加会议模板"
               width="580px"
               @ok="ok"
               @cancel="cancel">
            <i-form rel="formData" :model="formData" :rules="formValidate" :label-width="80">
                <Form-item label="模板类型" prop="type">
                    <i-select v-model="formData.type" placeholder="选择模板类型">
                        <i-option v-for="item in Types" :value="item.id" :label="item.name"></i-option>
                    </i-select>
                </Form-item>
                <Form-item label="创建时间" v-if="formData.type == 2" prop="week">
                    <i-select v-model="formData.week" placeholder="请选择时间" multiple>
                        <i-option v-for="item in Weeks" :value="item.id" :label="item.name"></i-option>
                    </i-select>
                </Form-item>
                <Form-item label="创建时间" v-if="formData.type == 3" prop="month">
                    <i-select v-model="formData.month" placeholder="请选择时间" multiple>
                        <i-option v-for="item in Months" :value="item.id" :label="item.name"></i-option>
                    </i-select>
                </Form-item>
                <Form-item label="选择时间" prop="endtime">
                    <Row>
                        <time-picker format="HH:mm"
                                     v-model="formData.starttime"
                                     placeholder="开始时间"
                                     style="width: 112px;display: inline-block;"
                                     hide-disabled-options
                                     :disabled-hours="[0,1,2,3,4,5,6,19,20,21,22,23,24]"
                                     :steps="[1, 5]">
                        </time-picker>
                        <span style="display: inline-block;padding:0 5px;">-</span>
                        <time-picker format="HH:mm"
                                     v-model="formData.endtime"
                                     placeholder="开始时间"
                                     style="width: 112px;display: inline-block;"
                                     hide-disabled-options
                                     :disabled-hours="[0,1,2,3,4,5,6,19,20,21,22,23,24]"
                                     :steps="[1, 5]">
                        </time-picker>
                    </Row>
                </Form-item>
                <Form-item label="会议名称" prop="name">
                    <i-input v-model="formData.name" placeholder="填写会议名称"></i-input>
                </Form-item>
                <Form-item label="会议类型" prop="meettype">
                    <i-select v-model="formData.meettype" placeholder="选择会议类型">
                        <i-option v-for="item in MeetTypes" :value="item.id" :label="item.name" :key="item.id"></i-option>
                    </i-select>
                </Form-item>
                <Form-item label="会议主题" prop="theme">
                    <i-input v-model="formData.theme" type="textarea" :autosize="{minRows:2,maxRows:5}" placeholder="填写会议主题"></i-input>
                </Form-item>
                <Form-item label="会议室" prop="room">
                    <i-input v-model="formData.room" placeholder="输入会议室"></i-input>
                </Form-item>
                <Form-item label="参会人员" prop="joinpeople">
                    <div class="people-wrap">
                        <div class="addbody">
                            <Tree :data="personlist" show-checkbox @on-check-change="checkpeople"></Tree>
                        </div>
                        <div class="people">
                            <p class="peoplename" v-for="item in formData.joinpeople">{{item.name}}</p>
                        </div>
                    </div>
                </Form-item>
                <Form-item label="截止日期" prop="deadline">
                    <date-picker type="date" placeholder="截止日期" style="width:200px"></date-picker>
                </Form-item>
                <Form-item label="添加附件">
                    <Upload ref="upload" action="/uploadfile_conc2/">
                        <i-button type="ghost" icon="ios-cloud-upload-outline">上传文件</i-button>
                    </Upload>
                </Form-item>
            </i-form>
        </Modal>
    </div>
</template>
<script >
    export default {
        data(){
            return{
                detailline:[
                    {
                        title: '会议名称',
                        key: 'name'
                    },
                    {
                        title: '会议主题',
                        key: 'theme'
                    },
                    {
                        title:'会议室',
                        key:'room'
                    },
                    {
                        title: '开始时间',
                        key: 'begintime'
                    },
                    {
                        title: '结束时间',
                        key: 'endtime'
                    },
                    {
                        title: '会议类型',
                        key: 'type',

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
                                }, 'View'),
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
                                }, 'Delete')
                            ]);
                        }
                    }
                ],
                detaillist:[
                    {
                        name: '测试',
                        theme: '测试主题',
                        room:'1212',
                        begintime: '09:15',
                        endtime:'09:45',
                        type:'探讨'
                    },
                    {
                        name: '测试',
                        theme: '测试主题',
                        room:'1212',
                        begintime: '09:15',
                        endtime:'09:45',
                        type:'探讨'
                    },
                    {
                        name: '测试',
                        theme: '测试主题',
                        room:'1212',
                        begintime: '09:15',
                        endtime:'09:45',
                        type:'探讨'
                    },
                    {
                        name: '测试',
                        theme: '测试主题',
                        room:'1212',
                        begintime: '09:15',
                        endtime:'09:45',
                        type:'探讨'
                    },
                    {
                        name: '测试',
                        theme: '测试主题',
                        room:'1212',
                        begintime: '09:15',
                        endtime:'09:45',
                        type:'探讨'
                    },
                    {
                        name: '测试',
                        theme: '测试主题',
                        room:'1212',
                        begintime: '09:15',
                        endtime:'09:45',
                        type:'探讨'
                    },
                ],

                addbox:false,
                formData:{
                    type:'',
                    week:[],
                    month:[],
                    starttime:'',
                    endtime:'',
                    name:'',
                    meettype:'',
                    theme:'',
                    room:'',
                    joinpeople:[],
                    deadline:'',
                },
                formValidate:{
                    type: [{required:true,type: 'number', message: '请选择模板类型', trigger: 'change'}],
                    week: [{required:true, type: 'array', message: '请选择创建时间', trigger: 'change'}],
                    month: [{required:true, type: 'array', message: '请选择创建时间', trigger: 'change'}],
                    name: [{required:true, message: '请填写会议名称', trigger: 'blur'}],
                    meettype: [{required:true, type: 'number', message: '请选择会议类型', trigger: 'change'}],
                    theme: [{required:true, message: '请填写会议主题', trigger: 'blur' },{ type: 'string', min: 5, max:30, message: '会议主题5-30个字', trigger: 'blur' }],
                    room: [{required:true, message: '请填写会议室', trigger: 'blur' }],
                    joinpeople: [{required:true, message: '请选择参会人员', type: 'array' }],
                    deadline: [{required:true,type: 'date',message:'选择开始时间', trigger: 'change'}]
                },
                Types:[
                    {id:1,name:'每日会议'},
                    {id:2,name:'每周会议'},
                    {id:3,name:'每月会议'},
                ],
                Weeks: [
                    {
                        id: '星期一',
                        name: '星期一'
                    },
                    {
                        id: '星期二',
                        name: '星期二'
                    },
                    {
                        id: '星期三',
                        name: '星期三'
                    },
                    {
                        id: '星期四',
                        name: '星期四'
                    },
                    {
                        id: '星期五',
                        name: '星期五'
                    },
                    {
                        id: '星期六',
                        name: '星期六'
                    },
                    {
                        id: '星期日',
                        name: '星期日'
                    }
                ],
                Months: [
                    {
                        id: '01',
                        name: '1号'
                    },
                    {
                        id: '02',
                        name: '2号'
                    },
                    {
                        id: '03',
                        name: '3号'
                    },
                    {
                        id: '04',
                        name: '4号'
                    },
                    {
                        id: '05',
                        name: '5号'
                    },
                    {
                        id: '06',
                        name: '6号'
                    },
                    {
                        id: '07',
                        name: '7号'
                    },
                    {
                        id: '08',
                        name: '8号'
                    },
                    {
                        id: '09',
                        name: '9号'
                    },
                    {
                        id: '10',
                        name: '10号'
                    },
                    {
                        id: '11',
                        name: '11号'
                    },
                    {
                        id: '12',
                        name: '12号'
                    },
                    {
                        id: '13',
                        name: '13号'
                    },
                    {
                        id: '14',
                        name: '14号'
                    },
                    {
                        id: '15',
                        name: '15号'
                    },
                    {
                        id: '16',
                        name: '16号'
                    },
                    {
                        id: '17',
                        name: '17号'
                    },
                    {
                        id: '18',
                        name: '18号'
                    },
                    {
                        id: '19',
                        name: '19号'
                    },
                    {
                        id: '20',
                        name: '20号'
                    },
                    {
                        id: '21',
                        name: '21号'
                    },
                    {
                        id: '22',
                        name: '22号'
                    },
                    {
                        id: '23',
                        name: '23号'
                    },
                    {
                        id: '24',
                        name: '24号'
                    },
                    {
                        id: '25',
                        name: '25号'
                    },  {
                        id: '26',
                        name: '26号'
                    },
                    {
                        id: '27',
                        name: '27号'
                    },  {
                        id: '28',
                        name: '28号'
                    },  {
                        id: '29',
                        name: '29号'
                    },  {
                        id: '30',
                        name: '30号'
                    },  {
                        id: '31',
                        name: '31号'
                    }
                ],
                MeetTypes:[
                    {id:1,name:'测试'},
                    {id:2,name:'例会'},
                    {id:3,name:'探讨'},
                ],
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
            ok(){

            },
            cancel(){

            },
            checkpeople(root) {
                let that = this;
                that.formData.joinpeople = [];
                root.forEach(function(value){
                    if(!value.children) {
                        value.name = value.title;
                        that.formData.joinpeople.push(value);
                    }
                })
            },
        },
        mounted(){

        }
    }
</script>
<style scoped>
    .meetinglist {position: relative}
    .btn {position:absolute;right:10px;top:-45px;z-index:1}
    .ivu-btn-ghost {color:#989898}
    .ivu-modal-body {padding:15px 48px;}
    .people-wrap{width: 100%;display: flex;display: -webkit-flex;flex-direction: row;flex-wrap: nowrap;}
    .addbody {width:50%;height: 210px;overflow-y: auto;border: 1px solid #dddee1;border-radius: 4px;padding: 0px 5px;margin-right: 15px;}
    .people {width: 45%;height: 210px;overflow-y: auto;border: 1px solid #dddee1;border-radius: 4px;padding: 10px;}
    .peoplename {width: 100%;line-height: 22px;}
    .ivu-tree ul li {margin:0}
</style>