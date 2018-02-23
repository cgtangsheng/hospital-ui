<template>
  <div class="scheme-dialog">
    <el-dialog
      title="scheme 自助生成"
      v-model="dialogVisible"
      :modal="false"
      @open="resetSchemeOptions(); schemeOptions.type = '';">
      <el-tabs type="card" @tab-click="resetSchemeOptions">
        <el-tab-pane label="自助生成 scheme">
          <el-form label-width="90px">
            <el-form-item label="页面类型：">
              <el-select
                v-model="schemeOptions.type"
                placeholder="请选择页面类型"
                @change="resetSchemeOptions"
                class="type-select">
                <el-option label="普通文章底层页" value="article"></el-option>
                <el-option label="搜索结果页" value="search"></el-option>
                <el-option label="媒体页" value="media"></el-option>
                <el-option label="活动页" value="activity"></el-option>
                <el-option label="timeline" value="timeline"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item v-if="schemeOptions.type === 'article'" label="文章ID：">
              <el-input v-model="schemeOptions.nm"></el-input>
            </el-form-item>
            <el-form-item v-if="schemeOptions.type === 'search'" label="关键词：">
              <el-input v-model="schemeOptions.keyword"></el-input>
            </el-form-item>
            <el-form-item v-if="schemeOptions.type === 'media'" label="媒体ID：">
              <el-input v-model="schemeOptions.child"></el-input>
            </el-form-item>
            <el-form-item
              v-if="schemeOptions.type === 'article'
              || schemeOptions.type === 'search'
              || schemeOptions.type === 'media'"
              label="from：">
              <el-input v-model="schemeOptions.from"></el-input>
            </el-form-item>
          </el-form>
          <div class="generate-scheme">
            <el-button type="primary" @click="generateScheme()">生成 scheme</el-button>
            <div v-if="generatedScheme">
              <div class="scheme-link">{{ generatedScheme }}</div>
              <div>
                <img :src="'http://bi.kuaibao.oa.com/cgi/qrcode?url=' + generatedUrl">
              </div>
              <div>请通过微信扫码跳转</div>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="手动填写 scheme">
          <el-form label-width="120px">
            <el-form-item label="输入 scheme：">
              <el-input v-model="inputScheme" @input.native="showQrcode = false"></el-input>
            </el-form-item>
          </el-form>
          <div class="generate-scheme">
            <el-button type="primary" @click="showQrcode = true">生成二维码</el-button>
            <div v-if="inputScheme && showQrcode">
              <div>
                <img :src="'http://bi.kuaibao.oa.com/cgi/qrcode?url=' + inputUrl">
              </div>
              <div>请通过微信扫码跳转</div>
            </div>
          </div>
        </el-tab-pane>
      </el-tabs>
      
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">关 闭</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import $ from 'zeptojs'

export default {
  name: 'scheme-dialog',
  props: ['dialogSchemeVisible'],
  data () {
    return {
      showQrcode: false,
      dialogVisible: this.dialogSchemeVisible,
      schemeOptions: {
        type: '',
        from: '',
        keyword: '',
        child: '',
        nm: ''
      },
      generatedScheme: '',
      generatedUrl: '',
      inputScheme: '',
      reqConf: {
      }
    }
  },
  computed: {
    inputUrl () {
      var temp = encodeURIComponent(this.inputScheme)
      return encodeURIComponent(`http://kuaibao.qq.com/view/launchKuaibao?scheme=${temp}`)
    }
  },
  watch: {
    dialogSchemeVisible (val) {
      this.dialogVisible = val
    },
    dialogVisible (val) {
      this.$emit('visibleChange', val)
    }
  },
  methods: {
    resetSchemeOptions () {
      let _this = this
      _this.schemeOptions.from = ''
      _this.schemeOptions.keyword = ''
      _this.schemeOptions.nm = ''
      _this.schemeOptions.child = ''
      _this.generatedScheme = ''
      _this.qrcode = false
      _this.inputScheme = ''
    },
    generateScheme () {
      let _this = this, options = _this.schemeOptions
      switch (options.type) {
        case 'article':
          if (options.nm && options.from) {
            _this.generatedScheme = `qnreading://article_detail?nm=${options.nm}&from=${options.from}`
            var temp = encodeURIComponent(_this.generatedScheme)
            _this.generatedUrl = encodeURIComponent(`http://kuaibao.qq.com/view/launchKuaibao?scheme=${temp}`)
          }
          break
        case 'search':
          if (options.keyword && options.from) {
            _this.generatedScheme = `qnreading://search_detail?keyword=${options.keyword}&from=${options.from}`
            temp = encodeURIComponent(_this.generatedScheme)
            _this.generatedUrl = encodeURIComponent(`http://kuaibao.qq.com/view/launchKuaibao?scheme=${temp}`)
          }
          break
        case 'media':
          if (options.child && options.from) {
            _this.generatedScheme = `qnreading://article_9563?chlid=${options.child}&from=${options.from}`
            temp = encodeURIComponent(_this.generatedScheme)
            _this.generatedUrl = encodeURIComponent(`http://kuaibao.qq.com/view/launchKuaibao?scheme=${temp}`)
          }
          break
        case 'activity':
          _this.generatedScheme = `qnreading://article_9555`
          temp = encodeURIComponent(_this.generatedScheme)
          _this.generatedUrl = encodeURIComponent(`http://kuaibao.qq.com/view/launchKuaibao?scheme=${temp}`)
          break
        case 'timeline':
          _this.generatedScheme = `qnreading://tab_reading`
          temp = encodeURIComponent(_this.generatedScheme)
          _this.generatedUrl = encodeURIComponent(`http://kuaibao.qq.com/view/launchKuaibao?scheme=${temp}`)
          break
      }
    }
  }
}
</script>

<style lang="less">
.scheme-dialog {
  .type-select {
    width: 100%;
  }
  .type-select .el-input{
    width: 100%;
  }
  .generate-scheme {
    text-align: center;
    .el-button {
      margin-bottom: 12px;
    }
    .scheme-link {
      margin-bottom: 8px;
      font-size: 18px;
    }
    img {
      width: 200px;
    }
  }
}
</style>