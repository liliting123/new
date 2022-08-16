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
          <el-input v-model="basic_Info.total_fee" :disabled="true"> </el-input>
        </div>
      </div>
      <div class="content">
        <div class="conten-item">
          <span>{{ $t('订单状态') }}:</span>
          <el-input v-model="basic_Info.status_id" :disabled="true"> </el-input>
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
        <span>{{ $t('操作时间') }}:{{ basic_Info.payment_time }}</span>
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
          <el-table-column prop="goods_name" :label="$t('商品名称')" width="180">
          </el-table-column>
          <el-table-column prop="goods_id" :label="$t('商品编号')"> </el-table-column>
          <el-table-column prop="ean" :label="$t('EAN')" width="180"> </el-table-column>
          <el-table-column prop="spec_name" :label="$t('规格')" width="180">
          </el-table-column>
          <el-table-column prop="price" :label="$t('单价')"> </el-table-column>
          <el-table-column prop="num" :label="$t('数量')" width="180"> </el-table-column>
          <el-table-column prop="payment_fee" :label="$t('实付')" width="180">
          </el-table-column>
        </el-table>
      </div>
      <div class="bottom-text">
        <span>{{ $t('总计') }}:</span>
        <span>{{ $t('改价') }}:</span>
        <span>{{ $t('找零') }}:</span>
        <span>{{ $t('实收') }}:</span>
      </div>
    </div>
    <div class="info-top">
      <div class="title">
        <span>{{ $t('退款记录') }}</span>
        <span>{{ $t('操作时间') }}:2022.05.27 12:00:00</span>
      </div>
      <div class="table">
        <el-table
          :header-cell-style="{ background: '#F7F7F7' }"
          :data="basic_Info.refund"
          style="width: 100%"
        >
          <el-table-column prop="date" :label="$t('商品图片')" width="180">
            <template slot-scope="scope">
              <img
                :src="scope.row.item[0].item.cover"
                alt="商品图片"
                width="100"
                height="100"
              />
            </template>
          </el-table-column>
          <el-table-column
            prop="item[0].item.goods_name"
            :label="$t('商品名称')"
            width="180"
          >
          </el-table-column>
          <el-table-column prop="item[0].item.goods_id" :label="$t('商品编号')">
          </el-table-column>
          <el-table-column prop="item[0].item.ean" :label="$t('EAN')" width="180">
          </el-table-column>
          <el-table-column prop="item[0].item.spec_name" :label="$t('规格')" width="180">
          </el-table-column>
          <el-table-column prop="item[0].item.price" :label="$t('单价')">
          </el-table-column>
          <el-table-column prop="item[0].item.num" :label="$t('数量')" width="180">
          </el-table-column>
          <el-table-column
            prop="item[0].item.payment_fee"
            :label="$t('退款金额')"
            width="180"
          >
          </el-table-column>
        </el-table>
      </div>
      <div class="bottom-sum">
        <span>{{ $t('总计') }}:</span>
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
      email: '',
      cashier: '',
      paymentName: ''
    }
  },
  mounted() {
    this.getDetail()
  },
  methods: {
    getDetail() {
      this.$http.get(`api/shop/order/${this.$route.params.id}`).then(res => {
        console.log(res.data)
        this.basic_Info = res.data
        this.goods_Info = res.data.item
        this.email = res.data.staff.email
        this.cashier = res.data.staff.name
        this.paymentName = res.data.payment.name
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
