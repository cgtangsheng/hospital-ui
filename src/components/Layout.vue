<template>
  <div class="p-layout">
    <div class="p-layout-topbar clearfix">
      <div class="p-layout-name" :class="{'sider-mini': isCollapse}">
        <router-link class="full" to="/" v-if="!isCollapse"><div class="logo"><img src="http://mat1.gtimg.com/www/images/kuaibao/logo_kuaibao.png"/><span class="p-name">快报数据平台</span></div></router-link>
        <div class="mini" v-else><div class="logo"><img src="../assets/kuaibao.png"/></div></div>
      </div>
      <div class="p-layout-collapse" @click="toggleSider"><i class="fa fa-bars"></i></div>
      <div class="is-user">
        <img :src="headImg" v-if="headImg" class="p-layout-avatar" alt="">
        <span class="username">{{name}}</span><a v-if="name" href="http://bi.kuaibao.oa.com/_logout/?url=http://bi.kuaibao.oa.com">注销</a>
      </div>
    </div>
    <div
      class="p-layout-body"
      :class="{
        'sider-full': !isCollapse,
        'sider-mini': isCollapse
      }">
      <aside class="p-layout-sider">
        <el-menu
          theme="dark"
          @select="menuSelect"
          :unique-opened="false"
          :default-active="currentRoute"
          :router="true">
          <el-submenu
            :index="menu.name"
            v-for="(menu, index) in menus">
            <template slot="title">
              <i v-if="menu.icon" class="fa" :class="'fa-' + menu.icon"></i>
              <span class="nav-next">{{menu.text}}</span>
            </template>
            <el-menu-item
              :index="subMenu.path"
              v-for="(subMenu, subIndex) in menu.children">
                <i v-if="subMenu.icon" class="fa" :class="'fa-' + subMenu.icon"></i>
                <span class="nav-next">{{subMenu.text}}</span>
              </el-menu-item>
          </el-submenu>
        </el-menu>
      </aside>
      <div class="p-layout-panel">
        <div class="p-layout-content">
          <div class="p-layout-container">
            <div class="p-layout-breadcrumb">
              <el-breadcrumb separator="/">
                <el-breadcrumb-item @click.native="firstPathClick(breadcrumb.firstPath)" :to="{ path: breadcrumb.firstPath }">{{breadcrumb.firstLevelName}}</el-breadcrumb-item>
                <el-breadcrumb-item>{{breadcrumb.secondLevelName}}</el-breadcrumb-item>
              </el-breadcrumb>
            </div>
            <div class="p-layout-inner">
              <slot></slot>
            </div>
          </div>
        </div>
        <div class="p-layout-footer"> 版权所有 © 2016</div>
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
    let currentRoute, firstLevelName, secondLevelName, firstPath
    currentRoute = this.$router.history.current.fullPath
    menus.forEach((mod) => {
      const subMenus = mod.children
      subMenus.forEach((subMenu) => {
        if (subMenu.path === currentRoute) {
          firstLevelName = mod.text
          secondLevelName = subMenu.text
          firstPath = mod.path
        }
      })
    })
    return {
      loggedIn: auth.loggedIn(),
      BadCaseTitle: 'BadCase追踪',
      BadCaseName: 'BadCase',
      menus,
      name: '',
      headImg: '',
      currentRoute,
      isCollapse: false,
      breadcrumb: {
        firstPath,
        firstLevelName,
        secondLevelName
      }
    }
  },
  /* created () {
    auth.onChange = (loggedIn) => {
      this.loggedIn = loggedIn
    }
  }, */
  mounted () {
    let _this = this
    _this.name = common.cookie('kb_rtx') || ''
    if (_this.name) {
      _this.headImg = 'http://r.hrc.oa.com/photo/150/' + this.name + '.png'
    }
  },
  methods: {
    firstPathClick  (path) {
      let firstLevelName, secondLevelName, firstPath,  _this = this
      menus.forEach((mod) => {
        const subMenus = mod.children
        subMenus.forEach((subMenu) => {
          if (subMenu.path === path) {
            firstLevelName = mod.text
            secondLevelName = subMenu.text
            firstPath= mod.path
          }
        })
      })
      _this.breadcrumb.firstLevelName = firstLevelName
      _this.breadcrumb.secondLevelName = secondLevelName
      _this.breadcrumb.firstPath = firstPath
    },
    menuSelect (index) {
      let firstLevelName, secondLevelName, firstPath,  _this = this
      menus.forEach((mod) => {
        const subMenus = mod.children
        subMenus.forEach((subMenu) => {
          if (subMenu.path === index) {
            firstLevelName = mod.text
            secondLevelName = subMenu.text
            firstPath= mod.path
          }
        })
      })
      _this.breadcrumb.firstLevelName = firstLevelName
      _this.breadcrumb.secondLevelName = secondLevelName
      _this.breadcrumb.firstPath = firstPath
    },
    toggleSider () {
      this.isCollapse = !this.isCollapse
    },
    handleDropdown (cmd) {
      if (cmd === 'logout') {
        auth.logout()
        this.$router.replace({ name: 'login' })
      }
    }
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
@sider-width: 220px;
@top-height: 60px;
@sider-collapse-width: 64px;
@transition: all 0.3s ease;
@cont-padding: 15px;
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
.logo img {
  display: inline-block;
  margin-left: 20px;
  height: 40px;
  width: 40px;
  vertical-align: middle;
}
.logo .p-name {
  margin-left: 10px;
  font-size: 18px;
  line-height: @top-height;
}
.p-layout {
  &-topbar {
    position: fixed;
    width: 100%;
    height: @top-height;
    line-height: @top-height;
    background-color: @top-bg-color;
    z-index: 101;
    color: #fff;

    a {
      color: @gray;
    }
    .el-dropdown-link {
      color: #fff;
    }
  }
  &-name {
    width: @sider-width;
    float: left;
    background-color: @sidebar-color;
    font-family: Helvetica;
    font-size: 30px;
    &.sider-mini {
      width: @sider-collapse-width;
    }
    .full {
      display: inline-block;
      text-decoration: none;
    }
    .mini .logo img {
      text-align: center;
      margin-left: 11px;
    }
  }
  &-nav {
    float: left;
    .nav-item {
      margin-right: 10px;
      .fa {
        font-size: 20px;
      }
      .el-badge__content.is-fixed {
        top: 20px;
      }
    }
    .p-layout-avatar {
      width: 36px;
      height: 36px;
      border: 2px solid @gray;
    }
  }
  &-avatar {
    border-radius: 50%;
    vertical-align: middle;
  }
  &-user {
    padding: 20px;
    text-align: center;
    color: #fff;
    .p-layout-avatar {
      width: 64px;
      height: 64px;
      margin-bottom: 10px;
    }
  }
  &-sider {
    width: @sider-width;
    background-color: @sidebar-color;
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    transition: @transition;
    z-index: 102;
    overflow-x: hidden;
  }
  &-panel,
  &-content {
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    right: 0;
    overflow: hidden;
    background: #f8f8f8;
    transition: @transition;
    width: auto;
  }

  &-collapse {
    float: left;
    width: @top-height;
    cursor: pointer;
    background-color: #EDECE8;
    text-align: center;
    color: #979797;
  }
  &-body {
    position: absolute;
    width: 100%;
    top: @top-height;
    bottom: 0;
    z-index: 100;
    &.sider-full {
      .p-layout-panel {
        left: @sider-width;
      }
    }
    &.sider-mini {
      .p-layout-panel {
        left: @sider-collapse-width;
      }
      .p-layout-sider {
        width: @sider-collapse-width;
      }
      .p-layout-user {
        display: none;
      }
      .el-menu {
        .el-submenu__icon-arrow,
        .nav-next {
          display: none;
        }
        &-item {
          padding: 0 !important;
        }
        .el-submenu {
          text-align: center;
        }
      }
    }
  }
  &-content {
    overflow-y: auto;
  }
  &-container {
    padding: 15px;
  }
  &-inner {
    padding: 10px;
    background: #f8f8f8;
    border-radius: 3px;
    margin-top: 10px;
  }
  &-breadcrumb {
    box-shadow: 0 1px 2px 0 rgba(0,0,0,.1);
    padding: 25px 15px;
    margin: -15px -15px 0 -15px;
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

  &-header {
    padding: 20px 10px;
    border-bottom: 1px solid #e9e9e9;
    background-color: @light-black;
    &:before,
    &:after {
      content: '';
      display: table;
    }
    &:after {
      clear: both;
    }
  }

  .is-user {
    float: right;
    margin-right: 30px;
    a {
      font-weight: 700;
    }
    .username {
      margin-right: 15px;
    }
  }

  .p-layout-avatar {
    margin-right: 15px;
    width: 36px;
    height: 36px;
    border-radius: 50%;
    vertical-align: middle;
  }

  .el-menu--dark {
    background-color: @sidebar-color;
  }

  .el-menu--dark .el-submenu .el-menu {
    background-color: @sidebar-color;
  }

  .el-menu--dark .el-menu-item, .el-menu--dark .el-submenu__title {
    height: 60px;
    line-height: 60px;
    color: #fff;
  }

  .el-menu--horizontal.el-menu--dark .el-submenu .el-menu-item.is-active, .el-menu-item.is-active {
    border-left: 6px solid #FFC100; 
    background-color: #282E42!important;
  }

  .el-menu--dark .el-menu-item:hover, .el-menu--dark .el-submenu__title:hover {
    background-color: #282E42!important;
  }
}
</style>
