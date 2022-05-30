<template>
  <div>
    <el-dialog
      title="选择退款商品"
      :visible="visibleRefund"
      width="71%"
      :before-close="handleClose">
      <div class="top">
        <span>已选 1 件商品，将退款€2.50</span>
        <el-input style="width: 270px">
          <template slot="append">搜索</template>
        </el-input>
      </div>
      <el-table
        :header-cell-style="{background:'#F7F7F7'}"
        :data="tableData"
        style="width: 100%">
        <el-table-column
          type="selection"
          width="55"/>
        <el-table-column
          prop="date"
          label="商品图片"
          width="180">
        </el-table-column>
        <el-table-column
          prop="name"
          label="商品名称"
          width="180">
        </el-table-column>
        <el-table-column
          prop="address"
          label="商品编号">
        </el-table-column>
        <el-table-column
          prop="date"
          label="EAN"
          width="180">
        </el-table-column>
        <el-table-column
          prop="name"
          label="规格">
        </el-table-column>
        <el-table-column
          prop="address"
          label="单价">
        </el-table-column>
        <el-table-column
          prop="date"
          label="数量">
          <template slot-scope="scope">
            <el-input size="small"/>
          </template>
        </el-table-column>
        <el-table-column
          prop="name"
          label="实付">
        </el-table-column>
      </el-table>
      <span slot="footer" class="dialog-footer">
      <el-button @click="visibleRefund = false">取 消</el-button>
      <el-button type="primary" @click="visibleRefund = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    name: 'orderRefundDialog',
    props: {
      visible: {
        type: Boolean,
        require: true,
      },
    },
    computed: {
      visibleRefund: {
        get() {
          return this.visible
        },
        set(val) {
          this.$emit('update:visible', val)
        },
      },
    },
    data() {
      return {
        tableData: [{
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄'
        }, {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        }]
      }
    },
    methods: {
      handleClose() {
        this.visibleRefund = false
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
