<template>
    <div>
        <div class="tab-list">
            <mt-navbar v-model="selected">
                <mt-tab-item :id="item.id" v-for="item in tablist">{{item.title}}</mt-tab-item>
            </mt-navbar>
        </div>
        <div class="content-box">
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
    </div>

</template>

<script>
    import $ from "zeptojs"
    import { Toast } from 'mint-ui';
    export default{
        data(){
            return {
                content: "",
                title: "",
                source: "",
                create_time: "",
                tablist:[
                    {
                        id: "1",
                        title:"糖尿病",
                    },{
                        id: "2",
                        title:"高血压",
                    },
                    {
                        id: "3",
                        title:"冠心病",
                    },
                ],
                selected:"1",
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
                    },
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
                    }, {
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
                    }, {
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

            }
        },
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