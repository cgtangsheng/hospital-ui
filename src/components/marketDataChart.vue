<template>
  <div class="market-data-chart">
  <div class="mod-head">
    <div class="mod-title">• 总体走势图</div>
  </div>
  <div class="mod-body">
    <el-row :gutter="10">
      <el-col :span="12">
        <div class="chart-box">
          <div class="chart-header">
            <el-tabs v-model="contrastChartTabs" type="card" @tab-click="handleContrastTabClick">
              <el-tab-pane label="新增用户 VS 活跃用户" name="first"> </el-tab-pane>
              <el-tab-pane label="总PV VS 总VV" name="second"></el-tab-pane>
            </el-tabs>
        
            <el-date-picker
               v-model="date.contrastChartDate"
               type="daterange"
               placeholder="选择日期"
               :clearable="date.dateClearable" 
               :picker-options="date.contrastPickerOptions"
               @change="handleContrastDatePick">
            </el-date-picker>
          </div>
        
          <div v-show="contrastChartTabs==='first'">
            <div ref="contrastChartNewUser"></div>
            <div ref="contrastChartActiveUser"></div>
          </div>
          <div v-show="contrastChartTabs==='second'">
            <div ref="contrastChartPVVV"></div>
          </div>
          
          
        </div>
      </el-col>
      <el-col :span="12">
        <!-- <div class="chart-box">
          <div class="chart-header">
            <el-tabs v-model="marketContentChartTabs" type="card" @tab-click="handleMarketContentTabClick">
              <el-tab-pane label="图文" name="first"> </el-tab-pane>
              <el-tab-pane label="视频" name="second"></el-tab-pane>
              <el-tab-pane label="问答" name="third"> </el-tab-pane>
              <el-tab-pane label="微博" name="forth"></el-tab-pane>
            </el-tabs>
            <el-date-picker
                 v-model="date.contentDataChartDate"
                 type="daterange"
                 placeholder="选择日期"
                 :clearable="date.dateClearable" 
                 :picker-options="date.contentPickerOptions"
                 @change="handleMarketContentDatePick">
            </el-date-picker>
          </div>

          <div ref="contentDataChart"></div>
        </div> -->
      </el-col>
    </el-row>
  </div>
  </div>
</template>
<style lang="less">
  .market-data-chart {
    .chart-box {
      background: #fff;
      padding: 20px;
    }
    .chart-header {
      display: flex;
      justify-content: space-between;
      margin-top: 10px;
    }
  }
  .el-input__icon {
    height: 36px;
  }
</style>
<script>
import $ from 'zeptojs'
import dateFormat from 'date-format'
import Highcharts from 'highcharts'
import renderChart from '../common/js/renderChart'

