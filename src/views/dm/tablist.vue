<template>
    <div>
        <mt-navbar v-model="selected">
            <mt-tab-item :id="item.id" v-for="item in tablist">{{item.title}}</mt-tab-item>
        </mt-navbar>

        <!-- tab-container -->
        <mt-tab-container v-model="selected">
            <mt-tab-container-item id="1">
                <mt-cell v-for="item in dm_list" :title="item.title" is-link :to="item.to" />
            </mt-tab-container-item>
            <mt-tab-container-item id="2">
                <mt-cell v-for="n in 4" :title="'content ' + n" />
            </mt-tab-container-item>
            <mt-tab-container-item id="3">
                <mt-cell v-for="n in 6" :title="'content ' + n" />
            </mt-tab-container-item>
        </mt-tab-container>

    </div>
</template>

<script>
    export default{
        data(){
            return {
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
                dm_list:[
                    {
                        title:"糖尿病管理合格率测评系统",
                        to:"/dm/check",
                    },
                    {
                        title:"糖尿病风险评估系统",
                        to:"/dm/risk",
                    },
                    {
                        title:"糖尿病并发症测评系统",
                        to:"/dm/check",
                    },
                ],
            }
        }
    }
</script>

<style>
    .mint-tab-item-label{
        font-size: larger;
    }
</style>