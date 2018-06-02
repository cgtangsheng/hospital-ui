<template>
    <div class="user-center">
        <mt-header title="我的">
            <router-link to="/" slot="left">
                <mt-button icon="back"></mt-button>
            </router-link>
        </mt-header>
        <div class="user-center-header">
            <div class="header-left">
                <div class="user-center-header-avatar">
                    <div class="avatar">
                        <img :src="avatar.src" :width="avatar.width" :height="avatar.heigth">
                    </div>
                </div>
            </div>
            <div class="header-right">
                <div class="name">{{user.name}}</div>
                <div class="health-id">{{user.health_id}}</div>
            </div>
        </div>
        <div class="spliteline-single"></div>
        <div class="user-center-body">
            <div v-for="item in self_box">
                <mt-cell :title="item.title" :to="item.to" is-link>
                    <img slot="icon" :src="item.src" :width="item.width" :height="item.height">
                </mt-cell>
            </div>
        </div>
        <div class="spliteline-single"></div>
        <div class="user-center-monitor">
            <div v-for="item in monitor_box">
                <mt-cell :title="item.title" :to="item.to" is-link>
                    <img slot="icon" :src="item.src" :width="item.width" :height="item.height">
                </mt-cell>
            </div>
        </div>
        <div class="spliteline-single"></div>
        <div class="user-center-logout">
            <div v-on:click="logout">
                <mt-cell :title="logoutItem.title" is-link>
                    <img slot="icon" :src="logoutItem.src" :width="logoutItem.width" :height="logout.height">
                </mt-cell>
            </div>
        </div>
    </div>
</template>

<script type="application/javascript">
    import $ from "zeptojs"
    import { Toast } from 'mint-ui';
    export default {
        data(){
            return {
                self_box:[
                    {
                        src:global.imgUrl+"self_info.png",
                        width:24,
                        height:24,
                        title:"我的资料",
                        to:"/user/info",
                    }

                ],
                monitor_box:[
                    {
                        src:global.imgUrl+"self_info.png",
                        width:24,
                        height:24,
                        title:"日常用药设置提醒",
                        to:"/user/info",
                    }, {
                        src:global.imgUrl+"self_info.png",
                        width:24,
                        height:24,
                        title:"日常血糖检测记录",
                        to:"/user/info",
                    }

                ],
                setting_box:[
                    {
                        src:global.imgUrl+"self_info.png",
                        width:24,
                        height:24,
                        title:"退出登录",
                        click:"logout",
                    },
                ],
                logoutItem:{
                    src:global.imgUrl+"self_info.png",
                    width:24,
                    height:24,
                    title:"退出登录",
                    click:"logout()",
                },
                avatar:{
                    src:global.imgUrl+"avatar.jpeg",
                    width:"100%",
                    heigth:"100%",
                },
                user:{
                    name:"汤升",
                    health_id:"1000000037"
                },
            }
        },
        methods:{
            logout:function () {
                let me = this;
                var request ={};
                var token = localStorage.getItem("token");
                var healthid = localStorage.getItem("health_id");
                if(!token || !healthid){
                    me.login();
                    return;
                }
                request["token"]=token;
                request["health_id"]=healthid;
                $.ajax({
                    "url":global.apiUrl+"/user/logout",
                    "datetype":"jsonp",
                    "data":request,
                    "success":function (data) {
                        localStorage.removeItem("token")
                        localStorage.removeItem("health_id")
                        window.location.href = "/";
                    },
                    "error":function (data) {
                        Toast({
                            message: '提交失败',
                            iconClass: 'icon icon-success'
                        });
                    }
                });
            },
            login:function () {
                window.location.href = "/user/login";
            },
        },
        created:function () {
            let me = this;
            var token = localStorage.getItem("token");
            if(!token){
                me.logoutItem.title = "登录";
            }
            console.log(me.logoutItem.click)
        }
    }
</script>


<style type="text/css">
    .user-center-header{
        height: 100px;
        width: 100%;
        background-color: #ddd;
    }
    .user-center-header-avatar{
        height: 100%;
        width: 100%;
        /*display: block;*/
        /*float: left;*/
    }
    .spliteline-single{
        margin-left: 0px;
        margin-right: 0px;
        text-align: left;
        width: 100%;
        vertical-align: middle;
        border-top: 3px solid #ddd;
    }
    .header-left{
        padding-left: 10%;
        height: 30%;
        width: 30%;
        float: left;
        display: block;
    }
    .header-right{
        height: 70%;
        width: 70%;
        float: left;
        display: block;
    }
    .avatar{
        width:80px;
        height:80px;
        border-radius:50%;
        overflow: hidden;
        vertical-align: middle;
    }
    .name{
        padding-top: 15px;
        padding-left: 15px;
    }
    .health-id{
        padding-left: 15px;
    }
</style>