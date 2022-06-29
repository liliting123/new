<template>
  <div class="classification_list">
    <!--    筛选条件-->
    <search-list>
      <div slot="left">
        <el-button type="primary" @click="dialogFormVisible = true">
          {{ $t('添加供应商') }}</el-button
        >
      </div>
      <div slot="right">
        <el-input v-model="searchValue" class="input-with-select">
          <el-button slot="append">{{ $t('搜索') }}</el-button>
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
        <el-table-column prop="date" :label="$t('供应商名称')"> </el-table-column>
        <el-table-column prop="name" :label="$t('是否启动')"> </el-table-column>

        <el-table-column prop="address" :label="$t('创建时间')"> </el-table-column>
        <el-table-column :label="$t('操作')" width="200">
          <template slot-scope="">
            <el-button type="text" @click="dialogFormVisible = true">{{
              $t('编辑')
            }}</el-button>
            <el-button type="text" @click="delect">{{ $t('删除') }}</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- <PaginationAndButtons :pageParams="page_params" /> -->
    <!-- 编辑 -->
    <el-dialog
      :title="$t('添加供应商')"
      :visible.sync="dialogFormVisible"
      width="40%"
      destroy-on-close
      v-if="dialogFormVisible"
    >
      <el-form :model="form" :rules="rules" label-position="top">
        <el-form-item :label="$t('供应商名称')" prop="supplierName">
          <el-input v-model="form.supplierName" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item :label="`*${$t('是否启动')}`">
          <el-switch
            v-model="form.enabled"
            :active-text="$t('是')"
            :inactive-text="$t('否')"
            active-color="#13ce66"
            inactive-color="#bfcfd9"
          >
          </el-switch>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">{{ $t('取消') }}</el-button>
        <el-button type="primary" @click="dialogFormVisible = false">{{
          $t('确定')
        }}</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import searchList from '@/components/searchList.vue'
// import PaginationAndButtons from '@/components/pagination_and_buttons.vue'
// import { pagination } from '@/mixin/pagination.js'
export default {
  // mixins: [pagination],
  components: {
    searchList
  },
  data() {
    return {
      searchValue: '',
      page_params: 1,
      tableData: [
        {
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        },
        {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        },
        {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄'
        },
        {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        }
      ],
      dialogFormVisible: false,
      form: {
        supplierName: '',
        enabled: false
      },
      rules: {
        supplierName: [{ required: true }]
      }
    }
  },
  mounted() {},
  updated() {},

  methods: {
    delect() {
      this.$confirm(this.$t('确认要删除吗?'), this.$t('提示'), {
        confirmButtonText: this.$t('确定'),
        cancelButtonText: this.$t('取消'),
        type: 'warning'
      })
        .then(() => {
          this.$notify({
            title: this.$t('成功'),
            type: 'success',
            message: this.$t('删除成功')
          })
        })
        .catch(() => {})
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
