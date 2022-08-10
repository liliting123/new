<template>
  <div class="user-list">
    <!--    筛选条件-->
    <search-list>
      <div slot="left">
        <el-button type="primary" @click="addUser()">{{ $t('添加员工') }}</el-button>
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
            :placeholder="$t('员工名称')"
            style="width:110px"
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
        :header-cell-style="{
          background: '#F7F7F7'
        }"
        style="width: 100%"
      >
        <el-table-column width="50" align="center">
          <template slot-scope="scope">
            <span class="table_index">{{ scope.$index + 1 }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="name" :label="$t('员工名称')"> </el-table-column>
        <el-table-column prop="email" :label="$t('员工邮箱')"> </el-table-column>
        <el-table-column :label="$t('员工组')">
          <template slot-scope="scope">
            {{ scope.row.group.name }}
          </template>
        </el-table-column>
        <el-table-column prop="updated_at" :label="$t('创建时间')"> </el-table-column>
        <el-table-column prop="remark" :label="$t('备注')"> </el-table-column>
        <el-table-column :label="$t('操作')" width="200">
          <template slot-scope="scope">
            <el-button type="text" @click="onDetail(scope.row.id)">{{
              $t('编辑')
            }}</el-button>
            <el-button type="text" @click="onDelect(scope.row.id)">{{
              $t('删除')
            }}</el-button>
            <el-button type="text" @click="allowLogin(scope.row)">{{
              scope.row.status_id == 1 ? $t('禁止登录') : $t('允许登录')
            }}</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <PaginationAndButtons :pageParams="page_params" />
    <!-- 编辑 -->
    <el-dialog
      :title="userIds ? $t('编辑员工') : $t('添加员工')"
      :visible.sync="dialogFormVisible"
      width="40%"
      destroy-on-close
      v-if="dialogFormVisible"
    >
      <el-form :model="form" :rules="rules" label-position="top">
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item :label="$t('员工邮箱')" prop="email">
              <el-input
                v-model="form.email"
                autocomplete="off"
                :disabled="userIds ? true : false"
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
            <el-form-item :label="$t('员工组')" prop="staff_group_id">
              <el-select
                v-model="form.staff_group_id"
                :placeholder="$t('请选择用户组')"
                style="width:100%"
              >
                <el-option
                  v-for="item in userGroupSelect"
                  :key="item.value"
                  :label="item.name"
                  :value="item.id"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item :label="$t('确认密码')" prop="password_confirmation">
              <el-input
                v-model="form.password_confirmation"
                autocomplete="off"
              ></el-input>
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
        <el-button type="primary" @click="onSave()">{{ $t('确定') }}</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import searchList from '@/components/searchList.vue'
import PaginationAndButtons from '@/components/pagination_and_buttons.vue'
import pagination from '@/mixin/pagination.js'
export default {
  mixins: [pagination],
  components: {
    searchList,
    PaginationAndButtons
  },
  data() {
    return {
      selectOption: '1',
      selectList: [
        { value: '1', label: this.$t('员工名称') },
        { value: '2', label: this.$t('邮箱') },
        { value: '3', label: this.$t('备注') }
      ],
      searchValue: '',
      tableData: [],
      dialogFormVisible: false,
      form: {
        name: '',
        email: '',
        password: '',
        staff_group_id: '',
        password_confirmation: '',
        remark: ''
      },
      userGroupSelect: [],
      rules: {
        email: [{ required: true }],
        name: [{ required: true, message: '请输入员工名称' }],
        password: [{ required: true, message: '请输入密码' }],
        password_confirmation: [{ required: true, message: '请输入确认密码' }]
      },
      userIds: '',
      is_lock: 1
    }
  },
  mounted() {
    this.getList()
    this.getGroupList()
  },
  methods: {
    getList() {
      this.tableLoading = true
      this.$http
        .get('api/shop/staff', {
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
    onSave() {
      if (this.userIds) {
        this.$json.put(`api/shop/staff/${this.userIds}`, { ...this.form }).then(res => {
          if (res.ret) {
            this.$notify({
              title: this.$t('success'),
              message: res.msg,
              type: 'success'
            })
            this.form = {}
            this.userIds = ''
            this.dialogFormVisible = false
            this.getList()
          }
        })
      } else {
        this.$http
          .post('/api/shop/staff', {
            ...this.form,
            shop_id: localStorage.getItem('shopId')
          })
          .then(res => {
            if (res.ret) {
              this.$notify({
                title: this.$t('success'),
                message: res.msg,
                type: 'success'
              })
              this.form = {}
              this.dialogFormVisible = false
              this.getList()
            }
          })
      }
    },
    addUser() {
      this.userIds = ''
      this.form = {}
      this.dialogFormVisible = true
    },
    onDetail(id) {
      this.userIds = id
      this.$http.get(`api/shop/staff/${id}`, {}).then(res => {
        this.form = res.data
      })
      this.dialogFormVisible = true
    },
    onDelect(id) {
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
          this.getList()
        }
      })
    },
    // 获取用户组
    getGroupList() {
      this.tableLoading = true
      this.$http
        .get('api/shop/staff_group', {
          params: {
            list: 'all'
          }
        })
        .then(res => {
          this.userGroupSelect = res.data
        })
        .catch(() => {
          this.tableLoading = false
        })
    },
    allowLogin(row) {
      const statusId = row.status_id === 1 ? 2 : 1
      this.$json
        .post(`api/shop/staff/check_login/${row.id}`, { status_id: statusId })
        .then(res => {
          if (res.ret === 1) {
            this.$notify({
              title: this.$t('success'),
              message: res.msg,
              type: 'success'
            })
            this.getList()
          }
        })
    }
  }
}
</script>

<style lang="scss" scoped>
.user-list {
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
