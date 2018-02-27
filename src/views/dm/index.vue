<template>
	<div>
		<div>
			<mt-header title="锦医卫－医心为你">
				<router-link to="/" slot="left">
					<mt-button icon="back"></mt-button>
				</router-link>
			</mt-header>
		</div>
		<div class="row">
			<div class="row-left">
				<div class="row-left-item">
					<a v-bind:href="user_base.url"><span><img class="item-img" :src="user_base.img" ></span>
						<div class="href-item"><span>{{user_base.title}}</span></div></a>
				</div>
			</div>
			<div class="row-right">
				<div class="row-right-top">
					<div class="row-right-top-item">
						<div>
							<a v-bind:href="dm_eat.url"><span><img class="item-img-self" :src="dm_eat.img" width="100%" height="100%" ></span>
								<div class="href-item"><span>{{dm_eat.title}}</span></div></a>
						</div>
					</div>

				</div>
				<div class="row-right-bottom">
					<div class="row-right-bottom-item">
						<div class="two-item">
							<a v-bind:href="dm_bmi.url"><span><img class="item-img-self" :src="dm_bmi.img" width="100%" height="100%" ></span>
								<div class="href-item"><span>{{dm_bmi.title}}</span></div></a>
						</div>
					</div>
				</div>
			</div>

		</div>
		<div class="item-center">
			<div class="one-item">
				<a v-bind:href="dm_check.url"><span><img class="item-img-self" :src="dm_check.img" width="100%" height="100%" ></span>
					<div class="href-item"><span>{{dm_check.title}}</span></div></a>
			</div>
		</div>
	</div>
	
</template>

<script type="text/javascript">
    import $ from "zeptojs"
    import { Toast } from 'mint-ui';

    export default{
        name:"index",
        data(){
            return {
                index_list:[
					{
					    title:"用户基本信息",
						to:"/dm/check",
					},
					{
                        title:"糖尿病管理合格率测评系统",
						to:"/dm/check",
                    },
					{
                        title:"糖尿病风险评估系统",
						to:"/dm/risk",
                    },
				],
                dm_bmi:{
                    url:"/#/user/bmi",
					title:"BMI",
					img:"http://zldzbl.cn/images/bmi.png",
				},
                dm_check:{
                    url:"/#/dm/check",
                    title:"糖尿病管理合格率评估",
					img:"http://zldzbl.cn/images/diabetes_management.png",
				},
                dm_eat:{
                    url:"/#/dm/eat",
                    title:"生活方式",
					img:"http://zldzbl.cn/images/life.png",
                },
                user_base:{
                    url:"/#/user/base",
                    title:"基本信息",
                    img:"http://zldzbl.cn/images/info.png",
				}
			}
		}
	}
</script>

<style type="less">
	.row{
		height: 150px;
		overflow: hidden;
		width: 100%;
	}
	.row-left{
		width: 45%;
		height:90%;
		display: block;
		float: left;
		background-color: magenta;
		border-radius:5px;
		margin:  5px 5px 5px;
	}
	.row-left-item{
		width: 100%;
		height: 100%;
		text-align: center;
	}
	.row-right{
		width: 45%;
		float: left;
		display: block;
		height: 90%;
	}
	.row-right-top{
		padding-left: 20px;
		width: 100%;
		height: 47%;
		margin-top: 5px;
		border-radius:5px;
		background-color: #50BFFF;

	}
	.row-right-bottom{
		padding-left: 20px;
		width: 100%;
		height: 47%;
		margin-top: 5px;
		border-radius:5px;
		background-color: #13ce66;
	}
	.row-right-top-item{
		font-weight:bolder;
		color: white;
		text-align: center;
		vertical-align: middle;
		background-color: #50BFFF;
		width: 100%;
		height: 100%;
	}
	.row-right-bottom-item{
		background-color: #13ce66;
		font-weight:bolder;
		color: white;
		text-align: center;
		vertical-align: middle;
		height: 100%;
	}
	.item-center{
		background-color: #dea726 ;
		height: 120px;
		border-radius:5px;
		overflow: hidden;
		width: 100%;
		margin: 5px 5px 5px;
		text-align: center;
	}
	.left{
		display: block;
		width: 20%;
		float: left;
		vertical-align: middle;
		text-align: center;
	}
	.href-item{
		font-weight:bolder;
		color: white;
	}
	.item-img-self{
		width: 20%;
	}
	.two-item{
		padding-top: 5px;
	}
	
</style>