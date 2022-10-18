<template>
  <div>
    <div class="info-top">
      <div class="title">{{ $t('基本信息') }}</div>
      <div class="nav">
        <TabsLanguage :marginLeft="20" @update="modifyLanguage" />
      </div>
      <div class="form-content">
        <el-form
          ref="form"
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
              <el-form-item :label="`${$t('是否有会员价')}:`" prop="vip_special">
                <el-switch
                  v-model="form.vip_special"
                  :active-value="1"
                  :inactive-value="0"
                >
                </el-switch>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="6">
              <el-form-item :label="`${$t('商品分类')}:`" prop="category_id">
                <el-select v-model="form.category_id" :placeholder="$t('请选择商品分类')">
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
                  width="100px"
                  height="100px"
                  :src="form.cover"
                />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="6">
              <el-form-item :label="`${$t('分类标签')}:`" prop="label">
                <el-select v-model="form.label" :placeholder="$t('请选择分类标签')">
                  <el-option
                    v-for="item in labelList"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
    </div>
    <div class="info-top">
      <div class="title">
        <span>{{ $t('规格信息') }}</span>
      </div>
      <div class="table">
        <el-form :model="form" :rules="rulesSpec" ref="formSpec">
          <el-table
            :header-cell-style="{ background: '#F7F7F7' }"
            :data="form.spec"
            style="width: 100%"
          >
            <el-table-column label="#" width="50">
              <template slot-scope="scope">
                <span class="table_index">{{ scope.$index + 1 }}</span>
              </template>
            </el-table-column>
            <el-table-column prop="code" :label="`*${$t('商品编码')}`">
              <template slot-scope="scope">
                <el-form-item
                  :prop="'spec.' + scope.$index + '.code'"
                  :rules="rulesSpec.code"
                >
                  <el-input size="small" v-model="scope.row.code"></el-input>
                </el-form-item>
              </template>
            </el-table-column>
            <el-table-column prop="ean" :label="`*${$t('EAN')}`">
              <template slot-scope="scope">
                <el-form-item
                  :prop="'spec.' + scope.$index + '.ean'"
                  :rules="rulesSpec.ean"
                >
                  <el-input
                    size="small"
                    v-model="scope.row.ean"
                    :disabled="scope.row.id && scope.row.id !== ''"
                  ></el-input>
                </el-form-item>
              </template>
            </el-table-column>
            <el-table-column prop="supplier_id" :label="`*${$t('供应商')}`">
              <template slot-scope="scope">
                <el-form-item
                  :prop="'spec.' + scope.$index + '.supplier_id'"
                  :rules="rulesSpec.supplier_id"
                >
                  <el-select
                    size="small"
                    v-model="scope.row.supplier_id"
                    :placeholder="$t('请选择供应商')"
                    filterable
                  >
                    <el-option
                      v-for="item in sortlist"
                      :key="item.id"
                      :label="item.name"
                      :value="item.id"
                    >
                    </el-option>
                  </el-select>
                </el-form-item>
              </template>
            </el-table-column>
            <el-table-column prop="name" :label="`*${$t('规格')}`">
              <template slot-scope="scope">
                <el-form-item
                  :prop="'spec.' + scope.$index + '.name'"
                  :rules="rulesSpec.name"
                >
                  <el-input size="small" v-model="scope.row.name"></el-input>
                </el-form-item>
              </template>
            </el-table-column>
            <el-table-column prop="price" :label="`*${$t('价格')}`">
              <template slot-scope="scope">
                <el-form-item
                  :prop="'spec.' + scope.$index + '.price'"
                  :rules="rulesSpec.price"
                >
                  <el-input size="small" v-model="scope.row.price"></el-input>
                </el-form-item>
              </template>
            </el-table-column>
            <el-table-column
              v-if="form.vip_special"
              prop="vip_price"
              :label="`*${$t('会员价')}`"
            >
              <template slot-scope="scope">
                <el-form-item
                  :prop="'spec.' + scope.$index + '.vip_price'"
                  :rules="rulesSpec.vip_price"
                >
                  <el-input size="small" v-model="scope.row.vip_price"></el-input>
                </el-form-item>
              </template>
            </el-table-column>
            <el-table-column prop="tax_rate" :label="`*${$t('税率')}`" width="180">
              <template slot-scope="scope">
                <!-- <el-form-item
                  :prop="'spec.' + scope.$index + '.tax_rate'"
                  :rules="rulesSpec.tax_rate"
                >
                  <el-select v-model="scope.row.tax_rate" size="small">
                    <el-option label="0%" :value="1"></el-option>
                    <el-option label="9%" :value="2"></el-option>
                    <el-option label="21%" :value="3"></el-option>
                  </el-select>
                </el-form-item> -->
                <el-form-item
                  :prop="'spec.' + scope.$index + '.tax_rate'"
                  :rules="rulesSpec.tax_rate"
                >
                  <el-input
                    size="small"
                    v-model="scope.row.tax_rate"
                    type="number"
                    :min="0"
                  >
                    <span slot="suffix" style="font-size: 16px">%</span>
                  </el-input>
                </el-form-item>
              </template>
            </el-table-column>
            <el-table-column :label="$t('操作')" width="100px">
              <template slot-scope="scope">
                <el-button
                  type="text"
                  size="small"
                  v-if="productId && scope.row.id"
                  @click="showEAN(scope.row.id)"
                >
                  {{ $t('EAN') }}
                </el-button>
                <el-button type="text" size="small" @click="deleteRow(scope.$index)">
                  {{ $t('删除') }}
                </el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-form>
      </div>
      <div class="bottom-text">
        <button @click="addSpec()">{{ '+' + $t('添加规格') }}</button>
      </div>
    </div>
    <div class="info-top">
      <div class="title">
        <span>{{ $t('WMS分类（选择后将商品同步至WMS）') }}</span>
      </div>
      <div style="padding: 15px">
        <el-select v-model="form.wms_category_id" size="small" placeholder="">
          <el-option
            v-for="item in wmsList"
            :key="item.id"
            :label="item.name_cn"
            :value="item.id"
          >
          </el-option>
        </el-select>
      </div>
    </div>
    <div class="bottom-btn">
      <el-button
        type="primary"
        style="width: 180px"
        @click="insertProduct('form', 'formSpec')"
      >
        {{ $t('保存') }}
      </el-button>
    </div>
    <!--    EAN弹窗-->
    <addEANDialog v-if="dialogENATable" :visible.sync="dialogENATable" :id="eanId" />
  </div>
