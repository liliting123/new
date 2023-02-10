<template>
  <div>
    <el-dialog
      :title="$t('普通商品列表')"
      :visible="dialogNormalPromontional"
      width="60%"
      @open="getList"
      :before-close="handleClose">
      <el-input v-model="searchValue" class="promontional-input">
        <el-button slot="append" @click="getList">{{ $t('搜索') }}</el-button>
      </el-input>
      <el-table
        ref="tableInfo"
        :header-cell-style="{ background: '#F7F7F7' }"
        :data="tableInfo"
        :default-expand-all="false"
        :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
        @select="selectChange"
        @select-all="selectAllChange"
        style="width: 100%;margin-bottom: 20px;"
        height="500"
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
              style="width: 95%;margin-left: 48px"
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
              <el-table-column prop="name" :label="$t('规格')"> </el-table-column>
              <el-table-column :label="$t('价格')">
                <template slot-scope="scope"> €{{ scope.row.price }} </template>
              </el-table-column>
              <el-table-column prop="num" :label="$t('可售库存')"> </el-table-column>
              <el-table-column prop="sold_num" :label="$t('已售库存')"></el-table-column>
            </el-table>
          </template>
        </el-table-column>
        <el-table-column prop="name" :label="$t('商品名称')" width="150"></el-table-column>
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
      </el-table>
      <PaginationAndButtons :pageParams="page_params" />
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogNormalPromontional = false">{{ $t('取消') }}</el-button>
        <el-button type="primary" @click="addPromotionalProduct">{{ $t('确定') }}</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import PaginationAndButtons from '@/components/pagination_and_buttons.vue'
import pagination from '@/mixin/pagination'
export default {
  name: 'normalProductsDialog',
  components: {
    PaginationAndButtons
  },
  mixins: [pagination],
  props: {
    visible: {
      type: Boolean,
      require: true
    },
    discountRate: {
      type: String
    }
  },
  data() {
    return {
      tableInfo: [],
      isCheckAll: false, // 是否全选标识
      selections: [],
      selectProductList: [], // 选中的商品规格
      searchValue: ''
    }
  },
  computed: {
    dialogNormalPromontional: {
      get() {
        return this.visible
      },
      set(val) {
        this.$emit('update:visible', val)
      }
    }
  },
  methods: {
    // 获取普通商品列表
    getList() {
      this.tableLoading = true
      this.selections = []
      this.$http
        .get('api/shop/goods', {
          params: {
            keyword: this.searchValue,
            page: this.page_params.page,
            size: this.page_params.size
          }
        })
        .then(res => {
          if (res.ret) {
            res.data.data.forEach(item => {
              item.spec.forEach(spec => {
                spec.goods_type = 'goods_spec_type'
                if (item.id === spec.goods_id) {
                  let specName = JSON.parse(JSON.stringify(spec.name))
                  spec.name = item.name
                  spec.spec_name = specName
                  if (this.discountRate) {
                    spec.rate = this.discountRate
                  }
                  spec.discount_price = 0
                  spec.number = 0
                }
              })
            })
            this.tableInfo = res.data.data
            this.page_params.total = res.data.total
          }
        })
    },
    // 添加促销商品
    addPromotionalProduct() {
      this.dialogNormalPromontional = false
      this.searchValue = ''
      // 将选中的商品规格数据传给父组件
      this.$emit('addProductList', this.selectProductList)
      this.selectProductList = []
    },
    handleClose() {
      this.dialogNormalPromontional = false
      this.searchValue = ''
    },
    handleSubCheckChange(subInfo) {
      // 选中的促销商品规格数据处理
      if (this.selectProductList.length && this.selectProductList.find(val => {
        return val.code === subInfo.code
      })) {
        this.selectProductList = this.selectProductList.filter(val => {
          return subInfo.code !== val.code
        })
      } else {
        this.selectProductList.push(subInfo)
      }
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
    },
    selectChange(selection, row) {
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
            this.selectProductList.push(val)
          })
        }
      } else {
        this.isCheckAll = false
        row.spec.forEach(item => {
          this.selections = this.selections.filter(val => {
            return item.code !== val
          })
          this.selectProductList = this.selectProductList.filter(spec => {
            return item.code !== spec.code
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
        this.selectProductList = []
      }
    }
  }
}
</script>

<style scoped>
.promontional-input {
  width: 30%;
  margin-bottom: 30px;
  margin-left: 70%;
}
</style>
