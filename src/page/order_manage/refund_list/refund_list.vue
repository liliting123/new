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
          v-model="refundValue"
          :placeholder="$t('退款状态')"
        >
          <el-option
            v-for="item in refundSelect"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
        <el-select
          style="margin-left: 20px;"
          v-model="IsRefundedValue"
          :placeholder="$t('是否已退款')"
        >
          <el-option
            v-for="item in IsRefundedSelect"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </div>
      <div slot="right">
        <el-input v-model="inputValue" class="input-with-select">
          <el-select v-model="orderNoValue" slot="prepend" :placeholder="$t('订单编号')">
            <el-option
              v-for="item in orderNoSelect"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
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
              style="width: 90%;margin-left: 48px"
            >
              <el-table-column :label="$t('商品图片')">
                <template slot-scope="scope">
                  <img
                    :src="scope.row.item.cover"
                    width="100"
                    height="100"
                    alt="商品图片"
                  />
                </template>
              </el-table-column>
              <el-table-column prop="item.name" :label="$t('商品名称')">
              </el-table-column>
              <el-table-column prop="item.code" :label="$t('商品编号')">
              </el-table-column>
              <el-table-column prop="item.ean" :label="$t('EAN')"> </el-table-column>
              <el-table-column prop="item.spec_name" :label="$t('规格')">
              </el-table-column>
              <el-table-column prop="item.price" :label="$t('单价')"> </el-table-column>
              <el-table-column prop="num" :label="$t('数量')"> </el-table-column>
              <el-table-column prop="refund_fee" :label="$t('退款金额')">
              </el-table-column>
            </el-table>
          </template>
        </el-table-column>
        <el-table-column prop="order.vip_id" :label="$t('会员ID')" width="130">
        </el-table-column>
        <el-table-column prop="order.id" :label="$t('订单编号')" width="180">
        </el-table-column>
        <el-table-column prop="status_id" :label="$t('退款状态')" width="130">
        </el-table-column>
        <el-table-column prop="refund_fee" :label="$t('退款金额')" width="180">
        </el-table-column>
        <el-table-column prop="remark" :label="$t('退款备注')"> </el-table-column>
        <el-table-column prop="created_at" :label="$t('申请时间')"> </el-table-column>
        <el-table-column prop="refund_return" :label="$t('是否已退款')" width="100">
        </el-table-column>
        <el-table-column prop="order.status_id" :label="$t('操作人')" width="100">
        </el-table-column>
        <el-table-column prop="address" :label="$t('操作')" width="200">
          <template slot-scope="scope">
            <el-button type="text" size="small">{{ $t('重推') }}</el-button>
            <el-button
              type="text"
              size="small"
              @click="confirmRefund(scope.row.order_id)"
              >{{ $t('确认已退款') }}</el-button
            >
            <el-button
              type="text"
              size="small"
              @click="refundDialog(scope.row.order_id)"
              >{{ $t('退款审核') }}</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
    <PaginationAndButtons :pageParams="page_params" />
    <!--    退款审核弹窗-->
    <el-dialog :title="$t('退款审核')" :visible.sync="dialogRefund" width="400px">
      <div style="padding: 0 40px 0 40px">
        <el-form :model="form" label-position="top" :rules="formRules">
          <el-form-item :label="`${$t('审核状态')}:`">
            <el-select style="width: 280px" v-model="form.status_id">
              <el-option :label="$t('成功')" :value="1" />
              <el-option :label="$t('失败')" :value="2" />
            </el-select>
          </el-form-item>
          <el-form-item :label="`${$t('退款金额')}:`" prop="refund_fee">
            <el-input v-model="form.refund_fee">
              <span slot="suffix" style="font-size: 16px">€</span>
            </el-input>
          </el-form-item>
          <el-form-item :label="`${$t('退款备注')}:`" prop="remark">
            <el-input type="textarea" :rows="3" v-model="form.remark"> </el-input>
          </el-form-item>
        </el-form>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogRefund = false">{{ $t('取消') }}</el-button>
        <el-button type="primary" @click="refundReview()">{{ $t('确定') }}</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import PaginationAndButtons from '@/components/pagination_and_buttons.vue'
import pagination from '@/mixin/pagination.js'
import searchList from '@/components/searchList.vue'
export default {
  name: 'refundList',
  mixins: [pagination],
  components: {
    PaginationAndButtons,
    searchList
  },
  data() {
    return {
      slectTime: '',
      refundSelect: [
        {
          value: '',
          label: this.$t('退款状态')
        },
        {
          value: '0',
          label: this.$t('退款成功')
        },
        {
          value: '1',
          label: this.$t('退款失败')
        },
        {
          value: '2',
          label: this.$t('待审核')
        }
      ],
      IsRefundedSelect: [
        {
          label: this.$t('退款状态')
        },
        {
          value: 0,
          label: this.$t('是')
        },
        {
          value: 1,
          label: this.$t('否')
        }
      ],
      orderNoSelect: [
        {
          value: 1,
          label: this.$t('订单编号')
        },
        {
          value: 2,
          label: this.$t('会员名称')
        },
        {
          value: 3,
          label: this.$t('会员ID')
        },
        {
          value: 4,
          label: this.$t('操作人')
        },
        {
          value: 5,
          label: this.$t('退款备注')
        },
        {
          value: 6,
          label: this.$t('商品编号')
        }
      ],
      refundValue: '',
      IsRefundedValue: '',
      orderNoValue: 1,
      inputValue: '',
      tableData: [],
      form: {
        status_id: 1,
        refund_fee: '',
        remark: ''
      },
      dialogRefund: false,
      formRules: {
        remark: [{ required: true, message: '请输入备注', trigger: 'blur' }],
        refund_fee: [{ required: true, message: '请输入退款金额', trigger: 'blur' }]
      },
      orderId: ''
    }
  },
  mounted() {
    this.getList()
  },
  methods: {
    getList() {
      this.$http
        .get('api/shop/order_refund', {
          params: {
            page: this.page_params.page,
            size: this.page_params.size,
            type_id: this.orderNoValue,
            keyword: this.inputValue,
            created_at_start: this.slectTime ? this.slectTime[0] : '',
            created_at_end: this.slectTime ? this.slectTime[1] : '',
            status_id: this.refundValue,
            refund_return: this.IsRefundedValue
          }
        })
        .then(res => {
          this.page_params.total = res.data.total
          this.tableData = res.data.data
        })
    },
    // 确认已退款
    confirmRefund(id) {
      this.$http.put(`api/shop/order_refund/${id}`).then(res => {
        if (res.ret) {
          this.$notify({
            title: this.$t('success'),
            message: res.msg,
            type: 'success'
          })
        }
      })
    },
    refundDialog(id) {
      this.dialogRefund = true
      this.orderId = id
    },
    // 退款审核
    refundReview() {
      this.$http
        .post(`/api/shop/order_refund/check/${this.orderId}`, {
          ...this.form
        })
        .then(res => {
          if (res.ret) {
            this.$notify({
              title: this.$t('success'),
              message: res.msg,
              type: 'success'
            })
            this.dialogRefund = false
            this.form = {}
          }
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
/deep/ .el-date-editor .el-range-separator {
  padding: 0 0px;
}
/deep/ .el-input-group__prepend {
  width: 100px;
  background: white;
  padding: 0 10px;
}
</style>
