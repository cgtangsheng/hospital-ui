<template>
    <div>
        <div v-if="noticeArr.length > 0">
            <div class="warning" v-for="item in noticeArr">
                <span v-html="item.notice"></span> 
                <span class="warningTime">发布时间：{{item.ctime}}</span>
            </div>
        </div>
    </div>
</template>

<script>
import $ from 'zeptojs'

export default {
    name: 'notice',

    props: ['page'],

    data() {
      	return {
            noticeArr: []
      	};
    },

    mounted() {
        this.getNotice();
    },

    methods: {
        /*获取公告信息*/
        getNotice() {
            $.ajax({
                url: 'http://bi.kb.oa.com/cgi/getNotice',
                dataType: 'jsonp',
                success: (res) => {
                    let seeNotice = [];
                    if (res.ret === 0 && res.data.length > 0) {
                        for(let i in res.data) {
                            let page = res.data[i].json_decode.page || '';
                            let _json = JSON.parse(res.data[i].json);

                            for(let j in page){
                                if(page[j] == this.page){
                                    if(res.data[i].status == 1 ) {
                                        this.noticeArr.push({
                                            notice: _json.time + '&nbsp;&nbsp;' + _json.notice + '&nbsp;&nbsp;' + "数据负责人：" + _json.manager ,
                                            ctime: res.data[i].ctime
                                        })
                                    }
                                  
                                }
                            }
                            
                        }
                    }
                },
                error: () => {
                }
            })
        }
	}
}
</script>

<style lang="less" scoped>
.tip{ 
    font-size: 13px;
    color: #FA5555;
    margin-bottom: 10px;
}
.warning {
    color: #F56C6C;
    margin-bottom: 10px;
    border: 1px dashed;
    padding: 10px 10px 35px 10px;
    position: relative;

    .warningTime {
        position: absolute;
        right: 10px;
        bottom: 8px;
        font-size: 14px;
    }
    
    ul {
        margin-top: 10px;
    }

    li {
        position: relative;
        padding-left: 15px;
        font-size: 13px;
        margin-left: 20px;
        line-height: 16px;
        list-style: none; 

        span {
            position: absolute;
            left: 0;
            top: 50%;
            margin-top: -3px;
            width: 6px;
            height: 6px;
            background: #F56C6C;
            border-radius: 6px;
        }
    }
}
</style>