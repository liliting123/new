<template>
  <el-dialog
    title="已售记录"
    :visible="soldRecords"
    width="50%"
    :before-close="handleClose">
    <div class="top">
      <el-date-picker
        v-model="value1"
        type="daterange"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期">
      </el-date-picker>
    </div>
    <el-table
      :header-cell-style="{background:'#F7F7F7'}"
      :data="tableData"
      style="width: 100%">
      <el-table-column width="50" label="#">
        <template slot-scope="scope">
          <span class="table_index">1</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="date"
        label="订单号"
        width="180">
      </el-table-column>
      <el-table-column
        prop="name"
        label="已售数量">
      </el-table-column>
      <el-table-column
        prop="address"
        label="操作人">
      </el-table-column>
      <el-table-column
        prop="date"
        label="创建时间"
        width="180">
      </el-table-column>
      <el-table-column
        prop="name"
        label="操作">
        <template slot-scope="scope">
          <el-button type="text" @click="showDetail()">查看详情</el-button>
        </template>
      </el-table-column>
    </el-table>
    <span slot="footer" class="dialog-footer">
      <el-button @click="soldRecords = false">取 消</el-button>
      <el-button type="primary" @click="soldRecords = false">确 定</el-button>
      </span>
  </el-dialog>
</template>

<script>
export default {
  name: 'soldRecordsDialog',
  props: {
    visible: {
      type: Boolean,
      require: true
    }
  },
  computed: {
    soldRecords: {
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
      }],
      value1: ''
    }
  },
  methods: {
    // 跳转订单详情
    showDetail() {
      this.soldRecords = false
      this.$router.push({
        name: 'orderDetail'
      })
    },
    // 关闭弹窗
    handleClose() {
      this.soldRecords = false
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
  }
</style>
