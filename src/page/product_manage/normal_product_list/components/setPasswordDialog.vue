<template>
  <el-dialog
    :title="$t('结算密码')"
    :visible="dialogPassword"
    :before-close="handleClose"
    width="500px"
  >
    <div style="padding: 0 40px 0 40px">
      <el-form :model="form" :rules="rulesPwd" ref="ruleFormPwd" label-position="top">
        <el-form-item :label="`${$t('设置结算密码')}:`" prop="pwd">
          <el-input v-model="form.pwd" show-password></el-input>
        </el-form-item>
        <el-form-item :label="`${$t('确认结算密码')}:`" prop="surePwd">
          <el-input v-model="form.surePwd" show-password></el-input>
        </el-form-item>
        <el-form-item :label="`${$t('是否开启')}:`" prop="isOpen">
          <el-switch
            v-model="form.isOpen"
            :active-value="1"
            :inactive-value="0"
            active-color="#13ce66"
            inactive-color="#d7d7d7"
          >
          </el-switch>
        </el-form-item>
      </el-form>
      <el-form>
        <span style="color: gray;font-size: 12px">
          开启后，用户自助收银购买烟酒类商品时，结算前将需要工作人员输入密码核对用户身份后，才可继续结算。
        </span>
      </el-form>
    </div>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogPassword = false">{{ $t('取消') }}</el-button>
      <el-button type="primary" @click="setPwd('ruleFormPwd')">{{
        $t('确定')
      }}</el-button>
    </div>
  </el-dialog>
</template>

<script>
export default {
  name: 'setPasswordDialog',
  props: {
    visible: {
      type: Boolean,
      require: true
    }
  },
  computed: {
    dialogPassword: {
      get() {
        return this.visible
      },
      set(val) {
        this.$emit('update:visible', val)
      }
    }
  },
  data() {
    return {
      form: {
        pwd: '',
        surePwd: '',
        isOpen: false
      },
      rulesPwd: {
        pwd: [{ required: true, message: this.$t('请输入结算密码'), trigger: 'blur' }],
        surePwd: [
          { required: true, message: this.$t('请再一次输入结算密码'), trigger: 'blur' }
        ],
        isOpen: [{ required: true, message: this.$t('请选择'), trigger: 'blur' }]
      }
    }
  },
  methods: {
    // 设置结算密码
    setPwd(form) {
      this.$refs[form].validate(valid => {
        if (valid) {
          if (this.form.pwd === this.form.surePwd) {
            this.$http
              .post(`api/shop/goods/staff_payment_password/22`, {
                payment_password: this.form.pwd,
                password_confirmation: this.form.surePwd,
                is_payment_password: this.form.isOpen
              })
              .then(res => {
                if (res.ret) {
                  this.$notify({
                    title: this.$t('成功'),
                    type: 'success',
                    message: res.msg
                  })
                  this.dialogPassword = false
                  this.form = {}
                }
              })
          } else {
            this.$message.error(this.$t('两次输入的密码请保持一致'))
          }
        } else {
          return false
        }
      })
    },
    handleClose() {
      this.dialogPassword = false
      this.form = {}
    }
  }
}
</script>

<style scoped></style>
