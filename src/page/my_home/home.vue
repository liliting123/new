<template>
  <div>
    <div class="home">
      <div class="boxWrap border-radius">
        <span>{{ $t('数据概览') }}</span>
        <el-date-picker
          class="pickerDate"
          v-model="time"
          type="daterange"
          unlink-panels
          value-format="yyyy-MM-dd"
          :start-placeholder="$t('开始日期')"
          :end-placeholder="$t('结束日期')"
          :picker-options="pickerOptions"
        />
      </div>
      <div class="data_box border-radius">
        <p>{{ $t('整体情况') }}</p>
        <el-descriptions style="padding:16px" :column="6" direction="vertical">
          <el-descriptions-item :label="$t('销售金额')">￥0.00</el-descriptions-item>
          <el-descriptions-item :label="$t('下单情况')">0</el-descriptions-item>
          <el-descriptions-item :label="$t('客单价')">kooriookami</el-descriptions-item>
          <el-descriptions-item :label="$t('会员人数')">18100000000</el-descriptions-item>
          <el-descriptions-item :label="$t('散客人数')">苏州市</el-descriptions-item>
          <el-descriptions-item :label="$t('总人数')"> 0</el-descriptions-item><br />
          <el-descriptions-item :label="$t('余额支付金额')">￥0.00</el-descriptions-item>
          <el-descriptions-item :label="$t('余额支付单量')">0</el-descriptions-item>
          <el-descriptions-item :label="$t('余额占比率')">0.00%</el-descriptions-item>
          <el-descriptions-item :label="$t('退款金额')">￥0.00</el-descriptions-item>
          <el-descriptions-item :label="$t('退款单价')">00</el-descriptions-item>
          <el-descriptions-item :label="$t('退款率')">0.00%</el-descriptions-item>
        </el-descriptions>
      </div>

      <div class="box_echarts">
        <el-row :gutter="10">
          <el-col :md="12" :sm="12">
            <div class="leftEcharts data_box border-radius" style="background:#fff">
              <p>{{ $t('商品销量前十') }}</p>
              <div id="echartShop" style="width: 100%; height: 100%"></div>
            </div>
          </el-col>
          <el-col :md="12" :sm="12">
            <div class="leftEcharts data_box border-radius" style="background:#fff">
              <p>{{ $t('会员人数') }}</p>
              <div id="echartUser" style="width: 100%; height: 100%"></div>
            </div>
          </el-col>
        </el-row>
      </div>
    </div>
  </div>
</template>
<script>
import * as echarts from 'echarts'
// import moment from 'moment'
import MyTitle from '../../components/titles.vue'
function onClick(picker, time) {
  const start = new Date()
  const end = new Date()
  start.setTime(start.getTime() - 3600 * 1000 * 24 * time)
  picker.$emit('pick', [start, end])
}

