<template>
  <el-dialog
    title="结算密码"
    :visible="dialogPassword"
    :before-close="handleClose"
    width="500px">
    <div style="padding: 0 40px 0 40px">
      <el-form :model="form" label-position="top">
        <el-form-item label="设置结算密码:">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="确认结算密码:">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="是否开启:">
          <el-switch
            v-model="form.value"
            active-color="#13ce66"
            inactive-color="#d7d7d7">
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
      <el-button @click="dialogPassword = false">取 消</el-button>
      <el-button type="primary" @click="dialogPassword = false">确 定</el-button>
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
        name: '',
        value: false
      }
    }
  },
  methods: {
    handleClose() {
      this.dialogPassword = false
    }
  }
}
</script>

<style scoped>

</style>
