<template>
  <div>
    <!--    筛选条件-->
    <search-list>
      <div slot="left">
        <el-select
          style="margin-left: 10px;"
          v-model="categoryValue"
          :placeholder="$t('分类')"
          clearable
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
          clearable
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
          <!-- <el-select slot="prepend" v-model="searchValue" :placeholder="$t('商品名称')">
            <el-option
              v-for="item in inputSelectList"
              :key="item.id"
              :label="item.label"
              :value="item.id"
            ></el-option>
          </el-select> -->
          <el-button slot="append" @click="getList">{{ $t('搜索') }}</el-button>
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
        <el-table-column prop="cover" :label="$t('商品图片')" width="110">
          <template slot-scope="scope">
            <img width="100px" height="100px" :src="scope.row.cover" />
          </template>
        </el-table-column>
        <el-table-column prop="supplier.name" :label="$t('供应商')"> </el-table-column>
        <el-table-column :label="$t('价格/KG')">
          <template slot-scope="scope"> €{{ scope.row.price }} </template>
        </el-table-column>
        <el-table-column :label="$t('会员价/KG')">
          <template slot-scope="scope"> €{{ scope.row.vip_price }} </template>
        </el-table-column>
        <el-table-column :label="$t('税率')">
          <template slot-scope="scope"> {{ scope.row.tax_rate }}% </template>
        </el-table-column>
        <el-table-column prop="bbd" :label="$t('BBD')"> </el-table-column>
        <el-table-column :label="$t('可售库存')">
          <template slot-scope="scope">{{ scope.row.num }}KG</template>
        </el-table-column>
        <el-table-column :label="$t('已售库存')">
          <template slot-scope="scope">{{ scope.row.sold_num }}KG </template>
        </el-table-column>
        <el-table-column prop="created_at" :label="$t('创建时间')"> </el-table-column>
        <el-table-column prop="address" :label="$t('操作')" width="250">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="inventoryRecords(scope.row)">{{
              $t('库存记录')
            }}</el-button>
            <el-button type="text" size="small" @click="editweighProduct(scope.row.id)">{{
              $t('编辑')
            }}</el-button>
            <el-button
              v-if="Number(scope.row.sold_num) === 0"
              type="text"
              size="small"
              @click="delWeighProduct(scope.row.id)"
              >{{ $t('删除') }}</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
    <PaginationAndButtons :pageParams="page_params" />
    <!--    库存记录弹窗-->
    <inventoryRecordsDialog
      v-if="dialoginventoryRecords"
      :visible.sync="dialoginventoryRecords"
      :records="records"
    />
  </div>
</template>

<script>
import searchList from '@/components/searchList.vue'
import inventoryRecordsDialog from './components/inventoryRecordsDialog'
import PaginationAndButtons from '@/components/pagination_and_buttons.vue'
import pagination from '@/mixin/pagination'
export default {
  name: 'weighingGoodsList',
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
      searchValue: 1,
      inputValue: '',
      tableDataWeigh: [], // 称重商品列表
      dialoginventoryRecords: false, // 库存记录弹窗
      records: '',
      recordsData: [], // 库存记录
      categoryList: [], // 分类下拉
      categoryValue: '',
      supplierList: [], // 供应商下拉
      supplierValue: ''
    }
  },
  created() {
    this.getClassList()
    this.getSupplierList()
  },
  activated() {
    if (this.$store.state.search_flag === true) {
      this.categoryValue = ''
      this.supplierValue = ''
      this.searchValue = 1
    }
    this.getList()
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
        // path: 'weighing_goods_list/edit_weighing_item',
        name: '编辑称重商品',
        params: {
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
            keyword: this.inputValue,
            type_id: this.searchValue,
            category_id: this.categoryValue, // 分类标签
            supplier_id: this.supplierValue // 供应商
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
    inventoryRecords(row) {
      this.dialoginventoryRecords = true
      this.records = row
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
        this.categoryList = res.data
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
