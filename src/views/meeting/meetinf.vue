<template>
    <div class="meeting">
        <i-button type="primary" class="btn" @click="addbox = true">添加会议</i-button>
        <div class="up">
            <div class="calendar">
                <div id="schedule-box" class="boxshaw"></div>
            </div>
            <div class="weekclass" v-for="item in weekalllist" :class="{'checkit': item.weekday == checkday, 'week-box' : item.weekday != checkday}">
                <div class="weekday">
                    <div class="day" v-text="item.day"></div>
                    <div class="week" v-text="item.week"></div>
                </div>
                <div class="lists">
                    <div class="item" v-for="item in 2">
                        <a class="itemtime">
                            <span>09:00</span>
                            <span>-</span>
                            <span>10:35</span>
                        </a>
                        <a class="itemtime" style="word-break:break-all">测试</a>
                    </div>
                </div>
            </div>
        </div>
        <div class="bottom">
            <i-table stripe :columns="detailline" :data="detaillist"></i-table>
        </div>
        <Modal v-model="addbox" title="添加会议" width="580px" @ok="ok" @cancel="cancel">
            <i-form ref="addform" :model="addform" :rules="ruleform" :label-width="80">
                <Form-item label="会议名称" prop="huiyiname">
                    <i-input v-model="addform.huiyiname" placeholder="输入会议名称"></i-input>
                </Form-item>
                <Form-item label="会议类型" prop="huiyitype">
                    <i-select v-model="addform.huiyitype" placeholder="选择会议类型">
                        <i-option v-for="item in MeetTypes" :value="item.id" :label="item.name"></i-option>
                    </i-select>
                </Form-item>
                <Form-item label="会议主题" prop="huiyitheme">
                    <i-input v-model="addform.huiyitheme" placeholder="输入会议主题" type="textarea" :rows="2"></i-input>
                </Form-item>
                <Form-item label="会议室" prop="huiyiroom">
                    <i-input v-model="addform.huiyiroom" placeholder="输入会议室"></i-input>
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
                            <div class="peoplename" v-for="it in addform.checkedpeople">
                                <span>{{it.name}}</span>
                            </div>
                        </div>
                    </div>
                </Form-item>
                <Form-item label="选择日期" prop="date">
                    <Date-picker type="date" v-model="addform.date" placeholder="选择日期" style="width: 200px"></Date-picker>
                </Form-item>
                <Form-item label="选择时间">
                    <Row>
                        <Form-item style="display:inline-block">
                            <Time-picker type="time" format="HH:mm" v-model="addform.timebegin" placeholder="开始时间" style="width:100px"
                                         hide-disabled-options
                                         :disabled-hours="[0,1,2,3,4,5,6,19,20,21,22,23,24]"
                                         :steps="[1, 5]">
                            </Time-picker>
                        </Form-item>
                        <span style="display: inline-block;margin:0 5px">-</span>
                        <Form-item prop="timeend" style="display: inline-block;">
                            <Time-picker type="time" format="HH:mm" v-model="addform.timeend" placeholder="结束时间" style="width:100px"
                                         hide-disabled-options
                                         :disabled-hours="[0,1,2,3,4,5,6,19,20,21,22,23,24]"
                                         :steps="[1, 5]">
                            </Time-picker>
                        </Form-item>
                    </Row>
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
    // import $ from 'jquery'
    //日期格式化
    window.year = new Date().getFullYear();
    window.month = new Date().getMonth();
    window.selectedDate = '';
    window.day = new Date().getDate();

    //转换日期格式：y-m-d
    function formartDate (y,m,d,symbol) {
        symbol = symbol || '-';
        m = (m.toString())[1] ? m : '0'+m;
        d = (d.toString())[1] ? d : '0'+d;
        return y+symbol+m+symbol+d
    };
    //转换month格式
    function formartmonth (y,m,symbol) {
        symbol = symbol || '-';
        m = (m.toString())[1] ? m : '0'+m;
        return y+symbol+m
    };
    function Schedule(e,optdate) {
        var curDate = new Date(),
            currentYear = curDate.getFullYear(),
            currentMonth = curDate.getMonth(),
            currentDay = curDate.getDate(),
            el = document.querySelector(e) || document.querySelector('body');
        if(optdate.length) {
            for(var i = 0;i<optdate.length;i++) {
                optdate[i] = new Date(optdate[i]);

            }
        }else {
            optdate = [];
        }
        var init = function () {
            var scheduleHd = '<div class="schedule-hd">'+
                '<div>' +
                '<i class="ivu-icon ivu-icon-ios-arrow-back arrow"  id="prevMonth"></i>' +
                '</div>' +
                '<div class="today">'+ formartmonth(year,month+1,'-') + '</div>' +
                '<div>' +
                '<i class="ivu-icon ivu-icon-ios-arrow-forward arrow" id="nextMonth"></i>' +
                '</div>' +
                '</div>'
            var scheduleWeek = '<ul class="week-ul ul-box">' +
                '<li>日</li>' +
                '<li>一</li>' +
                '<li>二</li>' +
                '<li>三</li>' +
                '<li>四</li>' +
                '<li>五</li>' +
                '<li>六</li>' +
                '</ul>'
            var scheduleBd = '<ul class="schedule-bd ul-box"></ul>';
            el.innerHTML = scheduleHd + scheduleWeek + scheduleBd;
            render();
        }
        var render = function () {
            var fullDay = new Date(year,month+1,0).getDate(), //当月总天数
                startWeek = new Date(year,month,1).getDay(), //当月第一天是周几
                total = (fullDay+startWeek)%7 == 0 ? (fullDay+startWeek) : fullDay+startWeek+(7-(fullDay+startWeek)%7),//元素总个数
                lastMonthDay = new Date(year,month,0).getDate(), //上月最后一天
                eleTemp = [];
            for(var i = 0; i < total; i++){
                if(i<startWeek){
                    eleTemp.push('<li class="other-month"><span class="dayStyle">'+(lastMonthDay-startWeek+1+i)+'</span></li>')
                }else if(i<(startWeek+fullDay)){
                    var nowDate = formartDate(year,month+1,(i+1-startWeek),'-');

                    var addClass = '';
                    for(var j = 0;j<optdate.length;j++) {
                        var kyear = optdate[j].getFullYear(),
                            kmonth = optdate[j].getMonth(),
                            kday = optdate[j].getDate();
                        var keyday = formartDate(kyear,kmonth+1,kday,'-');
                        if(nowDate == keyday) {
                            addClass = 'huiyi-flag';
                        }
                    }

                    selectedDate == nowDate && (addClass = 'selected-style');
                    formartDate(currentYear,currentMonth+1,currentDay,'-') == nowDate && (addClass = 'today-flag');
                    eleTemp.push('<li class="current-month" ><span title='+nowDate+' class="currentDate dayStyle '+addClass+'">'+(i+1-startWeek)+'</span></li>')
                }else{

                    eleTemp.push('<li class="other-month"><span class="dayStyle">'+(i+1-(startWeek+fullDay))+'</span></li>')
                }
            }
            el.querySelector('.schedule-bd').innerHTML = eleTemp.join('');
            el.querySelector('.today').innerHTML = formartmonth(year,month+1,'-');
        };
        init();
    }
    //对Date的扩展，将Date转化为指定格式的String
    Date.prototype.format = function(format) {
        var date = {
            "M+": this.getMonth() + 1, //月份
            "d+": this.getDate(), //日
            "h+": this.getHours(), //小时
            "m+": this.getMinutes(), //分
            "s+": this.getSeconds(), //秒
            "q+": Math.floor((this.getMonth() + 3) / 3), //季度
            "S+": this.getMilliseconds()  //毫秒
        };
        if (/(y+)/i.test(format)) {
            format = format.replace(RegExp.$1, (this.getFullYear() + '').substr(4 - RegExp.$1.length));
        }
        for (var k in date) {
            if (new RegExp("(" + k + ")").test(format)) {
                format = format.replace(RegExp.$1, RegExp.$1.length == 1
                    ? date[k] : ("00" + date[k]).substr(("" + date[k]).length));
            }
        }
        return format;
    }

    export default {
        data(){
            return {
                timelist:[
                    {
                        time:'1',
                        day:'周一',
                        meeting:[
                            {
                                begintime: '09:15',
                                title:"测试"
                            },
                            {
                                begintime: '11:10',
                                title:"测试2"
                            },

                        ]
                    },
                    {
                        time:'2',
                        day:'周二',
                        meeting:[
                            {
                                begintime: '09:15',
                                title:"测试"
                            },
                            {
                                begintime: '11:10',
                                title:"测试2"
                            },

                        ]
                    },
                    {
                        time:'3',
                        day:'周三',
                        meeting:[

                        ]
                    },
                    {
                        time:'4',
                        day:'周四',
                        meeting:[
                            {
                                begintime: '09:15',
                                title:"测试"
                            },
                            {
                                begintime: '11:10',
                                title:"测试2"
                            },

                        ]
                    },
                    {
                        time:'5',
                        day:'周五',
                        meeting:[
                        ]
                    },
                    {
                        time:'6',
                        day:'周六',
                        meeting:[
                        ]
                    },
                    {
                        time:'7',
                        day:'周日',
                        meeting:[
                        ]
                    },

                ],
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
                                }, '编辑'),
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
                ],

                nowd:'',
                nowm:'',
                nowy:'',
                datelist:[],
                weekalllist:[],
                checkday:'',

                addbox:false,
                addform:{
                    huiyiname:'',
                    huiyitype:'',
                    meetingtypename:'',
                    huiyitheme:'',
                    huiyiroom:'',
                    checkedpeople:[],
                    date:'',
                    dateday:null,
                    timebegin:'',
                    timeend:'',
                    uploadfile:[],
                    typelist:[]
                },
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
                ruleform:{
                    huiyiname:[
                        {required: true, message:'请输入会议名称',trigger:'blur'}
                    ],
                    huiyitype:[
                        {required: true, message:'请输入会议类型', type:'number',trigger:'blur'}
                    ],
                    huiyitheme:[
                        {required: true, message:'请描述会议主题',trigger:'blur'},
                        {type:'string',min:10,message:'描述内容不小于10个字',trigger:'blur'},
                        {type:'string',max:500,message:'描述内容不多于500个字',trigger:'blur'}
                    ],
                    huiyiroom:[
                        {required:true,message:'请输入会议室',trigger:'blur'}
                    ],
                    checkedpeople:[
                        {required:true,type:'array',trigger:'blur'}
                    ],
                    date:[
                        {required:true,type:'date',message:'选择日期',trigger:'change'} //没有任何输入时，不会触发change
                    ],
                    timebegin:[
                        {required:true,type:'date',message:'选择开始时间',trigger:'change'}
                    ],
                    timeend:[
                        {trigger: 'change'}
                    ]
                },
            }
        },
        methods:{
            initcalendar() {
                var that = this;

                Schedule('#schedule-box',that.datelist);
                $("#schedule-box").on('click',function(e){
                    if(e.target.id == 'nextMonth') {

                        if(month+1 > 11){
                            year += 1;
                            month = 0;
                        }else{
                            month += 1;
                        }
                        that.uploadtable(year,month+1,day);
                    }
                    if(e.target.id == 'prevMonth') {
                        if(month-1 < 0){
                            year -= 1;
                            month = 11;
                        }else{
                            month -= 1;
                        }
                        that.uploadtable(year,month+1,day);
                    }
                    if(e.target.className.indexOf('currentDate') > -1){
                        selectedDate = e.target.title;

                        Schedule('#schedule-box',that.datelist);
                        that.showweek(year,month+1,e.target.innerHTML);
                    }
                })
            },
            uploadtable(y,m,d){
                let that = this;
                that.datelist = [];
                Schedule('#schedule-box',that.datelist);
            },
            showweek(y,m,d){
                let that = this;
                if(d < 10){
                    d = "0" + d;
                }
                if(m < 10){
                    m = "0" + m;
                }
                var time = y + '-' + m + '-' + d;
                this.checkday = time;
                var k = new Date(time);
                var day = k.getDay() || 7;//获取当前星期X(0-6,0周日)

                var startTime = new Date(k.getFullYear(), k.getMonth(), k.getDate() + 1 - day);
                var endTime = new Date(k.getFullYear(), k.getMonth(), k.getDate() + (7 - day));

                that.weekdata(startTime,endTime);
            },
            weekdata(startTime,endTime){
                let that = this;
                that.weekalllist = [];
                while((endTime.getTime()-startTime.getTime())>=0){
                    var year = startTime.getFullYear();
                    var month = startTime.format("MM");
                    var day = startTime.format("dd");
                    var isday = year+"-"+month+"-"+day;

                    var n = new Date(isday).getDay(); //startTime的星期X
                    var base = {
                        day:day,
                        week:that.getweek(n), //0为周日6为周六
                        weekday:isday,
                        data:[],
                    };
                    that.weekalllist.push(base);

                    startTime.setDate(startTime.getDate()+1);
                }
                that.weekalllist.forEach((val,index) => {
                    val.data.sort(function(a,b){
                        return Date.parse(a.start) - Date.parse(b.start);
                    });
                })
            },
            getweek(val){
                var week;
                switch(val)  {
                    case 0:
                        week = "周日";
                        break;
                    case 1:
                        week = "周一";
                        break;
                    case 2:
                        week = "周二";
                        break;
                    case 3:
                        week = "周三";
                        break;
                    case 4:
                        week = "周四";
                        break;
                    case 5:
                        week = "周五";
                        break;
                    case 6:
                        week = "周六";
                        break;
                }
                return week;
            },

            show(){

            },
            remove(){

            },
            checkpeople(root) {
                let that = this;
                that.addform.checkedpeople = [];
                root.forEach(function(value){
                    if(!value.children) {
                        value.name = value.title;
                        that.addform.checkedpeople.push(value);
                    }
                })
            },
            ok(){

            },
            cancel(){

            }
        },
        mounted(){
            let that = this;
            var date = new Date();
            var year = date.getFullYear();
            var month = date.getMonth()+1;
            var day = date.getDate();
            that.showweek(year,month,day);
            if(month < 10) {
                month = "0"+month;
            }
            if(day < 10) {
                day = "0"+day;
            }
            that.initcalendar();
        },
    }
