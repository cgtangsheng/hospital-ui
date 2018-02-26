import Vue from 'vue'
import ElementUI from 'element-ui'
import VueRouter from 'vue-router'
import TreeView from 'vue-json-tree-view'

import 'element-ui/lib/theme-default/index.css'

import App from './App'

import routes from './router-config'
import common from './common/js/common'
import $ from 'zeptojs'
import './constant.js'
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
import { Header } from 'mint-ui';
import { Cell } from 'mint-ui';
import { DatetimePicker } from 'mint-ui';
import { Button } from 'mint-ui';
import { Popup } from 'mint-ui';
import { Picker } from 'mint-ui';
import { Toast } from 'mint-ui';
import { Radio } from 'mint-ui';
import { Switch } from 'mint-ui';
import { PaletteButton } from 'mint-ui';
import { Swipe, SwipeItem } from 'mint-ui';


Vue.use(MintUI)

Vue.component(Header.name, Header);
Vue.component(Cell.name, Cell);
Vue.component(DatetimePicker.name, DatetimePicker);
Vue.component(Button.name, Button);
Vue.component(Popup.name, Popup);
Vue.component(Picker.name, Picker);
Vue.component(Toast.name, Toast);
Vue.component(Radio.name, Radio);
Vue.component(Switch.name, Switch);
Vue.component(PaletteButton.name, PaletteButton);
Vue.use(ElementUI);
Vue.use(VueRouter);
Vue.use(TreeView);
Vue.component(Swipe.name, Swipe);
Vue.component(SwipeItem.name, SwipeItem);



const router = new VueRouter({
  mode: 'hash',
  base: __dirname,
  routes
})
const rtx = common.cookie('kb_rtx') || ''
loginUserName = rtx;

new Vue({
	el: '#app',
	template: '<App/>',
	router,
	components: { App }
})


