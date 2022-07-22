<template>
  <div class="store_settings border-radius">
    <div class="store_settings_top">{{ $t('店铺信息') }}</div>
    <el-form
      :model="form"
      :rules="rules"
      ref="form"
      label-position="top"
      class="store_form">
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item :label="`${$t('店铺名称')}:`" prop="name">
            <el-input v-model="form.name"/>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="`${$t('邮编')}:`" prop="postcode">
            <el-input v-model="form.postcode" @blur="getAddress()"/>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item :label="`${$t('联系电话')}:`" prop="phone">
            <el-input v-model="form.phone"/>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="`${$t('门牌号')}:`" prop="door_no">
            <el-input v-model="form.door_no" @blur="getAddress()"/>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item :label="`${$t('邮箱')}:`" prop="email">
            <el-input v-model="form.email"/>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="`${$t('城市')}:`" prop="city">
            <el-input v-model="form.city" :disabled="form.city != ''"/>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item :label="`${$t('营业时间')}:`" prop="start_time">
            <el-time-picker
              is-range
              v-model="time"
              range-separator="至"
              start-placeholder="开始时间"
              end-placeholder="结束时间"
              placeholder="选择时间范围"
              value-format="HH:mm:ss">
            </el-time-picker>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="`${$t('街道')}:`" prop="street">
            <el-input v-model="form.street" :disabled="form.street != ''"/>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item :label="`${$t('店铺logo')}:`" prop="logo">
            <el-upload
              class="upload-demo"
              action="https://dev-shouyin-api.nle-tech.com/api/shop/upload/image"
              name="image"
              :on-success="uploadSuccess"
              :show-file-list="false">
              <el-button size="small">{{ $t('点击上传') }}</el-button>
              <span>{{ `（${$t('建议尺寸')} 180*180px）` }}</span>
            </el-upload>
            <img :src="form.logo"/>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="`${$t('店铺banner')}:`" prop="banner">
            <el-upload
             class="upload-demo"
             action="https://dev-shouyin-api.nle-tech.com/api/shop/upload/image"
             name="image"
             :on-success="uploadSuccess1"
             :show-file-list="false">
              <el-button size="small">{{ $t('点击上传') }}</el-button>
              <span>{{ `（${$t('建议尺寸')} 750*250px）` }}</span>
            </el-upload>
            <img style="width: 100px;height: 100px" :src="form.banner"/>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item>
        <el-button type="primary" @click="onSave('form')">{{ $t('保存') }}</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        name: '',
        phone: '',
        email: '',
        postcode: '',
        door_no: '',
        city: '',
        street: '',
        start_time: '',
        end_time: '',
        logo: '',
        banner: ''
      },
      time: '',
      shopId: localStorage.getItem('shopId')
    }
  },
  computed: {
    rules() {
      return {
        name: [{ required: true, message: '此项为必填', trigger: 'blur' }],
        phone: [{ required: true, message: '此项为必填', trigger: 'blur' }],
        email: [{ required: true, message: '此项为必填', trigger: 'blur' }],
        postcode: [{ required: true, message: '此项为必填', trigger: 'blur' }],
        door_no: [{ required: true, message: '此项为必填', trigger: 'blur' }],
        city: [{ required: true, message: '此项为必填', trigger: 'blur' }],
        street: [{ required: true, message: '此项为必填', trigger: 'blur' }],
        start_time: [{ required: true, message: '此项为必填', trigger: 'blur' }],
        end_time: [{ required: true, message: '此项为必填', trigger: 'blur' }],
        logo: [{ required: true, message: '此项为必填', trigger: 'blur' }],
        banner: [{ required: true, message: '此项为必填', trigger: 'blur' }]
      }
    }
  },
  created() {
    this.getShopInfo()
  },
  methods: {
    // 获取店铺信息
    getShopInfo() {
      this.$http.get(`api/shop/shop/${this.shopId}`).then(res => {
        if (res.ret) {
          this.form = res.data
          this.time = [this.form.start_time, this.form.end_time]
        }
      })
    },
    // 保存店铺信息
    onSave(form) {
      this.form.start_time = this.time[0]
      this.form.end_time = this.time[1]
      this.$refs[form].validate((valid) => {
        if (valid) {
          this.$http.put(`api/shop/shop/${22}`, {...this.form})
            .then(res => {
              if (res.ret) {
                this.$notify({
                  title: this.$t('成功'),
                  type: 'success',
                  message: this.$t('保存成功')
                })
                this.getShopInfo()
              }
            })
        } else {
          return false
        }
      })
    },
    // 根据邮编、门牌号获取街道地址
    getAddress() {
      if (this.form.postcode && this.form.door_no) {
        this.$http.post('api/shop/shop/nl_address', {
          postcode: this.form.postcode,
          door_no: this.form.door_no
        }).then(res => {
          if (res.ret) {
            this.form.city = res.data.city
            this.form.street = res.data.street
          }
        })
      }
    },
    // 图片上传成功时触发的钩子
    uploadSuccess(response, file, fileList) {
      this.form.logo = response.data.path
    },
    handleExceed(files, fileList) {
      this.$message.warning(`当前限制上传 1 张图片`)
    },
    // 图片上传成功时触发的钩子
    uploadSuccess1(response, file, fileList) {
      this.form.banner = response.data.path
    },
    handleExceed1(files, fileList) {
      this.$message.warning(`当前限制上传 1 张图片`)
    }
  }
}
</script>
<style lang="scss" scoped>
.store_settings {
  margin: 10px;
  background-color: #fff;
  .store_settings_top {
    border-bottom: 1px solid #d7d7d7;
    padding: 10px 15px;
    font-weight: bold;
  }
  .store_form {
    padding: 15px;
  }
  /deep/ .el-input__inner {
    width: 60%;
  }
}
</style>
