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
            <mt-button type="primary"  class="btn-submit" v-on:click="submitUserRegister">提交</mt-button>
        </div>
	</div>

</template>

<script type="text/javascript">
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
                  },
				  {
                      label:"确认密码",
                      placeholder:"请再次输入密码",
                      name:"re_password",
                      type:"password",
                      value:""
                  }
			  ],
		  }
		},
        methods: {
            submitUserRegister:function () {
                let me = this
                var request ={};
                for(var i=0;i<me.form.length;i++){
                    request[me.form[i].name]=me.form[i].value;
                }
                $.ajax({
                    url:global.apiUrl+"/user/register",
                    datetype:"json",
                    data:request,
                    success:function (data) {
                        if(data["status"] == "1"){
                            Toast({
                                message: '注册成功',
                                iconClass: 'icon icon-success'
                            });
						}
                    	window.location.href = "/#/user/login"
                    },
                })
            }
        }
    };
</script>

<style type="less">
	.btn-submit{
		width: 100%;
		margin-bottom: 10px;
	}
	.box-form{
		margin-bottom: 30px;
	}
</style>