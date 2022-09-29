<template>
  <div>
    <div class="info-top">
      <div class="title">{{ $t('基本信息') }}</div>

      <div class="form-content">
        <div class="nav">
          <TabsLanguage @update="modifyLanguage" />
        </div>
        <el-form
          ref="weighForm"
          :model="form"
          :rules="rulesInfo"
          label-width="80px"
          size="small"
          label-position="top"
        >
          <el-row :gutter="20">
            <el-col :span="6">
              <el-form-item :label="`${$t('商品名称')}:`" prop="name">
                <el-input v-model="form.name[currentLanguage]"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8" :offset="6">
              <el-form-item :label="`${$t('商品分类')}:`" prop="category_id">
                <el-select v-model="form.category_id" :placeholder="$t('请选择分类')">
                  <el-option
                    v-for="item in categoryList"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="6">
              <el-form-item :label="`${$t('商品编号')}:`" prop="code">
                <el-input v-model="form.code"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8" :offset="6">
              <el-form-item :label="`${$t('供应商')}:`" prop="supplier_id">
                <el-select v-model="form.supplier_id" :placeholder="$t('请选择供应商')">
                  <el-option
                    v-for="item in supplierList"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="6">
              <el-form-item :label="`${$t('可售库存')}:`" prop="num">
                <el-input v-model="form.num"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8" :offset="6">
              <el-form-item :label="`${$t('税率')}:`" prop="tax_rate">
                <el-select v-model="form.tax_rate">
                  <el-option label="0%" :value="1"></el-option>
                  <el-option label="9%" :value="2"></el-option>
                  <el-option label="21%" :value="3"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="6">
              <el-form-item :label="`${$t('价格/KG')}:`" prop="price">
                <el-input v-model="form.price"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8" :offset="6">
              <el-form-item :label="`${$t('BBD')}:`" prop="bbd">
                <el-date-picker
                  v-model="form.bbd"
                  type="date"
                  value-format="yyyy-MM-dd"
                  placeholder="请选择保质期"
                >
                </el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="6">
              <el-form-item :label="`${$t('是否有会员价')}:`" prop="vip_special">
                <el-switch
                  v-model="form.vip_special"
                  :active-value="1"
                  :inactive-value="0"
                >
                </el-switch>
              </el-form-item>
            </el-col>
            <el-col :span="8" :offset="6">
              <el-form-item :label="`${$t('商品图片')}:`" prop="cover">
                <el-upload
                  class="upload-demo"
                  :action="$baseUrl.BASE_API_URL + '/api/shop/upload/image'"
                  name="image"
                  :on-success="uploadSuccess"
                  :show-file-list="false"
                >
                  <el-button size="small">{{ $t('点击上传') }}</el-button>
                  <span>{{ `（${$t('建议尺寸')} 500*500px）` }}</span>
                </el-upload>
                <img
                  class="shopImg"
                  v-if="form.cover"
                  width="100"
                  height="100"
                  :src="form.cover"
                />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20" v-if="form.vip_special">
            <el-col :span="6">
              <el-form-item :label="`${$t('会员价格/KG')}:`" prop="vip_price">
                <el-input v-model="form.vip_price"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
      <div class="bottom-btn">
        <el-button
          type="primary"
          style="width: 180px"
          @click="addWeightProduct('weighForm')"
        >
          {{ $t('保存') }}
        </el-button>
      </div>
    </div>
  </div>
</template>

<script>
import TabsLanguage from '@/components/tabs-language.vue'
export default {
  components: {
    TabsLanguage
  },
  name: 'addWeighProductList',
  data() {
    return {
      form: {
        name: {},
        category_id: '',
        supplier_id: '',
        vip_special: false,
        cover: '',
        code: '',
        num: '',
        tax_rate: '',
        price: '',
        vip_price: 0,
        bbd: ''
      },
      categoryList: [], // 分类下拉
      supplierList: [], // 供应商下拉
      rules: {
        name: [{ required: true, message: '请填写商品名称', trigger: 'change' }]
      },
      currentLanguage: '',
      weighProductId: this.$route.params.id // 称重商品id
    }
  },
  computed: {
    // 基本信息必填校验
    rulesInfo() {
      // 商品图片自定义校验
      const validataImg = (rule, value, callback) => {
        console.log(this.form.cover, 'this.form.cover')
        if (!this.form.cover) {
          callback(new Error('请上传商品图片'))
        } else {
          callback()
        }
      }
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
        category_id: [{ required: true, message: '请选择分类', trigger: 'blur' }],
        supplier_id: [{ required: true, message: '请选择供应商', trigger: 'blur' }],
        cover: [{ required: true, validator: validataImg, trigger: 'change' }],
        code: [{ required: true, message: '请输入商品编号', trigger: 'blur' }],
        num: [{ required: true, message: '请输入可售库存', trigger: 'blur' }],
        tax_rate: [{ required: true, message: '请选择税率', trigger: 'blur' }],
        vip_special: [{ required: true, message: '请选择', trigger: 'blur' }],
        price: [{ required: true, message: '请输入价格', trigger: 'blur' }],
        vip_price: [{ required: true, message: '请输入会员价格', trigger: 'blur' }],
        bbd: [{ required: true, message: '请输入BBD', trigger: 'blur' }]
      }
    }
  },
  created() {
    if (this.weighProductId) {
      this.getWeighProduct()
    }
    this.getClassList()
    this.getSupplierList()
  },
  methods: {
    getWeighProduct() {
      this.$http.get(`api/shop/weigh_goods/${this.weighProductId}`).then(res => {
        if (res.ret) {
          this.form = res.data
        }
      })
    },
    // 添加称重商品
    addWeightProduct(weighForm) {
      this.$refs[weighForm].validate(valid => {
        if (valid) {
          let api
          this.weighProductId
            ? (api = this.$http.put(`api/shop/weigh_goods/${this.weighProductId}`, {
                ...this.form,
                shop_id: localStorage.getItem('shopId')
              }))
            : (api = this.$http.post('api/shop/weigh_goods', {
                ...this.form,
                shop_id: localStorage.getItem('shopId')
              }))
          api.then(res => {
            if (res.ret) {
              this.$notify({
                title: res.msg,
                message: res.msg,
                type: 'success'
              })
              this.$router.push({ path: '/product_manage/weighing_goods_list' })
            }
          })
        } else {
          return false
        }
      })
    },
    // 获取供应商下拉列表
    async getSupplierList() {
      const res = await this.$http.get(`api/shop/supplier`, {
        params: {
          switch: 1
        }
      })
      if (res.ret) {
        this.supplierList = res.data.data
      }
    },
    // 获取分类下拉列表
    async getClassList() {
      const res = await this.$http.get(`api/shop/category`, {
        params: {
          weigh: 1
        }
      })
      if (res.ret) {
        this.categoryList = res.data.data
      }
    },
    // 图片上传成功时触发的钩子
    uploadSuccess(response, file, fileList) {
      this.form.cover = response.data.path
    },
    modifyLanguage(language) {
      this.currentLanguage = language
    }
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
  .nav {
    width: 400px;
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
.shopImg {
  position: absolute;
  margin-top: 10px;
}
</style>
