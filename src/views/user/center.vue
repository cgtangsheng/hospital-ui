<template>
    <div class="user-center">
        <mt-header title="我的">
            <router-link to="/#/" slot="left">
                <mt-button icon="back"></mt-button>
            </router-link>
        </mt-header>
        <div class="user-center-header">

        </div>
        <div class="spliteline-large"></div>
        <div class="user-center-body">
            <div v-for="item in self_box">
                <mt-cell :title="item.title" :to="item.to" is-link>
                    <img slot="icon" :src="item.src" :width="item.width" :height="item.height">
                </mt-cell>
            </div>
        </div>
        <div class="spliteline-large"></div>
        <div class="user-center-monitor">
            <div v-for="item in monitor_box">
                <mt-cell :title="item.title" :to="item.to" is-link>
                    <img slot="icon" :src="item.src" :width="item.width" :height="item.height">
                </mt-cell>
            </div>
        </div>
        <div class="spliteline-large"></div>
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
                    click:"logout",
                },
            }
        },
        methods:{
            logout:function () {
                let me = this;
                var request ={};
                var token = localStorage.getItem("token");
                var healthid = localStorage.getItem("health_id");
                request["token"]=token;
                request["health_id"]=healthid;
                $.ajax({
                    datatype:"jsonp",
                    url:global.apiUrl+"/user/logout",
                    success: function (data) {
                        if (data["ret"] == "0") {
                            Toast({
                                message: '登录成功',
                                iconClass: 'icon icon-success'
                            });
                        }
                        localStorage.removeItem("token")
                        localStorage.removeItem("health_id")
                        window.location.href = "/";
                    }
                });
            }
        }
    }
</script>


<style type="less">
    .user-center-header{
        height: 25%;
        background-color: #17baa7;
        z-index: 99;
    }
    .user-center-body{

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