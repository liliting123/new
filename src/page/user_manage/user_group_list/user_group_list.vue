<template>
  <div class="user-group-list">
    <!--    筛选条件-->
    <search-list>
      <div slot="left">
        <el-button type="primary" @click="dialogFormVisible = true">{{
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
            <el-option
              v-for="item in selectList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
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
          <template slot-scope="scope">
            <span class="table_index">{{ scope.$index + 1 }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="name" :label="$t('员工组名称')" width="180">
        </el-table-column>
        <el-table-column prop="staff_count" :label="$t('员工人数')" width="180">
        </el-table-column>
        <el-table-column prop="updated_at" :label="$t('创建时间')"> </el-table-column>
        <el-table-column prop="remark" :label="$t('备注')"> </el-table-column>
        <el-table-column :label="$t('操作')" width="300">
          <template slot-scope="scope">
            <el-button type="text" @click="viewPeople(scope.row.id)">{{
              $t('查看人员')
            }}</el-button>
            <el-button type="text" @click="dialogAuthorityVisible = true">{{
              $t('权限')
            }}</el-button>
            <el-button type="text" @click="onDetail(scope.row.id)">{{
              $t('编辑')
            }}</el-button>
            <el-button type="text" @click="delect(scope.row.id)">{{
              $t('删除')
            }}</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <PaginationAndButtons :pageParams="page_params" />
    <!-- 编辑 -->
    <el-dialog :title="$t('编辑员工组')" :visible.sync="dialogFormVisible" width="30%">
      <el-form :model="form" :rules="rules" label-position="top">
        <el-row :gutter="20">
          <el-col :span="24">
            <el-form-item :label="$t('员工组名称')" prop="name">
              <el-input v-model="form.name" autocomplete="off"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item :label="$t('备注')" prop="remark">
              <el-input
                type="textarea"
                v-model="form.remark"
                autocomplete="off"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">{{ $t('取消') }}</el-button>
        <el-button type="primary" @click="onSave()">{{ $t('确定') }}</el-button>
      </div>
    </el-dialog>
    <el-dialog :title="$t('查看人员')" :visible.sync="dialogTableVisible" width="40%">
      <el-table :data="peopleData">
        <el-table-column width="80" align="center">
          <template slot-scope="scope">
            <span class="table_index">{{ scope.$index + 1 }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="name" :label="$t('员工名称')"></el-table-column>
        <el-table-column prop="email" :label="$t('邮箱')"></el-table-column>
        <el-table-column width="100" :label="$t('操作')">
          <template slot-scope="scope">
            <el-button type="text" @click="delect(scope.row.id)">{{
              $t('删除')
            }}</el-button>
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
import PaginationAndButtons from '@/components/pagination_and_buttons.vue'
import pagination from '@/mixin/pagination'
export default {
  components: {
    searchList,
    PaginationAndButtons
  },
  mixins: [pagination],
  data() {
    return {
      selectOption: '0',
      selectList: [
        { value: '0', label: '员工组名称' },
        { value: '1', label: '备注' }
      ],
      searchValue: '',
      dialogFormVisible: false,
      dialogTableVisible: false,
      dialogAuthorityVisible: false,
      tableData: [],
      peopleData: [],
      form: {
        name: '',
        remark: '',
        shop_id: 1
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

  mounted() {
    this.getList()
    console.log('snfksd')
  },
  methods: {
    getList() {
      this.tableLoading = true
      this.$http
        .get('api/shop/staff_group', {
          params: {
            page: this.page_params.page,
            size: this.page_params.size,
            keyword: this.page_params.keyword
          }
        })
        .then(res => {
          this.page_params.total = res.data.total
          this.tableData = res.data.data
          console.log(res.data.total)
        })
        .catch(() => {
          this.tableLoading = false
        })
    },
    onSave() {
      this.dialogFormVisible = false
      this.$http
        .post('api/shop/staff_group', {
          ...this.form
        })
        .then(res => {
          if (res.ret) {
            this.$notify({
              title: this.$t('success'),
              message: res.msg,
              type: 'success'
            })
            this.getList()
          }
        })
    },
    onDetail(id) {
      this.$http.get(`api/shop/staff_group/${id}`, {}).then(res => {
        console.log(res)
        this.form = res.data.staff_group
      })
      this.dialogFormVisible = true
    },
    delect(id) {
      console.log(id)
      this.$confirm(this.$t('确认要删除吗?'), this.$t('提示'), {
        confirmButtonText: this.$t('确定'),
        cancelButtonText: this.$t('取消'),
        type: 'warning'
      }).then(async () => {
        const res = await this.$http.delete(`api/shop/staff_group/${id}`)
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
    async viewPeople(id) {
      const res = await this.$http.get(`api/shop/staff_group/${id}/staff`, {
        params: {
          page: 1,
          size: 10,
          keyword: ''
        }
      })

      if (res.ret) {
        this.peopleData = res.data.data
      }
      this.dialogTableVisible = true
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
