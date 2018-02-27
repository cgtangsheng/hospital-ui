<template>
    <div class="main">
        <mt-header title="锦医卫－医心为你">
            <router-link to="/dm/index" slot="left">
                <mt-button icon="back"></mt-button>
            </router-link>
        </mt-header>
        <div class="header">
            <mt-radio :title="is_dm.title" :options="is_dm.options" :align="is_dm.align" v-model="is_dm.value"></mt-radio>
        </div>
        <div v-show="isShow=(is_dm.value == '是')">
            <div v-for="(item,index) in form">
                <mt-field  :label="item.label" :placeholder="item.placeholder" :type="item.type" v-model="item.value"></mt-field>
            </div>
        </div>
        <div class="pg-submit-sure" v-show="isShow=(is_dm.value == '是')">
            <mt-button type="primary" class="btn-submit" @click="submitDmCheck">下一页</mt-button>
        </div>
        <div class="pg-submit-sure" v-show="isShow=(is_dm.value == '否')">
            <mt-button type="primary" class="btn-submit" @click="submitDmRisk">提交</mt-button>
        </div>
    </div>
</template>

<script type="application/javascript">
    import $ from "zeptojs"
    import { Toast } from 'mint-ui';
    export default{
        data(){
            var me= this;
            return {
                is_dm:{
                    title:"是否确诊为2型糖尿病",
                    options:['是', '否'],
                    align:"left",
                    value:""

                },
                form:[
                    {
                        label:"确诊医院",
                        placeholder:"糖尿病确诊医院",
                        name:"diagnose_hospital",
                        value:"",
                        type:"text",
                    },
                    {
                        label:"确诊时间",
                        placeholder:"确诊时间",
                        name:"diagnose_time",
                        type:"date",
                        value:""
                    },
                    {
                        label:"空腹血糖",
                        placeholder:"空腹血糖",
                        name:"fasting_blood_glucose",
                        type:"text",
                        value:""
                    },
                    {
                        label:"餐后血糖",
                        placeholder:"餐后血糖",
                        name:"postprandial_blood_glucose",
                        type:"text",
                        value:""
                    },
                    {
                        label:"任意时间血糖",
                        placeholder:"任意时间血糖",
                        name:"anytime_blood_glucose",
                        type:"text",
                        value:""
                    },

                ]
            }
        },
        methods:{
            submitDmCheck:function () {
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
                request["token"]=token;
                request["health_id"]=healthid;
                request["is_diabetes"] = (me.is_dm.value == "是")?1:0;
                me.$router.push({path:"/dm/history",query:request});
            },
            submitDmRisk:function () {
                let me=this
                me.$router.push({path:"/dm/index"});
            }
        }
    }

</script>

<style type="less">
    .header{
        display: inline-block;
    }
</style>