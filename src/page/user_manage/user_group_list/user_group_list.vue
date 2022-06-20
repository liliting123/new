<template>
  <div class="user-group-list">
    <!--    筛选条件-->
    <search-list>
      <div slot="left">
        <el-button type="info" @click="dialogFormVisible = true">{{
          $t('添加员工组')
        }}</el-button>
      </div>
      <div slot="right">
        <el-input
          :placeholder="$t('请输入内容')"
          v-model="searchValue"
          class="input-with-select"
        >
          <el-select
            v-model="selectOption"
            slot="prepend"
            :placeholder="$t('员工组名称')"
            style="width:120px"
          >
            <el-option :label="$t('备注')" value="1"></el-option>
          </el-select>
          <el-button slot="append">{{ $t('搜索') }}</el-button>
        </el-input>
      </div>
    </search-list>
    <div class="table-main border-radius">
      <el-table
        :data="tableData"
        :header-cell-style="{ background: '#F7F7F7' }"
        style="width: 100%"
      >
        <el-table-column align="center" width="50">
          <template>
            <span class="table_index">1</span>
          </template>
        </el-table-column>
        <el-table-column prop="date" :label="$t('员工组名称')" width="180">
        </el-table-column>
        <el-table-column prop="name" :label="$t('员工人数')" width="180">
        </el-table-column>
        <el-table-column prop="address" :label="$t('创建时间')"> </el-table-column>
        <el-table-column prop="address" :label="$t('备注')"> </el-table-column>
        <el-table-column :label="$t('操作')" width="250">
          <template slot-scope="">
            <el-button type="text" @click="dialogTableVisible = true">{{
              $t('查看人员')
            }}</el-button>
            <el-button type="text" @click="dialogAuthorityVisible = true">{{
              $t('权限')
            }}</el-button>
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
    <el-dialog :title="$t('编辑员工组')" :visible.sync="dialogFormVisible" width="40%">
      <el-form :model="form" :rules="rules" label-position="top">
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item :label="$t('员工邮箱')" prop="email">
              <el-input
                v-model="form.email"
                autocomplete="off"
                :disabled="true"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item :label="$t('员工名称')" prop="name">
              <el-input v-model="form.name" autocomplete="off"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item :label="$t('密码')" prop="password">
              <el-input v-model="form.password" autocomplete="off"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item :label="$t('员工组')" prop="userGroup">
              <el-select v-model="value" :placeholder="$t('请选择')" style="width:100%">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item :label="$t('确认密码')" prop="password2">
              <el-input v-model="form.password2" autocomplete="off"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item :label="$t('备注')">
              <el-input v-model="form.remark" autocomplete="off"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">{{ $t('取消') }}</el-button>
        <el-button type="primary" @click="dialogFormVisible = false">{{
          $t('确定')
        }}</el-button>
      </div>
    </el-dialog>
    <el-dialog :title="$t('查看人员')" :visible.sync="dialogTableVisible" width="40%">
      <el-table :data="gridData">
        <el-table-column type="index" width="80" align="center"> </el-table-column>
        <el-table-column property="date" :label="$t('员工名称')"></el-table-column>
        <el-table-column property="name" :label="$t('邮箱')"></el-table-column>
        <el-table-column width="100" :label="$t('操作')">
          <template slot-scope="">
            <el-button type="text" @click="delect">{{ $t('删除') }}</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogTableVisible = false">{{ $t('取消') }}</el-button>
        <el-button type="primary" @click="dialogTableVisible = false">{{
          $t('确定')
        }}</el-button>
      </div>
    </el-dialog>
    <el-dialog :title="$t('权限')" :visible.sync="dialogAuthorityVisible" width="40%">
      <el-tree
        :data="data"
        show-checkbox
        default-expand-all
        node-key="id"
        ref="tree"
        highlight-current
        :props="defaultProps"
      >
      </el-tree>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogAuthorityVisible = false">{{ $t('取消') }}</el-button>
        <el-button type="primary" @click="dialogAuthorityVisible = false">{{
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
      selectOption: '',
      searchValue: '',
      page_params: 1,
      dialogFormVisible: false,
      dialogTableVisible: false,
      dialogAuthorityVisible: false,
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
      gridData: [
        {
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        },
        {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        },
        {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        },
        {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }
      ],

      form: {
        name: '',
        email: '',
        password: '',
        userGroup: '',
        password2: '',
        remark: ''
      },
      options: [
        {
          value: '1',
          label: '欧亚超市一号店'
        },
        {
          value: '2',
          label: '欧亚超市二号店'
        }
      ],
      value: '',
      rules: {
        email: [{ required: true }],
        name: [{ required: true, message: this.$t('请输入员工名称') }],
        password: [{ required: true, message: this.$t('请输入密码') }],
        userGroup: [{ required: true, message: this.$t('请选择员工组') }],
        password2: [{ required: true, message: this.$t('请输入确认密码') }]
      },

      // 权限
      data: [
        {
          id: 1,
          label: '一级 1',
          children: [
            {
              id: 4,
              label: '二级 1-1',
              children: [
                {
                  id: 9,
                  label: '三级 1-1-1'
                },
                {
                  id: 10,
                  label: '三级 1-1-2'
                }
              ]
            }
          ]
        },
        {
          id: 2,
          label: '一级 2',
          children: [
            {
              id: 5,
              label: '二级 2-1'
            },
            {
              id: 6,
              label: '二级 2-2'
            }
          ]
        },
        {
          id: 3,
          label: '一级 3',
          children: [
            {
              id: 7,
              label: '二级 3-1'
            },
            {
              id: 8,
              label: '二级 3-2'
            }
          ]
        }
      ],
      defaultProps: {
        children: 'children',
        label: 'label'
      }
    }
  },

  // row,  每一行上的数据
  // column, 每一列上的数据
  // rowIndex,  行数的下标从0开始
  // columnIndex   列数下标从0开始
  methods: {
    onDetail() {},
    delect() {
      this.$confirm('确认要删除吗?', this.$t('提示'), {
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
.user-group-list {
  .table-main {
    background-color: #fff;
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
