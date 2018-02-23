<template>
    <div class="rtx-card-wrap">
    <template v-for="(item, i) in rtxList">
      <a v-bind:href="item.rtxHref" class="rtx-card">
        <img v-bind:src="item.headImg" class="rtx-card-header" @error="loadError(i)">
        <span class="rtx-card-name">{{item.rtx}}</span>
      </a>
    </template>
    </div>
</template>

<script>
import common from '../common/js/common'

export default {
  name: 'rtx-card',
  props: ['rtx'],
  data () {
    return {
      rtxList:[],
    }
  },
  mounted() {
    var _this = this;
    _this.render();
  },
  watch:{
    rtx(cur, old){
      this.render();
    }
  },
  methods: {
    loadError(i){
      var _this = this;
      var defaultHeader = 'http://mat1.gtimg.com/www/images/kbOA/header_placeholder.png';
      if(_this.rtxList[i]['headImg'] != defaultHeader){
        _this.rtxList[i]['headImg'] = defaultHeader;
      }
    },
    render(){
      var _this = this;
      var tmp = _this.rtx.split(';');
      _this.rtxList = [];

      tmp.forEach((item, i) => {
        _this.rtxList.push({
          rtx: item,
          rtxHref: 'rtxlite.hotlink://UserName='+item,
          headImg: 'http://r.hrc.oa.com/photo/150/'+item+'.png'
        });
      })
    
    }
  }
}
</script>