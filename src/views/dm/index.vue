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
				<div class="two-split">
					<div class="row-right-top">
						<div class="row-right-top-item">
							<div class="two-item">
								<a v-bind:href="dm_eat.url"><span><img class="item-img-self" :src="dm_eat.img" width="100%" height="100%" ></span>
									<div class="href-item"><span>{{dm_eat.title}}</span></div></a>
							</div>
						</div>
					</div>
				</div>
				<div class="two-split">
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
                    url:"/user/bmi",
					title:"BMI",
					img:global.imgUrl+"bmi.png",
				},
                dm_check:{
                    url:"/dm/check",
                    title:"糖尿病管理合格率评估",
					img:global.imgUrl+"diabetes_management.png",
				},
                dm_eat:{
                    url:"/dm/eat",
                    title:"生活方式",
					img:global.imgUrl+"life.png",
                },
                user_base:{
                    url:"/user/base",
                    title:"基本信息",
                    img:global.imgUrl+"info.png",
				}
			}
		}
	}
</script>

<style type="less">
	.row{
		height: 170px;
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
		margin-top:  5px;
		margin-left: 5px;
	}
	.row-left-item{
		width: 100%;
		height: 100%;
		text-align: center;
	}
	.row-right{
		width: 50%;
		float: left;
		display: block;
		height: 100%;
	}
	.two-split{
		width: 100%;
		height: 50%;
	}
	.row-right-top{
		margin-top: 5px;
		margin-left:5px;
		border-radius:5px;
		background-color: #50BFFF;
		display: block;

	}
	.row-right-bottom{
		margin-bottom: 5px;
		margin-left:5px;
		border-radius:5px;
		background-color: #13ce66;
		display: block;

	}
	.row-right-top-item{
		font-weight:bolder;
		color: white;
		text-align: center;
		vertical-align: middle;
	}
	.row-right-bottom-item{
		background-color: #13ce66;
		font-weight:bolder;
		color: white;
		text-align: center;
		vertical-align: middle;
		border-radius:5px;
		height: 100%;
		padding-top: 5px;
	}
	.item-center{
		background-color: #dea726 ;
		height: 120px;
		border-radius:5px;
		overflow: hidden;
		text-align: center;
		margin-left: 5px;
		margin-right: 5px;
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
	.one-item{
		padding-top: 15px;
	}
	
</style>