</template>

<script>
import TabsLanguage from '@/components/tabs-language.vue'
import addEANDialog from './components/addEANDialog.vue'
export default {
  components: {
    TabsLanguage,
    addEANDialog
  },
  name: 'addProductList',
  data() {
    return {
      labelList: [
        { id: 1, name: this.$t('普通') },
        { id: 10, name: this.$t('烟类') },
        { id: 11, name: this.$t('酒类') }
      ],
      form: {
        name: {
          cn: '',
          en: '',
          nl: ''
        }, // 商品名称
        shop_id: localStorage.getItem('shopId'), // 店铺账号id
        category_id: '', // 分类id
        label: '', // 分类标签
        cover: '', // 封面图
        vip_special: false, // 是否vip价格
        wms_category_id: '', // wms分类id
        spec: [
          {
            supplier_id: '', // 供应商id
            code: '', // 商品编号
            name: '', // 规格名称
            price: '', // 价格
            vip_price: 0, // vip价格
            tax_rate: '', // 汇率
            ean: '' // EAN
          }
        ] // 商品规格数组
      },
      spec: [
        {
          supplier_id: '', // 供应商id
          code: '', // 商品编号
          name: '', // 规格名称
          price: '', // 价格
          vip_price: 0, // vip价格
          tax_rate: '', // 汇率
          ean: '' // EAN
        }
      ], // 商品规格数组
      fileList: [],
      dialogENATable: false, // EAN弹窗
      rulesSpec: {
        code: [{ required: true, message: this.$t('请输入商品编码'), trigger: 'blur' }],
        supplier_id: [
          { required: true, message: this.$t('请选择供应商'), trigger: 'change' }
        ],
        name: [{ required: true, message: this.$t('请输入规格'), trigger: 'blur' }],
        price: [{ required: true, message: this.$t('请输入价格'), trigger: 'blur' }],
        vip_price: [
          { required: true, message: this.$t('请输入会员价格'), trigger: 'blur' }
        ],
        tax_rate: [{ required: true, message: this.$t('请输入税率'), trigger: 'change' }],
        ean: [{ required: true, message: this.$t('请输入EAN'), trigger: 'blur' }]
      },
      currentLanguage: '',
      categoryList: [], // 分类下拉
      supplierList: [], // 供应商下拉
      wmsList: [], // wms分类
      productId: this.$route.params.id, // 商品id
      eanId: ''
    }
  },
  computed: {
    // 基本信息必填校验
    rulesInfo() {
      // 商品图片自定义校验
      const validataImg = (rule, value, callback) => {
        if (!this.form.cover) {
          callback(new Error(this.$t('请上传商品图片')))
        } else {
          callback()
        }
      }
      // 商品分类自定义校验
      const validataCategory = (rule, value, callback) => {
        if (!this.form.category_id) {
          callback(new Error(this.$t('请选择商品分类')))
        } else {
          callback()
        }
      }
      // 分类标签自定义校验
      const validataLabel = (rule, value, callback) => {
        if (!this.form.label) {
          callback(new Error(this.$t('请选择分类标签')))
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
        category_id: [{ required: true, validator: validataCategory, trigger: 'change' }],
        vip_special: [
          { required: true, message: this.$t('请选择是否有会员价'), trigger: 'blur' }
        ],
        label: [{ required: true, validator: validataLabel, trigger: 'change' }],
        cover: [{ required: true, validator: validataImg, trigger: 'change' }]
      }
    },
    // 供应商数据a-z排序
    sortlist() {
      return this.sort()
    }
  },

  created() {
    // this.form.spec = this.spec
    this.getClassList()
    this.getSupplierList()
    this.getWMSCategoryList()
  },
  activated() {
    if (this.productId && this.$route.params && !this.$route.params.shops) {
      this.getShopInfo()
    }
    if (this.$route.params && this.$route.params.shops) {
      let shopInfo = this.$route.params && this.$route.params.shops
      this.form.name.cn = shopInfo.product.cn_name || ''
      this.form.name.en = shopInfo.product.en_name || ''
      this.form.name.nl = shopInfo.product.nl_name || ''
      for (let i = 0; i < this.spec.length; i++) {
        this.form.spec[i].code = shopInfo.relevance_code
        this.form.spec[i].name = shopInfo.spec_name
        this.form.spec[i].price = shopInfo.spec_price
        // this.spec[i].tax_rate = shopInfo.tax_rate
      }
      // this.form.spec = this.spec
      this.form.cover = shopInfo.product.major_photo
    }
  },

  methods: {
    sort() {
      return this.supplierList.sort((a, b) => {
        return a['name'].localeCompare(b['name']) // index是list你需要索引的字段名称
      })
    },
    // 编辑回显
    getShopInfo() {
      this.$http.get(`api/shop/goods/${this.productId}`).then(res => {
        if (res.ret) {
          // this.form.spec = this.spec
          this.form = res.data
        }
        console.log(this.form)
      })
    },
    // 保存商品
    async insertProduct(form, formSpec) {
      try {
        await Promise.all([
          this.$refs[form].validate(),
          this.$refs[formSpec].validate()
        ]).then(() => {
          let api
          this.productId
            ? (api = this.$http.put(`api/shop/goods/${this.productId}`, {
                ...this.form
              }))
            : (api = this.$http.post('api/shop/goods', {
                ...this.form
              }))
          console.log(this.form, '...this.form')
          api.then(res => {
            if (res.ret) {
              this.$refs[form].resetFields()
              this.$refs[formSpec].resetFields()
              this.form.name = {}
              this.wmsList = [] // wms分类
              this.$notify({
                title: res.msg,
                message: res.msg,
                type: 'success'
              })
              this.$router.push({ path: '/product_manage/normal_product_list' })
            }
          })
        })
      } catch (error) {
        return ''
      }
    },
    // 获取分类下拉列表
    async getClassList() {
      const res = await this.$http.get(`api/shop/category`, {
        params: {
          weigh: 0
        }
      })
      if (res.ret) {
        this.categoryList = res.data
      }
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
    // 获取WMS分类列表
    getWMSCategoryList() {
      this.$http.get('api/shop/get_wms_category').then(res => {
        if (res.ret) {
          this.wmsList = res.data.data
        }
      })
    },
    // EAN弹窗
    showEAN(id) {
      this.dialogENATable = true
      this.eanId = id
    },
    // 添加规格
    addSpec() {
      this.form.spec.push({
        supplier_id: '', // 供应商id
        code: '', // 商品编号
        name: '', // 规格名称
        price: '', // 价格
        vip_price: 0, // vip价格
        tax_rate: '', // 汇率
        ean: '' // ean
      })
    },
    modifyLanguage(language) {
      this.currentLanguage = language
    },
    // 删除行
    deleteRow(index) {
      this.form.spec.splice(index, 1)
    },
    // 图片上传成功时触发的钩子
    uploadSuccess(response, file, fileList) {
      this.form.cover = response.data.path
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
    width: 430px;
    margin-top: 15px;
  }
  .form-content {
    padding: 15px;
  }
  .content {
    display: inline-block;
    padding: 20px;
    width: 500px;
    margin-right: 200px;
    .conten-item {
      span {
        display: inline-block;
        margin-bottom: 10px;
      }
    }
  }
  .table {
    padding: 20px;
  }
  .bottom-text {
    padding: 10px;
    button {
      height: 50px;
      width: 100%;
      border: 1px dashed gainsboro;
      background: white;
      color: #32bceb;
    }
  }
  .bottom-sum {
    height: 50px;
    line-height: 30px;
    font-size: 16px;
    font-weight: bold;
    margin-left: 87%;
  }
}
.bottom-btn {
  width: 100%;
  text-align: center;
  padding: 20px;
}
.shopImg {
  position: absolute;
  margin-top: 10px;
}
/deep/.table .el-form-item {
  margin-bottom: 15px !important;
  margin-top: 14px;
}
</style>
