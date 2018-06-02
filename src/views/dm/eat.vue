<template>
    <div class="main">
        <div class="box-form">
            <mt-header title="生活方式测评">
                <router-link to="/dm/index" slot="left">
                    <mt-button icon="back"></mt-button>
                </router-link>
            </mt-header>
            <div class="box-header">
                <div class="box-title">生活方式测评</div>
                <div class="box-tips">第{{click_pos+1}}题/共{{form.length+4}}题</div>
            </div>
            <div class="spliteline-single"></div>

            <div v-if="click_pos==0">
                <mt-radio :title="work_type.title" :options="work_type.options" :align="work_type.align" v-model="work_type.value"></mt-radio>
            </div>
            <div v-for="(item,index) in form">
                <div v-if="index==click_pos-1">
                    <mt-field  :label="item.label" :placeholder="item.placeholder" v-model="item.value"></mt-field>
                </div>
            </div>
            <div v-if="click_pos==form.length+1">
                <mt-radio :title="blood_pressure_addr.title" :options="blood_pressure_addr.options" :align="blood_pressure_addr.align" v-model="blood_pressure_addr.value"></mt-radio>
            </div>
            <div v-if="click_pos==form.length+2">
                <mt-radio :title="is_smoke.title" :options="is_smoke.options" :align="is_smoke.align" v-model="is_smoke.value"></mt-radio>
                <div v-if="is_smoke.value=='是'">
                    <mt-field  :label="smoke_info.label" :placeholder="smoke_info.placeholder" v-model="smoke_info.value"></mt-field>
                </div>
            </div>
            <div v-if="click_pos==form.length+3">
                <mt-radio :title="is_drink.title" :options="is_drink.options" :align="is_drink.align" v-model="is_drink.value"></mt-radio>
                <div v-if="is_drink.value=='是'">
                    <mt-field  :label="drink_info.label" :placeholder="drink_info.placeholder" v-model="drink_info.value"></mt-field>
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
            var me = this;
            return {
                "form":[
                    {
                        label:"主食",
                        placeholder:"一天的主食量(两)",
                        name:"diet",
                        value:""
                    },
                    {
                        label:"蔬菜",
                        placeholder:"一天的蔬菜量(两)",
                        name:"vegetables",
                        value:""
                    },
                    {
                        label:"牛奶",
                        placeholder:"一天的牛奶量(两)",
                        name:"milk",
                        value:""
                    },
                    {
                        label:"鸡蛋",
                        placeholder:"一天的鸡蛋量(两)",
                        name:"egg",
                        value:""
                    },
                    {
                        label:"瘦肉",
                        placeholder:"一天的瘦肉量(两)",
                        name:"meet",
                        value:""
                    },
                    {
                        label:"豆制品",
                        placeholder:"一天的豆制品量(两)",
                        name:"bean",
                        value:""
                    }, {
                        label:"烹调油",
                        placeholder:"一天的烹调油量(两)",
                        name:"oil",
                        value:""
                    }, {
                        label:"盐",
                        placeholder:"一天的盐量(两)",
                        name:"salt",
                        value:""
                    }, {
                        label:"运动类型",
                        placeholder:"运动类型",
                        name:"sports_type",
                        value:""
                    }, {
                        label:"运动强度",
                        placeholder:"运动强度",
                        name:"sports_intensity",
                        value:""
                    },
                    {
                        label:"运动时长",
                        placeholder:"运动时长",
                        name:"sports_time",
                        value:""
                    }, {
                        label:"运动频率",
                        placeholder:"运动频率",
                        name:"sports_frequency",
                        value:""
                    },{
                        label:"血压高压",
                        placeholder:"血压高压",
                        name:"high_blood_pressure",
                        value:""
                    }, {
                        label:"血压低压",
                        placeholder:"血压低压",
                        name:"low_blood_pressure",
                        value:""
                    }],
                popupVisible:false,
                is_smoke:{
                    title:"是否吸烟",
                    options:['是', '否'],
                    align:"left",
                    value:""
                },
                blood_pressure_addr:{
                    title:"请输入血压测量地点",
                    options:['医院', '家'],
                    align:"right",
                    value:""
                },
                is_drink:{
                    title:"是否饮酒",
                    options:['是', '否'],
                    align:"left",
                    value:""
                },
                smoke_info:{
                    label:"吸烟量",
                    placeholder:"吸烟量(支/天)",
                    name:"smoke_num",
                    value:""
                },
                drink_info:{
                    label:"饮酒量",
                    placeholder:"饮酒量(两/天)",
                    name:"drink_num",
                    value:""
                },
                work_type:{
                    title:"请选择劳动类型",
                    options:['重体力劳动', '中体力劳动','轻体力劳动'],
                    align:"right",
                    value:""
                },
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
                console.log(me.form.length);
                if(me.click_pos >me.form.length+3){
                    me.submitDmEat();
                }else if(me.click_pos == me.form.length+3){
                    me.isEnd = true
                    me.next.text ="提交"
                }else{
                    me.isEnd = false
                    me.next.text ="下一题"
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
                if(me.click_pos == me.form.length+3){
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
            submitDmEat:function(){
                let me = this;
                var token = localStorage.getItem("token");
                var healthid = localStorage.getItem("health_id")
                if(!token || !healthid){
                    window.location.href = "/user/login"
                    return
                }
                var request = new Map();
                for(var i=0;i<me.form.length;i++){
                    request[me.form[i].name]=me.form[i].value
                }
                request["token"]=token;
                request["health_id"]=healthid;
                request["is_smoke"]=me.is_smoke.value == "是"?true:false;
                request["is_drink"]=me.is_drink.value == "是"?true:false;
                request["smoke_num"]=me.smoke_info.value;
                request["drink_num"]=me.drink_info.value;
                request["work_type"]=me.getWrokType();
                request["blood_pressure_addr"]=me.getBloodPressureAddr();
                me.$router.push({path:"/dm/eat_save",query:request});
            },
            formatForm:function () {
                form.forEach((item) => {

                })
            },
            getWrokType:function () {
                let me = this;
              if(me.work_type.value == "重体力劳动"){
                  return 1;
              }else if(me.work_type.value == "中体力劳动"){
                  return 2;
              }else if(me.work_type.value == "轻体力劳动"){
                  return 3;
              }
            },
            getBloodPressureAddr:function(){
                let me = this;
                if(me.blood_pressure_addr.value == "医院"){
                    return 0;
                }else if(me.blood_pressure_addr.value == "家"){
                    return 1;
                }
            }
        },
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
    .mint-radiolist label{
        font-size: 16px;
    }
    .spliteline-single{
        margin-left: 0px;
        margin-right: 0px;
        text-align: left;
        width: 100%;
        vertical-align: middle;
        border-top: 1px solid #ddd;
    }

</style>