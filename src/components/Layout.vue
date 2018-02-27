<template>
  <div class="p-layout">
    <div
            class="p-layout-body"
            :class="{
        'sider-full': !isCollapse,
        'sider-mini': isCollapse
      }">
      <div class="p-layout-panel">
        <div class="p-layout-content">
          <div class="p-layout-container">
            <div class="p-layout-inner">
              <slot></slot>
            </div>
          </div>
        </div>
        <div class="p-layout-footer"> 版权所有 © 2016</div>
      </div>
    </div>
    <div class="p-layout-bottom">
      <div class="p-layout-bottom-home">
       <a v-bind:href="home.url"><span><img class="" :src="home.img"  max-width="100%" max-height="100%" ></span></a>
      </div>
      <div class="p-layout-bottom-my">
        <a v-bind:href="my.url"><span><img class="" :src="my.img" max-width="100%" max-height="100%"></span></a>
      </div>
    </div>
  </div>
</template>
<style lang="less">
  @import "../common/css/common.less";
</style>
<script>
    import auth from '../auth'
    import menus from '../nav-config'
    import common from '../common/js/common'

    export default {
        name: 'p-layout',

        data () {
            return {
                loggedIn: auth.loggedIn(),
                BadCaseTitle: 'BadCase追踪',
                BadCaseName: 'BadCase',
                menus,
                name: '',
                headImg: '',
                isCollapse: false,
                home:{
                    img:"http://ui.zldzbl.cn/images/home.png",
                    url:"/#/"
                },
                my:{
                    img:"http://ui.zldzbl.cn/images/my.png",
                    url:"/#/user/center"
                }
            }
        },
      /* created () {
       auth.onChange = (loggedIn) => {
       this.loggedIn = loggedIn
       }
       }, */
        mounted () {

        },
        methods: {

        }
    }
</script>

<style lang="less">
  @black: #2a323c;
  @light-black: #324057;
  @extra-light-black: #475669;
  @blue: #03a9f4;
  @gray: #d3dce6;
  @light-gray: #e5e9f2;
  @sider-width: 0px;
  @top-height: 0px;
  @sider-collapse-width: 0px;
  @transition: all 0.3s ease;
  @cont-padding: 0px;
  @top-bg-color: #3D4253;
  @sidebar-color: #3D4253;

  html, body, #app {
    margin: 0;
    height: 100%;
  }
  a {
    text-decoration:none;
  }
  .logo {
    height: @top-height;
    color: #fff;
  }
  .p-layout {
    &-panel,
    &-content {
      position: absolute;
      left: 0;
      top: 0;
      bottom: 0px;
      right: 0;
      overflow: hidden;
      background: #f8f8f8;
      transition: @transition;
      width: 100%;
    }
    &-body {
      width: 100%;
      bottom: 0;
      z-index: 100;
      min-height: 100%;
    }
    &-content {
      overflow-y: auto;
    }
    &-container {
      padding: 0px;
    }
    &-inner {
      padding: 0px;
      background: #f8f8f8;
      border-radius: 3px;
      margin-top: 10px;
    }
    &-footer {
      height: 64px;
      line-height: 64px;
      text-align: center;
      font-size: 12px;
      color: #999;
      background: #fff;
      border-top: 1px solid #e9e9e9;
      width: 100%;
      display: none;
    }

    .p-layout-avatar {
      margin-right: 15px;
      width: 36px;
      height: 36px;
      border-radius: 50%;
      vertical-align: middle;
    }
    &-bottom{
      position: fixed;
      height: 30px;
      bottom: 0px;
      width: 100%;
      background-color: white;
      border-top:0.01px solid #9e9e9e;
      /*overflow: hidden;*/
      &-home{
        vertical-align: middle;
        padding-left: 10%;
        padding-top: 5px;
        display: block;
        float: left;
        height:100%;
        img{
          width: 100%;
          height: 100%;
        }
      }
      &-my{
        vertical-align: middle;
        padding-left: 10%;
        padding-top: 5px;
        display: block;
        float: right;
        padding-right: 10%;
        height:100%;
        img{
          width: 100%;
          height: 100%;
        }
      }
    }

  }
</style>
