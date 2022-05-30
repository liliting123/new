<template>
  <div>
    <div class="info-top">
      <div class="title">基本信息</div>
      <div class="content">
        <div class="conten-item">
          <span>会员名称:</span>
          <el-input
            placeholder="请输入内容"
            :disabled="true">
          </el-input>
        </div>
      </div>
      <div class="content">
        <div class="conten-item">
          <span>会员ID:</span>
          <el-input
            placeholder="请输入内容"
            :disabled="true">
          </el-input>
        </div>
      </div>
      <div class="content">
        <div class="conten-item">
          <span>会员邮箱:</span>
          <el-input
            placeholder="请输入内容"
            :disabled="true">
          </el-input>
        </div>
      </div>
      <div class="content">
        <div class="conten-item">
          <span>收银员:</span>
          <el-input
            placeholder="请输入内容"
            :disabled="true">
          </el-input>
        </div>
      </div>
      <div class="content">
        <div class="conten-item">
          <span>订单编号:</span>
          <el-input
            placeholder="请输入内容"
            :disabled="true">
          </el-input>
        </div>
      </div>
      <div class="content">
        <div class="conten-item">
          <span>订单金额:</span>
          <el-input
            placeholder="请输入内容"
            :disabled="true">
          </el-input>
        </div>
      </div>
      <div class="content">
        <div class="conten-item">
          <span>订单状态:</span>
          <el-input
            placeholder="请输入内容"
            :disabled="true">
          </el-input>
        </div>
      </div>
      <div class="content">
        <div class="conten-item">
          <span>支付方式:</span>
          <el-input
            placeholder="请输入内容"
            :disabled="true">
          </el-input>
        </div>
      </div>
    </div>
    <div class="info-top">
      <div class="title">
        <span>商品信息</span>
        <span>操作时间：2022.05.27 12:00:00</span>
      </div>
      <div class="table">
        <el-table
          :header-cell-style="{background:'#F7F7F7'}"
          :data="tableData"
          style="width: 100%">
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
            label="规格"
            width="180">
          </el-table-column>
          <el-table-column
            prop="address"
            label="单价">
          </el-table-column>
          <el-table-column
            prop="date"
            label="数量"
            width="180">
          </el-table-column>
          <el-table-column
            prop="name"
            label="实付"
            width="180">
          </el-table-column>
        </el-table>
      </div>
      <div class="bottom-text">
        <span>总计:</span>
        <span>改价:</span>
        <span>找零:</span>
        <span>实收:</span>
      </div>
    </div>
    <div class="info-top">
      <div class="title">
        <span>退款记录</span>
        <span>操作时间：2022.05.27 12:00:00</span>
      </div>
      <div class="table">
        <el-table
          :header-cell-style="{background:'#F7F7F7'}"
          :data="tableData"
          style="width: 100%">
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
            label="规格"
            width="180">
          </el-table-column>
          <el-table-column
            prop="address"
            label="单价">
          </el-table-column>
          <el-table-column
            prop="date"
            label="数量"
            width="180">
          </el-table-column>
          <el-table-column
            prop="name"
            label="退款金额"
            width="180">
          </el-table-column>
        </el-table>
      </div>
      <div class="bottom-sum">
          <span>总计:</span>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'orderDetail',
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
    justify-content:  space-around;
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
