<template>
  <el-dialog
    :title="$t('选择退款商品')"
    :visible="visibleRefund"
    width="71%"
    :before-close="handleClose">
    <div class="top">
      <span>{{`${$t('已选')} ${selectList.length} ${$t('件商品')},${$t('将退款')} €${refundMoney}`}}</span>
      <el-input style="width: 270px">
        <template slot="append">{{$t('搜索')}}</template>
      </el-input>
    </div>
    <el-table
      :header-cell-style="{background:'#F7F7F7'}"
      :data="tableData"
      ref="tableData"
      row-key="id"
      style="width: 100%"
      @selection-change="zqy()">
      <el-table-column
        type="selection"
        width="55"/>
      <el-table-column
        prop="date"
        :label="$t('商品图片')"
        width="180">
      </el-table-column>
      <el-table-column
        prop="name"
        :label="$t('商品名称')"
        width="180">
      </el-table-column>
      <el-table-column
        prop="address"
        :label="$t('商品编号')">
      </el-table-column>
      <el-table-column
        prop="date"
        :label="$t('EAN')"
        width="180">
      </el-table-column>
      <el-table-column
        prop="name"
        :label="$t('规格')">
      </el-table-column>
      <el-table-column
        prop="address"
        :label="$t('单价')">
      </el-table-column>
      <el-table-column
        prop="date"
        :label="$t('数量')">
        <template slot-scope="scope">
          <el-input size="small"/>
        </template>
      </el-table-column>
      <el-table-column
        prop="num"
        :label="$t('实付')">
      </el-table-column>
    </el-table>
    <span slot="footer" class="dialog-footer">
      <el-button @click="visibleRefund = false">{{$t('取消')}}</el-button>
      <el-button type="primary" @click="visibleRefund = false">{{$t('确定')}}</el-button>
    </span>
  </el-dialog>
</template>

<script>
export default {
  name: 'orderRefundDialog',
  props: {
    visible: {
      type: Boolean,
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
      tableData: [{
        id: 1,
        date: '图片',
        name: '上海青',
        address: 'EWDQ1232FDDSF1221213',
        num: 10.00
      }, {
        id: 2,
        date: '图片',
        name: '白菜',
        address: 'QQ11278218ff198',
        num: 5.00
      }, {
        id: 3,
        date: '图片',
        name: '辣椒',
        address: 'QER165453232323',
        num: 2.68
      }, {
        id: 4,
        date: '图片',
        name: '茄子',
        address: 'JQR121232677887',
        num: 4.36
      }],
      selectList: [], // 选中的商品
      refundMoney: 0 // 退款金额
    }
  },
  methods: {
    handleClose() {
      this.visibleRefund = false
    },
    zqy() {
      this.selectList = this.$refs.tableData.selection // 选中的退款商品
      this.refundMoney = this.selectList.reduce((sum3, obj) => (sum3 += obj.num), 0) // 计算选中的退款商品总价
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
