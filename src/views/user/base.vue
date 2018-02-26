<template>
    <div>
        <div class="box-form">
            <mt-header title="锦医卫－医心为你">
                <router-link to="/dm/index" slot="left">
                    <mt-button icon="back"></mt-button>
                </router-link>
            </mt-header>
            <div class="box-header">
                <div class="box-title">基本信息录入</div>
                <div class="box-tips">第{{click_pos+1}}题/共{{form.length}}题</div>
            </div>
            <div class="spliteline-single"></div>
            <div v-for="(item,index) in form">
                <div v-if="index==click_pos">
                    <mt-field :label="item.label" :placeholder="item.placeholder"  :type="item.type" v-model="item.value"></mt-field>
                </div>
            </div>
            <div class="mint-cell-wrapper" v-if="click_pos==form.length">
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
        <div class="btn-area">
            <div class="pg-submit">
                <mt-button type="default" class="btn-submit" :disabled="isStart==true" v-on:click="prexClick">{{prex.text}}</mt-button>
            </div>
            <div class="pg-submit">
                <mt-button type="primary" class="btn-submit" v-on:click="nextClick">{{next.text}}</mt-button>
            </div>
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
                click_pos:0,
                isEnd:false,
                isStart:true,
                prex:{
                    text:"上一题",
                    func:"prexClick"
                },
                next:{
                    text:"下一题",
                    func:"nextClick"
                },
            }
        },
        methods:{
            nextClick:function(){
                let me = this;
                me.click_pos=me.click_pos+1;
                console.log(me.click_pos);
                if(me.click_pos >me.form.length){
                    me.submitUserBase();
                }else if(me.click_pos == me.form.length){
                    me.isEnd = true
                    me.next.text ="提交"
                }else{
                    me.isEnd = false
                }
                if(me.click_pos <= 0){
                    me.isStart = true;
                }else{
                    me.isStart = false;
                }
                console.log(me.isStart);
            },
            prexClick:function () {
                let me = this;
                console.log(me.click_pos);
                me.click_pos=me.click_pos-1;
                if(me.click_pos == me.form.length){
                    me.isEnd = true
                    me.next.text ="提交"
                }else{
                    me.isEnd = false
                }
                if(me.click_pos <= 0){
                    me.isStart = true;
                }else{
                    me.isStart = false;
                }
            },
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