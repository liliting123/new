<template>
  <div>
    <!--    筛选条件-->
    <search-list>
      <div slot="left">
        <el-select style="margin-left: 10px;" v-model="value" :placeholder="$t('分类')">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
        <el-select
          style="margin:0 10px 0 10px;"
          v-model="value"
          :placeholder="$t('供应商')"
        >
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
        <el-button type="primary" @click="addWeightProduct()">{{
          $t('添加称重商品')
        }}</el-button>
      </div>
      <div slot="right">
        <el-input placeholder="请输入内容" v-model="input3">
          <el-select v-model="select" slot="prepend" :placeholder="$t('商品名称')">
            <el-option label="餐厅名" value="1"></el-option>
            <el-option label="订单号" value="2"></el-option>
            <el-option label="用户电话" value="3"></el-option>
          </el-select>
          <el-button slot="append">{{ $t('搜索') }}</el-button>
        </el-input>
      </div>
    </search-list>
    <!--    table列表-->
    <div class="table_list">
      <el-table
        :header-cell-style="{ background: '#F7F7F7' }"
        :data="tableData"
        style="width: 100%;margin-bottom: 20px;"
        row-key="id"
        border
        :default-expand-all="false"
        :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
      >
        <el-table-column width="50" label="#">
          <template slot-scope="scope">
            <span class="table_index">1</span>
          </template>
        </el-table-column>
        <el-table-column prop="date" :label="$t('商品名称')" width="180">
        </el-table-column>
        <el-table-column prop="name" :label="$t('商品编码')"> </el-table-column>
        <el-table-column prop="address" :label="$t('商品分类')"> </el-table-column>
        <el-table-column prop="date" :label="$t('商品图片')"> </el-table-column>
        <el-table-column prop="name" :label="$t('供应商')"> </el-table-column>
        <el-table-column prop="address" :label="$t('价格/KG')"> </el-table-column>
        <el-table-column prop="date" :label="$t('税率')"> </el-table-column>
        <el-table-column prop="name" :label="$t('BBD')"> </el-table-column>
        <el-table-column prop="address" :label="$t('可售库存')"> </el-table-column>
        <el-table-column prop="date" :label="$t('已售库存')"> </el-table-column>
        <el-table-column prop="date" :label="$t('创建时间')"> </el-table-column>
        <el-table-column prop="address" :label="$t('操作')" width="180">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="inventoryRecords()">{{
              $t('库存记录')
            }}</el-button>
            <el-button type="text" size="small">{{ $t('编辑') }}</el-button>
            <el-button type="text" size="small">{{ $t('删除') }}</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!--    库存记录弹窗-->
    <inventoryRecordsDialog :visible.sync="dialoginventoryRecords" />
  </div>
</template>

<script>
import searchList from '@/components/searchList.vue'
import inventoryRecordsDialog from './components/inventoryRecordsDialog'
export default {
  name: 'weighing_goods_list',
  components: {
    searchList,
    inventoryRecordsDialog
  },
  data() {
    return {
      value1: '',
      options: [
        {
          value: '选项1',
          label: '黄金糕'
        },
        {
          value: '选项2',
          label: '双皮奶'
        },
        {
          value: '选项3',
          label: '蚵仔煎'
        },
        {
          value: '选项4',
          label: '龙须面'
        },
        {
          value: '选项5',
          label: '北京烤鸭'
        }
      ],
      value: '',
      input1: '',
      input2: '',
      input3: '',
      select: '',
      tableData: [
        {
          id: 1,
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }
      ],
      dialoginventoryRecords: false // 库存记录弹窗
    }
  },
  methods: {
    // 添加称重商品
    addWeightProduct() {
      this.$router.push({
        path: 'weighing_goods_list/add_weighing_item'
      })
    },
    // 已售库存弹窗
    inventoryRecords() {
      this.dialoginventoryRecords = true
    }
  }
}
</script>

<style lang="scss" scoped>
/deep/ .el-input-group__prepend {
  width: 100px;
  background: white;
  padding: 0 10px;
}
</style>
