<template>
    <div>
        <div class="box-form">
            <mt-header title="锦医卫－医心为你">
                <router-link to="/dm/index" slot="left">
                    <mt-button icon="back"></mt-button>
                </router-link>
            </mt-header>
            <div v-for="(item,index) in form">
                <mt-field :label="item.label" :placeholder="item.placeholder"  :type="item.type" v-model="item.value"></mt-field>
            </div>
            <div class="mint-cell-wrapper">
                <div class="mint-cell-title-self">
                  <span class="mint-cell-text">性别</span>
                </div>
                <div class="mint-cell-value">
                    <div v-for="item in sexOptions">
                        <input  :value="item.value"　:name="item.name" type="radio"  v-model="sexValue"><span class="mint-radio-label">{{item.text}}</span>
                    </div>
                </div>
            </div>
        </div>
        <div class="pg-submit-sure">
            <mt-button type="primary" class="btn-submit" v-on:click="submitUserBase">提交</mt-button>
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
        data(){
            return {
                form:[
                    {
                        label:"姓名",
                        placeholder:"请输入用户名",
                        name:"name",
                        value:"",
                        type:"text"
                    },
                    {
                        label:"手机号",
                        placeholder:"请输入手机号",
                        name:"tel",
                        value:"",
                        type:"text"
                    },
                    {
                        label:"生日",
                        placeholder:"请输入生日",
                        name:"birthday",
                        value:"",
                        type:"date"
                    },{
                        label:"职业",
                        placeholder:"请输入职业",
                        name:"work",
                        value:"",
                        type:"text"
                    }
                ],
                sexOptions:[
                    {
                        name:"sex",
                        text:"男",
                        value:0,
                    },
                    {
                        name:"sex",
                        text:"女",
                        value:1,
                    }
                ],
                sexValue:0,
            }
        },
        methods:{
            submitUserBase:function () {
                let me = this
                var token = localStorage.getItem("token");
                var healthid = localStorage.getItem("health_id")
                console.log(token);
                console.log(healthid);
                if(!token || !healthid){
                    window.location.href = "/#/user/login"
                    return
                }
                var request ={};
                for(var i=0;i<me.form.length;i++){
                    request[me.form[i].name]=me.form[i].value;
                }
                request["token"]=token;
                request["health_id"]=healthid;
                request["sex"]=me.sexValue;
                $.ajax({
                    "url":global.apiUrl+"/user/base-save",
                    "datetype":"JSONP",
                    "data":request,
                    "success":function ($data) {
                        Toast({
                            message: '提交成功',
                            iconClass: 'icon icon-success'
                        });
                    },
                    "error":function ($data) {
                        Toast({
                            message: '提交失败',
                            iconClass: 'icon icon-success'
                        });
                    }
                })
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
    .mint-cell-title-self{
        width: 105px;
        flex:none;
         -webkit-box-flex:0;
    }


</style>