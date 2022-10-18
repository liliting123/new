<template>
  <div class="classification_list">
    <!--    筛选条件-->
    <search-list>
      <div slot="left">
        <el-button type="primary" @click="addSupplier()">
          {{ $t('添加供应商') }}
        </el-button>
      </div>
      <div slot="right">
        <el-input v-model="searchValue" class="input-with-select">
          <el-button slot="append" @click="getList()">{{ $t('搜索') }}</el-button>
        </el-input>
      </div>
    </search-list>
    <div class="table-main border-radius">
      <el-table
        :data="tableData"
        :header-cell-style="{
          background: '#F7F7F7'
        }"
        style="width: 100%"
      >
        <el-table-column width="50" align="center" label="#">
          <template slot-scope="scope">
            <span class="table_index">{{ scope.$index + 1 }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="name" :label="$t('供应商名称')"> </el-table-column>
        <el-table-column prop="switch" :label="$t('是否启动')">
          <template slot-scope="scope">
            {{ scope.row.switch ? $t('是') : $t('否') }}
          </template>
        </el-table-column>
        <el-table-column prop="created_at" :label="$t('创建时间')"> </el-table-column>
        <el-table-column :label="$t('操作')" width="200">
          <template slot-scope="scope">
            <el-button type="text" @click="editSupplier(scope.row)">
              {{ $t('编辑') }}
            </el-button>
            <el-button type="text" @click="deleteSupplier(scope.row)">
              {{ $t('删除') }}
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <PaginationAndButtons :pageParams="page_params" />
    <!-- 编辑 -->
    <el-dialog
      :title="$t(title)"
      :visible.sync="dialogFormVisible"
      width="40%"
      destroy-on-close
      v-if="dialogFormVisible"
    >
      <el-form :model="form" :rules="rules" ref="form" label-position="top">
        <el-form-item :label="$t('供应商名称')" prop="name">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item :label="$t('是否启动')" prop="switch">
          <el-switch
            v-model="form.switch"
            :active-text="$t('是')"
            :inactive-text="$t('否')"
            :active-value="1"
            :inactive-value="0"
            active-color="#13ce66"
            inactive-color="#bfcfd9"
          >
          </el-switch>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">{{ $t('取消') }}</el-button>
        <el-button type="primary" @click="saveSupplier('form')">{{
          $t('确定')
        }}</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import searchList from '@/components/searchList.vue'
import PaginationAndButtons from '@/components/pagination_and_buttons.vue'
import pagination from '@/mixin/pagination'
export default {
  mixins: [pagination],
  components: {
    searchList,
    PaginationAndButtons
  },
  name: 'supplierList',
  data() {
    return {
      searchValue: '',
      tableData: [],
      dialogFormVisible: false,
      form: {
        name: '',
        switch: false
      },
      title: '',
      rules: {
        name: [{ required: true }],
        switch: [{ required: true }]
      },
      categoryId: ''
    }
  },
  activated() {
    if (this.$store.state.search_flag === true) {
      this.searchValue = ''
    }
    this.getList()
  },
  methods: {
    // 添加或编辑供应商
    saveSupplier(form) {
      let api
      this.title === '添加供应商'
        ? (api = this.$http.post('api/shop/supplier', {
            ...this.form,
            shop_id: localStorage.getItem('shopId')
          }))
        : (api = this.$http.put(`api/shop/supplier/${this.categoryId}`, {
            name: this.form.name,
            switch: this.form.switch
          }))
      this.$refs[form].validate(valid => {
        if (valid) {
          api.then(res => {
            if (res.ret) {
              this.$notify({
                title: this.$t('成功'),
                type: 'success',
                message: res.msg
              })
              this.dialogFormVisible = false
              this.form = {}
              this.getList()
            }
          })
        } else {
          return false
        }
      })
    },
    // 点击编辑供应商
    editSupplier(row) {
      this.categoryId = row.id
      this.title = '编辑供应商'
      this.dialogFormVisible = true
      this.$http.get(`api/shop/supplier/${row.id}`).then(res => {
        if (res.ret) {
          this.form = res.data
        }
      })
    },
    // 点击添加供应商
    addSupplier() {
      this.title = '添加供应商'
      this.dialogFormVisible = true
      this.form = {}
    },
    // 删除
    deleteSupplier(row) {
      this.$confirm(this.$t('确认要删除吗?'), this.$t('提示'), {
        confirmButtonText: this.$t('确定'),
        cancelButtonText: this.$t('取消'),
        type: 'warning'
      })
        .then(() => {
          this.$http.delete(`api/shop/supplier/${row.id}`).then(res => {
            if (res.ret) {
              this.$notify({
                title: this.$t('成功'),
                type: 'success',
                message: res.msg
              })
              this.getList()
            }
          })
        })
        .catch(() => {})
    },
    // 获取供应商列表
    async getList() {
      this.page_params.keyword = this.searchValue
      const res = await this.$http.get(`api/shop/supplier`, {
        params: {
          page: this.page_params.page,
          size: this.page_params.size,
          keyword: this.page_params.keyword
        }
      })
      if (res.ret) {
        this.page_params.total = res.data.total
        this.tableData = res.data.data
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.classification_list {
  .table-main {
    background: #fff;
    padding: 15px;
  }
}
/deep/ .el-dialog__header {
  border-bottom: 1px solid #dcdfe6;
}
/deep/ .el-dialog__body {
  padding: 20px 40px;
}
/deep/ .el-dialog__footer {
  border-top: 1px solid #dcdfe6;
}
</style>
