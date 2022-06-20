<template>
  <div class="classification_list">
    <!--    筛选条件-->
    <search-list>
      <div slot="left">
        <el-button type="info" @click="dialogFormVisible = true">{{
          $t('添加分类')
        }}</el-button>
      </div>
      <div slot="right">
        <el-input
          :placeholder="$t('请输入内容')"
          v-model="searchValue"
          class="input-with-select"
        >
          <el-button slot="append">{{ $t('搜索') }}</el-button>
        </el-input>
      </div>
    </search-list>
    <div class="table-main border-radius">
      <el-table
        ref="table"
        row-key="id"
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
        <el-table-column prop="code" :label="$t('分类名称')"> </el-table-column>
        <el-table-column prop="name" :label="$t('是否称重分类')"> </el-table-column>

        <el-table-column prop="postcode" :label="$t('创建时间')"> </el-table-column>
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
      :title="$t('添加分类')"
      :visible.sync="dialogFormVisible"
      width="40%"
      destroy-on-close
      v-if="dialogFormVisible"
    >
      <el-form :model="form" :rules="rules" label-position="top">
        <el-form-item :label="$t('分类名称')" prop="classificationName">
          <el-input v-model="form.classificationName" autocomplete="off"></el-input>
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
import Sortable from 'sortablejs'
import searchList from '@/components/searchList.vue'
// import PaginationAndButtons from '@/components/pagination_and_buttons.vue'
// import { pagination } from '@/mixin/pagination.js'
export default {
  // mixins: [pagination],
  components: {
    searchList,
    Sortable
  },
  data() {
    return {
      searchValue: '',
      page_params: 1,
      // tableData: [],
      tableData: [
        {
          date: '1',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        },
        {
          date: '2',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        },
        {
          date: '3',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄'
        },
        {
          date: '4',
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
  mounted() {
    this.dragSort()
    // this.getList()
  },
  updated() {},

  methods: {
    async getList() {
      const res = await this.$http.get(`api/countries`)
      console.log(res)
      if (res.ret === 1) {
        this.tableData = res.data
      }
    },
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
    },
    // 拖拽排序
    dragSort() {
      const el = this.$refs.table.$el.querySelectorAll(
        '.el-table__body-wrapper > table > tbody'
      )[0]
      this.sortable = Sortable.create(el, {
        ghostClass: 'sortable-ghost',
        setData: function(dataTransfer) {
          dataTransfer.setData('Text', '')
        },
        onEnd: async e => {
          // e.oldIndex为拖动一行原来的位置，e.newIndex为拖动后新的位置
          const targetRow = this.tableData.splice(e.oldIndex, 1)[0] // 拖拽后的行
          console.log(targetRow)
          this.tableData.splice(e.newIndex, 0, targetRow) // 得到拖拽后的数组
          let sortData = this.tableData.map((item, index) => {
            item.index_sort = index
            return {
              id: item.id,
              index_sort: item.index_sort
            }
          })
          const res = await this.$http.post(`api/countries/sort`, {
            sort_data: sortData
          })
          if (res.ret) {
            this.$notify({
              title: this.$t('success'),
              message: res.msg,
              type: 'success'
            })
          }
        }
      })
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