export default {
  components: { MyTitle },
  data() {
    return {
      vip_msg: {},
      order_msg: {},
      goods_msg: {},
      myCharts: {},
      time: '',
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now()
        },
        shortcuts: [
          {
            text: this.$t('最近一周'),
            onClick(picker) {
              onClick(picker, 7)
            }
          },
          {
            text: this.$t('最近半个月'),
            onClick(picker) {
              onClick(picker, 15)
            }
          },
          {
            text: this.$t('最近一个月'),
            onClick(picker) {
              onClick(picker, 30)
            }
          }
        ]
      }
    }
  },

  mounted() {
    setTimeout(() => {
      // this.initCharts()
      this.setCharts()
    }, 100)
    // 切换界面时有概率echarts图表会变得很小,强行等待100毫秒让dom生成
  },

  activated() {
    this.getVIPMsg()
    this.getOrderMsg()
    this.getGoodsMsg()
  },
  methods: {
    setCharts(data) {
      const _this = this
      // 基于准备好的dom，初始化echarts实例
      var myChartShop = echarts.init(document.getElementById('echartShop'))
      var myChartUser = echarts.init(document.getElementById('echartUser'))
      window.onresize = function() {
        myChartShop.resize()
        myChartUser.resize()
      }
      // 指定图表的配置项和数据
      var obj = {
        name: '苹果',
        price: 10,
        num: 900
      }
      var option = {
        color: ['#7f7f7f'], // 柱子颜色
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow',
            shadowStyle: {
              color: 'rgba(220, 220, 220, 0.5)' // 鼠标移入的阴影颜色
            }
          },
          backgroundColor: '#f2f2f2', // 背景颜色
          borderColor: '#f2f2f2',
          textStyle: {
            color: '#000000', // 字体颜色
            fontSize: 13 // 字体大小
          },
          formatter: function(data) {
            var val =
              _this.$t('商品名称') +
              '：' +
              obj.name +
              '<br>' +
              _this.$t('商品价格') +
              '：' +
              obj.price +
              '<br>' +
              _this.$t('商品销量') +
              '：' +
              obj.num
            return val
          }
        },

        grid: {
          top: '5%',
          left: '3%',
          right: '4%',
          bottom: '8%',
          containLabel: true
        },

        xAxis: {
          axisLine: {
            show: true // 显示坐标轴线
          },
          splitLine: {
            // 网格线
            show: false
          },
          type: 'value',
          boundaryGap: [0, 0.01]
        },
        yAxis: {
          axisTick: {
            show: false // 不显示坐标轴刻度线
          },

          type: 'category',
          data: [
            'Brazil',
            'Indonesia',
            'USA',
            'India',
            'China',
            'World',
            'India',
            'China',
            'World',
            'India'
          ]
        },
        series: [
          {
            type: 'bar',
            data: [
              18203,
              23489,
              29034,
              104970,
              131744,
              630230,
              104970,
              131744,
              630230,
              430230
            ]
          }
        ]
      }

      // 使用刚指定的配置项和数据显示图表。
      myChartShop.setOption(option)
      myChartUser.setOption(option)
      // this.myCharts.setOption({
      //   tooltip: {
      //     trigger: 'axis',
      //     axisPointer: {
      //       type: 'cross',
      //       crossStyle: {
      //         color: '#999'
      //       }
      //     }
      //   },
      //   toolbox: {
      //     right: '20',
      //     feature: {
      //       dataView: { show: true, readOnly: false },
      //       magicType: { show: true, type: ['line', 'bar'] },
      //       restore: { show: true },
      //       saveAsImage: { show: true }
      //     }
      //   },
      //   grid: {
      //     top: '80'
      //   },
      //   legend: {
      //     data: [this.$t('order'), this.$t('registerUser')]
      //   },
      //   xAxis: [
      //     {
      //       type: 'category',
      //       data: data.data.map(item => item.time),
      //       axisPointer: {
      //         type: 'shadow'
      //       }
      //     }
      //   ],
      //   yAxis: [
      //     {
      //       type: 'value',
      //       name: this.$t('order'),
      //       min: 0,
      //       max: data.maxOrderCount,
      //       interval: 50,
      //       axisLabel: {
      //         formatter: '{value}'
      //       }
      //     },
      //     {
      //       type: 'value',
      //       name: this.$t('registerUser'),
      //       min: 0,
      //       max: data.maxRegisterCount,
      //       interval: 50,
      //       axisLabel: {
      //         formatter: '{value}'
      //       }
      //     }
      //   ],
      //   series: [
      //     {
      //       name: this.$t('order'),
      //       type: 'bar',
      //       data: data.data.map(item => item.orderCount)
      //     },
      //     {
      //       name: this.$t('registerUser'),
      //       type: 'line',
      //       yAxisIndex: 1,
      //       data: data.data.map(item => item.registerCount)
      //     }
      //   ]
      // })
    },
    // async handleChange() {
    //   console.log(this.time)
    //   if (this.time == null) {
    //     this.getEcharsData()
    //   } else {
    //     this.getEcharsData(this.time[0], this.time[1])
    //   }
    // },
    // 用户信息
    async getVIPMsg() {
      const res = await this.$http.get(`api/home/user`)
      if (res.ret) {
        this.vip_msg = res.data
      }
    },
    // 订单信息
    async getOrderMsg() {
      const res = await this.$http.get(`api/home/order`)
      if (res.ret) {
        this.order_msg = res.data
      }
    },
    // 商品信息
    async getGoodsMsg() {
      const res = await this.$http.get(`api/home/goods`)
      if (res.ret) {
        this.goods_msg = res.data
      }
    }
  }
}
</script>
<style lang="scss" scoped>
@import '../../style/communalVariate.scss';
.home {
  background-color: #f7f7f7;
  .boxWrap {
    display: flex;
    justify-content: space-between;
    font-size: 18px;
    height: 53px;
    line-height: 53px;
    padding-left: 20px;
    background-color: #fff;
    margin-bottom: 0.5em;
    .pickerDate {
      margin-top: 5px;
      margin-right: 20px;
    }
    .content_box {
      height: 80px;
      margin-top: 10px;
      cursor: pointer;
      .left_box {
        width: 80px;
        height: 100%;
        float: left;
        text-align: center;
        &::after {
          display: inline-block;
          vertical-align: middle;
          content: '';
          height: 125%;
        }
      }
      .blue_bg {
        background-color: #002d5b;
      }
      .red_bg {
        background-color: #8e0000;
      }
      .green_bg {
        background-color: #002d00;
      }
      .right_box {
        background-color: $white;
        height: 100%;
        float: left;
        width: calc(100% - 80px);
        .content {
          text-align: center;
          font-size: 1.5rem;
          height: 100%;
          &::after {
            display: inline-block;
            vertical-align: middle;
            content: '';
            height: 100%;
          }
        }
        .message {
          text-align: left;
          font-size: 1.1rem;
          padding-top: 15px;
          padding-left: 20%;
          span {
            font-size: 1.8rem;
            font-weight: 500;
          }
        }
      }
    }
  }
  .data_box {
    // height: 470px;
    padding: 15px 10px;
    background-color: $white;
    p {
      border-bottom: 1px solid #ccc;
      padding-bottom: 10px;
      font-size: 18px;
      margin-left: 10px;
    }
    #packageNum {
      div {
        width: 100% !important;
        height: 100% !important;
      }
    }
  }
  .box_echarts {
    margin-top: 10px;
    el-col {
      background-color: #fff;
    }
    .leftEcharts {
      height: 450px;
      min-height: 40vh;
    }
  }
}
</style>
