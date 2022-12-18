<template>
  <div>
    <div class="add_discount">
      <el-form
        ref="form"
        :model="discountForm"
        :rules="discountRules"
        label-width="90px">
        <el-form-item label="促销名称:" prop="name">
          <el-input v-model="discountForm.name"></el-input>
        </el-form-item>
        <el-form-item label="促销商品:" prop="product">
          <el-button>请选择促销商品</el-button>
          <el-button type="primary">批量上传</el-button>
        </el-form-item>
        <el-table
          :header-cell-style="{ background: '#F7F7F7' }"
          :data="tableData"
          border
          style="width: 85%;margin-left: 80px;margin-bottom: 20px">
          <el-table-column width="50" label="#">
            <template slot-scope="scope">
              <span class="table_index">{{ scope.$index + 1 }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="code" :label="$t('商品名称')"></el-table-column>
          <el-table-column prop="ean" :label="$t('商品编码')"></el-table-column>
          <el-table-column prop="supplier.name" :label="$t('规格')"></el-table-column>
          <el-table-column prop="name" :label="$t('价格')"></el-table-column>
          <el-table-column prop="name" :label="$t('组合数量')">
            <template slot-scope="scope">
              <el-input style="width: 70%"/>
            </template>
          </el-table-column>
          <el-table-column prop="name" :label="$t('可售库存')"></el-table-column>
          <el-table-column :label="$t('操作')">
            <template slot-scope="scope">
              <el-button type="text" size="small">{{$t('删除')}}</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-form-item label="组合价格:" prop="name">
          <el-input v-model="discountForm.name">
            <i slot="suffix" style="line-height: 40px;margin-left:10px">€</i>
          </el-input>
        </el-form-item>
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
    </div>
  </div>
</template>

<script>
  export default {
    name: 'addCombination',
    data() {
      return {
        discountForm: {
          name: '',
          product: '',
          starTime: '',
          endTime: ''
        },
        tableData: [{
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }],
        discountRules: {
          name: [{ required: true, message: '请输入促销名称', trigger: 'blur' }],
          product: [{ required: true, message: '请选择促销商品', trigger: 'blur' }],
          starTime: [{ required: true, message: '请选择开始时间', trigger: 'blur' }],
          endTime: [{ required: true, message: '请选择结束时间', trigger: 'blur' }]
        }
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
