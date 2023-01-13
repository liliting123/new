<template>
  <div>
    <div class="add_discount">
      <!--      表单-->
      <el-form
        ref="form"
        :model="discountForm"
        :rules="discountRules"
        label-width="160px">
        <el-form-item :label="`${$t('促销名称')}:`" prop="name">
          <el-input v-model="discountForm.name"></el-input>
        </el-form-item>
        <el-form-item :label="`${$t('促销商品')}:`" prop="item">
          <el-button @click="addProduct">{{$t('请选择促销商品')}}</el-button>
          <el-button type="primary" @click="batchUpload">{{$t('批量上传')}}</el-button>
        </el-form-item>
        <el-table
          :header-cell-style="{ background: '#F7F7F7' }"
          :data="tableData"
          v-show="tableData.length"
          default-expand-all
          border
          style="width: 85%;margin-left: 80px;margin-bottom: 20px">
          <el-table-column width="50" label="#">
            <template slot-scope="scope">
              <span class="table_index">{{ scope.$index + 1 }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="name" :label="$t('商品名称')"></el-table-column>
          <el-table-column prop="code" :label="$t('商品编码')"></el-table-column>
          <el-table-column prop="spec_name" :label="$t('规格')"> </el-table-column>
          <el-table-column :label="$t('价格')">
            <template slot-scope="scope"> €{{ scope.row.price }} </template>
          </el-table-column>
          <el-table-column prop="number" :label="$t('组合数量')">
            <template slot-scope="scope">
              <el-input
                style="width: 90%"
                type="number"
                min="1"
                v-model="scope.row.number"
                @input="calculatePrice(scope.row.combination_price, scope.row.number)">
              </el-input>
            </template>
          </el-table-column>
          <el-table-column prop="combination_price" :label="$t('组合单价')">
            <template slot-scope="scope">
              <el-input
                style="width: 90%"
                type="number"
                min="0"
                v-model="scope.row.combination_price"
                @input="calculatePrice(scope.row.combination_price, scope.row.number)">
              </el-input>
            </template>
          </el-table-column>
          <el-table-column prop="num" :label="$t('可售库存')"> </el-table-column>
          <el-table-column :label="$t('操作')">
            <template slot-scope="scope">
              <el-button
                type="text"
                size="small"
                @click="deleteSpec(scope.$index)">{{$t('删除')}}</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-form-item :label="`${$t('组合价格')}:`">
          <el-input
            disabled
            v-model="discountForm.price"
          >
            <i slot="suffix" style="line-height: 40px;margin-left:10px">€</i>
          </el-input>
        </el-form-item>
        <el-form-item :label="`${$t('开始时间')}:`" prop="start_time">
          <el-date-picker
            v-model="discountForm.start_time"
            type="datetime"
            value-format="yyyy-MM-dd HH:mm:ss"
            :placeholder="$t('请选择开始时间')">
          </el-date-picker>
        </el-form-item>
        <el-form-item :label="`${$t('结束时间')}:`" prop="over_time">
          <el-date-picker
            v-model="discountForm.over_time"
            type="datetime"
            value-format="yyyy-MM-dd HH:mm:ss"
            :placeholder="$t('请选择结束时间')">
          </el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            style="margin-top: 20px"
            @click="saveDiscountProduct">{{$t('保存')}}</el-button>
        </el-form-item>
      </el-form>
      <!--      选择促销商品弹窗-->
      <normalProductsDialog
        :visible.sync="dialogNormalPromontional"
        @addProductList="addProductList"
      />
      <!--      批量上传弹窗-->
      <batchUploadDialog
        :visible.sync="dialogBatchUpload"
        tableType="combination"
        @getData="addProductList"
      />
    </div>
  </div>
</template>

<script>
import normalProductsDialog from '../components/normalProductsDialog'
import batchUploadDialog from '../components/batchUploadDialog'
export default {
  name: 'addCombination',
  components: {
    normalProductsDialog,
    batchUploadDialog
  },
  data() {
    var validateItem = (rule, value, callback) => {
      if (this.tableData.length === 0) {
        callback(new Error('请选择促销商品'))
      } else {
        callback()
      }
    }
    return {
      discountForm: {
        name: '',
        start_time: '',
        over_time: '',
        price: '',
        item: []
      },
      tableData: [],
      dialogNormalPromontional: false, // 选择促销商品弹窗
      dialogBatchUpload: false, // 批量上传弹窗
      discountRules: {
        name: [{ required: true, message: this.$t('请输入促销名称'), trigger: 'blur' }],
        item: [{ required: true, validator: validateItem, trigger: 'blur' }],
        start_time: [{ required: true, message: this.$t('请选择开始时间'), trigger: 'blur' }],
        over_time: [{ required: true, message: this.$t('请选择结束时间'), trigger: 'blur' }]
      }
    }
  },
  created() {
    if (this.$route.params.id) {
      this.getDetail()
    }
  },
  methods: {
    calculatePrice(combinationPrice, number) {
      if (combinationPrice && number) {
        this.discountForm.price = this.tableData.reduce((total, item) => {
          return total + item.combination_price * item.number
        }, 0).toFixed(2)
      }
    },
    // 保存组合促销
    saveDiscountProduct() {
      this.$refs['form'].validate((valid) => {
        if (valid) {
          this.discountForm.item = this.tableData.map(table => {
            return {
              number: +table.number,
              goods_id: this.$route.params.id ? table.goods_id : table.id,
              combination_price: table.combination_price
            }
          })
          return
          let api
          this.$route.params.id ? api = this.$http.put(`api/shop/discount_group/${this.$route.params.id}`, {
            ...this.discountForm
          }) : api = this.$http.post('api/shop/discount_group', {
            ...this.discountForm
          })
          api.then(res => {
            if (res.ret) {
              this.$notify({
                title: this.$t('success'),
                message: res.msg,
                type: 'success'
              })
              this.$router.push({path: '/marketing_manage/combination_promotion'})
            }
          })
        } else {
          return false
        }
      })
    },
    // 获取活动详情
    getDetail() {
      this.$http.get(`api/shop/discount_group/${this.$route.params.id}`).then(res => {
        if (res.ret) {
          this.tableData = res.data.item
          this.discountForm = {
            name: res.data.name,
            start_time: res.data.start_time,
            over_time: res.data.over_time,
            price: res.data.price,
            item: []
          }
        }
      })
    },
    // 删除促销商品
    deleteSpec(index) {
      this.tableData.splice(index, 1)
    },
    // 批量上传
    batchUpload() {
      this.dialogBatchUpload = true
    },
    // 选择促销商品
    addProduct() {
      this.dialogNormalPromontional = true
    },
    // 接受子组件传过来的数据并赋值
    addProductList(val) {
      if (this.tableData.length) {
        val.forEach(item => {
          this.tableData.push(item)
        })
        this.tableData = this.filterProductId(this.tableData)
      } else {
        this.tableData = val
      }
      this.discountForm.item = []
      this.tableData.forEach(item => {
        val.forEach(val => {
          if (item.id === val.id) {
            item.goods_id = val.id
          }
        })
      })
    },
    // 相同规格id去重
    filterProductId(arr) {
      const map = new Map()
      return arr.filter((item) => !map.has(item.code) && map.set(item.code, 1))
    }
  }
}
</script>

<style lang="scss" scoped>
  .add_discount {
    background: #ffffff;
    border-radius: 8px;
    padding: 50px 50px 150px 50px;
  }
  /deep/.el-input {
    width: 30%;
  }
  /deep/.el-date-editor {
    width: 15%;
  }
</style>
