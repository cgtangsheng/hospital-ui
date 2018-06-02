<template>
    <div class="main">
        <mt-header title="锦医卫－医心为你">
            <router-link to="/dm/index" slot="left">
                <mt-button icon="back"></mt-button>
            </router-link>
        </mt-header>
        <div class="box-header">
            <div class="box-title">糖尿病管理合格率测评</div>
            <div class="box-tips">第{{click_pos+1}}题/共{{others.length+16}}题</div>
        </div>
        <div class="spliteline-single"></div>
        <div class="header" v-if="click_pos==0">
            <mt-radio :title="is_dm.title" :options="is_dm.options" :align="is_dm.align" v-model="is_dm.value"></mt-radio>
        </div>
        <div v-if="is_dm.value=='是'">
            <div v-for="(item,index) in form">
                <div v-if="index+1 == click_pos">
                    <mt-field  :label="item.label" :placeholder="item.placeholder" :type="item.type" v-model="item.value"></mt-field>
                </div>
            </div>
            <div v-if="click_pos == 6">
                <mt-radio :title="isketoacidosis.title" :options="isketoacidosis.options" :align="isketoacidosis.align" v-model="isketoacidosis.value"></mt-radio>
                <div v-show="isShow=(isketoacidosis.value=='是')">
                    <div v-for="(item,index) in ketoacidosis">
                        <mt-field  :label="item.label" :placeholder="item.placeholder" v-model="item.value"></mt-field>
                    </div>
                </div>
            </div>
            <div v-if="click_pos== 7">
                <mt-radio :title="ishypoglycemia.title" :options="ishypoglycemia.options" :align="ishypoglycemia.align" v-model="ishypoglycemia.value"></mt-radio>
                <div v-show="(ishypoglycemia.value=='是')">
                    <div v-for="(item,index) in hypoglycemia">
                        <mt-field  :label="item.label" :placeholder="item.placeholder" v-model="item.value"></mt-field>
                    </div>
                    <a class="mint-cell mint-field">
                        <div class="mint-cell-wrapper">
                            <div class="mint-cell-title">
                                <span class="mint-cell-text">严重程度</span>
                            </div>
                            <div class="mint-cell-value">
                                <div class="mint-field-core">
                                    <select class="selectpicker" v-model="hypoglycemia_severity_selected">
                                        <option v-for="option in hypoglycemia_severity_options" v-bind:value="option.value">
                                            {{ option.text }}
                                        </option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </a>
                </div>
            </div>
            <div v-if="click_pos==8">
                <mt-radio :title="is_cerebrovascular.title" :options="is_cerebrovascular.options" :align="is_cerebrovascular.align" v-model="is_cerebrovascular.value"></mt-radio>
            </div>
            <div v-if="click_pos==9">
                <mt-radio :title="is_cardiovascular.title" :options="is_cardiovascular.options" :align="is_cardiovascular.align" v-model="is_cardiovascular.value"></mt-radio>
            </div>
            <div v-if="click_pos==10">
                <mt-radio :title="is_peripheral_vascular.title" :options="is_peripheral_vascular.options" :align="is_peripheral_vascular.align" v-model="is_peripheral_vascular.value"></mt-radio>
            </div>
            <div v-if="click_pos==11">
                <mt-radio :title="is_nephrosis.title" :options="is_nephrosis.options" :align="is_nephrosis.align" v-model="is_nephrosis.value"></mt-radio>
            </div>
            <div v-if="click_pos==12">
                <mt-radio :title="is_fundus_lesions.title" :options="is_fundus_lesions.options" :align="is_fundus_lesions.align" v-model="is_fundus_lesions.value"></mt-radio>
            </div>
            <div v-if="click_pos==13">
                <mt-radio :title="is_peripheral_neuropathy.title" :options="is_peripheral_neuropathy.options" :align="is_peripheral_neuropathy.align" v-model="is_peripheral_neuropathy.value"></mt-radio>
            </div>
            <div v-if="click_pos==14">
                <mt-radio :title="is_diabetic_foot.title" :options="is_diabetic_foot.options" :align="is_diabetic_foot.align" v-model="is_diabetic_foot.value"></mt-radio>
            </div>
            <div v-if="click_pos==15">
                <mt-radio :title="hasOtherHistory.title" :options="hasOtherHistory.options" :align="hasOtherHistory.align" v-model="hasOtherHistory.value"></mt-radio>
                <div v-show="(hasOtherHistory.value == '是')">
                    <div v-for="(item,index) in items">
                        <mt-field  :label="item.label" :placeholder="item.placeholder" :name="item.name+index" v-model="item.value"></mt-field>
                        <mt-field  :label="item.label2" :placeholder="item.placeholder2" :name="item.name2+index" v-model="item.value2"></mt-field>
                    </div>
                    <button type="button" class="btn" @click="add">添加</button>
                </div>
            </div>
            <div v-for="(item,index) in others">
                <div v-if="index+16 == click_pos">
                    <mt-field  :label="item.label" :placeholder="item.placeholder" v-model="item.value"></mt-field>
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
        <!--<div class="pg-submit-sure" v-show="isShow=(is_dm.value == '是')">-->
            <!--<mt-button type="primary" class="btn-submit" @click="submitDmCheck">下一页</mt-button>-->
        <!--</div>-->
        <!--<div class="pg-submit-sure" v-show="isShow=(is_dm.value == '否')">-->
            <!--<mt-button type="primary" class="btn-submit" @click="submitDmRisk">提交</mt-button>-->
        <!--</div>-->

    </div>
