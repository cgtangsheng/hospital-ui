<template>
    <div class="main">
        <div class="box-form">
            <mt-header title="BMI评估">
                <router-link to="/dm/risk" slot="left">
                    <mt-button icon="back"></mt-button>
                </router-link>
            </mt-header>
            <div v-for="(item,index) in form">
                <mt-field :label="item.label" :placeholder="item.placeholder" v-model="item.value"></mt-field>
            </div>
        </div>
        <div class="pg-submit-sure">
            <mt-button type="primary" class="btn-submit" v-on:click="submitDmBase">提交</mt-button>
        </div>
        <div class="pg-submit-cancle">
            <mt-button type="danger" class="btn-submit" v-on:click="cancelSubmit">取消</mt-button>
        </div>
    </div>
</template>

<script type="text/javascript">
    import $ from "zeptojs"
    import { Toast } from 'mint-ui';

    export default {
        name: 'index',
        data(){
            let me = this;
            return {
                form:[
                    {
                        label:"身高",
                        placeholder:"请输入身高(cm)",
                        name:"height",
                        value:""
                    }, {
                        label:"体重",
                        placeholder:"请输入体重(kg)",
                        name:"weight",
                        value:""
                    }, {
                        label:"腰围",
                        placeholder:"请输入腰围(cm)",
                        name:"waist",
                        value:""
                    }, {
                        label:"臀围",
                        placeholder:"请输入臀围(cm)",
                        name:"hip",
                        value:""
                    },
                ],
                popupVisible :false,

            }
        },
        methods:{
            submitDmBase:function(){
                let me = this;
                var token = localStorage.getItem("token");
                var healthid = localStorage.getItem("health_id")
                if(!token || !healthid){
                    window.location.href = "/#/user/login"
                    return
                }
                var request = new Map();
                for(var i=0;i<me.form.length;i++){
                    request[me.form[i].name]=me.form[i].value
                }
                var token = localStorage.getItem("token");
                var healthid = localStorage.getItem("health_id")
                request["token"]=token;
                request["health_id"]=healthid;
                me.$router.push({path:"/user/bmi_save",query:request});
            },
            cancelSubmit:function () {

            }
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

</style>