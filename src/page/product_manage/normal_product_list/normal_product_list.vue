<template>
  <div>
    <!--    筛选条件-->
    <search-list>
      <div slot="left">
        <el-select
          style="margin-left: 10px;"
          v-model="value"
          placeholder="商品分类">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
        <el-select
          style="margin-left: 10px;"
          v-model="value"
          placeholder="分类标签">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
        <el-select
          style="margin:0 10px 0 10px;"
          v-model="value"
          placeholder="供应商">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
        <el-button type="info">结算密码</el-button>
        <el-button type="info">添加商品</el-button>
        <el-button type="info">拉取后台商品</el-button>
      </div>
      <div slot="right">
        <el-input placeholder="请输入内容" v-model="input3" class="input-with-select">
          <el-select v-model="select" slot="prepend" placeholder="商品名称">
            <el-option label="餐厅名" value="1"></el-option>
            <el-option label="订单号" value="2"></el-option>
            <el-option label="用户电话" value="3"></el-option>
          </el-select>
          <el-button slot="append">搜索</el-button>
        </el-input>
      </div>
    </search-list>
    <!--    table列表-->
    <div class="table_list" style="padding-top: 10px">
      <div class="top_btn">
        <button>拉取库存</button>
        <button>拉取BBD</button>
      </div>
      <el-table
        class="order-table"
        :header-cell-style="{background:'#F7F7F7'}"
        :data="tableData"
        style="width: 100%;margin-bottom: 20px;"
        row-key="id"
        border
        :default-expand-all="false"
        :tree-props="{children: 'children', hasChildren: 'hasChildren'}">
        <el-table-column
          type="selection"
          width="55">
        </el-table-column>
        <el-table-column type="expand">
          <template slot-scope="props">
            <el-table :header-cell-style="{background:'#F7F7F7'}" :data="tableData" border style="width: 80%;margin-left: 48px">
              <el-table-column type="selection" width="55"></el-table-column>
              <el-table-column width="50" label="#">
                <template slot-scope="scope">
                  <span class="table_index">1</span>
                </template>
              </el-table-column>
              <el-table-column prop="name" label="商品图片">
              </el-table-column>
              <el-table-column prop="name" label="商品名称">
              </el-table-column>
              <el-table-column prop="address" label="商品编号"> </el-table-column>
              <el-table-column prop="name" label="EAN"> </el-table-column>
              <el-table-column prop="address" label="规格"> </el-table-column>
              <el-table-column prop="name" label="单价"> </el-table-column>
              <el-table-column prop="address" label="数量"> </el-table-column>
              <el-table-column prop="address" label="实付"> </el-table-column>
            </el-table>
          </template>
        </el-table-column>
        <el-table-column
          prop="date"
          label="会员名称"
          width="180">
        </el-table-column>
        <el-table-column
          prop="name"
          label="会员ID">
        </el-table-column>
        <el-table-column
          prop="address"
          label="订单编号">
        </el-table-column>
        <el-table-column
          prop="date"
          label="订单状态">
        </el-table-column>
        <el-table-column
          prop="name"
          label="订单金额">
        </el-table-column>
        <el-table-column
          prop="address"
          label="客户来源">
        </el-table-column>
        <el-table-column
          prop="date"
          label="收银员">
        </el-table-column>
        <el-table-column
          prop="name"
          label="支付方式">
        </el-table-column>
        <el-table-column
          prop="address"
          label="支付时间">
        </el-table-column>
        <el-table-column
          prop="address"
          label="操作"
          width="150">
          <template slot-scope="scope">
            <el-button type="text" size="small">编辑</el-button>
            <el-button type="text" size="small">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import searchList from '@/components/searchList.vue'
export default {
  name: 'orderList',
  components: {
    searchList
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
      }],
      visibleOrderRefund: false
    }
  },
  methods: {
  }
}
</script>

<style lang="scss" scoped>
.top_btn {
  padding:10px 0 10px 0;
  button {
    background: white;
    border: 1px solid rgba(128, 128, 128, 0.49);
    height: 30px;
    width: 100px;
    color: gray;
  }
  button:first-child {
    border-top-left-radius: 5px;
    border-bottom-left-radius: 5px;
  }
  button:last-child {
    border-top-right-radius: 5px;
    border-bottom-right-radius: 5px;
    margin-left: -5px;
  }
}
/deep/ .el-input-group__prepend {
  width: 100px;
  background: white;
  padding: 0 10px;
}
</style>
