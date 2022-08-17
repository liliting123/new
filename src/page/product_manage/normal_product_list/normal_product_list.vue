<template>
  <div>
    <!--    筛选条件-->
    <search-list>
      <div slot="left">
        <el-select style="margin-left: 10px;" v-model="value" :placeholder="$t('分类')">
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
          v-model="label"
          :placeholder="$t('分类标签')"
        >
          <el-option
            v-for="item in labelList"
            :key="item.id"
            :label="item.name"
            :value="item.id">
          </el-option>
        </el-select>
        <el-select
          style="margin:0 10px 0 10px;"
          v-model="value"
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
        <el-button type="primary" @click="settlementPassword()">{{
          $t('结算密码')
        }}</el-button>
        <el-button type="primary" @click="addProduct()">{{ $t('添加商品') }}</el-button>
        <el-button type="primary" @click="pullGoods()">{{
          $t('拉取后台商品')
        }}</el-button>
      </div>
      <div slot="right">
        <el-input v-model="input3">
          <el-select v-model="select" slot="prepend" :placeholder="$t('商品名称')">
            <el-option label="商品名称" value="1"></el-option>
            <el-option label="商品编号" value="2"></el-option>
            <el-option label="供应商" value="3"></el-option>
          </el-select>
          <el-button slot="append" @click="getList">{{ $t('搜索') }}</el-button>
        </el-input>
      </div>
    </search-list>
    <!--    table列表-->
    <div class="table_list" style="padding-top: 10px">
      <div class="top_btn">
        <button>{{ $t('拉取库存') }}</button>
        <button>{{ $t('拉取BBD') }}</button>
      </div>
      <el-table
        :header-cell-style="{ background: '#F7F7F7' }"
        :data="tableInfo"
        style="width: 100%;margin-bottom: 20px;"
        row-key="id"
        border
        :default-expand-all="false"
        :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
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
              <el-table-column type="selection" width="55"></el-table-column>
              <el-table-column width="50" label="#">
                <template slot-scope="scope">
                  <span class="table_index">{{scope.$index + 1}}</span>
                </template>
              </el-table-column>
              <el-table-column prop="code" :label="$t('商品编码')"></el-table-column>
              <el-table-column prop="ean[0].ean" :label="$t('EAN')"></el-table-column>
              <el-table-column prop="supplier_id" :label="$t('供应商')"> </el-table-column>
              <el-table-column prop="name" :label="$t('规格')"> </el-table-column>
              <el-table-column prop="price" :label="$t('价格')"> </el-table-column>
              <el-table-column prop="vip_price" :label="$t('会员价')"> </el-table-column>
              <el-table-column prop="tax_rate" :label="$t('税率')"> </el-table-column>
              <el-table-column prop="address" :label="$t('BBD')"> </el-table-column>
              <el-table-column prop="num" :label="$t('可售库存')"> </el-table-column>
              <el-table-column prop="sold_num" :label="$t('已售库存')">
                <template slot-scope="scope">
                  <span style="color: #1a79eb" @click="soldRecords()">{{scope.row.sold_num}}</span>
                </template>
              </el-table-column>
            </el-table>
          </template>
        </el-table-column>
        <el-table-column prop="name" :label="$t('商品名称')" width="150">
        </el-table-column>
        <el-table-column prop="category.name" :label="$t('商品分类')"> </el-table-column>
        <el-table-column prop="label" :label="$t('分类标签')"> </el-table-column>
        <el-table-column prop="cover" :label="$t('商品图片')" width="110">
          <template slot-scope="scope">
            <img width="100px" height="100px" :src="scope.row.cover">
          </template>
        </el-table-column>
        <el-table-column prop="num" :label="$t('可售库存')"> </el-table-column>
        <el-table-column prop="sold_num" :label="$t('已售库存')">
          <template slot-scope="scope">
            <span style="color: #1a79eb" @click="soldRecords()">{{scope.row.sold_num}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="created_at" :label="$t('创建时间')"> </el-table-column>
        <el-table-column :label="$t('操作')" width="150">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="editProduct(scope.row.id)">{{ $t('编辑') }}</el-button>
            <el-button type="text" size="small">{{ $t('删除') }}</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <PaginationAndButtons :pageParams="page_params" />
    <!--  拉取后台商品弹窗-->
    <pullGoodsDialog :visible.sync="dialogPullGoods" />
    <!--  结算密码弹窗-->
    <setPasswordDialog :visible.sync="dialogPassword" />
    <soldRecordsDialog :visible.sync="dialogSoldRecords" />
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
  name: 'normal_product_list',
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
      categoryList: [], // 分类下拉
      supplierList: [], // 供应商下拉
      labelList: [
        {id: 1, name: '普通'},
        {id: 2, name: '烟酒'},
        {id: 3, name: '酒精类'}
      ],
      label: '',
      tableInfo: [],
      value: '',
      input1: '',
      input2: '',
      input3: '',
      select: '',
      dialogPassword: false, // 结算密码弹窗
      dialogSoldRecords: false, // 已售库存弹窗
      dialogPullGoods: false // 拉取后台商品弹窗
    }
  },
  created() {
    this.getList()
    this.getSupplierList()
    this.getClassList()
  },
  methods: {
    getList() {
      this.$http.get('api/shop/goods', {
        params: {
          page: this.page_params.page,
          size: this.page_params.size,
          keyword: this.input3,
          category_id: this.value,
          label: this.label,
          supplier_id: this.value,
          type_id: this.select
        }
      }).then(res => {
        if (res.ret) {
          this.tableInfo = res.data.data
          this.page_params.total = res.data.total
        }
      })
    },
    // 已售库存弹窗
    soldRecords() {
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
    // 编辑商品
    editProduct(id) {
      this.$router.push({
        path: 'normal_product_list/add_product',
        query: {
          id: id
        }
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
        this.categoryList = res.data.data
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.top_btn {
  padding: 10px 0 10px 0;
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
