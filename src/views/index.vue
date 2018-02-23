<template>
    <div>
     <!--<mt-header title="锦医卫－医心为你"></mt-header>-->
        <div class="pg-center">
            <div class="avatar"></div>
        </div>
           <div class="pg-body">
        
    </div>
    <div class="line-1">
        <div class="item" id="item_data_d1">
            <a v-bind:href="item_data_1_url"><span><img class="item-img" :src="item_data_1" id="item_data_1"></span>
            <div class="t"><span>{{item_title_1}}</span></div></a>
        </div>
       <div class="item" id="item_data_d2">
            <a v-bind:href="item_data_2_url"><span><img class="item-img" :src="item_data_2" id="item_data_2"></span>
            <div class="t"><span>{{item_title_2}}</span></div></a>
        </div>
        <div class="item">
            
        </div>
    </div>
    <div class="line-2"></div>
    </div>

</template>
<script>
    export default {
        name: 'index',
        data(){
            var me = this;
            return {
                title:"",
                item_data_1:"/static/images/client/check.png",
                item_title_1:"糖尿病自检",
                item_data_1_url:"/#/dm/index",
                item_data_2:"/static/images/client/check.png",
                item_title_2:"高血压自检",
                item_data_2_url:"/#/dm/index"
            }
        }
    }
</script>

<style type="less">
    .pg-title{
        font-size: 30px;
    }
    
    .pg-center{
        height: 30vh;
        background-color: #00a0e9;

     /*   position:absolute;
        top:10px;
        right: 10px;*/
    }
    .mint-header{
        line-height: 5!important;
        font-size: larger;
    }
    .line-1 {
        overflow: hidden;
        width: 100%;
    }
    .item {
        float: left;
        width: 33.333333%;
        display: block;
        border: 1px solid #efefef;
        text-align: center;
        height: 25%;
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
</style>