<template>
    <div class="meetinglist">
         <Table border :columns="detailline" :data="detaillist"></Table>
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
        methods:{
            
        }
    }
</script>