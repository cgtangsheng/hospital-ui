<template>
    <div>
        <mt-header title="糖尿病风险评估">
            <router-link to="/" slot="left">
                <mt-button icon="back"></mt-button>
            </router-link>
        </mt-header>
        <!--<mt-cell title="用户基本信息" to="/user/base" is-link value=""> </mt-cell>-->
        <mt-cell title="BMI评估" to="/user/bmi" is-link value=""> </mt-cell>
        <mt-cell title="生活方式测评" to="/dm/eat" is-link value=""> </mt-cell>
        <!--<mt-cell title="其他测评" to="/dm/other" is-link value=""> </mt-cell>-->
        <!--<mt-cell title="目标管理" to="/dm/other" is-link value=""> </mt-cell>-->
    </div>

</template>

<script type="text/javascript">
    import $ from "zeptojs"
    import { Toast } from 'mint-ui';
</script>

<style type="less">

</style>