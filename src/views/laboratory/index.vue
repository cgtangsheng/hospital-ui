<template>
    <div>
        <div>
            <mt-header title="检查单">
                <router-link to="/" slot="left">
                    <mt-button icon="back"></mt-button>
                </router-link>
            </mt-header>
        </div>
        <div>
            <div class="add-button">
                <div class="add-laboratory">
                    <mt-button class="btn-submit" v-on:click="addLaboratory"><img :src="add_url"  slot="icon">添加化验单</mt-button>
                </div>
            </div>
        </div>
        <div class="list">

        </div>
    </div>
</template>
<script type="text/javascript">
    import $ from "zeptojs"
    import { Toast } from 'mint-ui';
    export default{
        data(){
            return {
                add_url:"http://zldzbl.cn/images/add.png",
            }
        },
        methods:{
            addLaboratory:function () {
                window.location.href = "/laboratory/upload"
                return
            }
        }
    }
</script>

<style>
    .add-laboratory{
        height: 100%;
        width: 100%;
        text-align: center;
    }
    .add-laboratory img{
        width:20px;
        display:block;
    }
</style>