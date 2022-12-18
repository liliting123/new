<template>
  <div>
    <div class="add_discount">
<!--      表单-->
      <el-form
        ref="form"
        :model="discountForm"
        :rules="discountRules"
        label-width="90px">
        <el-form-item label="促销名称:" prop="name">
          <el-input v-model="discountForm.name"></el-input>
        </el-form-item>
        <el-form-item label="促销商品:" prop="product">
          <el-button @click="addProduct">请选择促销商品</el-button>
          <el-button type="primary">批量上传</el-button>
        </el-form-item>
        <el-table
          :header-cell-style="{ background: '#F7F7F7' }"
          :data="tableData"
          v-show="tableData.length"
          default-expand-all
          border
          style="width: 85%;margin-left: 80px;margin-bottom: 20px">
          <el-table-column type="expand">
            <template slot-scope="scope">
              <el-table
            :header-cell-style="{ background: '#F7F7F7' }"
            :data="scope.row.spec"
            border
            style="width: 95%;margin-left: 48px"
          >
            <el-table-column width="50" label="#">
              <template slot-scope="scope">
                <span class="table_index">{{ scope.$index + 1 }}</span>
              </template>
            </el-table-column>
            <el-table-column prop="code" :label="$t('商品编码')"></el-table-column>
            <el-table-column prop="name" :label="$t('规格')"> </el-table-column>
            <el-table-column :label="$t('价格')">
              <template slot-scope="scope"> €{{ scope.row.price }} </template>
            </el-table-column>
            <el-table-column prop="name" :label="$t('折扣率')">
              <template slot-scope="scope">
                <el-input style="width: 90%">
                  <i slot="suffix" style="line-height: 40px;margin-left:10px">%</i>
                </el-input>
              </template>
            </el-table-column>
            <el-table-column prop="name" :label="$t('促销价格')">
              <template slot-scope="scope">
                <el-input style="width: 90%">
                  <i slot="prefix" style="line-height: 40px;margin-left:10px">€</i>
                </el-input>
              </template>
            </el-table-column>
            <el-table-column prop="num" :label="$t('可售库存')"> </el-table-column>
            <el-table-column :label="$t('操作')">
              <template slot-scope="scope">
                <el-button type="text" size="small">{{$t('删除')}}</el-button>
              </template>
            </el-table-column>
          </el-table>
            </template>
          </el-table-column>
          <el-table-column prop="name" :label="$t('商品名称')"></el-table-column>
        </el-table>
        <el-form-item label="开始时间:" prop="starTime">
          <el-date-picker
            v-model="discountForm.starTime"
            type="date"
            placeholder="选择开始时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="结束时间:" prop="endTime">
          <el-date-picker
            v-model="discountForm.endTime"
            type="date"
            placeholder="选择结束时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" style="margin-top: 20px">保存</el-button>
        </el-form-item>
      </el-form>
<!--      选择折扣类型弹窗-->
      <el-dialog
        title="折扣类型"
        :visible.sync="dialogDiscountType"
        width="40%"
        :before-close="handleClose">
        <el-form
          label-position="right"
          label-width="150px"
          style="margin-left: 10%">
          <el-form-item label="折扣类型：">
            <el-select v-model="value">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"/>
            </el-select>
          </el-form-item>
          <el-form-item label="折扣率：">
            <el-input
              style="width: 70%"
              type="number"
              min="1"
              v-model="type"
              placeholder="请输入折扣率"/>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogDiscountType = false">取 消</el-button>
          <el-button type="primary" @click="selectDiscount">确 定</el-button>
        </span>
      </el-dialog>
      <promotionalProductsDialog
        :visible.sync="dialogPromontional"
        @addProductList="addProductList"
      />
    </div>
  </div>
</template>

<script>
import promotionalProductsDialog from '../components/promotionalProductsDialog'
export default {
  name: 'addDiscount',
  components: {
    promotionalProductsDialog
  },
  data() {
    return {
      discountForm: {
        name: '',
        product: '',
        starTime: '',
        endTime: ''
      },
      tableData: [],
      dialogDiscountType: false, // 选择折扣类型弹窗
      dialogPromontional: false, // 选择促销商品弹窗
      type: '',
      options: [{
        value: '1',
        label: '统一折扣'
      },
        {
          value: '2',
          label: '单个折扣'
        }],
      value: '1',
      discountRules: {
        name: [{ required: true, message: '请输入促销名称', trigger: 'blur' }],
        product: [{ required: true, message: '请选择促销商品', trigger: 'blur' }],
        starTime: [{ required: true, message: '请选择开始时间', trigger: 'blur' }],
        endTime: [{ required: true, message: '请选择结束时间', trigger: 'blur' }]
      }
    }
  },
  methods: {
    // 选择促销商品
    addProduct() {
      this.dialogDiscountType = true
    },
    // 选择折扣类型
    selectDiscount() {
      if (this.type === '') {
        this.$message.error('请输入折扣率')
        return
      }
      this.dialogDiscountType = false
      this.dialogPromontional = true
    },
    // 接受子组件传过来的数据并赋值
    addProductList(val) {
      if (this.tableData.length) {
        val.forEach(val => {
          this.tableData.push(val)
        })
        this.tableData.forEach(item => {
          item.spec = this.filterProductId(item.spec)
        })
        // this.tableData = this.filterProductId(this.tableData)
      } else {
        this.tableData = val
      }
    },
    handleClose() {
      this.dialogDiscountType = false
    },
    // 相同id的商品去重
    filterProductId(arr) {
      const map = new Map()
      return arr.filter((item) => !map.has(item.id) && map.set(item.id, 1))
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
