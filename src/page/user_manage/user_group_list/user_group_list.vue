<template>
  <div class="user-group-list">
    <!--    筛选条件-->
    <search-list>
      <div slot="left">
        <el-button type="primary" @click="addUserGroup()">{{
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
          <el-button slot="append" @click="getList()">{{ $t('搜索') }}</el-button>
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
        <el-table-column prop="name" :label="$t('员工组名称')"> </el-table-column>
        <el-table-column prop="staff_count" :label="$t('员工人数')"> </el-table-column>
        <el-table-column prop="updated_at" :label="$t('创建时间')"> </el-table-column>
        <el-table-column prop="remark" :label="$t('备注')"> </el-table-column>
        <el-table-column :label="$t('操作')" width="300">
          <template slot-scope="scope">
            <el-button type="text" @click="viewPeople(scope.row.id)">{{
              $t('查看人员')
            }}</el-button>
            <el-button type="text" @click="onDetail(scope.row.id)">{{
              $t('权限')
            }}</el-button>
            <el-button type="text" @click="onDetail(scope.row.id, 'edit')">{{
              $t('编辑')
            }}</el-button>
            <el-button type="text" @click="onDelect(scope.row.id)">{{
              $t('删除')
            }}</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <PaginationAndButtons :pageParams="page_params" />
    <!-- 编辑 -->
    <el-dialog
      :title="userGroupIds ? $t('编辑员工组') : $t('添加员工组')"
      :visible.sync="dialogFormVisible"
      width="30%"
    >
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
            <el-button type="text" @click="delectPeople(scope.row.id)">{{
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
        :data="permissionData"
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
        <el-button type="primary" @click="getCheckedKeys()">{{ $t('确定') }}</el-button>
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
      selectOption: '1',
      selectList: [
        { value: '1', label: this.$t('员工组名称') },
        { value: '2', label: this.$t('备注') }
      ],
      searchValue: '',
      dialogFormVisible: false,
      dialogTableVisible: false,
      dialogAuthorityVisible: false,
      tableData: [],
      peopleData: [],
      form: {
        name: '',
        remark: ''
      },
      value: '',
      rules: {
        email: [{ required: true }],
        name: [{ required: true, message: this.$t('请输入员工名称') }],
        password: [{ required: true, message: this.$t('请输入密码') }],
        userGroup: [{ required: true, message: this.$t('请选择员工组') }],
        password2: [{ required: true, message: this.$t('请输入确认密码') }]
      },
      userGroupIds: '',
      powerIds: '',
      // 权限
      permissionData: [
        {
          label: '后台',
          children: [
            // {
            //   label: '我的面板',
            //   children: [
            //     {
            //       label: '首页'
            //     }
            //   ]
            // },
            {
              label: '用户管理',
              children: [
                {
                  id: 2,
                  label: '用户列表'
                },
                {
                  id: 3,
                  label: '用户组列表'
                }
              ]
            },
            {
              label: '订单管理',
              children: [
                {
                  id: 4,
                  label: '订单列表'
                },
                {
                  id: 5,
                  label: '退款列表'
                }
              ]
            },
            {
              label: '商品管理',
              children: [
                {
                  id: 6,
                  label: '普通商品列表'
                },
                {
                  id: 7,
                  label: '称重商品列表'
                },
                {
                  id: 8,
                  label: '分类列表'
                },
                {
                  id: 9,
                  label: '供应商列表'
                }
              ]
            },

            {
              label: '配置设置',
              children: [
                {
                  id: 10,
                  label: '店铺设置'
                },
                {
                  id: 11,
                  label: '支付设置'
                }
              ]
            }
          ]
        }
      ],
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      group_permission: []
    }
  },

  mounted() {
    this.getList()
  },
  methods: {
    getList() {
      this.tableLoading = true
      this.$http
        .get('api/shop/staff_group', {
          params: {
            page: this.page_params.page,
            size: this.page_params.size,
            type_id: this.selectOption,
            keyword: this.searchValue
          }
        })
        .then(res => {
          this.page_params.total = res.data.total
          this.tableData = res.data.data
        })
        .catch(() => {
          this.tableLoading = false
        })
    },
    async onSave() {
      const [method, url] = this.userGroupIds
        ? ['put', `api/shop/staff_group/${this.userGroupIds}`]
        : ['post', 'api/shop/staff_group']
      const res = await this.$http[method](url, {
        ...this.form,
        shop_id: localStorage.getItem('shopId')
      })
      if (res.ret) {
        this.$notify({
          title: this.$t('success'),
          message: res.msg,
          type: 'success'
        })
        this.form = {}
        this.userGroupIds = ''
        this.dialogFormVisible = false
        this.getList()
      }
    },
    // 显示权限
    setCheckedKeys(groupPermission) {
      this.$refs.tree.setCheckedKeys(groupPermission)
    },
    onDetail(id, type) {
      this.userGroupIds = id
      this.$http.get(`api/shop/staff_group/${id}`).then(res => {
        this.form = res.data.staff_group
        this.group_permission = JSON.parse(JSON.stringify(res.data.group_permission))
        if (type === 'edit') {
          this.dialogFormVisible = true
        } else {
          this.$nextTick(() => {
            this.setCheckedKeys(this.group_permission)
          })
          this.dialogAuthorityVisible = true
        }
      })
    },
    onDelect(id) {
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
      this.dialogTableVisible = true
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
    },
    delectPeople(id) {
      this.$confirm(this.$t('确认要删除吗?'), this.$t('提示'), {
        confirmButtonText: this.$t('确定'),
        cancelButtonText: this.$t('取消'),
        type: 'warning'
      }).then(async () => {
        const res = await this.$http.delete(`api/shop/staff/${id}`)
        if (res.ret === 1) {
          this.$notify({
            title: this.$t('success'),
            message: res.msg,
            type: 'success'
          })
          this.viewPeople(id)
          this.getList()
        }
      })
    },
    openPower(id) {
      this.powerIds = id
      this.dialogAuthorityVisible = true
    },
    getCheckedKeys() {
      this.dialogAuthorityVisible = false
      const arrs = this.$refs.tree.getCheckedKeys().filter(res => {
        return res !== undefined
      })
      this.$json
        .post(`api/shop/staff_group/${this.userGroupIds}/permission`, {
          permission_ids: arrs
        })
        .then(res => {
          this.$notify({
            title: this.$t('success'),
            message: res.msg,
            type: 'success'
          })
        })
    },
    addUserGroup() {
      this.userGroupIds = ''
      this.form = {}
      this.dialogFormVisible = true
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
