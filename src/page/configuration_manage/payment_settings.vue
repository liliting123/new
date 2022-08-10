<template>
  <div class="payment_settings">
    <div class="table-main">
      <el-table
        :data="tableData"
        :header-cell-style="{ background: '#F7F7F7' }"
        style="width: 100%"
      >
        <el-table-column width="50">
          <template slot-scope="scope">
            <span class="table_index">{{ scope.$index + 1 }}</span>
          </template>
        </el-table-column>

        <el-table-column prop="name" :label="$t('支付方式')"> </el-table-column>
        <el-table-column :label="$t('支付图标')">
          <template slot-scope="scope">
            <img width="50px" height="50px" :src="scope.row.icon" alt="支付图标" />
          </template>
        </el-table-column>
        <el-table-column prop="switch" :label="$t('是否开启')">
          <template slot-scope="scope">
            {{ scope.row.switch ? $t('是') : $t('否') }}
          </template>
        </el-table-column>
        <el-table-column :label="$t('操作')" width="150">
          <template slot-scope="scope">
            <el-button type="text" @click="getDetail(scope.row.id)">
              {{ $t('编辑') }}
            </el-button>
          </template>
        </el-table-column>
      </el-table>

      <el-dialog :title="$t('编辑')" :visible.sync="dialogFormVisible" width="30%">
        <el-form :model="form" :rules="rulesInfo" label-position="top">
          <div class="nav">
            <TabsLanguage :marginLeft="20" @update="modifyLanguage" />
          </div>
          <el-form-item :label="$t('支付名称')">
            <el-input v-model="form.name[currentLanguage]"></el-input>
          </el-form-item>
          <el-form-item :label="`${$t('支付图标')}:`" prop="logo">
            <el-upload
              class="upload-demo"
              :action="$baseUrl.BASE_API_URL + '/api/shop/upload/image'"
              name="image"
              :on-success="uploadSuccess"
              :show-file-list="false"
            >
              <el-button size="small">{{ $t('点击上传') }}</el-button>
              <span>{{ `（${$t('建议尺寸')} 300*300px）` }}</span>
            </el-upload>
            <img :src="form.icon" width="100px" height="100px" />
          </el-form-item>
          <el-form-item :label="`*${$t('是否启动')}`">
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
          <el-button type="primary" @click="onSave()">
            {{ $t('确定') }}
          </el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import TabsLanguage from '@/components/tabs-language.vue'

export default {
  components: {
    TabsLanguage
  },
  data() {
    return {
      dialogFormVisible: false,
      tableData: [],
      form: {
        name: {},
        icon: '',
        switch: false
      },
      paymentId: '',
      currentLanguage: ''
    }
  },
  computed: {
    rulesInfo() {
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
        name: [{ required: true, validator: validateLanguage, trigger: 'blur' }]
      }
    }
  },
  created() {
    this.getList()
  },
  methods: {
    // 获取支付列表
    getList() {
      this.$http.get('api/shop/payment').then(res => {
        if (res.ret) {
          this.tableData = res.data.data
        }
      })
    },
    getDetail(id) {
      this.dialogFormVisible = true
      this.paymentId = id
      this.$http.get(`api/shop/payment/${id}`).then(res => {
        if (res.ret) {
          console.log(res)
          this.form = res.data
        }
      })
    },
    async onSave() {
      const res = await this.$http.put(`api/shop/payment/${this.paymentId}`, {
        ...this.form
      })
      if (res.ret) {
        this.$notify({
          title: this.$t('成功'),
          type: 'success',
          message: res.msg
        })
        this.dialogFormVisible = false
        this.getList()
      }
    },
    // 图片上传成功时触发的钩子
    uploadSuccess(response, file, fileList) {
      this.form.icon = response.data.path
    },
    modifyLanguage(language) {
      this.currentLanguage = language
    }
  }
}
</script>

<style lang="scss" scoped>
.payment_settings {
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

/deep/ .el-switch__label * {
  width: 21px;
  line-height: 1;
  font-size: 12px;
  display: inline-block;
  margin-left: 10px;
}
/deep/ .el-switch__label {
  position: absolute;
  display: none;
  color: #fff !important;
  font-size: 12px !important;
}
/*打开时文字位置设置*/
/deep/ .el-switch__label--right {
  z-index: 1;
  right: 22px;
}
/*关闭时文字位置设置*/
/deep/ .el-switch__label--left {
  z-index: 1;
  left: 20px;
}
/*显示文字*/
/deep/ .el-switch__label.is-active {
  display: block;
}
/*开关宽度*/
/deep/ .el-switch .el-switch__core,
.el-switch .el-switch__label {
  width: 50px !important;
}
</style>
