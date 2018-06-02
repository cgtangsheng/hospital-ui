<template>
    <div class="main">
        <div class="box-form">
            <mt-header title="其他项检查">
                <router-link to="/dm/history" slot="left">
                    <mt-button icon="back"></mt-button>
                </router-link>
            </mt-header>
            <div v-for="(item,index) in form">
                <mt-field  :label="item.label" :placeholder="item.placeholder" v-model="item.value"></mt-field>
            </div>

        </div>
        <div class="pg-submit-sure">
            <mt-button type="primary" class="btn-submit" @click="submitDmOther">提交</mt-button>
        </div>
        <div class="pg-submit-cancle">
            <mt-button type="danger" class="btn-submit">取消</mt-button>
        </div>
    </div>
</template>

<script type="text/javascript">
    import $ from "zeptojs"
    import { Toast } from 'mint-ui';
    export default {
        name: 'index',
        data(){
            var me = this;
            return {
                "form":[
                    {
                        label:"血压高压",
                        placeholder:"血压高压(mmHg)",
                        name:"high_blood_pressure",
                        value:""
                    },
                    {
                        label:"血压低压",
                        placeholder:"血压低压(mmHg)",
                        name:"low_blood_pressure",
                        value:""
                    },
                    {
                        label:"HbAlc",
                        placeholder:"hbalc",
                        name:"hbalc",
                        value:""
                    },
                    {
                        label:"TG",
                        placeholder:"TG",
                        name:"tg",
                        value:""
                    },
                    {
                        label:"TC",
                        placeholder:"TC",
                        name:"tc",
                        value:""
                    },
                    {
                        label:"LDL-C",
                        placeholder:"LDL-C",
                        name:"ldl_c",
                        value:""
                    }, {
                        label:"HDL",
                        placeholder:"HDL",
                        name:"hdl",
                        value:""
                    }],
                popupVisible:false
            }
        },
        methods:{
            submitDmOther:function(){
                let me = this;
                var token = localStorage.getItem("token");
                var healthid = localStorage.getItem("health_id")
                if(!token || !healthid){
                    window.location.href = "/user/login"
                    return
                }
                var request = me.$route.query;
                for(var i=0;i<me.form.length;i++){
                    request[me.form[i].name]=me.form[i].value
                }
                request["token"]=token;
                request["health_id"]=healthid;
                me.$router.push({path:"/dm/check_save",query:request});
//                $.ajax({
//                    "url":"http://127.0.0.1:8002/dm/check",
//                    "datetype":"json",
//                    "data":request,
//                    "success":function (data) {
//                        Toast({
//                            message: '提交成功',
//                            iconClass: 'icon icon-success'
//                        });
//                    },
//                    "error":function (data) {
//                        Toast({
//                            message: '提交失败',
//                            iconClass: 'icon icon-success'
//                        });
//                    }
//                });
            },
        }
    }
</script>

<style type="less">
    .btn-submit{
        width: 100%;
        margin-bottom: 10px;
    }
    .box-form{
        margin-bottom: 30px;
    }
    .mint-cell-value{
        float: left;
    }

</style>