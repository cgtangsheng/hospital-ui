<template>
    <div>
     <!--<mt-header title="锦医卫－医心为你"></mt-header>-->
        <mt-header title="锦医卫－医心为你">
            <router-link to="/" slot="left">
                <!--<mt-button icon="back">back</mt-button>-->
            </router-link>
            <mt-button icon="more" slot="right"></mt-button>
        </mt-header>

        <div class="pg-center">
            <mt-swipe :auto="4000">
                <mt-swipe-item v-for="item in bannerlist">
                    <img :src="item.src" weight="100%" width="100%">
                </mt-swipe-item>
            </mt-swipe>
        </div>

        <div class="pg-list">
            <div class="line-1">
                <div class="item" v-for="item in index_list">
                    <a v-bind:href="item.url"><span><img class="item-img" :src="item.img" ></span>
                        <div class="t"><span>{{item.title}}</span></div></a>
                </div>
            </div>
        </div>
        <div class="spliteline-large">
        </div>
        <div class="content-box">
            <div class = "line-2">
                <a v-bind:href="more_url">
                    <div class="more"><span>{{more_title}}</span></div></a>
            </div>
            <div class="pg-article">
                <li class="article-item" v-for="item in articles" v-on:click="articleDetail(item)">
                    <div class="img-left">
                        <div class="img"> <img :src="item.img" width="100%" height="100%"></div>
                    </div>
                    <div class="content-right">
                        <div class="img-title">
                            <div class="title">{{item.title}}</div>
                        </div>
                        <div class="img-abstract">
                            <div class="abstract">{{item.abstract}}</div>
                        </div>
                    </div>
                </li>
            </div>
        </div>
        <div class="spliteline-large">
        </div>
    </div>

</template>
<script>
    import $ from "zeptojs"
    import { Toast } from 'mint-ui';
    export default {
        name: 'index',
        data(){
            var me = this;
            return {
                bannerlist:[
                    {
                        src:"http://zldzbl.cn/images/veer-140663813.jpg"
                    }, {
                        src:"http://zldzbl.cn/images/veer-141866457.jpg"
                    },
                ],
                index_list:[
                    {
                        img:"http://zldzbl.cn/images/dietabets.png",
                        title:"疾病风险评估",
                        url:"/dm/tablist"
                    },{
                        img:"http://zldzbl.cn/images/upload.png",
                        title:"化验单上传",
                        url:"/laboratory/index"
                    },{
                        img:"http://zldzbl.cn/images/knowlege.png",
                        title:"我的病历",
                        url:"/dm/index"
                    },
                ],
                articles:[
                    {
                        img:"http://zldzbl.cn/images/veer-140663813.jpg",
                        title:"糖尿病如何选择降糖药",
                        abstract:"据《新英格兰杂志》刊登的\"中国人群中的糖...",
                        read:100,
                        url:"",
                        id:"",
                    },
                    {
                        img:"http://zldzbl.cn/images/veer-141866457.jpg",
                        title:"糖尿病如何选健康饮食",
                        abstract:"据《新英格兰杂志》刊登的\"中国人群中的...",
                        read:100,
                        url:"",
                        id:"",
                    },{
                        img:"http://zldzbl.cn/images/veer-141866457.jpg",
                        title:"糖尿病如何选健康饮食",
                        abstract:"据《新英格兰杂志》刊登的\"中国人群中的...",
                        read:100,
                        url:"",
                        id:"",
                    }
                ],
                more_title:"查看更多->",
                more_url: "/article/list",
            }
        },
        methods:{
            getArtilceList:function () {
                let me=this;
                var token = localStorage.getItem("token");
                var healthid = localStorage.getItem("health_id")
//                if(!token || !healthid){
//                    window.location.href = "/user/login"
//                    return
//                }
                var request = new Map();
                $.each(this.$route.query, function(key, val) {
                    request[key]=val;
                });
                $.ajax({
                    "url":global.apiUrl+"/article/get-article-list",
                    "datetype":"jsonp",
                    "data":request,
                    "success":function (data) {
                        me.articles = data["info"];
//                        me.advice_text = data["advice_text"];
                    },
                    "error":function (data) {
                        Toast({
                            message: '提交失败',
                            iconClass: 'icon icon-success'
                        });
                    }
                });
            },
            articleDetail:function (item) {
                var id = item.id
                window.location.href = "/article/index?id="+id
                return
            },

            checkLogin:function(){
                var request = this.$route.query;
                var token = localStorage.getItem("token");
                if(token == "undefined" || !token){
                    $.ajax({
                        url:global.apiUrl+"/wechat/auth",
                        datatype:'jsonp',  // 处理Ajax跨域问题
                        data:request,
                        success:function (res) {
                            var token = res["token"];
                            var health_id = res["health_id"]
                            localStorage.setItem("token",token)
                            localStorage.setItem("health_id",health_id)
                        },
                        error:function (res) {
                            console.log(res)
                            Toast({
                                message: '提交失败',
                                iconClass: 'icon icon-success'
                            });
                        }
                    });
                }
            }
        },
        mounted:function () {
            let me=this;
            me.checkLogin();
            me.getArtilceList();
        }
    }
</script>

<style type="less">
    .pg-title{
        font-size: 30px;
    }
    a{
        text-decoration : none
    }
    
    .pg-center{
        height: 30vh;
    }
    .mint-header{
        line-height: 5!important;
        font-size: larger;
        background-color: #00cc99;
    }
    .line-1 {
        overflow: hidden;
        width: 100%;
    }
    .item {
        float: left;
        width: 33.333333%;
        display: block;
        text-align: center;
        height: 33.3333333%;
    }
    .item-img{
        width: 50%;
        text-align: center;
        padding-top: 10px;
    }
    .t{
        color: #333;
        font-size:xx-small;

    }
    .spliteline-large{
        margin-top: 20px;
        margin-left: 0px;
        margin-right: 0px;
        border-top: 5px solid #ddd;
        text-align: left;
        width: 100%;
        vertical-align: middle;
    }
    .article-item{
        overflow: hidden;
        width: 100%;
        padding-top: 10px;
    }

    .img-left{
        display: block;
        width: 20%;
        height: 20%;
        float: left;
    }
    .content-right{
        padding-left: 10px;
        display: block;
        float: left;
        width: 70%;
    }
    .abstract{
        color: #7f7f7f;
        font-size: x-small;
    }
    .title{
        font-family: Helvetica;
        font-size: small;
    }
    .pg-article{
        padding-top: 20px;
    }
    .more{
        color: #333;
        font-size:xx-small;
        float:right;
        padding-right: 10px;
        padding-top: 2px;
    }
</style>