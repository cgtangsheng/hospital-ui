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
</style>