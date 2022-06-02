<template>
  <div class="store_settings border-radius">
    <div class="store_settings_top">店铺信息</div>
    <el-form :model="form" :rules="rules" label-position="top" class="store_form">
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="店铺名称:" prop="name">
            <el-input v-model="form.email" autocomplete="off"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="邮编:" prop="email">
            <el-input v-model="form.name" autocomplete="off"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="联系电话:" prop="name">
            <el-input v-model="form.email" autocomplete="off"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="门牌号:" prop="email">
            <el-input v-model="form.name" autocomplete="off"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="邮箱:" prop="name">
            <el-input v-model="form.email" autocomplete="off"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="城市:" prop="email">
            <el-input v-model="form.name" autocomplete="off"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="营业时间:" prop="name">
            <el-input v-model="form.email" autocomplete="off"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="街道:" prop="email">
            <el-input v-model="form.name" autocomplete="off"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="店铺logo:" prop="name">
            <el-input v-model="form.email" autocomplete="off"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="店铺banner:" prop="email">
            <el-input v-model="form.name" autocomplete="off"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item>
        <el-button type="primary">保存</el-button>
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
        email: ''
      },
      rules: {
        email: [{ required: true }],
        name: [{ required: true }]
      }
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
