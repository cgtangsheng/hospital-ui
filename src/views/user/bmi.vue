<template>
    <div class="main">
        <div class="box-form">
            <mt-header title="BMI评估">
                <router-link to="/dm/index" slot="left">
                    <mt-button icon="back"></mt-button>
                </router-link>
            </mt-header>
            <div class="box-header">
                <div class="box-title">BMI检测</div>
                <div class="box-tips">第{{click_pos+1}}题/共{{form.length}}题</div>
            </div>
            <div class="spliteline-single"></div>

            <div v-for="(item,index) in form">
                <div v-if="index==click_pos">
                    <mt-field :label="item.label" :placeholder="item.placeholder" v-model="item.value"></mt-field>
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
        name: 'index',
        data(){
            let me = this;
            return {
                form:[
                    {
                        label:"身高",
                        placeholder:"请输入身高(cm)",
                        name:"height",
                        value:"",
                    }, {
                        label:"体重",
                        placeholder:"请输入体重(kg)",
                        name:"weight",
                        value:"",
                        display:"none"
                    }, {
                        label:"腰围",
                        placeholder:"请输入腰围(cm)",
                        name:"waist",
                        value:"",
                        display:"none"
                    }, {
                        label:"臀围",
                        placeholder:"请输入臀围(cm)",
                        name:"hip",
                        value:"",
                        display:"none"
                    },
                ],
                popupVisible :false,
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
                if(me.click_pos >me.form.length-1){
                    me.submitDmBase();
                }else if(me.click_pos == me.form.length-1){
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
                if(me.click_pos == me.form.length-1){
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
    .btn-area{
        padding-top: 10px;
        overflow: hidden;
        /*position:fixed;*/
        bottom:0;
        width: 100%;
    }
    .pg-submit{
        width: 50%;
        float: left;
    }
    .box-tips{
        text-align: center;
        color: #9E9E9E;
    }
    .box-title{
        text-align: center;

    }
    .spliteline-single{
        margin-left: 0px;
        margin-right: 0px;
        text-align: left;
        width: 100%;
        vertical-align: middle;
        border-top: 1px solid #ddd;
    }
    .btn-submit{
        /*background-color: #13ce66;*/
    }


</style>
