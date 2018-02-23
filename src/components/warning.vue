<template>
    <div class="warning" v-if="warning.length > 0">
        <div class="">
            <i class="el-icon-warning"></i> 您查看的数据因系统故障计算延迟,正在努力恢复中,请稍后查看。可联系负责人：higgsli, rereli, yukizou 
        </div>
        具体延时数据：
        <ul>
            <li v-for="list in warning">
                <span></span>{{list.msg}} &nbsp;&nbsp; 延时{{list.interval}}s
            </li>
        </ul>
    </div>
</template>

<script>
import $ from 'zeptojs'

export default {
    name: 'warning',

    props: ['page'],

    data() {
      	return {
            warning: [],
            gapTime: 1800,
            table: {
                cheatRealTime: ['kuaibao_realtime_video_vv', 'kuaibao_realtime_pv'],
                coreRealTime: ['kuaibao_realtime_video_vv', 'kuaibao_realtime_pv'],
                realTime: ['kuaibao_realtime_active_user_num', 'kuaibao_realtime_market_new_user_num'],
                realTimeActive: ['kuaibao_realtime_active_user_num', 'kuaibao_realtime_market_active_user_num']
            }
      	};
    },

    mounted() {
        this.checkDataRealtime();
    },

    methods: {

        /*获取接口报警信息*/
        checkDataRealtime() {
            $.ajax({
                url: 'http://bi.kb.oa.com/cgi/checkDataRealtime',
                dataType: 'jsonp',
                success: (res) => {
                    if (res.ret === 0 && res.data.length > 0) {
                        let checkTableArr = this.table[this.page];

                        for(let i in res.data) {
                            //如果延时超过阈值
                            if(res.data[i].interval > this.gapTime) {
                                for(let j in checkTableArr) {
                                    if(res.data[i].tbl_name == checkTableArr[j]) {
                                        this.warning.push({
                                            msg: res.data[i].tbl_message,
                                            interval: res.data[i].interval
                                        });
                                    }
                                }
                            }
                        }
                    }
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