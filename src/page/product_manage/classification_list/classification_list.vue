<template>
  <div class="classification_list">
    <!--    筛选条件-->
    <search-list>
      <div slot="left">
        <el-button type="info" @click="dialogFormVisible = true">添加分类</el-button>
      </div>
      <div slot="right">
        <el-input
          placeholder="请输入内容"
          v-model="searchValue"
          class="input-with-select"
        >
          <el-button slot="append">搜索</el-button>
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
        <el-table-column width="60" align="center">
          <template>
            <p class="draggable iconfont icon-paixu"></p>
          </template>
        </el-table-column>
        <el-table-column width="50" align="center" label="#">
          <template>
            <span class="table_index">1</span>
          </template>
        </el-table-column>
        <el-table-column prop="date" label="分类名称"> </el-table-column>
        <el-table-column prop="name" label="是否称重分类"> </el-table-column>

        <el-table-column prop="address" label="创建时间"> </el-table-column>
        <el-table-column label="操作" width="200">
          <template slot-scope="">
            <el-button type="text" @click="dialogFormVisible = true">编辑</el-button>
            <el-button type="text" @click="delect">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- <PaginationAndButtons :pageParams="page_params" /> -->
    <!-- 编辑 -->
    <el-dialog
      title="添加分类"
      :visible.sync="dialogFormVisible"
      width="40%"
      destroy-on-close
      v-if="dialogFormVisible"
    >
      <el-form :model="form" :rules="rules" label-position="top">
        <el-form-item label="分类名称" prop="classificationName">
          <el-input v-model="form.classificationName" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="*是否启动">
          <el-switch
            v-model="form.enabled"
            active-text="是"
            inactive-text="否"
            active-color="#13ce66"
            inactive-color="#bfcfd9"
          >
          </el-switch>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
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
        classificationName: '',
        enabled: false
      },
      rules: {
        classificationName: [{ required: true }]
      }
    }
  },
  mounted() {},
  updated() {},

  methods: {
    delect() {
      this.$confirm('确认要删除吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.$notify({
            title: '成功',
            type: 'success',
            message: '删除成功'
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
