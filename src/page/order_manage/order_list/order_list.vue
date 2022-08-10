<template>
  <div>
    <!--    筛选条件-->
    <search-list>
      <div slot="left">
        <el-date-picker
          v-model="slectTime"
          type="daterange"
          :range-separator="$t('至')"
          :start-placeholder="$t('开始日期')"
          :end-placeholder="$t('结束日期')"
        >
        </el-date-picker>
        <el-select
          style="margin-left: 20px;"
          v-model="customerValue"
          :placeholder="$t('客户来源')"
        >
          <el-option
            v-for="item in customerSelect"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
        <el-select
          style="margin-left: 20px;"
          v-model="orderValue"
          :placeholder="$t('订单状态')"
        >
          <el-option
            v-for="item in orderSelect"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
        <el-select
          style="margin-left: 20px;"
          v-model="paymentValue"
          :placeholder="$t('支付方式')"
        >
          <el-option
            v-for="item in paymentSelect"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </div>
      <div slot="right">
        <el-input v-model="inputValue" class="input-with-select">
          <el-select
            v-model="orderNoValue"
            slot="prepend"
            :placeholder="$t('订单编号')"
            style="width:120px"
          >
            <el-option
              v-for="item in orderNoSelect"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
          <el-button slot="append" @click="getList()">{{ $t('搜索') }}</el-button>
        </el-input>
      </div>
    </search-list>
    <!--    table列表-->
    <div class="table_list">
      <el-table
        class="order-table"
        :header-cell-style="{ background: '#F7F7F7' }"
        :data="tableData"
        style="width: 100%;margin-bottom: 20px;"
        row-key="id"
        :default-expand-all="false"
        :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
      >
        <el-table-column type="expand">
          <template slot-scope="scope">
            <el-table
              :header-cell-style="{ background: '#F7F7F7' }"
              :data="scope.row.item"
              style="width: 90%;margin-left: 50px"
            >
              <el-table-column :label="$t('商品图片')">
                <template slot-scope="scope">
                  <img :src="scope.row.cover" width="100" height="100" alt="商品图片" />
                </template>
              </el-table-column>
              <el-table-column prop="goods_name" :label="$t('商品名称')">
              </el-table-column>
              <el-table-column prop="goods_id" :label="$t('商品编号')"> </el-table-column>
              <el-table-column prop="ean" label="EAN"> </el-table-column>
              <el-table-column prop="spec_name" :label="$t('规格')"> </el-table-column>
              <el-table-column prop="price" :label="$t('单价')"> </el-table-column>
              <el-table-column prop="num" :label="$t('数量')"> </el-table-column>
              <el-table-column prop="payment_fee" :label="$t('实付')"> </el-table-column>
            </el-table>
          </template>
        </el-table-column>
        <el-table-column prop="name" :label="$t('会员名称')" width="180">
        </el-table-column>
        <el-table-column prop="vip_id" :label="$t('会员ID')"> </el-table-column>
        <el-table-column prop="code" :label="$t('订单编号')"> </el-table-column>
        <el-table-column prop="status_id" :label="$t('订单状态')"> </el-table-column>
        <el-table-column prop="total_fee" :label="$t('订单金额')"> </el-table-column>
        <el-table-column prop="source" :label="$t('客户来源')"> </el-table-column>
        <el-table-column prop="staff.name" :label="$t('收银员')"> </el-table-column>
        <el-table-column prop="payment.name" :label="$t('支付方式')"> </el-table-column>
        <el-table-column prop="payment_time" :label="$t('支付时间')"> </el-table-column>
        <el-table-column :label="$t('操作')" width="150">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="showOrderDetail(scope.row.id)">{{
              $t('查看')
            }}</el-button>
            <el-button type="text" size="small" @click="showDiglog(scope.row.id)">{{
              $t('退款')
            }}</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <PaginationAndButtons :pageParams="page_params" />
    <orderRefundDialog
      v-if="visibleOrderRefund"
      :visible.sync="visibleOrderRefund"
      :shopData.sync="shopDatas"
      :ids="orderId"
    />
  </div>
</template>
<script>
import PaginationAndButtons from '@/components/pagination_and_buttons.vue'
import pagination from '@/mixin/pagination.js'
import searchList from '@/components/searchList.vue'
import orderRefundDialog from './components/orderRefundDialog.vue'
export default {
  name: 'orderList',
  mixins: [pagination],
  components: {
    searchList,
    PaginationAndButtons,
    orderRefundDialog
  },
  data() {
    return {
      slectTime: '',
      customerSelect: [
        {
          label: this.$t('客户来源')
        },
        {
          value: '1',
          label: this.$t('散客')
        },
        {
          value: '2',
          label: this.$t('会员')
        }
      ],
      orderSelect: [
        {
          label: this.$t('订单状态')
        },
        {
          value: '1',
          label: this.$t('已支付')
        },
        {
          value: '2',
          label: this.$t('退款成功')
        }
      ],
      paymentSelect: [
        {
          label: this.$t('支付方式')
        },
        {
          value: '1',
          label: this.$t('现金')
        },
        {
          value: '2',
          label: this.$t('余额')
        },
        {
          value: '3',
          label: this.$t('银行卡')
        }
      ],
      orderNoSelect: [
        {
          value: this.$t('订单编号')
        },
        {
          value: '1',
          label: this.$t('会员名称')
        },
        {
          value: '2',
          label: this.$t('收银员')
        },
        {
          value: '3',
          label: this.$t('商品编号')
        }
      ],
      customerValue: '',
      orderValue: '',
      paymentValue: '',
      orderNoValue: '',
      inputValue: '',
      tableData: [],
      visibleOrderRefund: false,
      shopDatas: [],
      orderId: ''
    }
  },
  mounted() {
    this.getList()
  },
  methods: {
    // 跳转订单详情
    showOrderDetail(id) {
      this.$router.push({
        path: 'orderDetail',
        query: { id: id }
      })
    },
    // 退款弹窗
    showDiglog(id) {
      this.visibleOrderRefund = true
      this.$http.get(`api/shop/order/${id}`).then(res => {
        this.shopDatas = res.data.item
        this.orderId = id
      })
    },
    getList() {
      this.tableLoading = true
      this.$http
        .get('api/shop/order', {
          params: {
            page: this.page_params.page,
            size: this.page_params.size,
            keyword: this.inputValue,
            status_id: this.orderValue
          }
        })
        .then(res => {
          this.page_params.total = res.data.total
          this.tableData = res.data.data
        })
        .catch(() => {
          this.tableLoading = false
        })
    }
  }
}
</script>
<style lang="scss" scoped>
.input-with-select {
  width: 400px;
}
.order-table {
  border-radius: 8px;
}
/deep/.el-input-group__prepend {
  width: 100px;
  background: white;
  padding: 0 10px;
}
/deep/.el-select {
  display: inline-block;
  position: relative;
}
/deep/.el-date-editor .el-range-separator {
  padding: 0 0px;
}
</style>
