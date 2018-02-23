
import Highcharts from 'highcharts'

Highcharts.setOptions({
    lang:{
        contextButtonTitle: "图表导出菜单",
        downloadJPEG: "下载 JPEG 图片",
        downloadPDF: "下载 PDF 文件",
        downloadPNG: "下载 PNG 文件",
        downloadSVG: "下载 SVG 文件",
        printChart: "打印图表",
        downloadCSV: "下载 CSV 文件",
        downloadXLS: "下载 XLS 文件",
        viewData: "查看表格数据"
    }
});

var renderChart = {
  // dataArr: [{yName: 'aaa', data: []}]
  renderMLineChart: function (dataArr, chartTitle, ref, height) {
    let options = {}, title, xAxis, yAxis, series = [], xCategory = [], legend, credits, chart, plotOptions
    for (var i = 0; i < dataArr.length; i++) {
      let data = [], name

      for (var j = 0; j < dataArr[i].data.length; j++) {
        data.push(parseInt(dataArr[i].data[j].value))
        i === 0 && xCategory.push(dataArr[i].data[j].time)
      }
      name = dataArr[i].yName
      series.push({data: data, name: name})
      
    }
   
    title = {
      text: chartTitle,
      y: 22
    }
    chart = {
      type: 'spline',
      height: height || '400px'
    }
    xAxis = {
      categories: xCategory
    }
    yAxis = {
      title: {
         text: '总量'
      },
      plotLines: [{
         value: 0,
         width: 1,
         color: '#808080'
      }]
    }
    legend = {
      layout: 'vertical',
      align: 'right',
      verticalAlign: 'middle',
      borderWidth: 0,
      itemStyle: {
        fontSize: '14px',
        color: '@font-color',
        lineHeight: '20px'
      }
    }
    credits = {
      enabled: false
    }
    plotOptions = {
      series: {           
        lineWidth: 1,
        marker: {
          enabled: false
        }
      }
    }
    options.title = title
    options.xAxis = xAxis
    options.yAxis = yAxis
    options.legend = legend
    options.series = series
    options.credits = credits
    options.chart = chart
    options.plotOptions = plotOptions
    Highcharts.chart(ref, options)
  },
}


export default renderChart