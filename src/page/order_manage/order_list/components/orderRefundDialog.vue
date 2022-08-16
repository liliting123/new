<template>
  <el-dialog
    :title="$t('选择退款商品')"
    :visible="visibleRefund"
    width="71%"
    :before-close="handleClose"
  >
    <div class="top">
      <span>{{
        `${$t('已选')} ${selectList.length} ${$t('件商品')},${$t(
          '将退款'
        )} €${refundMoney}`
      }}</span>
      <el-input v-model="inputValue" style="width: 270px">
        <el-button slot="append" @click="getList()">{{ $t('搜索') }}</el-button>
      </el-input>
    </div>
    <el-table
      :header-cell-style="{ background: '#F7F7F7' }"
      :data="shopDatas"
      ref="shopDatas"
      row-key="id"
      style="width: 100%"
      @selection-change="selectShops()"
    >
      <el-table-column type="selection" width="55" />
      <el-table-column :label="$t('商品图片')">
        <template slot-scope="scope">
          <img :src="scope.row.cover" width="100" height="100" alt="商品图片" />
        </template>
      </el-table-column>
      <el-table-column prop="name" :label="$t('商品名称')"> </el-table-column>
      <el-table-column prop="code" :label="$t('商品编号')"> </el-table-column>
      <el-table-column prop="ean" label="EAN"> </el-table-column>
      <el-table-column prop="spec_name" :label="$t('规格')"> </el-table-column>
      <el-table-column prop="price" :label="$t('单价')"> </el-table-column>
      <el-table-column :label="$t('数量')">
        <template slot-scope="scope">
          <el-input
            type="number"
            :max="scope.row.num"
            min="1"
            size="small"
            v-model="scope.row.num"
          />
        </template>
      </el-table-column>
      <el-table-column prop="payment_fee" :label="$t('实付')"> </el-table-column>
    </el-table>
    <span slot="footer" class="dialog-footer">
      <PaginationAndButtons :pageParams="page_params" />

      <el-button @click="visibleRefund = false">{{ $t('取消') }}</el-button>
      <el-button type="primary" @click="orderRefund()">{{ $t('确定') }}</el-button>
    </span>
  </el-dialog>
</template>

<script>
import PaginationAndButtons from '@/components/pagination_and_buttons.vue'
import pagination from '@/mixin/pagination.js'

export default {
  mixins: [pagination],
  components: {
    PaginationAndButtons
  },
  name: 'orderRefundDialog',
  props: {
    visible: {
      type: Boolean,
      require: true
    },

    ids: {
      type: Number,
      require: true
    }
  },
  computed: {
    visibleRefund: {
      get() {
        return this.visible
      },
      set(val) {
        this.$emit('update:visible', val)
      }
    }
  },
  data() {
    return {
      selectList: [], // 选中的商品
      refundMoney: 0, // 退款金额
      itemShop: [], // 选中的退款商品
      inputValue: '',
      shopDatas: []
    }
  },

  mounted() {
    this.getList()
  },
  methods: {
    getList() {
      this.$http
        .get(`api/shop/order/order_item/info/${this.ids}`, {
          params: {
            page: this.page_params.page,
            size: this.page_params.size,
            order_id: this.ids,
            keyword: this.inputValue
          }
        })
        .then(res => {
          this.page_params.total = res.data.total

          this.shopDatas = res.data.data
        })
    },
    handleClose() {
      this.visibleRefund = false
    },
    selectShops() {
      this.selectList = this.$refs.shopDatas.selection // 选中的退款商品
      console.log(this.selectList)
      this.selectList.forEach(item => {
        this.itemShop.push({
          order_item_id: item.order_id,
          num: item.num,
          refund_fee: item.payment_fee
        })
      })
      this.refundMoney = this.selectList.reduce(
        (sum3, obj) => (sum3 += Number(obj.payment_fee)),
        0
      ) // 计算选中的退款商品总价
    },

    // 退款
    async orderRefund() {
      console.log(this.ids)
      const res = await this.$http.post(
        `api/shop/order_refund/store_refund/${this.ids}`,
        {
          apply_fee: this.refundMoney,
          item: this.itemShop
        }
      )
      if (res.ret === 1) {
        this.$notify({
          title: this.$t('success'),
          message: res.msg,
          type: 'success'
        })
        this.visibleRefund = false
      } else {
        this.visibleRefund = true
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.top {
  height: 40px;
  display: flex;
  line-height: 40px;
  justify-content: space-between;
  margin-bottom: 15px;
  span {
    color: #1a79eb;
  }
}
</style>
