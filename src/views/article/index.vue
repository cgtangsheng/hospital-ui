<template>
    <div>
        <p id="title">{{title}}</p>
        <div class="source-info">
            <p id="source">来源：{{source}}</p>
            <p id="create_time">{{create_time}}</p>
        </div>
        <div v-html="content" id="content">
            {{content}}
        </div>
        <div class="spliteline-large"></div>
        <div class="like">
            <div class="like-button">
                <div class="like-button-left">
                    <div class="like-icon">
                        <mt-button class="btn-submit" v-on:click="likeClick"><img :src="like_url"  slot="icon">喜欢</mt-button>
                    </div>
                </div>
                <div class="like-button-right">
                    <div class="like-icon">
                        <mt-button  class="btn-submit" v-on:click="unlikeClick"><img :src="hate_url"　slot="icon">不喜欢</mt-button>
                    </div>
                </div>
            </div>
        </div>
        <div class="spliteline-large"></div>
    </div>
</template>

<script>
    import $ from "zeptojs"
    import { Toast } from 'mint-ui';
    export default{
        data(){
            return {
                content:"",
                title:"",
                source:"",
                create_time:"",
                like_url:"http://zldzbl.cn/images/like.png",
                hate_url:"http://zldzbl.cn/images/hate.png",
            }
        },
        monted:function(){

        },
        created:function(){
            let me=this;
            var request = {}
            $.each(this.$route.query, function(key, val) {
                request[key]=val;
            });
            $.ajax({
                "url":global.apiUrl+"/article/index",
                "data":request,
                "datatype":"jsonp",
                "success":function(data) {
                    me.content=data["content"];
                    me.title = data["title"];
                    me.create_time = data["update_time"];
                    me.source = data["source"];
                },
                "error": function(data) {
                    Toast({
                        message: '提交失败',
                        iconClass: 'icon icon-success'
                    });
                }
            })
        },
        methods:{
            likeClick:function () {
                let me = this
                var type = "like"
                this.likeSubmit(type)
            },
            unlikeClick:function () {
                let me = this
                var type = "unlike"
                this.likeSubmit(type)
            },
            likeSubmit:function (type) {
                $.ajax({
                    "url":global.apiUrl+"/article/like",
                    "data":{type:type},
                    "datatype":"jsonp",
                    "success":function(data) {
                        //TODO api接入

                    },
                    "error": function(data) {
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

<style>
    img {
        width: 100%;
        height: 100%;
    }
    #content{
        margin-left: 5px;
        margin-right: 5px;
        text-indent:0em;
    }
    #title{
        font-size:x-large;
        font-weight: bolder;
        margin-left: 5px;
        margin-right: 5px;
        text-align:center;
    }
    .source-info{
        overflow: hidden;
        width: 100%;
    }
    #source{
        display: block;
        float: left;
        padding-left: 10px;
        color:grey;
    }
    #create_time{
        display: block;
        float: right;
        padding-right: 10px;
        color:grey;
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
    .like-button{
        height: 100px;
        padding-top: 10px;
        padding-bottom: 10px;
        display: block;
    }
    .like-button-left{
        height: 80px;
        width:50%;
        text-align:center ;
        float: left;
    }
    .like-button-right {
        height: 80px;
        width: 50%;
        text-align: center;
        float: left;
    }
    .like-icon{
        height: 100%;
        width: 100%;
        overflow: hidden;
        text-align: center;
        margin-left: auto;
        margin-right: auto;
    }
    .like-icon img{
        width:20px;
        display:block;
    }
</style>