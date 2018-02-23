<template>
  <div>
    <div class="rtx-input-wrap">
      <div class="rtx-list-box">
        <template v-for="item in rtxList">
          <div class="rtx-list-item">{{item}}<span class="rtx-list-item-remove" @click="rtxRemove(item)"></span></div>
        </template>
        <div class="rtx-list-input-wrap">
          <el-input class="rtx-list-input" v-model="tmpRtx" @keyup.native="textInput($event)"></el-input>
          <ul class="rtx-list-input-query" v-if="queryList.length > 0">
            <template v-for="(item, i) in queryList">
              <li class="rtx-list-input-query-item" v-bind:class="{ selected: item.selected }" @click="queryListClick(i)">
                <span>{{item.name}}</span>
              </li>
            </template>
          </ul>
        </div>
        
      </div>
    </div>
  </div>
</template>

<!-- <remote-js src="http://pms.webdev.com/js/usersscript.js?v=2.0.0"></remote-js> -->
<script>
import common from '../common/js/common'

export default {
  name: 'rtx-input',
  props: ['rtxs'],
  data () {
    let rtxList;
    if(!this.rtxs) {
      rtxList = [];
    } else {
      rtxList = this.rtxs.split(';');
    }
    return {
      rtxList: rtxList,
      tmpRtx: '',
      queryList: []
    }
  },
  mounted() {
    var _this = this;

    _this.getJs();
  },
  watch:{
    rtxs(cur, old){
      var _this = this;
      if(!cur) {
        _this.rtxList = [];
      } else if(_this.rtxList.join(';') != cur){
        _this.rtxList = cur.split(';');
      }
    }
  },
  methods: {
    textInput(e){
      var _this = this;
      if(e.code == 'Enter'){
        for(var i = 0; i < _this.queryList.length; i++){
          if(_this.queryList[i]['selected']){
            _this.rtxList.push(_this.queryList[i]['rtx']);
            _this.tmpRtx = '';
            _this.queryList = [];

            _this.setRtxs();
            return;
          }
        }
      } else if(e.code == 'Backspace'){
        if(!_this.queryList.length && !_this.tmpRtx){
          if(_this.rtxList.length){
            _this.rtxList.pop();
            _this.setRtxs();
          }
        } else {
          _this.renderHitRtx();
        }
      } else if(e.code == "ArrowUp"){
        if(_this.queryList.length <= 1){
          return;
        }

        for(var i = 0; i < _this.queryList.length; i++){
          if(_this.queryList[i]['selected']){
            _this.queryList[i]['selected'] = false;
            if(i == 0){
              _this.queryList[_this.queryList.length - 1]['selected'] = true;
              _this.tmpRtx = _this.queryList[_this.queryList.length - 1]['rtx'];
            } else {
              _this.queryList[i - 1]['selected'] = true;
              _this.tmpRtx = _this.queryList[i - 1]['rtx'];
            }

            return;
          }
        }
      } else if(e.code == "ArrowDown"){
        if(_this.queryList.length <= 1){
          return;
        }

        for(var i = 0; i < _this.queryList.length; i++){
          if(_this.queryList[i]['selected']){
            _this.queryList[i]['selected'] = false;
            if(_this.queryList.length <= (i + 1)){
              _this.queryList[0]['selected'] = true;
              _this.tmpRtx = _this.queryList[0]['rtx'];
            } else {
              _this.queryList[i + 1]['selected'] = true;
              _this.tmpRtx = _this.queryList[i + 1]['rtx'];
            }

            return;
          }
        }
      } else {
        _this.renderHitRtx();
      }
    },
    renderHitRtx(){
      var _this = this;
      if(!window._arrStaffs || !_arrStaffs.length){
        return;
      }

      if(!_this.tmpRtx){
        _this.queryList = [];
        return;
      }

      let tmp = [];
      for(let i in _arrStaffs) {
        let arr = _arrStaffs[i];
        if(arr[0] && arr[0].indexOf(_this.tmpRtx) == 0){

          var repeat = _this.rtxList.find(function(value) {
            return value == arr[0];  
          });
          if(repeat){
            continue;
          }

          tmp.push({
            rtx: arr[0],
            name: arr[1],
            url: 'http://r.hrc.oa.com/photo/150/' + arr[0] + '.png',
            selected: tmp.length == 0 ? true : false
          });
        }

        if(tmp.length >= 5){
          break;
        }
      }

      _this.queryList = tmp;
    },
    queryListClick(index){
      var _this = this;
      if(index >= 0 && _this.queryList[index]){
        _this.tmpRtx = '';
        _this.rtxList.push(_this.queryList[index]['rtx']);
        _this.setRtxs();
        _this.queryList = [];
      }
    },
    rtxRemove(rtx){
      var _this = this;
      var index = _this.rtxList.findIndex(function(value) {
        return value == rtx;  
      });
      _this.rtxList.splice(index, 1);
      _this.setRtxs();
    },
    setRtxs(){
      var _this = this;
      // _this.rtxs = _this.rtxList.join(';');
      this.$emit('rtxChange', _this.rtxList.join(';'));
    },
    getJs() {
      const s = document.createElement('script');
      s.type = 'text/javascript';
      s.src = 'http://pms.webdev.com/js/usersscript.js?v=2.0.0';
      document.body.appendChild(s);
    }
  }
}
</script>