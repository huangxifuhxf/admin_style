<template>
  <div class="reports">
    <!-- 导航地址（面包屑） -->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>
        <a href="javascript:;">数据统计</a>
      </el-breadcrumb-item>
      <el-breadcrumb-item>数据列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- Tabs 标签页 -->
    <el-tabs type="border-card">
      <el-tab-pane label="同名数量统计">
        <!-- echarts模块 -->
        <chart :options="option4" auto-resize></chart>
      </el-tab-pane>
      <el-tab-pane label="折线图堆叠">
        <chart :options="option2" auto-resize></chart>
      </el-tab-pane>
      <el-tab-pane label="未来一周气温变化">
        <chart :options="option3" auto-resize></chart>
      </el-tab-pane>
      <el-tab-pane label="圆形图">
        <chart :options="option1" auto-resize></chart>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import { genData } from './echarts.js'
export default {
  data () {
    let data1 = []

    var data = genData(50)

    for (let i = 0; i <= 360; i++) {
      let t = i / 180 * Math.PI

      let r = Math.sin(2 * t) * Math.cos(2 * t)

      data1.push([r, i])
    }

    return {
      // 同名数量统计

      option1: {
        title: {
          text: '圆形图'
        },

        legend: {
          data: ['line']
        },

        polar: {
          center: ['50%', '54%']
        },

        tooltip: {
          trigger: 'axis',

          axisPointer: {
            type: 'cross'
          }
        },

        angleAxis: {
          type: 'value',

          startAngle: 0
        },

        radiusAxis: {
          min: 0
        },

        series: [
          {
            coordinateSystem: 'polar',

            name: 'line',

            type: 'line',

            showSymbol: false,

            data: data1
          }
        ],

        animationDuration: 2000
      },

      // 折线图堆叠

      option2: {
        title: {
          text: '折线图堆叠'
        },

        tooltip: {
          trigger: 'axis'
        },

        legend: {
          data: ['邮件营销', '联盟广告', '视频广告', '直接访问', '搜索引擎']
        },

        grid: {
          left: '3%',

          right: '4%',

          bottom: '3%',

          containLabel: true
        },

        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },

        xAxis: {
          type: 'category',

          boundaryGap: false,

          data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
        },

        yAxis: {
          type: 'value'
        },

        series: [
          {
            name: '邮件营销',

            type: 'line',

            stack: '总量',

            data: [120, 132, 101, 134, 90, 230, 210]
          },

          {
            name: '联盟广告',

            type: 'line',

            stack: '总量',

            data: [220, 182, 191, 234, 290, 330, 310]
          },

          {
            name: '视频广告',

            type: 'line',

            stack: '总量',

            data: [150, 232, 201, 154, 190, 330, 410]
          },

          {
            name: '直接访问',

            type: 'line',

            stack: '总量',

            data: [320, 332, 301, 334, 390, 330, 320]
          },

          {
            name: '搜索引擎',

            type: 'line',

            stack: '总量',

            data: [820, 932, 901, 934, 1290, 1330, 1320]
          }
        ]
      },

      // 未来一周气温变化

      option3: {
        title: {
          text: '未来一周气温变化',

          subtext: '纯属虚构'
        },

        tooltip: {
          trigger: 'axis'
        },

        legend: {
          data: ['最高气温', '最低气温']
        },

        toolbox: {
          show: true,

          feature: {
            dataZoom: {
              yAxisIndex: 'none'
            },

            dataView: {
              readOnly: false
            },

            magicType: {
              type: ['line', 'bar']
            },

            restore: {},

            saveAsImage: {}
          }
        },

        xAxis: {
          type: 'category',

          boundaryGap: false,

          data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
        },

        yAxis: {
          type: 'value',

          axisLabel: {
            formatter: '{value} °C'
          }
        },

        series: [
          {
            name: '最高气温',

            type: 'line',

            data: [11, 11, 15, 13, 12, 13, 10],

            markPoint: {
              data: [
                {
                  type: 'max',

                  name: '最大值'
                },

                {
                  type: 'min',

                  name: '最小值'
                }
              ]
            },

            markLine: {
              data: [
                {
                  type: 'average',

                  name: '平均值'
                }
              ]
            }
          },

          {
            name: '最低气温',

            type: 'line',

            data: [1, -2, 2, 5, 3, 2, 0],

            markPoint: {
              data: [
                {
                  name: '周最低',

                  value: -2,

                  xAxis: 1,

                  yAxis: -1.5
                }
              ]
            },

            markLine: {
              data: [
                {
                  type: 'average',

                  name: '平均值'
                },

                [
                  {
                    symbol: 'none',

                    x: '90%',

                    yAxis: 'max'
                  },

                  {
                    symbol: 'circle',

                    label: {
                      normal: {
                        position: 'start',

                        formatter: '最大值'
                      }
                    },

                    type: 'max',

                    name: '最高点'
                  }
                ]
              ]
            }
          }
        ]
      },

      // 圆形图

      option4: {
        title: {
          text: '同名数量统计',

          subtext: '纯属虚构',

          x: 'center'
        },

        tooltip: {
          trigger: 'item',

          formatter: '{a} <br/>{b} : {c} ({d}%)'
        },

        legend: {
          type: 'scroll',

          orient: 'vertical',

          right: 10,

          top: 20,

          bottom: 20,

          data: data.legendData,

          selected: data.selected
        },

        series: [
          {
            name: '姓名',

            type: 'pie',

            radius: '55%',

            center: ['40%', '50%'],

            data: data.seriesData,

            itemStyle: {
              emphasis: {
                shadowBlur: 10,

                shadowOffsetX: 0,

                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      }
    }
  }
}
</script>
<style>
.echarts {
  width: 100%;

  height: 500px;
}
</style>
