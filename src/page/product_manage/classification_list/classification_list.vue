<template>
  <div class="classification_list">
    <!--    筛选条件-->
    <search-list>
      <div slot="left">
        <el-button type="primary" @click="insertClass()">
          {{ $t('添加分类') }}
        </el-button>
      </div>
      <div slot="right">
        <el-input v-model="searchValue" class="input-with-select">
          <el-button slot="append" @click="getList()">
            {{ $t('搜索') }}
          </el-button>
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
          <template slot-scope="scope">
            <span class="table_index">{{ scope.$index + 1 }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="name" :label="$t('分类名称')"> </el-table-column>
        <el-table-column prop="weigh" :label="$t('是否称重分类')">
          <template slot-scope="scope">
            {{ scope.row.weigh ? $t('是') : $t('否') }}
          </template>
        </el-table-column>
        <el-table-column prop="created_at" :label="$t('创建时间')"> </el-table-column>
        <el-table-column :label="$t('操作')" width="200">
          <template slot-scope="scope">
            <el-button type="text" @click="editClassifly(scope.row)">
              {{ $t('编辑') }}
            </el-button>
            <el-button type="text" @click="deleteClassifly(scope.row)">{{
              $t('删除')
            }}</el-button>
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
      <TabsLanguage @update="modifyLanguage" />
      <el-form :model="form" :rules="rules" ref="form" label-position="top">
        <el-form-item :label="$t('分类名称')" prop="name">
          <el-input v-model="form.name[currentLanguage]"></el-input>
        </el-form-item>
        <el-form-item :label="$t('是否称重分类')" prop="weigh">
          <el-switch
            v-model="form.weigh"
            :active-text="$t('是')"
            :inactive-text="$t('否')"
            :active-value="1"
            :inactive-value="0"
            active-color="#13ce66"
            inactive-color="#bfcfd9"
          >
          </el-switch>
        </el-form-item>
        <el-form-item :label="`${$t('分类图片')}:`" prop="cover">
          <el-upload
            class="upload-demo"
            :action="$baseUrl.BASE_API_URL + '/api/shop/upload/image'"
            name="image"
            :on-success="uploadSuccess"
            :show-file-list="false"
          >
            <el-button size="small">{{ $t('点击上传') }}</el-button>
            <span>{{ `（${$t('建议尺寸')} 200*100px）` }}</span>
          </el-upload>
          <img v-if="form.cover" :src="form.cover" width="200px" height="100px" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">{{ $t('取消') }}</el-button>
        <el-button type="primary" @click="saveClassifly('form')">
          {{ $t('确定') }}
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import Sortable from 'sortablejs'
import searchList from '@/components/searchList.vue'
import TabsLanguage from '@/components/tabs-language.vue'
import PaginationAndButtons from '@/components/pagination_and_buttons.vue'
import pagination from '@/mixin/pagination'
export default {
  components: {
    searchList,
    Sortable,
    TabsLanguage,
    PaginationAndButtons
  },
  mixins: [pagination],
  name: 'classificationList',
  data() {
    return {
      searchValue: '',
      tableData: [],
      dialogFormVisible: false,
      form: {
        name: {},
        weigh: '',
        cover: ''
      },
      currentLanguage: '',
      title: '',
      categoryId: ''
    }
  },
  computed: {
    rules() {
      const validateLanguage = (rule, value, cb) => {
        const requiredLanguage = () => ['cn', 'en', 'nl'].includes(this.currentLanguage)
        if (requiredLanguage) {
          if (value.cn && value.en && value.nl) {
            cb()
          } else cb(new Error(this.$t('中文、英文、荷兰语为必填项')))
        }
        cb()
      }
      return {
        name: [{ required: true, validator: validateLanguage, trigger: 'blur' }],
        weigh: [{ required: true }],
        cover: [{ required: true }]
      }
    }
  },
  mounted() {
    this.dragSort()
    this.getList()
  },
  updated() {},

  methods: {
    // 编辑分类
    editClassifly(row) {
      this.title = '编辑分类'
      this.categoryId = row.id
      this.dialogFormVisible = true
      this.$http.get(`api/shop/category/${row.id}`).then(res => {
        if (res.ret) {
          this.form = res.data
        }
      })
    },
    // 添加或编辑分类
    saveClassifly(form) {
      let api
      this.title === '添加分类'
        ? (api = this.$http.post('api/shop/category', {
            ...this.form,
            shop_id: localStorage.getItem('shopId')
          }))
        : (api = this.$http.put(`api/shop/category/${this.categoryId}`, {
            name: this.form.name,
            weigh: this.form.weigh,
            cover: this.form.cover
          }))
      this.$refs[form].validate(valid => {
        if (valid) {
          api.then(res => {
            if (res.ret) {
              this.$notify({
                title: this.$t('成功'),
                type: 'success',
                message: this.$t('添加成功')
              })
              this.dialogFormVisible = false
              this.form.cover = ''
              this.form.weigh = ''
              this.form.name = {}
              this.getList()
            }
          })
        } else {
          return false
        }
      })
    },
    // 获取列表数据
    async getList() {
      this.page_params.keyword = this.searchValue
      const res = await this.$http.get(`api/shop/category`, {
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
    },
    // 删除分类
    deleteClassifly(row) {
      this.$confirm(this.$t('确认要删除吗?'), this.$t('提示'), {
        confirmButtonText: this.$t('确定'),
        cancelButtonText: this.$t('取消'),
        type: 'warning'
      })
        .then(() => {
          this.$http.delete(`api/shop/category/${row.id}`).then(res => {
            if (res.ret) {
              this.$notify({
                title: this.$t('成功'),
                type: 'success',
                message: this.$t('删除成功')
              })
              this.getList()
            }
          })
        })
        .catch(() => {})
    },
    insertClass() {
      this.dialogFormVisible = true
      this.title = '添加分类'
      this.form.cover = ''
      this.form.weigh = ''
      this.form.name = {}
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
          const res = await this.$http.post(`api/shop/category/sort`, {
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
    },
    modifyLanguage(language) {
      this.currentLanguage = language
    },
    // 图片上传成功时触发的钩子
    uploadSuccess(response, file, fileList) {
      this.form.cover = response.data.path
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
