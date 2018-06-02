<template>
    <div>
        <div>
            <mt-header title="生活方式检测结果">
                <router-link to="/dm/index" slot="left">
                    <mt-button icon="back"></mt-button>
                </router-link>
            </mt-header>
            <table class="gridtable">
                <thead>
                <tr>
                    <th v-for="item in thead">{{item.name}}</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="item in info">
                    <td>{{item.label}}</td>
                    <td>{{item.value}}</td>
                    <td>{{item.standard}}</td>
                    <td>{{item.desc}}</td>
                </tr>
                </tbody>
            </table>
        </div>
        <div class="spliteline">
            <span>{{advice}}</span>
        </div>
        <div class="advice-result">
            <p class="title-1">筛查建议:</p>
            <p class="text">{{advice_text}}</p>
        </div>
        <div class="advice-result" v-if="advice_goals!=false">
            <p class="title-1">控制目标:</p>
            <p class="text">{{advice_goals}}</p>
        </div>
    </div>
</template>

<script type="application/javascript">
    import $ from "zeptojs"
    import { Toast } from 'mint-ui';
    export default {
        data(){
            let me = this;
            return {
                info:[],
                thead:[
                    {
                        name:"指标",
                    },{
                        name:"当前值",
                    },{
                        name:"参考值",
                    },{
                        name:"医生建议"
                    }
                ],
                advice:"健康点评",
                advice_text:false,
                advice_goals:false,
            };
        },
        methods:{
            getData:function () {
                let me=this;
                var token = localStorage.getItem("token");
                var healthid = localStorage.getItem("health_id")
                if(!token || !healthid){
                    window.location.href = "/user/login"
                    return
                }
                var request = new Map();
                $.each(this.$route.query, function(key, val) {
                    request[key]=val;
                });
                $.ajax({
                    "url":global.apiUrl+"/user/eat-save",
                    "datetype":"jsonp",
                    "data":request,
                    "success":function (data) {
                        me.info = data["info"];
                        me.advice_text = data["advice_text"];
                    },
                    "error":function (data) {
                        Toast({
                            message: '提交失败',
                            iconClass: 'icon icon-success'
                        });
                    }
                });
            }
        },
        created:function () {
            let me=this;
            me.getData();
        }
    }
</script>

<style type="less">
    table.gridtable {
        font-family: verdana,arial,sans-serif;
        font-size:11px;
        color:#333333;
        border-width: 1px;
        border-color: #666666;
        border-collapse: collapse;
    }
    table.gridtable th {
        border-width: 1px;
        padding: 8px;
        border-style: solid;
        border-color: #666666;
        background-color: #dedede;
    }
    table.gridtable td {
        border-width: 1px;
        padding: 8px;
        border-style: solid;
        border-color: #666666;
        background-color: #ffffff;
    }
    .spliteline{
        margin-top: 20px;
        height: 1px;
        border-top: 1px solid #ddd;
        text-align: center;
        vertical-align: middle;
    }
    .spliteline span{
        position: relative;
        top: -8px;
        background: #fff;
        padding: 0 20px;
    }
    .title-1{
        font-weight:bolder;
        --font-color-base:  	#444444;
    }
    .advice-result{
        margin-top: 20px;
    }
</style>