export default {
  name: 'market-data-chart',
  data () {
    return {
      contrastChartTabs: 'first',
      marketContentChartTabs: 'first',
      date: {
        contrastChartDate: [],
        contentDataChartDate: [],
        dateClearable: false,
        contrastPickerOptions: {
          disabledDate(time) {
            return time.getTime() >= (new Date(dateFormat('yyyy-MM-dd', new Date())) -28800000) || time.getTime() < (Date.parse('2017-6-19') -28800000)
          }
        },
        contentPickerOptions: {
          disabledDate(time) {
            return time.getTime() >= (new Date(dateFormat('yyyy-MM-dd', new Date())) -28800000) || time.getTime() < (Date.parse('2017-6-28') -28800000)
          }
        },
      },     
      reqConf: {
        getMarketDataUrl: 'http://bi.kuaibao.oa.com/cgi/getMarketUserData',
        getMarketContentDataUrl: 'http://bi.kuaibao.oa.com/cgi/getMarketContentData'
      },
      marketData: {},
      marketContentData: {}
    }
  },
  computed: {
    contrastBegintime: function () {
      return this.dealDate(this.date.contrastChartDate[0])
    },
    contrastTimestamp: function () {
      return this.dealDate(this.date.contrastChartDate[1])
    },
    marketContentBegintime: function () {
      return this.dealDate(this.date.contentDataChartDate[0])
    },
    marketContentTimestamp: function () {
      return this.dealDate(this.date.contentDataChartDate[1])
    }
  },
  created () {
    this.initDate()
  },
  mounted () {
    this.getData(this.reqConf.getMarketDataUrl, this.renderContrastChartUser)
    this.getData(this.reqConf.getMarketContentDataUrl, this.renderMarketContentChart)
  },
  methods: {
    initDate: function () {
      let _this = this, dateBegin, dateEnd
      dateBegin = new Date()
      dateEnd = new Date()
      dateBegin.setDate(dateBegin.getDate() - 7)
      dateEnd.setDate(dateEnd.getDate() - 1)
      dateBegin.setHours(0, 0, 0, 0)
      dateEnd.setHours(0, 0, 0, 0)
      dateBegin = new Date(dateBegin.toISOString())
      dateEnd = new Date(dateEnd.toISOString())
      _this.date.contrastChartDate[0] = dateBegin
      _this.date.contrastChartDate[1] = dateEnd
      _this.date.contentDataChartDate[0] = dateBegin
      _this.date.contentDataChartDate[1] = dateEnd
    },
    dealDate: function (date) {
      if (date) {
        let m = date.getMonth() + 1
        let d = date.getDate()
        m = m < 10? '0' + m: m
        d = d < 10? '0' + d: d
        return date.getFullYear() + '-' + m + '-' + d
      } else {
        return null
      }
    },
    getData (url, handleData) {
      let _this = this, param = {}
      if (url === _this.reqConf.getMarketDataUrl) {
        param.timestamp = _this.contrastTimestamp
        param.begintime = _this.contrastBegintime
      } else {
        param.timestamp = _this.marketContentTimestamp
        param.begintime = _this.marketContentBegintime
      }
      
      $.ajax({
        url: url,
        dataType: 'jsonp',
        data: param,
        success: function (res) {
          if (res.ret === 0 && res.content) {
            if (url === _this.reqConf.getMarketDataUrl) {
              _this.marketData = res.content
            } else {
              _this.marketContentData = res.content
            }
            handleData()
          } else {
            console.log(res.ret)
          }
        },
        error: function (e) {
          console.log(e)
        }
      })
    },
    renderContrastChartUser () {
      let _this = this, 
        marketData = _this.marketData

      renderChart.renderMLineChart([{yName: '新增用户', data: marketData.new_user_num.trends}], '新增用户趋势图', _this.$refs['contrastChartNewUser'], '200px')

      renderChart.renderMLineChart([{yName: '活跃用户', data: marketData.active_user_num.trends}], '活跃用户趋势图', _this.$refs['contrastChartActiveUser'], '200px')
    },

    renderContrastChartPVVV () {
      let _this = this,
        dataArr = [
          {yName: 'pv', data:_this.marketData.total_pv.trends},
          {yName: 'vv', data:_this.marketData.total_vv.trends}
        ]
      renderChart.renderMLineChart(dataArr, '总PV VS 总VV', _this.$refs['contrastChartPVVV'])
    },
    renderMarketContentChart () {
      let _this = this, type, dataArr,
        typeChnName = {
          'article_recommend': '图文',
          'video_recommend': '视频',
          'an_recommend': '问答',
          'weibo_recommend': '微博'
        }
      switch (_this.marketContentChartTabs) {
        case 'first':
          type = 'article_recommend'
          break
        case 'second':
          type = 'video_recommend'
          break
        case 'third':
          type = 'an_recommend'
          break
        case 'forth':
          type = 'weibo_recommend'
          break
      }
      dataArr = [
          {yName: typeChnName[type], data: _this.marketContentData[type].trends}
        ]
      // renderChart.renderMLineChart(dataArr, typeChnName[type] + '最近一周趋势图', _this.$refs['contentDataChart'])
    },
   
    handleContrastTabClick () {
      let _this = this
      _this.contrastChartTabs === 'first' ? _this.renderContrastChartUser() : _this.renderContrastChartPVVV()
    },
    handleMarketContentTabClick () {
      let _this = this
      _this.renderMarketContentChart()
    },
    handleContrastDatePick () {
      let _this = this
      _this.getData(_this.reqConf.getMarketDataUrl, function () {
        _this.contrastChartTabs === 'first' ? _this.renderContrastChartUser() : _this.renderContrastChartPVVV()
      })
    },
    handleMarketContentDatePick () {
      let _this = this
      _this.getData(_this.reqConf.getMarketContentDataUrl, _this.renderMarketContentChart)
    }
  }
}
</script>