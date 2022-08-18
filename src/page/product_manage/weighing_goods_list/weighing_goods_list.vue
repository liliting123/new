<template>
  <div>
    <!--    筛选条件-->
    <search-list>
      <div slot="left">
        <el-select
          style="margin-left: 10px;"
          v-model="categoryValue"
          :placeholder="$t('分类')"
        >
          <el-option
            v-for="item in categoryList"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          >
          </el-option>
        </el-select>
        <el-select
          style="margin:0 10px 0 10px;"
          v-model="supplierValue"
          :placeholder="$t('供应商')"
        >
          <el-option
            v-for="item in supplierList"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          >
          </el-option>
        </el-select>
        <el-button type="primary" @click="addWeightProduct()">{{
          $t('添加称重商品')
        }}</el-button>
      </div>
      <div slot="right">
        <el-input v-model="inputValue">
          <el-select
            slot="prepend"
            v-model="inputSelectValue"
            :placeholder="$t('商品名称')"
          >
            <el-option
              v-for="item in inputSelectList"
              :key="item.id"
              :label="item.label"
              :value="item.id"
            ></el-option>
          </el-select>
          <el-button slot="append">{{ $t('搜索') }}</el-button>
        </el-input>
      </div>
    </search-list>
    <!--    table列表-->
    <div class="table_list">
      <el-table
        :header-cell-style="{ background: '#F7F7F7' }"
        :data="tableDataWeigh"
        style="width: 100%;margin-bottom: 20px;"
        row-key="id"
        border
        :default-expand-all="false"
        :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
      >
        <el-table-column width="50" label="#">
          <template slot-scope="scope">
            <span class="table_index">{{ scope.$index + 1 }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="name" :label="$t('商品名称')" width="180">
        </el-table-column>
        <el-table-column prop="code" :label="$t('商品编码')"> </el-table-column>
        <el-table-column prop="category.name" :label="$t('商品分类')"> </el-table-column>
        <el-table-column prop="cover" :label="$t('商品图片')">
          <template slot-scope="scope">
            <img width="100px" height="100px" :src="scope.row.cover" />
          </template>
        </el-table-column>
        <el-table-column prop="supplier.name" :label="$t('供应商')"> </el-table-column>
        <el-table-column prop="price" :label="$t('价格/KG')"> </el-table-column>
        <el-table-column prop="tax_rate" :label="$t('税率')"> </el-table-column>
        <el-table-column prop="bbd" :label="$t('BBD')"> </el-table-column>
        <el-table-column prop="num" :label="$t('可售库存')"> </el-table-column>
        <el-table-column prop="sold_num" :label="$t('已售库存')"> </el-table-column>
        <el-table-column prop="created_at" :label="$t('创建时间')"> </el-table-column>
        <el-table-column prop="address" :label="$t('操作')" width="250">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="inventoryRecords(scope.row.id)">{{
              $t('库存记录')
            }}</el-button>
            <el-button type="text" size="small" @click="editweighProduct(scope.row.id)">{{
              $t('编辑')
            }}</el-button>
            <el-button type="text" size="small" @click="delWeighProduct(scope.row.id)">{{
              $t('删除')
            }}</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <PaginationAndButtons :pageParams="page_params" />
    <!--    库存记录弹窗-->
    <inventoryRecordsDialog
      :visible.sync="dialoginventoryRecords"
      :recordsData="recordsData"
    />
  </div>
</template>

<script>
import searchList from '@/components/searchList.vue'
import inventoryRecordsDialog from './components/inventoryRecordsDialog'
import PaginationAndButtons from '@/components/pagination_and_buttons.vue'
import pagination from '@/mixin/pagination'
export default {
  name: 'weighing_goods_list',
  components: {
    searchList,
    inventoryRecordsDialog,
    PaginationAndButtons
  },
  mixins: [pagination],
  data() {
    return {
      inputSelectList: [
        { id: 1, label: this.$t('商品名称') },
        { id: 2, label: this.$t('商品编号') },
        { id: 3, label: this.$t('供应商') }
      ],
      inputSelectValue: 1,
      inputValue: '',
      value: '',
      input1: '',
      input2: '',
      input3: '',
      tableDataWeigh: [], // 称重商品列表
      dialoginventoryRecords: false, // 库存记录弹窗
      id: '',
      recordsData: [], // 库存记录
      categoryList: [], // 分类下拉
      categoryValue: '',
      supplierList: [], // 供应商下拉
      supplierValue: ''
    }
  },
  created() {
    this.getList()
    this.getClassList()
    this.getSupplierList()
  },
  methods: {
    // 删除称重商品
    delWeighProduct(id) {
      this.$confirm(this.$t('确认要删除吗?'), this.$t('提示'), {
        confirmButtonText: this.$t('确定'),
        cancelButtonText: this.$t('取消'),
        type: 'warning'
      })
        .then(() => {
          this.$http.delete(`api/shop/weigh_goods/${id}`).then(res => {
            if (res.ret) {
              this.$notify({
                title: this.$t('成功'),
                type: 'success',
                message: this.$t('删除成功')
              })
              this.getWeighList()
            }
          })
        })
        .catch(() => {})
    },
    // 编辑商品
    editweighProduct(id) {
      this.$router.push({
        path: 'weighing_goods_list/add_weighing_item',
        query: {
          id: id
        }
      })
    },
    // 获取称重商品列表
    getList() {
      this.$http
        .get('api/shop/weigh_goods', {
          params: {
            page: this.page_params.page,
            size: this.page_params.size,
            keyword: this.page_params.keyword
          }
        })
        .then(res => {
          if (res.ret) {
            this.page_params.total = res.data.total
            this.tableDataWeigh = res.data.data
          }
        })
    },
    // 添加称重商品
    addWeightProduct() {
      this.$router.push({
        path: 'weighing_goods_list/add_weighing_item'
      })
    },
    // 已售库存弹窗
    inventoryRecords(id) {
      this.dialoginventoryRecords = true
      this.id = id
      this.getRecordList()
    },
    // 获取库存记录
    getRecordList() {
      this.$http
        .get(`api/shop/weigh_goods_record?weigh_goods_id=${this.id}`)
        .then(res => {
          if (res.ret) {
            this.recordsData = res.data.data
          }
        })
    },
    // 获取供应商下拉列表
    async getSupplierList() {
      const res = await this.$http.get(`api/shop/supplier`, {
        params: {
          switch: 1
        }
      })
      if (res.ret) {
        this.supplierList = res.data.data
      }
    },
    // 获取分类下拉列表
    async getClassList() {
      const res = await this.$http.get(`api/shop/category`, {
        params: {
          weigh: 1
        }
      })
      if (res.ret) {
        this.categoryList = res.data.data
      }
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
