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
          @change="getShopHome"
        />
      </div>
      <div class="data_box border-radius">
        <p>{{ $t('整体情况') }}</p>
        <el-descriptions style="padding:16px" :column="6" direction="vertical">
          <el-descriptions-item :label="$t('销售金额')"
            >€{{
              Number(overallSituation.total_order_fee).toFixed(2)
            }}</el-descriptions-item
          >
          <el-descriptions-item :label="$t('下单数量')">{{
            overallSituation.total_order_num
          }}</el-descriptions-item>
          <el-descriptions-item :label="$t('客单价')"
            >€{{ overallSituation.average_fee }}</el-descriptions-item
          >
          <el-descriptions-item :label="$t('会员人数')">{{
            overallSituation.vip_count
          }}</el-descriptions-item>
          <el-descriptions-item :label="$t('散客人数')">{{
            overallSituation.customer_count
          }}</el-descriptions-item>
          <el-descriptions-item :label="$t('总人数')">
            {{ overallSituation.user_count }}</el-descriptions-item
          ><br />
          <el-descriptions-item :label="$t('余额支付金额')"
            >€{{
              Number(overallSituation.total_balance_fee).toFixed(2)
            }}</el-descriptions-item
          >
          <el-descriptions-item :label="$t('余额支付单量')">{{
            overallSituation.total_balance_num
          }}</el-descriptions-item>
          <el-descriptions-item :label="$t('余额占比率')"
            >{{ Number(overallSituation.balance_rate).toFixed(2) }}%</el-descriptions-item
          >
          <el-descriptions-item :label="$t('退款金额')"
            >€{{ Number(overallSituation.refund_fee).toFixed(2) }}</el-descriptions-item
          >
          <el-descriptions-item :label="$t('退款单数')">{{
            overallSituation.refund_num
          }}</el-descriptions-item>
          <el-descriptions-item :label="$t('退款率')"
            >{{ Number(overallSituation.refund_rate).toFixed(2) }}%</el-descriptions-item
          >
        </el-descriptions>
      </div>

      <div class="box_echarts">
        <el-row :gutter="10">
          <el-col :md="12" :sm="12">
            <div class="leftEcharts data_box border-radius" style="background:#fff">
              <p>{{ $t('商品销量前十') }}</p>
              <div
                id="echartShop"
                ref="shopSales"
                style="width: 100%; height: 100%;text-align:center;top: 0;"
              ></div>
              <img
                ref="shopSalesNoDaTaImg"
                style="display:none;margin: auto;"
                src="../../assets/images/noData.png"
                alt=""
              />
            </div>
          </el-col>
          <el-col :md="12" :sm="12">
            <div class="leftEcharts data_box border-radius" style="background:#fff">
              <p>{{ $t('会员消费前十') }}</p>
              <div
                id="echartUser"
                ref="vipuser"
                style="width: 100%; height: 100%;text-align:center;top: 0;
            "
              ></div>
              <img
                ref="vipUserNoDaTaImg"
                style="display:none;margin: auto;"
                src="../../assets/images/noData.png"
                alt=""
              />
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
  name: 'homeList',
  components: { MyTitle },
  data() {
    return {
      vip_msg: {},
      overallSituation: {},
      myCharts: {},
      time: '',
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > +new Date() + 24 * 60 * 60 * 1000
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
      },
      goodData: [],
      vipData: []
    }
  },

  activated() {
    this.getShopHome()
    // setTimeout(() => {
    //   // this.initCharts()
    //   this.setCharts()
    //   console.log('mouited')
    // }, 500)
    // 切换界面时有概率echarts图表会变得很小,强行等待100毫秒让dom生成
  },

  methods: {
    async getShopHome() {
      const res = await this.$http.get(`api/shop/home`, {
        params: {
          created_at_start: this.time ? this.time[0] : '',
          created_at_end: this.time ? this.time[1] : ''
        }
      })
      if (res.ret) {
        this.overallSituation = res.data

        this.goodData = []
        for (let res in this.overallSituation.goods_sale) {
          var toolObj = {
            price: '',
            value: '',
            name: ''
          }
          toolObj.price = this.overallSituation.goods_sale[res].price
          toolObj.value = this.overallSituation.goods_sale[res].sold_num
          toolObj.name = this.overallSituation.goods_sale[res].name
          this.goodData.push(toolObj)
        }
        this.vipData = []
        for (let i in this.overallSituation.vip_ranking) {
          var vipToolObj = {
            vip_id: '',
            value: '',
            count: ''
          }
          vipToolObj.vip_id = this.overallSituation.vip_ranking[i].vip_id
          vipToolObj.value = this.overallSituation.vip_ranking[i].payment_fee
          vipToolObj.count = this.overallSituation.vip_ranking[i].count
          this.vipData.push(vipToolObj)
        }
        setTimeout(() => {
          this.setCharts(this.overallSituation)
        }, 500)
      }
    },
    setCharts(data) {
      const _this = this
      var myChartShop = echarts.init(document.getElementById('echartShop'))
      var myChartUser = echarts.init(document.getElementById('echartUser'))
      // 基于准备好的dom，初始化echarts实例
      _this.$nextTick(() => {
        window.onresize = function() {
          var myChartShop = echarts.init(document.getElementById('echartShop'))
          var myChartUser = echarts.init(document.getElementById('echartUser'))
          myChartShop.resize()
          myChartUser.resize()
        }
      })
      // 指定图表的配置项和数据

      var shopOption
      if (data.goods_sale.length === 0) {
        shopOption = {
          // title: {
          //   text: '暂无数据',
          //   x: 'center',
          //   y: 'center',
          //   textStyle: {
          //     color: '#000',
          //     fontWeight: 'normal',
          //     fontSize: 16
          //   }
          // }
        }
        this.$nextTick(() => {
          var domShopSales = this.$refs.shopSales
          domShopSales.style.display = 'none'
          var isShopSalesNoDaTaImg = this.$refs.shopSalesNoDaTaImg
          isShopSalesNoDaTaImg.style.display = 'block'
        })
      } else {
        this.$nextTick(() => {
          var domShopSales = this.$refs.shopSales
          domShopSales.style.display = 'block'
          var isShopSalesNoDaTaImg = this.$refs.shopSalesNoDaTaImg
          isShopSalesNoDaTaImg.style.display = 'none'
        })
        shopOption = {
          color: ['#409EFF'], // 柱子颜色
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
            extraCssText: 'text-align: left;',
            formatter: function(data) {
              var val =
                _this.$t('商品名称') +
                '：' +
                data[0]['data'].name +
                '<br>' +
                _this.$t('商品价格') +
                '：€' +
                data[0]['data'].price +
                '<br>' +
                _this.$t('商品销量') +
                '：' +
                data[0]['data'].value
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
            data: data.goods_sale.map(item => item.code).splice(0, 10)
          },
          series: [
            {
              name: '',
              type: 'bar',
              data: this.goodData
            }
          ]
        }
      }
      var consumptionOption
      if (data.vip_ranking.length === 0) {
        consumptionOption = {
          // title: {
          //   text: '暂无数据',
          //   x: 'center',
          //   y: 'center',
          //   textStyle: {
          //     fontSize: 14,
          //     fontWeight: 'normal'
          //   }
          // }
        }
        this.$nextTick(() => {
          var domvipuser = this.$refs.vipuser
          domvipuser.style.display = 'none'
          var isVipUserNoDaTaImg = this.$refs.vipUserNoDaTaImg
          isVipUserNoDaTaImg.style.display = 'block'
        })
      } else {
        this.$nextTick(() => {
          var domvipuser = this.$refs.vipuser
          domvipuser.style.display = 'block'
          var isVipUserNoDaTaImg = this.$refs.vipUserNoDaTaImg
          isVipUserNoDaTaImg.style.display = 'none'
        })
        consumptionOption = {
          title: {
            text: ''
          },
          color: ['#409EFF'], // 柱子颜色
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
            extraCssText: 'text-align: left;',
            formatter: function(data) {
              var val =
                _this.$t('会员编号') +
                '：' +
                data[0]['data'].vip_id +
                '<br>' +
                _this.$t('下单次数') +
                '：' +
                data[0]['data'].count +
                '<br>' +
                _this.$t('消费金额') +
                '：€' +
                data[0]['data'].value
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
            data: data.vip_ranking.map(item => item.vip_id).splice(0, 10)
          },
          series: [
            {
              type: 'bar',
              data: this.vipData
            }
          ]
        }
      }
      // 使用刚指定的配置项和数据显示图表。
      myChartShop.setOption(shopOption)
      myChartUser.setOption(consumptionOption)
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
      margin-top: 7px;
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
