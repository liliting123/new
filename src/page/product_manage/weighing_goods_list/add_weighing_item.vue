<template>
  <div>
    <div class="info-top">
      <div class="title">{{$t('基本信息')}}</div>
      <div class="nav">
        <!--        <tabsLanguage></tabsLanguage>-->
      </div>
      <div class="form-content">
        <el-form
          ref="form"
          :model="form"
          :rules="rules"
          label-width="80px"
          size="small"
          label-position="top">
          <el-row :gutter="20">
            <el-col :span="6">
              <el-form-item :label="`${$t('商品名称')}:`" prop="name">
                <el-input v-model="form.name"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8" :offset="6">
              <el-form-item :label="`${$t('商品分类')}:`" prop="name">
                <el-select v-model="form.name" :placeholder="$t('请选择分类')">
                  <el-option label="区域一" value="shanghai"></el-option>
                  <el-option label="区域二" value="beijing"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="6">
              <el-form-item :label="`${$t('商品编号')}:`" prop="name">
                <el-input v-model="form.name"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8" :offset="6">
              <el-form-item :label="`${$t('供应商')}:`" prop="name">
                <el-select v-model="form.name" :placeholder="$t('请选择分类')">
                  <el-option label="区域一" value="shanghai"></el-option>
                  <el-option label="区域二" value="beijing"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="6">
              <el-form-item :label="`${$t('可售库存')}:`" prop="name">
                <el-input v-model="form.name"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8" :offset="6">
              <el-form-item :label="`${$t('税率')}:`" prop="name">
                <el-select v-model="form.name">
                  <el-option label="区域一" value="shanghai"></el-option>
                  <el-option label="区域二" value="beijing"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="6">
              <el-form-item :label="`${$t('价格/KG')}:`" prop="name">
                <el-input v-model="form.name"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8" :offset="6">
              <el-form-item :label="`${$t('BBD')}:`" prop="name">
                <el-select v-model="form.name">
                  <el-option label="区域一" value="shanghai"></el-option>
                  <el-option label="区域二" value="beijing"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="6">
              <el-form-item :label="`${$t('是否有会员价')}:`" prop="name">
                <el-switch v-model="form.name"></el-switch>
              </el-form-item>
            </el-col>
            <el-col :span="8" :offset="6">
              <el-form-item :label="`${$t('商品图片')}:`" prop="name">
                <el-upload
                  class="upload-demo"
                  action="https://jsonplaceholder.typicode.com/posts/"
                  multiple
                  :limit="3">
                  <el-button size="small">{{$t('点击上传')}}</el-button>
                  <span>{{`（${$t('建议尺寸')} 500*500px）`}}</span>
                </el-upload>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="6">
              <el-form-item :label="`${$t('会员价格/KG')}:`" prop="name">
                <el-input v-model="form.name"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
      <div class="bottom-btn">
        <el-button type="primary" style="width: 180px">{{$t('保存')}}</el-button>
      </div>
    </div>
  </div>
</template>

<script>
// import tabsLanguage from '@/components/tabs-language.vue'
export default {
  name: 'add_weighing_item',
  components: {
    // tabsLanguage,
  },
  data() {
    return {
      form: {
        name: '',
        region: '',
        delivery: false
      },
      rules: {
        name: [{ required: true, message: '请填写商品名称', trigger: 'change' }]
      }
    }
  },
  methods: {
  }
}
</script>

<style lang="scss" scoped>
  .info-top {
    background: #ffffff;
    border-radius: 8px;
    margin-top: 10px;
    .title {
      padding: 20px;
      line-height: 15px;
      font-weight: bold;
      border-bottom: 1px solid rgba(196, 196, 196, 0.76);
      display: flex;
      justify-content: space-between;
    }
    .form-content {
      padding: 15px;
    }
    .content {
      display: inline-block;
      padding: 20px;
      width: 500px;
      margin-right: 200px;
    }
  }
  .bottom-btn {
    width: 100%;
    padding: 20px 0 50px 15px;
  }
</style>
