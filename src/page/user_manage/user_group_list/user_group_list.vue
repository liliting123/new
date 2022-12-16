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

    <el-dialog :title="$t('权限')" :visible.sync="dialogAuthorityVisible" width="40%">
      <el-row>
        <el-col :span="12"
          ><div class="grid-content bg-purple">
            <el-tree
              :data="permissionData"
              show-checkbox
              default-expand-all
              node-key="id"
              ref="tree"
              highlight-current
              :props="defaultProps"
            >
            </el-tree></div
        ></el-col>
        <el-col :span="12"
          ><div class="grid-content bg-purple-light">
            <el-tree
              :data="desktopPermissionData"
              show-checkbox
              default-expand-all
              node-key="id"
              ref="desktoptree"
              highlight-current
              :props="defaultProps"
            >
            </el-tree></div
        ></el-col>
      </el-row>

      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogAuthorityVisible = false">{{ $t('取消') }}</el-button>
        <el-button type="primary" @click="getCheckedKeys()">{{ $t('确定') }}</el-button>
      </div>
    </el-dialog>
    <!--    查看人员弹窗-->
    <viewPeopleDialog
      v-if="dialogViewPeople"
      :visible.sync="dialogViewPeople"
      :theUserGroupId="theUserGroupId"
      @fatherGetList="getList"
    />
  </div>
</template>
<script>
import searchList from '@/components/searchList.vue'
import PaginationAndButtons from '@/components/pagination_and_buttons.vue'
import pagination from '@/mixin/pagination'
import viewPeopleDialog from './components/viewPeopleDialog.vue'
export default {
  components: {
    searchList,
    PaginationAndButtons,
    viewPeopleDialog
  },
  mixins: [pagination],
  name: 'userGroupList',
  data() {
    return {
      selectOption: 1,
      selectList: [
        { value: 1, label: this.$t('员工组名称') },
        { value: 2, label: this.$t('备注') }
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
        name: [{ required: true, message: this.$t('请输入员工组名称') }]
      },
      userGroupIds: '',
      powerIds: '',
      // 权限
      permissionData: [],
      // 桌面端权限
      desktopPermissionData: [],
      defaultProps: {
        children: 'children',
        label: 'name'
      },
      group_permission: [],
      dialogViewPeople: false,
      theUserGroupId: ''
    }
  },

  activated() {
    // if (this.$store.state.search_flag === true) {
    // this.selectOption = 1
    // this.searchValue = ''
    // }
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
      this.$refs.desktoptree.setCheckedKeys(groupPermission)
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
            this.permissionData = [res.data.permission_tree[0]]
            this.desktopPermissionData = [res.data.permission_tree[1]]
            console.log(this.permissionData)
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
    viewPeople(id) {
      this.theUserGroupId = id
      this.dialogViewPeople = true
    },

    openPower(id) {
      this.powerIds = id
      this.dialogAuthorityVisible = true
    },
    getCheckedKeys() {
      const arrs = this.$refs.desktoptree
        .getCheckedKeys()
        .concat(this.$refs.tree.getCheckedKeys())
        .filter(res => {
          return res !== undefined
        })
      this.$json
        .post(`api/shop/staff_group/${this.userGroupIds}/permission`, {
          permission_ids: arrs
        })
        .then(res => {
          if (res.ret === 1) {
            this.dialogAuthorityVisible = false
            this.$notify({
              title: this.$t('success'),
              message: res.msg,
              type: 'success'
            })
          }
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
