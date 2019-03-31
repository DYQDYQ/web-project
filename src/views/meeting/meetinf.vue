<template>
    <div class="meeting">
        <div class="top">
            <div class="calender"></div>
            <div class="timelist" v-for="time in timelist">
                <div class="time">{{time.time}}</div>
                <div class="day">{{time.day}}</div>
                <div class="list">
                    <div class="daylist" v-for='meeting in time.meeting'>
                        <div>{{meeting.begintime}}</div>
                        <div>{{meeting.title}}</div>
                    </div>
                </div>
            </div>
        </div>
        <div class="bottom">
            <Table border :columns="detailline" :data="detaillist"></Table>
        </div>
    </div>
</template>
<script>
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
                        begintime: '09:15',
                        endtime:'09:45'
                        type:'探讨'
                    }
                ]
                
            }
        },

    }
</script>