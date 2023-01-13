<template>
  <div>
    <el-dialog
      :title="$t('称重商品列表')"
      :visible="dialogWeightPromontional"
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
        @select="selectChange"
        @select-all="selectAllChange"
        style="width: 100%;margin-bottom: 20px;"
        height="500"
        row-key="id"
        border
      >
        <el-table-column type="selection" width="55"> </el-table-column>
        <el-table-column prop="name" :label="$t('商品名称')" width="150"></el-table-column>
        <el-table-column prop="code" :label="$t('商品编码')"> </el-table-column>
        <el-table-column prop="category.name" :label="$t('商品分类')"> </el-table-column>
        <el-table-column :label="$t('价格/KG')">
          <template slot-scope="scope"> €{{ scope.row.price }} </template>
        </el-table-column>
        <el-table-column prop="cover" :label="$t('商品图片')" width="110">
          <template slot-scope="scope">
            <img width="100px" height="100px" :src="scope.row.cover" />
          </template>
        </el-table-column>
        <el-table-column :label="$t('可售库存')">
          <template slot-scope="scope">{{ scope.row.num }}KG</template>
        </el-table-column>
      </el-table>
      <PaginationAndButtons :pageParams="page_params" />
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogWeightPromontional = false">{{ $t('取消') }}</el-button>
        <el-button type="primary" @click="addPromotionalProduct">{{ $t('确定') }}</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import PaginationAndButtons from '@/components/pagination_and_buttons.vue'
  import pagination from '@/mixin/pagination'
  export default {
    name: 'weightProductsDialog',
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
        selectProductList: [], // 选中的商品规格
        searchValue: ''
      }
    },
    computed: {
      dialogWeightPromontional: {
        get() {
          return this.visible
        },
        set(val) {
          this.$emit('update:visible', val)
        }
      }
    },
    methods: {
      // 获取称重商品列表
      getList() {
        this.tableLoading = true
        this.$http
          .get('api/shop/weigh_goods', {
            params: {
              keyword: this.searchValue,
              page: this.page_params.page,
              size: this.page_params.size
            }
          })
          .then(res => {
            if (res.ret) {
              res.data.data.forEach(item => {
                item.goods_type = 'weigh_goods_type'
                if (this.discountRate) {
                  item.rate = this.discountRate
                }
              })
              this.tableInfo = res.data.data
              this.page_params.total = res.data.total
            }
          })
      },
      // 添加促销商品
      addPromotionalProduct() {
        this.dialogWeightPromontional = false
        this.searchValue = ''
        // 将选中的商品规格数据传给父组件
        this.$emit('addProductList', this.selectProductList)
        this.selectProductList = []
      },
      handleClose() {
        this.dialogWeightPromontional = false
        this.searchValue = ''
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
          this.selectProductList.push(row)
          this.selectProductList = this.filterProductId(this.selectProductList)
        } else {
          this.isCheckAll = false
          this.selectProductList = this.selectProductList.filter(item => {
            return item.id !== row.id
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
          this.selectProductList = []
        }
      },
      // 相同规格id去重
      filterProductId(arr) {
        const map = new Map()
        return arr.filter((item) => !map.has(item.id) && map.set(item.id, 1))
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
