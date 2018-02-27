<template>
    <div>
        <div class="box-form">
            <mt-header title="锦医卫－医心为你">
                <router-link to="/dm/index" slot="left">
                    <mt-button icon="back"></mt-button>
                </router-link>
            </mt-header>
            <div v-for="(item,index) in form">
                <mt-field :label="item.label" :type="item.type" :placeholder="item.placeholder" v-model="item.value"></mt-field>
            </div>
        </div>
        <div class="pg-submit-sure">
            <mt-button type="primary"  class="btn-submit" v-on:click="submitUserLogin">提交</mt-button>
        </div>
        <div class="pg-submit-sure">
            <mt-button type="primary"  class="btn-submit" v-on:click="submitUserRegister">注册新帐号</mt-button>
        </div>
        <!--<div v-if="form[1].value != form[1].value">-->
        <!--<p style="color:red;">两次输入密码不一致</p>-->
        <!--</div>-->
    </div>

</template>

<script type="application/javascript">
    import $ from "zeptojs"
    import { Toast } from 'mint-ui';

    export default {
        data(){
            return {
                form:[
                    {
                        label:"手机号",
                        placeholder:"请输入手机号",
                        name:"username",
                        value:""
                    },
                    {
                        label:"密码",
                        placeholder:"请输入密码",
                        name:"password",
                        type:"password",
                        value:""
                    }
                ]
            }
        },
        methods:{
            submitUserRegister:function () {
                window.location.href = "/#/user/register"
                return
            },
            submitUserLogin:function(){
                let me= this
                var request ={};
                for(var i=0;i<me.form.length;i++){
                    request[me.form[i].name]=me.form[i].value;
                }
                $.ajax({
                    url:global.apiUrl+"/user/login",
                    datetype:"jsonp",
                    data:request,
                    success:function (data) {
                        if(data["ret"] == "0"){
                            Toast({
                                message: '登录成功',
                                iconClass: 'icon icon-success'
                            });
                        }
                        console.log(data)
                        localStorage.setItem("token",data["token"])
                        localStorage.setItem("health_id",data["health_id"])
                        window.location.href = "/"
                    },
                })
            }
        }
    }

</script>