</template>

<script type="application/javascript">
    import $ from "zeptojs"
    import { Toast } from 'mint-ui';
    export default{
        data(){
            var me= this;
            return {
                click_pos:0,
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

                ],
                isketoacidosis:{
                    title:"是否有酮症中毒",
                    options:['是', '否'],
                    align:"left",
                    value:""
                },
                ketoacidosis:[
                    {
                        label:"发生频率(次/天)",
                        placeholder:"比如：１",
                        name:"ketoacidosis_frequency",
                        value:""
                    },
                    {
                        label:"发生原因",
                        placeholder:"比如：胰岛素分泌不足",
                        name:"ketoacidosis_reason",
                        value:""
                    }
                ],
                ishypoglycemia:{
                    title:"是否低血糖",
                    options:['是', '否'],
                    align:"left",
                    value:""
                },
                hypoglycemia:[
                    {
                        label:"发生频率(次/天)",
                        placeholder:"比如：１",
                        name:"hypoglycemia_frequency",
                        value:"0"
                    },
                    {
                        label:"发生原因",
                        placeholder:"比如：１",
                        name:"hypoglycemia_reason",
                        value:""
                    }
                ],
                is_cerebrovascular:{
                    title:"是否脑血管病变",
                    options:['是', '否'],
                    align:"left",
                    value:""
                },
                is_cardiovascular:{
                    title:"是否心血管病变",
                    options:['是', '否'],
                    align:"left",
                    value:""
                },
                is_peripheral_vascular:{
                    title:"是否外周血管病变",
                    options:['是', '否'],
                    align:"left",
                    value:""
                },is_nephrosis:{
                    title:"是否肾病病变",
                    options:['是', '否'],
                    align:"left",
                    value:""
                },
                is_fundus_lesions:{
                    title:"是否眼底病变",
                    options:['是', '否'],
                    align:"left",
                    value:""
                },
                is_peripheral_neuropathy:{
                    title:"是否周围神经病变",
                    options:['是', '否'],
                    align:"left",
                    value:""
                },
                is_diabetic_foot:{
                    title:"糖尿病病足",
                    options:['是', '否'],
                    align:"left",
                    value:""
                },
                hasOtherHistory:{
                    title:"是否有其他疾病",
                    options:['是', '否'],
                    align:"left",
                    value:""
                },
                accute_form:[
                    {
                        label:"酮症中毒",
                        placeholder:"酮症中毒",
                        name:"hospital_diagnosis",
                        value:""
                    },
                    {
                        label:"确诊时间",
                        placeholder:"确诊时间",
                        name:"diagnosis_time",
                        value:""
                    },
                    {
                        label:"空腹血糖",
                        placeholder:"空腹血糖",
                        name:"fasting_blood_glucose",
                        value:""
                    },
                    {
                        label:"餐后血糖",
                        placeholder:"餐后血糖",
                        name:"postprandial_blood_glucose",
                        value:""
                    },
                    {
                        label:"任意时间血糖",
                        placeholder:"任意时间血糖",
                        name:"anytime_blood_glucose",
                        value:""
                    },

                ],
                items: [],
                hypoglycemia_severity_selected:"1",
                prex:{
                    text:"上一题",
                    func:"prexClick"
                },
                next:{
                    text:"下一题",
                    func:"nextClick"
                },
                others:[
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
                isEnd:false,
                isStart:true,
                popupVisible:false
            }
        },
        methods:{
            nextClick:function(){
                let me = this;
                me.click_pos=me.click_pos+1;
                if(me.click_pos >15+me.others.length){
                    me.submitDmCheck();
                }else if(me.click_pos == 15+me.others.length){
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
                if(me.click_pos >= 15+me.others.length){
                    me.isEnd = true
                    me.next.text ="提交"
                }else{
                    me.isEnd = false
                    me.next.text ="下一页"
                }
                if(me.click_pos <= 0){
                    me.isStart = true;
                }else{
                    me.isStart = false;
                }
            },
            submitDmCheck:function () {
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
                request["is_diabetes"] = (me.is_dm.value == "是")?1:0;
                request["is_ketoacidosis"] = (me.isketoacidosis.value == "是")?1:0;
                request["ketoacidosis_frequency"] = me.ketoacidosis[0].value;
                request["ketoacidosis_reason"] = me.ketoacidosis[1].value;
                request["is_hypoglycemia"] = me.radioExchange(me.ishypoglycemia);
                request["hypoglycemia_frequency"]=me.hypoglycemia[0].value;
                request["hypoglycemia_reason"]=me.hypoglycemia[1].value;
                request["is_cerebrovascular"]=me.radioExchange(me.is_cerebrovascular);
                request["is_cardiovascular"]=me.radioExchange(me.is_cardiovascular);
                request["is_peripheral_vascular"]=me.radioExchange(me.is_peripheral_vascular);
                request["is_nephrosis"]=me.radioExchange(me.is_nephrosis);
                request["is_fundus_lesions"]=me.radioExchange(me.is_fundus_lesions);
                request["is_peripheral_neuropathy"]=me.radioExchange(me.is_peripheral_neuropathy);
                request["is_diabetic_foot"]=me.radioExchange(me.is_diabetic_foot);
                request["hypoglycemia_severity"]=me.hypoglycemia_severity_selected;
                for(var i=0;i<me.others.length;i++){
                    request[me.others[i].name]=me.others[i].value
                }
                me.$router.push({path:"/dm/check_save",query:request});
            },
            submitDmRisk:function () {
                let me=this
                me.$router.push({path:"/dm/index"});
            },
            add() {
                this.items.push(
                    {
                        label:"病名",
                        placeholder:"疾病名",
                        name:"disease_",
                        value:"",
                        label2:"诊断日期",
                        placeholder2:"诊断日期",
                        name2:"create_time_",
                        value2:"",
                    }
                )
            },
            radioExchange(data){
                return data.value == "是"?1:0;
            },
        },
        computed:{
            hypoglycemia_severity_options:function () {
                return [
                    {text:"没事",value:"1"},
                    {text:"一般,不严重",value:"2"},
                    {text:"严重",value:"3"},
                    {text:"非常严重",value:"4"},
                ];
            }
        }
    }

</script>

<style type="less">
    .header{
        display: inline-block;
    }
</style>