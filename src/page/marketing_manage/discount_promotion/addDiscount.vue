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
<!--        促销商品表-->
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
          <el-table-column prop="rate" :label="$t('折扣率')">
            <template slot-scope="scope">
              <el-input
                style="width: 90%"
                v-model="scope.row.rate"
                type="number"
                :min="0"
                @input="calculatePrice(scope.row.rate, scope.row.price, scope.row.id)">
                <i slot="suffix" style="line-height: 40px;margin-left:10px">%</i>
              </el-input>
            </template>
          </el-table-column>
          <el-table-column prop="name" :label="$t('促销价格')">
            <template slot-scope="scope">
              <el-input
                style="width: 90%"
                v-model="scope.row.discount_price"
                @input="calculateDiscountRate(scope.row.discount_price, scope.row.price, scope.row.id)">
                <i slot="prefix" style="line-height: 40px;margin-left:10px">€</i>
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
<!--      选择折扣类型弹窗-->
      <el-dialog
        :title="$t('折扣类型')"
        :visible.sync="dialogDiscountType"
        width="40%"
        :before-close="handleClose">
        <el-form
          label-position="right"
          label-width="150px"
          style="margin-left: 10%">
          <el-form-item :label="`${$t('折扣类型')}:`">
            <el-select v-model="rateType">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"/>
            </el-select>
          </el-form-item>
          <el-form-item :label="`${$t('折扣率')}:`" v-show="rateType == 1">
            <el-input
              style="width: 70%"
              type="number"
              min="1"
              v-model="discountRate"
              :placeholder="$t('请输入折扣率')"/>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="canleSelect">{{$t('取消')}}</el-button>
          <el-button type="primary" @click="selectDiscount">{{$t('确定')}}</el-button>
        </span>
      </el-dialog>
<!--      促销商品弹窗-->
      <promotionalProductsDialog
        :visible.sync="dialogPromontional"
        @addProductList="addProductList"
        :discountRate="discountRate"
      />
<!--      批量上传弹窗-->
      <batchUploadDialog
        :visible.sync="dialogBatchUpload"
      />
    </div>
  </div>
</template>

<script>
import promotionalProductsDialog from '../components/promotionalProductsDialog'
import batchUploadDialog from '../components/batchUploadDialog'
export default {
  name: 'addDiscount',
  components: {
    promotionalProductsDialog,
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
        item: []
      },
      tableData: [],
      dialogDiscountType: false, // 选择折扣类型弹窗
      dialogPromontional: false, // 选择促销商品弹窗
      dialogBatchUpload: false, // 批量上传弹窗
      discountRate: '', // 折扣率
      options: [{
        value: 1,
        label: this.$t('统一折扣')
      },
        {
          value: 2,
          label: this.$t('单个折扣')
        }],
      rateType: 1, // 折扣类型
      discountRules: {
        name: [{ required: true, message: this.$t('请输入促销名称'), trigger: 'blur' }],
        item: [{ required: true, validator: validateItem, trigger: 'blur' }],
        start_time: [{ required: true, message: this.$t('请选择开始时间'), trigger: 'blur' }],
        over_time: [{ required: true, message: this.$t('请选择结束时间'), trigger: 'blur' }],
        rate: [{ required: true, message: this.$t('请输入折扣率'), trigger: 'blur' }]
      }
    }
  },
  created() {
    if (this.$route.params.id) {
      this.getDetail()
    }
  },
  methods: {
    // 根据折扣率计算价格
    calculatePrice(rate, price, id) {
      this.tableData.forEach(item => {
        if (item.id === id) {
          if (rate) {
            item.discount_price = ((rate * price) / 100).toFixed(2)
          } else {
            item.discount_price = ''
          }
        }
      })
    },
    // 根据促销价格和原价计算折扣率
    calculateDiscountRate(discountPrice, price, id) {
      this.tableData.forEach(item => {
        if (item.id === id) {
          if (discountPrice) {
            item.rate = (discountPrice / price).toFixed(2) * 100
          } else {
            item.rate = ''
          }
        }
      })
    },
    // 保存折扣促销
    saveDiscountProduct() {
      this.$refs['form'].validate((valid) => {
        if (valid) {
          this.discountForm.item = this.tableData.map(table => {
            return {
              goods_type: 'goods_spec_type',
              goods_id: table.goods_id,
              rate: table.rate ? +table.rate : ''
            }
          })
          let api
          this.$route.params.id ? api = this.$http.put(`api/shop/discount_promotion/${this.$route.params.id}`, {
            ...this.discountForm
          }) : api = this.$http.post('api/shop/discount_promotion', {
            ...this.discountForm
          })
          api.then(res => {
            if (res.ret) {
              this.$notify({
                title: this.$t('success'),
                message: res.msg,
                type: 'success'
              })
              this.$router.push({path: '/marketing_manage/discount_promotion'})
            }
          })
        } else {
          return false
        }
      })
    },
    // 获取活动详情
    getDetail() {
      this.$http.get(`api/shop/discount_promotion/${this.$route.params.id}`).then(res => {
        if (res.ret) {
          this.tableData = res.data.item
          this.discountForm = {
            name: res.data.name,
            start_time: res.data.start_time,
            over_time: res.data.over_time,
            item: []
          }
        }
      })
    },
    // 批量上传
    batchUpload() {
      this.dialogBatchUpload = true
    },
    // 删除促销商品
    deleteSpec(index) {
      this.tableData.splice(index, 1)
    },
    // 选择促销商品
    addProduct() {
      this.dialogDiscountType = true
    },
    // 选择折扣类型
    selectDiscount() {
      if (this.rateType === 1 && this.discountRate === '') {
        this.$message.error(this.$t('请输入折扣率'))
        return
      }
      if (this.rateType === 2) {
        this.discountRate = ''
      }
      this.dialogDiscountType = false
      this.dialogPromontional = true
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
            if (this.rateType === 1) {
              item.discount_price = ((item.price * item.rate) / 100).toFixed(2)
            }
          }
        })
      })
    },
    handleClose() {
      this.dialogDiscountType = false
    },
    canleSelect() {
      this.dialogDiscountType = false
      this.discountRate = ''
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
