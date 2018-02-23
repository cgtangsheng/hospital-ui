<template>
    <div class="main">
        <div class="box-form">
            <mt-header title="生活方式测评">
                <router-link to="/dm/index" slot="left">
                    <mt-button icon="back"></mt-button>
                </router-link>
            </mt-header>
            <a class="mint-cell mint-field">
                <div class="mint-cell-wrapper">
                    <div class="mint-cell-title">
                        <span class="mint-cell-text">劳动类型</span>
                    </div>
                    <div class="mint-cell-value">
                        <div class="mint-field-core">
                            <select class="selectpicker" v-model="work_type_selected">
                                <option v-for="option in work_type_options" v-bind:value="option.value">
                                    {{option.text}}
                                </option>
                            </select>
                        </div>
                    </div>
                </div>
            </a>
            <div v-for="(item,index) in form">
                <mt-field  :label="item.label" :placeholder="item.placeholder" v-model="item.value"></mt-field>
            </div>
            <mt-radio :title="is_smoke.title" :options="is_smoke.options" :align="is_smoke.align" v-model="is_smoke.value"></mt-radio>
            <div v-if="is_smoke.value=='是'">
                <mt-field  :label="smoke_info.label" :placeholder="smoke_info.placeholder" v-model="smoke_info.value"></mt-field>
            </div>
            <mt-radio :title="is_drink.title" :options="is_drink.options" :align="is_drink.align" v-model="is_drink.value"></mt-radio>
            <div v-if="is_drink.value=='是'">
                <mt-field  :label="drink_info.label" :placeholder="drink_info.placeholder" v-model="drink_info.value"></mt-field>
            </div>
        </div>
        <div class="pg-submit-sure">
            <mt-button type="primary" class="btn-submit" @click="submitDmEat">提交</mt-button>
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
                work_type_selected:"1",

            }
        },
        methods:{
            submitDmEat:function(){
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
                request["is_smoke"]=me.is_smoke.value == "是"?true:false;
                request["is_drink"]=me.is_drink.value == "是"?true:false;
                request["smoke_num"]=me.smoke_info.value;
                request["drink_num"]=me.drink_info.value;
                request["work_type"]=1;
                request["blood_pressure_addr"]=1;
                me.$router.push({path:"/dm/eat_save",query:request});
            },
            formatForm:function () {
                form.forEach((item) => {

                })
            }
        },
        computed:{
            work_type_options:function(){
                return [
                    {text:"重体力劳动",value:"1"},
                    {text:"中体力劳动",value:"2"},
                    {text:"轻体力劳动",value:"3"},
                ];
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
    .mint-cell-value{
        float: left;
    }

</style>