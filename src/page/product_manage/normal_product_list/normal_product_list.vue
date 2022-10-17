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
          style="margin-left: 10px;"
          v-model="classificationLabel"
          :placeholder="$t('分类标签')"
          clearable
        >
          <el-option
            v-for="item in labelList"
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
          filterable
          clearable
        >
          <el-option
            v-for="item in sortlist"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          >
          </el-option>
        </el-select>
        <el-button type="primary" @click="settlementPassword()">{{
          $t('结算密码')
        }}</el-button>
        <el-button type="primary" @click="addProduct()">{{ $t('添加商品') }}</el-button>
        <el-button type="primary" @click="pullGoods()">{{
          $t('拉取后台商品')
        }}</el-button>
      </div>
      <div slot="right">
        <el-input v-model="inputValue">
          <!-- <el-select v-model="searchValue" slot="prepend" :placeholder="$t('商品名称')">
            <el-option
              v-for="item in searchLists"
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
    <div class="table_list" style="padding-top: 10px">
      <div class="top_btn">
        <el-button-group>
          <el-button size="small" @click="pullWmsStock(1)">{{
            $t('拉取所有库存')
          }}</el-button>
          <el-button
            size="small"
            @click="pullWmsStock(0)"
            :disabled="!this.selections.length"
            >{{ $t('拉取选中库存') }}</el-button
          >
          <el-button size="small" @click="pullBBD(1)">{{ $t('拉取所有BBD') }}</el-button>
          <el-button
            size="small"
            @click="pullBBD(0)"
            :disabled="!this.selections.length"
            >{{ $t('拉取选中BBD') }}</el-button
          >
        </el-button-group>
      </div>
      <el-table
        ref="tableInfo"
        :header-cell-style="{ background: '#F7F7F7' }"
        :data="tableInfo"
        :default-expand-all="false"
        :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
        @select="selectChange"
        @select-all="selectAllChange"
        style="width: 100%;margin-bottom: 20px;"
        row-key="id"
        border
      >
        <el-table-column type="selection" width="55"> </el-table-column>
        <el-table-column type="expand">
          <template slot-scope="scope">
            <el-table
              :header-cell-style="{ background: '#F7F7F7' }"
              :data="scope.row.spec"
              border
              style="width: 80%;margin-left: 48px"
            >
              <el-table-column width="50">
                <template slot-scope="scope">
                  <el-checkbox-group
                    v-model="selections"
                    @change="handleSubCheckChange(scope.row)"
                  >
                    <el-checkbox :label="scope.row.code">{{ '' }}</el-checkbox>
                  </el-checkbox-group>
                </template>
              </el-table-column>
              <el-table-column width="50" label="#">
                <template slot-scope="scope">
                  <span class="table_index">{{ scope.$index + 1 }}</span>
                </template>
              </el-table-column>
              <el-table-column prop="code" :label="$t('商品编码')"></el-table-column>
              <el-table-column prop="ean" :label="$t('EAN')"></el-table-column>
              <el-table-column prop="supplier.name" :label="$t('供应商')">
              </el-table-column>
              <el-table-column prop="name" :label="$t('规格')"> </el-table-column>
              <el-table-column :label="$t('价格')">
                <template slot-scope="scope"> €{{ scope.row.price }} </template>
              </el-table-column>
              <el-table-column :label="$t('会员价')">
                <template slot-scope="scope"> €{{ scope.row.vip_price }} </template>
              </el-table-column>
              <el-table-column :label="$t('税率')">
                <template slot-scope="scope"> {{ scope.row.tax_rate }}% </template>
              </el-table-column>
              <el-table-column prop="bbd" :label="$t('BBD')"> </el-table-column>
              <el-table-column prop="num" :label="$t('可售库存')"> </el-table-column>
              <el-table-column prop="sold_num" :label="$t('已售库存')">
                <template slot-scope="scope">
                  <span
                    style="color: #1a79eb"
                    @click="soldRecords(scope.row, 'goods_spec_id')"
                  >
                    {{ scope.row.sold_num }}
                  </span>
                </template>
              </el-table-column>
            </el-table>
          </template>
        </el-table-column>
        <el-table-column prop="name" :label="$t('商品名称')" width="150">
        </el-table-column>
        <el-table-column prop="category.name" :label="$t('商品分类')"> </el-table-column>
        <el-table-column prop="label" :label="$t('分类标签')">
          <template slot-scope="scope">
            {{
              scope.row.label === 1
                ? $t('普通')
                : scope.row.label === 10
                ? $t('烟类')
                : scope.row.label === 11
                ? $t('酒类')
                : ''
            }}
          </template>
        </el-table-column>
        <el-table-column prop="cover" :label="$t('商品图片')" width="110">
          <template slot-scope="scope">
            <img width="100px" height="100px" :src="scope.row.cover" />
          </template>
        </el-table-column>
        <el-table-column prop="num" :label="$t('可售库存')"> </el-table-column>
        <el-table-column prop="sold_num" :label="$t('已售库存')">
          <template slot-scope="scope">
            <span style="color: #1a79eb" @click="soldRecords(scope.row, 'goods_id')">{{
              scope.row.sold_num
            }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="created_at" :label="$t('创建时间')"> </el-table-column>
        <el-table-column :label="$t('操作')" width="150">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="editProduct(scope.row.id)">{{
              $t('编辑')
            }}</el-button>
            <el-button
              v-if="scope.row.sold_num === 0"
              type="text"
              size="small"
              @click="deleteProduct(scope.row.id)"
              >{{ $t('删除') }}</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
    <PaginationAndButtons :pageParams="page_params" />
    <!--  拉取后台商品弹窗-->
    <pullGoodsDialog v-if="dialogPullGoods" :visible.sync="dialogPullGoods" />
    <!--  结算密码弹窗-->
    <setPasswordDialog :visible.sync="dialogPassword" />
    <soldRecordsDialog
      v-if="dialogSoldRecords"
      :visible.sync="dialogSoldRecords"
      :recordsId="recordsId"
      :keyValue="keyValue"
      :row="row"
      :shopName="shopName"
    />
  </div>
</template>

<script>
import searchList from '@/components/searchList.vue'
import setPasswordDialog from './components/setPasswordDialog'
import soldRecordsDialog from './components/soldRecordsDialog'
import pullGoodsDialog from './components/pullGoodsDialog'
import PaginationAndButtons from '@/components/pagination_and_buttons.vue'
import pagination from '@/mixin/pagination'
export default {
  name: 'normalProductList',
  components: {
    searchList,
    setPasswordDialog,
    soldRecordsDialog,
    pullGoodsDialog,
    PaginationAndButtons
  },
  mixins: [pagination],
  data() {
    return {
      categoryValue: '',
      categoryList: [], // 分类下拉
      supplierList: [], // 供应商下拉
      labelList: [
        { id: 1, name: this.$t('普通') },
        { id: 10, name: this.$t('烟类') },
        { id: 11, name: this.$t('酒类') }
      ], // 分类标签
      searchLists: [
        { id: 1, label: this.$t('商品名称') },
        { id: 2, label: this.$t('商品编号') },
        { id: 3, label: this.$t('EAN') },
        { id: 4, label: this.$t('供应商') }
      ],
      searchValue: 1,
      classificationLabel: '', // 分类标签
      tableInfo: [],
      supplierValue: '', // 供应商
      inputValue: '',
      dialogPassword: false, // 结算密码弹窗
      dialogSoldRecords: false, // 已售库存弹窗
      dialogPullGoods: false, // 拉取后台商品弹窗
      recordsId: '', // 商品id或规格id
      keyValue: '', // 查看商品已售弹窗或规格信息已售弹窗标识
      row: {},
      shopName: '',
      selections: [],
      isCheckAll: false // 是否全选标识
    }
  },

  computed: {
    // 供应商数据a-z排序
    sortlist() {
      return this.sort()
    }
  },
  created() {
    this.getSupplierList()
    this.getClassList()
  },
  activated() {
    if (this.$store.state.search_flag === true) {
      this.categoryValue = ''
      this.classificationLabel = ''
      this.supplierValue = ''
      this.inputValue = ''
      this.searchValue = 1
    }
    this.getList()
  },
  methods: {
    sort() {
      return this.supplierList.sort((a, b) => {
        return a['name'].localeCompare(b['name']) // index是list你需要索引的字段名称
      })
    },
    // 拉取库存
    pullWmsStock(all) {
      this.$http
        .post('api/shop/goods/sync_stock', {
          is_all: all === 1 ? 1 : 0,
          code: all === 1 ? undefined : this.selections
        })
        .then(res => {
          if (res.ret) {
            this.$message({
              message: res.msg,
              type: 'success'
            })
            this.getList()
          }
        })
    },
    // 拉取bbd
    pullBBD(all) {
      this.$http
        .post('api/shop/goods/sync_wms_bbd', {
          is_all: all === 1 ? 1 : 0,
          code: all === 1 ? undefined : this.selections
        })
        .then(res => {
          if (res.ret) {
            this.$message({
              message: res.msg,
              type: 'success'
            })
            this.getList()
          }
        })
    },
    handleSubCheckChange(subInfo) {
      let specArr = []
      let specIndex
      this.tableInfo.forEach((goodItem, idx) => {
        if (goodItem.id === subInfo.goods_id) {
          specArr = goodItem.spec
          specIndex = idx
        }
      })
      let isAllChecked = specArr.every(item => {
        return this.selections.indexOf(item.code) !== -1
      })

      if (isAllChecked) {
        this.$refs.tableInfo.toggleRowSelection(this.tableInfo[specIndex], true)
      } else {
        this.$refs.tableInfo.toggleRowSelection(this.tableInfo[specIndex], false)
      }

      // if (this.selections.indexOf(subInfo.code) === -1) {
      //   this.isCheckAll = false
      // }
      // this.$refs.tableInfo.toggleRowSelection(subInfo.code)
    },
    selectChange(selection, row) {
      // console.log(selection, row)
      // 如果selection中存在row代表是选中，否则是取消选中
      if (
        selection &&
        selection.length &&
        selection.find(val => {
          return val.id === row.id
        })
      ) {
        if (selection.length === this.tableInfo.length) {
          this.isCheckAll = true
        }
        if (row.spec) {
          row.spec.forEach(val => {
            this.selections.push(val.code)
          })
        }
      } else {
        this.isCheckAll = false
        // console.log(11,' 11')
        row.spec.forEach(item => {
          this.selections = this.selections.filter(val => {
            return item.code !== val
          })
        })
      }
    },
    // 选中所有
    selectAllChange(selection) {
      // 如果选中的数目与请求到的数目相同就选中子节点，否则就清空选中
      if (selection && selection.length && selection.length === this.tableInfo.length) {
        selection.forEach(val => {
          this.selectChange(selection, val)
        })
      } else {
        this.selections = []
      }
    },

    // 选项发生改变时触发
    // selectionChangeHandler(val) {
    //   if (val && val.length) {
    //     val.forEach(item => {
    //       item.spec.forEach(item => {
    //         this.selections.push(item.code)
    //         this.selections = [...new Set(this.selections)]
    //       })
    //     })
    //   } else {
    //     this.selections = []
    //   }
    // },
    // 获取商品列表
    getList() {
      this.tableLoading = true
      // this.isCheckAll = true
      this.selections = []
      this.$http
        .get('api/shop/goods', {
          params: {
            page: this.page_params.page,
            size: this.page_params.size,
            keyword: this.inputValue,
            category_id: this.categoryValue, // 商品分类
            label: this.classificationLabel, // 分类标签：普通
            supplier_id: this.supplierValue, // 供应商
            type_id: this.searchValue
          }
        })
        .then(res => {
          if (res.ret) {
            this.tableInfo = res.data.data
            this.page_params.total = res.data.total
          }
        })
    },
    // 已售库存弹窗
    soldRecords(value, keyValue) {
      // 获取商品已售库存还是规格已售库存赋值判断
      keyValue === 'goods_id' ? (this.recordsId = value.id) : (this.row = value)
      this.keyValue = keyValue
      this.shopName = value.name || ''
      this.dialogSoldRecords = true
    },
    // 结算密码弹窗
    settlementPassword() {
      this.dialogPassword = true
    },
    // 拉取后台商品弹窗
    pullGoods() {
      this.dialogPullGoods = true
    },
    // 删除商品
    deleteProduct(id) {
      this.$confirm(this.$t('确认要删除吗?'), this.$t('提示'), {
        confirmButtonText: this.$t('确定'),
        cancelButtonText: this.$t('取消'),
        type: 'warning'
      }).then(async () => {
        const res = await this.$http.delete(`api/shop/goods/${id}`)
        if (res.ret === 1) {
          this.$notify({
            title: this.$t('success'),
            message: res.msg,
            type: 'success'
          })
          this.getList()
        }
      })
    },
    // 编辑商品
    editProduct(id) {
      console.log(id)
      this.$router.push({
        // path: 'normal_product_list/edit_product',
        name: '编辑商品',
        params: { id: id }
      })
    },
    // 跳转到添加商品页面
    addProduct() {
      this.$router.push({
        path: 'normal_product_list/add_product'
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
          weigh: 0
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
.top_btn {
  padding: 10px 0 20px 0;
  .el-button {
    border-radius: 0;
    color: #636f7a;
    border-color: #bfbfbf;
    padding: 8px 13px;
    font-size: 14px;
    text-align: center;
    &:hover {
      background-color: #d4d4d4;
      border: 1px solid #c4c4c4;
    }
    &:focus {
      border-color: #bfbfbf;
    }
    &:first-child {
      border-top-left-radius: 5px;
      border-bottom-left-radius: 5px;
    }
    &:last-child {
      border-top-right-radius: 5px;
      border-bottom-right-radius: 5px;
    }
  }
}
/deep/ .el-input-group__prepend {
  width: 100px;
  background: white;
  padding: 0 10px;
}
</style>
