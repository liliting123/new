<template>
  <div>
    <div class="info-top">
      <div class="title">{{$t('基本信息')}}</div>
      <div class="content">
        <div class="conten-item">
          <span>{{$t('会员名称')}}:</span>
          <el-input
            placeholder="请输入内容"
            :disabled="true">
          </el-input>
        </div>
      </div>
      <div class="content">
        <div class="conten-item">
          <span>{{$t('会员ID')}}:</span>
          <el-input
            placeholder="请输入内容"
            :disabled="true">
          </el-input>
        </div>
      </div>
      <div class="content">
        <div class="conten-item">
          <span>{{$t('会员邮箱')}}:</span>
          <el-input
            placeholder="请输入内容"
            :disabled="true">
          </el-input>
        </div>
      </div>
      <div class="content">
        <div class="conten-item">
          <span>{{$t('收银员')}}:</span>
          <el-input
            placeholder="请输入内容"
            :disabled="true">
          </el-input>
        </div>
      </div>
      <div class="content">
        <div class="conten-item">
          <span>{{$t('订单编号')}}:</span>
          <el-input
            placeholder="请输入内容"
            :disabled="true">
          </el-input>
        </div>
      </div>
      <div class="content">
        <div class="conten-item">
          <span>{{$t('订单金额')}}:</span>
          <el-input
            placeholder="请输入内容"
            :disabled="true">
          </el-input>
        </div>
      </div>
      <div class="content">
        <div class="conten-item">
          <span>{{$t('订单状态')}}:</span>
          <el-input
            placeholder="请输入内容"
            :disabled="true">
          </el-input>
        </div>
      </div>
      <div class="content">
        <div class="conten-item">
          <span>{{$t('支付方式')}}:</span>
          <el-input
            placeholder="请输入内容"
            :disabled="true">
          </el-input>
        </div>
      </div>
    </div>
    <div class="info-top">
      <div class="title">
        <span>{{$t('商品信息')}}</span>
        <span>{{$t('操作时间')}}：2022.05.27 12:00:00</span>
      </div>
      <div class="table">
        <el-table
          :header-cell-style="{background:'#F7F7F7'}"
          :data="tableData"
          style="width: 100%">
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
            :label="$t('规格')"
            width="180">
          </el-table-column>
          <el-table-column
            prop="address"
            :label="$t('单价')">
          </el-table-column>
          <el-table-column
            prop="date"
            :label="$t('数量')"
            width="180">
          </el-table-column>
          <el-table-column
            prop="name"
            :label="$t('实付')"
            width="180">
          </el-table-column>
        </el-table>
      </div>
      <div class="bottom-text">
        <span>{{$t('总计')}}:</span>
        <span>{{$t('改价')}}:</span>
        <span>{{$t('找零')}}:</span>
        <span>{{$t('实收')}}:</span>
      </div>
    </div>
    <div class="info-top">
      <div class="title">
        <span>{{$t('退款记录')}}</span>
        <span>{{$t('操作时间')}}：2022.05.27 12:00:00</span>
      </div>
      <div class="table">
        <el-table
          :header-cell-style="{background:'#F7F7F7'}"
          :data="tableData"
          style="width: 100%">
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
            :label="$t('规格')"
            width="180">
          </el-table-column>
          <el-table-column
            prop="address"
            :label="$t('单价')">
          </el-table-column>
          <el-table-column
            prop="date"
            :label="$t('数量')"
            width="180">
          </el-table-column>
          <el-table-column
            prop="name"
            :label="$t('退款金额')"
            width="180">
          </el-table-column>
        </el-table>
      </div>
      <div class="bottom-sum">
          <span>{{$t('总计')}}:</span>
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
