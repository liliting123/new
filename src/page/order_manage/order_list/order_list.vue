<template>
  <div>
<!--    筛选条件-->
    <search-list>
      <div slot="left">
        <el-date-picker
          v-model="value1"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期">
        </el-date-picker>
        <el-select
          v-model="value"
          placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
        <el-select
          v-model="value"
          placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
        <el-select
          v-model="value"
          placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </div>
      <div slot="right">
        <el-input
          placeholder="请输入内容"
          v-model="input3"
          class="input-with-select">
          <el-select v-model="select" slot="prepend" placeholder="请选择" >
            <el-option label="餐厅名" value="1"></el-option>
            <el-option label="订单号" value="2"></el-option>
            <el-option label="用户电话" value="3"></el-option>
          </el-select>
          <el-button slot="append">搜索</el-button>
        </el-input>
      </div>
    </search-list>
<!--    table列表-->
    <div class="table_list">
      <el-table
        class="order-table"
        :header-cell-style="{background:'#F7F7F7'}"
        :data="tableData"
        style="width: 100%;margin-bottom: 20px;"
        row-key="id"
        border
        :default-expand-all="false"
        :tree-props="{children: 'children', hasChildren: 'hasChildren'}">
        <el-table-column type="expand">
          <template slot-scope="props">
            <el-table :header-cell-style="{background:'#F7F7F7'}" :data="tableData" border style="width: 80%;margin-left: 48px">
              <el-table-column prop="name" label="商品图片">
              </el-table-column>
              <el-table-column prop="name" label="价格">
              </el-table-column>
              <el-table-column prop="address" label="数量"> </el-table-column>
              <el-table-column prop="name" label="库存"> </el-table-column>
              <el-table-column prop="address" label="操作"> </el-table-column>
            </el-table>
          </template>
        </el-table-column>
        <el-table-column
          prop="date"
          label="日期"
          sortable
          width="180">
        </el-table-column>
        <el-table-column
          prop="name"
          label="姓名"
          sortable
          width="180">
        </el-table-column>
        <el-table-column
          prop="address"
          label="地址">
        </el-table-column>
        <el-table-column
          prop="address"
          label="操作"
          width="150">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="showOrderDetail()">查看</el-button>
            <el-button type="text" size="small" @click="showDiglog()">退款</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <orderRefundDialog
      :visible.sync="visibleOrderRefund"/>
  </div>
</template>
<script>
import searchList from '@/components/searchList.vue'
import orderRefundDialog from './components/orderRefundDialog.vue'
export default {
  name: 'orderList',
  components: {
    searchList,
    orderRefundDialog
  },
  data() {
    return {
      value1: '',
      options: [{
        value: '选项1',
        label: '黄金糕'
      }, {
        value: '选项2',
        label: '双皮奶'
      }, {
        value: '选项3',
        label: '蚵仔煎'
      }, {
        value: '选项4',
        label: '龙须面'
      }, {
        value: '选项5',
        label: '北京烤鸭'
      }],
      value: '',
      input1: '',
      input2: '',
      input3: '',
      select: '',
      tableData: [{
        id: 1,
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        id: 2,
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1517 弄'
      }, {
        id: 3,
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 弄'
      }, {
        id: 4,
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄'
      }],
      visibleOrderRefund: false
    }
  },
  methods: {
    // 跳转订单详情
    showOrderDetail() {
      this.$router.push({
        path: 'order_list/orderDetail'
      })
    },
    // 退款弹窗
    showDiglog() {
      this.visibleOrderRefund = true
    }
  }
}
</script>
<style scoped>
.input-with-select {
  width: 400px;
}
/deep/ .el-select {
  display: inline-block;
  position: relative;
  margin-left: 20px;
}
/deep/ .el-date-editor .el-range-separator {
  padding: 0 0px;
}
.order-table {
  border-radius: 8px;
}
</style>