</script>
<style>
    .meeting {width:100%;height:100%;padding: 22px;background-color: #dae3ef;min-width:1000px;position: relative}
    .meeting .btn {position:absolute;right:10px;top:-45px;z-index:1}
    .meeting .up {height:60%;background-color: #fff}
    .meeting .bottom {height:40%;border-top:10px solid #dae3ef;overflow-y: auto}
    .meeting .calendar {position: relative;width:400px;height:100%;display: inline-block;}
    .meeting .boxshaw {width:100%;font-size:13px;position: absolute;display: inline-block;top:50%;left:50%;transform:translate(-50%,-50%)}
    .meeting .schedule-hd {display: flex;justify-content: space-between;padding:0 15px;margin-bottom: 20px;}
    .meeting .today {flex:1;text-align:center;}
    .meeting .ul-box {overflow: hidden;}
    ul {list-style:none;}
    .meeting .ul-box >li {float:left;width:14.28%;text-align: center;padding:5px 0;}
    .meeting .other-month {color:#999999;}
    .meeting .current-month {color: #333333;}
    .meeting .dayStyle {width:35px;height:35px;border-radius: 50%;text-align: center;line-height: 35px;display: inline-block;cursor: pointer;}
    .meeting .current-month > .dayStyle:hover {background: rgb(153,153,153);color:#ffffff;}
    .meeting .today-flag {background:#4A9BFF;color:#ffffff;}
    .meeting .arrow {cursor: pointer;font-size:16px;}
    .meeting .weekclass {width:calc((100% - 400px)/7);height:100%;display: inline-block;padding-top:30px;vertical-align: top;border-left:1px solid #cccccc;cursor:pointer;}
    .meeting .weekday {height:60px;width:100%;}
    .meeting .weekday .day {font-size: 22px;height: 22px;line-height: 22px;width: 100%;text-align: center;color: #999999;}
    .meeting .weekday .week {font-size: 22px;width: 100%;height: 22px;line-height: 22px;text-align: center;color: #999999;}
    .meeting .checkit {position:relative;}
    .meeting .checkit::after {position: absolute;content:"";top:0px;width:100%;height:0px;border-top:8px solid #4A9BFF;display: block;}
    .meeting .week-box {position: relative;}
    .meeting .week-box:hover::after {display:block;}
    .meeting .week-box::after {position: absolute;content:"";top:0px;width:100%;height:0px;border-top:8px solid #4A9BFF;display: none;}
    .meeting .lists .item{margin-bottom: 30px;text-align: center;}
    .meeting .itemtime {display: block;}


</style>
<style scoped>
    /*Modal*/
    .ivu-btn-ghost {color:#989898}
    .ivu-modal-body {padding:15px 48px;}
    .addpeople {width:50%;height:260px;display: inline-block;}
    .addhead {height: 20px;line-height: 20px;}
    .addbody {height: 240px;overflow-y: auto;border: 1px solid #dddee1;border-radius: 4px;padding: 0px 10px}
    .people {width: 45%;height: 260px;display: inline-block;float: right;}
    .peoplehead {height: 20px;line-height: 20px;}
    .peoplebody {height: 240px;overflow-y: auto;border: 1px solid #dddee1;border-radius: 4px;padding: 10px;}
    .peoplename {min-height: 20px;}
    .ivu-tree ul li {margin:0}
</style>