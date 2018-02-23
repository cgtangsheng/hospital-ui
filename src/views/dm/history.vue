<template>
    <div class="main">
        <mt-header title="糖尿病病史录入">
            <router-link to="/dm/check" slot="left">
                <mt-button icon="back"></mt-button>
            </router-link>
        </mt-header>
        <mt-radio :title="isketoacidosis.title" :options="isketoacidosis.options" :align="isketoacidosis.align" v-model="isketoacidosis.value"></mt-radio>
        <div v-show="isShow=(isketoacidosis.value=='是')">
                <div v-for="(item,index) in ketoacidosis">
                    <mt-field  :label="item.label" :placeholder="item.placeholder" v-model="item.value"></mt-field>
                </div>
            </div>
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
        <mt-radio :title="is_cerebrovascular.title" :options="is_cerebrovascular.options" :align="is_cerebrovascular.align" v-model="is_cerebrovascular.value"></mt-radio>
        <mt-radio :title="is_cardiovascular.title" :options="is_cardiovascular.options" :align="is_cardiovascular.align" v-model="is_cardiovascular.value"></mt-radio>
        <mt-radio :title="is_peripheral_vascular.title" :options="is_peripheral_vascular.options" :align="is_peripheral_vascular.align" v-model="is_peripheral_vascular.value"></mt-radio>
        <mt-radio :title="is_nephrosis.title" :options="is_nephrosis.options" :align="is_nephrosis.align" v-model="is_nephrosis.value"></mt-radio>
        <mt-radio :title="is_fundus_lesions.title" :options="is_fundus_lesions.options" :align="is_fundus_lesions.align" v-model="is_fundus_lesions.value"></mt-radio>
        <mt-radio :title="is_peripheral_neuropathy.title" :options="is_peripheral_neuropathy.options" :align="is_peripheral_neuropathy.align" v-model="is_peripheral_neuropathy.value"></mt-radio>
        <mt-radio :title="is_diabetic_foot.title" :options="is_diabetic_foot.options" :align="is_diabetic_foot.align" v-model="is_diabetic_foot.value"></mt-radio>
        <mt-radio :title="hasOtherHistory.title" :options="hasOtherHistory.options" :align="hasOtherHistory.align" v-model="hasOtherHistory.value"></mt-radio>
        <div v-show="(hasOtherHistory.value == '是')">
            <div v-for="(item,index) in items">
                <mt-field  :label="item.label" :placeholder="item.placeholder" :name="item.name+index" v-model="item.value"></mt-field>
                <mt-field  :label="item.label2" :placeholder="item.placeholder2" :name="item.name2+index" v-model="item.value2"></mt-field>
            </div>
            <button type="button" class="btn" @click="add">添加</button>
        </div>
        <mt-button type="primary" class="btn-submit" @click="submitDmHistory">下一页</mt-button>
    </div>
</template>

<script type="application/javascript">
    import $ from "zeptojs"
    import { Toast } from 'mint-ui';
    export default{
        data(){
            var me= this;
            return {
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
                hypoglycemia_severity_selected:"1"
            }
        },
        methods:{
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
            submitDmHistory:function(){
                let me = this;
                var token = localStorage.getItem("token");
                var healthid = localStorage.getItem("health_id")
                if(!token || !healthid){
                    window.location.href = "/#/user/login"
                    return
                }
                var request = me.$route.query;
                request["token"]=token;
                request["health_id"]=healthid;
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
                me.$router.push({path:"/dm/other",query:request});
//                $.ajax({
//                    "url":"http://127.0.0.1:8002/dm/history-save",
//                    "datetype":"json",
//                    "data":request,
//                    "success":function ($data) {
//                        Toast({
//                            message: '提交成功',
//                            iconClass: 'icon icon-success'
//                        });
//                    },
//                    "error":function ($data) {
//                        Toast({
//                            message: '提交失败',
//                            iconClass: 'icon icon-success'
//                        });
//                    }
//                });
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