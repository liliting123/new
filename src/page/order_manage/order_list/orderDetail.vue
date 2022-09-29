<template>
  <div>
    <div class="info-top">
      <div class="title">{{ $t('基本信息') }}</div>
      <div class="content">
        <div class="conten-item">
          <span>{{ $t('会员名称') }}:</span>
          <el-input v-model="basic_Info.name" :disabled="true"> </el-input>
        </div>
      </div>
      <div class="content">
        <div class="conten-item">
          <span>{{ $t('会员ID') }}:</span>
          <el-input v-model="basic_Info.vip_id" :disabled="true"> </el-input>
        </div>
      </div>
      <div class="content">
        <div class="conten-item">
          <span>{{ $t('会员邮箱') }}:</span>
          <el-input v-model="email" :disabled="true"> </el-input>
        </div>
      </div>
      <div class="content">
        <div class="conten-item">
          <span>{{ $t('收银员') }}:</span>
          <el-input v-model="cashier" :disabled="true"> </el-input>
        </div>
      </div>
      <div class="content">
        <div class="conten-item">
          <span>{{ $t('订单编号') }}:</span>
          <el-input v-model="basic_Info.code" :disabled="true"> </el-input>
        </div>
      </div>
      <div class="content">
        <div class="conten-item">
          <span>{{ $t('订单金额') }}:</span>
          <el-input v-model="basic_Info.total_fee" :disabled="true">
            <i slot="prefix" style="line-height: 40px;margin-left:10px">€</i>
          </el-input>
        </div>
      </div>
      <div class="content">
        <div class="conten-item">
          <span>{{ $t('订单状态') }}:</span>
          <el-input v-model="status_id" :disabled="true"> </el-input>
        </div>
      </div>
      <div class="content">
        <div class="conten-item">
          <span>{{ $t('支付方式') }}:</span>
          <el-input v-model="paymentName" :disabled="true"> </el-input>
        </div>
      </div>
    </div>
    <div class="info-top">
      <div class="title">
        <span>{{ $t('商品信息') }}</span>
        <span v-if="basic_Info.payment_time"
          >{{ $t('操作时间') }}:{{ basic_Info.payment_time }}</span
        >
      </div>
      <div class="table">
        <el-table
          :header-cell-style="{ background: '#F7F7F7' }"
          :data="basic_Info.item"
          style="width: 100%"
        >
          <el-table-column prop="date" :label="$t('商品图片')" width="180">
            <template slot-scope="scope">
              <img :src="scope.row.cover" alt="商品图片" width="100" height="100" />
            </template>
          </el-table-column>
          <el-table-column prop="name" :label="$t('商品名称')" width="180">
          </el-table-column>
          <el-table-column prop="goods_id" :label="$t('商品编号')"> </el-table-column>
          <el-table-column prop="ean" :label="$t('EAN')" width="180"> </el-table-column>
          <el-table-column prop="spec_name" :label="$t('规格')" width="180">
          </el-table-column>
          <el-table-column :label="$t('单价')">
            <template slot-scope="scope"> € {{ scope.row.price }} </template>
          </el-table-column>
          <el-table-column prop="num" :label="$t('数量')" width="180"> </el-table-column>
          <el-table-column :label="$t('实付')" width="180">
            <template slot-scope="scope"> € {{ scope.row.payment_fee }} </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="bottom-text">
        <span>{{ $t('总计') }}:€{{ basic_Info.payment_fee }}</span>
        <span
          >{{ $t('改价') }}:€{{
            (basic_Info.cash && basic_Info.cash.payment_fee) || '0.00'
          }}</span
        >
        <span
          >{{ $t('找零') }}:€{{
            (basic_Info.cash && basic_Info.cash.change_fee) || '0.00'
          }}</span
        >
        <span
          >{{ $t('实收') }}:€{{
            (basic_Info.cash && basic_Info.cash.received_fee) || '0.00'
          }}</span
        >
      </div>
    </div>
    <div class="info-top" v-for="itemRefund in refundTable" :key="itemRefund.id">
      <div class="title">
        <span>{{ $t('退款记录') }}</span>
        <span>{{ $t('操作时间') }}:{{ itemRefund.audit_time }}</span>
      </div>
      <div class="table">
        <el-table
          :header-cell-style="{ background: '#F7F7F7' }"
          :data="itemRefund.item"
          style="width: 100%"
        >
          <el-table-column prop="date" :label="$t('商品图片')" width="180">
            <template slot-scope="scope">
              <img :src="scope.row.item.cover" alt="商品图片" width="100" height="100" />
            </template>
          </el-table-column>
          <el-table-column prop="item.name" :label="$t('商品名称')" width="180">
          </el-table-column>
          <el-table-column prop="item.goods_id" :label="$t('商品编号')">
          </el-table-column>
          <el-table-column prop="item.ean" :label="$t('EAN')" width="180">
          </el-table-column>
          <el-table-column prop="item.spec_name" :label="$t('规格')" width="180">
          </el-table-column>
          <el-table-column prop="item.price" :label="$t('单价')"> </el-table-column>
          <el-table-column prop="item.num" :label="$t('数量')" width="180">
          </el-table-column>
          <el-table-column prop="item.payment_fee" :label="$t('退款金额')" width="180">
          </el-table-column>
        </el-table>
      </div>
      <div class="bottom-sum">
        <span>{{ $t('总计') }}:€{{ itemRefund.refund_fee }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'orderDetail',
  data() {
    return {
      goods_Info: [],
      basic_Info: {},
      refundTable: [], // 仅显示退款成功的记录
      email: '',
      cashier: '',
      paymentName: '',
      orderStatus: ''
    }
  },
  computed: {
    status_id() {
      return this.basic_Info.status_id === 0
        ? this.$t('未付款')
        : this.basic_Info.status_id === 1
        ? this.$t('已付款')
        : this.$t('已退款')
    }
  },

  mounted() {
    this.getDetail()
  },
  methods: {
    getDetail() {
      this.$http.get(`api/shop/order/${this.$route.params.id}`).then(res => {
        this.basic_Info = res.data
        this.refundTable = this.basic_Info.refund.filter(item => {
          return item.status_id === 1
        })
        this.goods_Info = res.data.item
        this.email = res.data.staff.email
        this.cashier = res.data.staff.name
        this.paymentName = res.data.payment ? res.data.payment.name : ''
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.info-top {
  background: #ffffff;
  border-radius: 8px;
  margin-top: 10px;
  .title {
    padding: 20px;
    line-height: 15px;
    font-weight: bold;
    border-bottom: 1px solid rgba(196, 196, 196, 0.76);
    display: flex;
    justify-content: space-between;
  }
  .content {
    display: inline-block;
    padding: 20px;
    width: 417px;
    .conten-item {
      span {
        display: inline-block;
        margin-bottom: 10px;
      }
    }
  }
  .table {
    padding: 20px;
  }
  .bottom-text {
    height: 50px;
    line-height: 30px;
    display: flex;
    justify-content: space-around;
    font-size: 16px;
    font-weight: bold;
  }
  .bottom-sum {
    height: 50px;
    line-height: 30px;
    font-size: 16px;
    font-weight: bold;
    margin-left: 87%;
  }
}
</style>
