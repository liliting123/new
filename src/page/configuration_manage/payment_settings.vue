<template>
  <div class="payment_settings">
    <div class="table-main">
      <el-table
        :data="tableData"
        :header-cell-style="{ background: '#F7F7F7' }"
        style="width: 100%">
        <el-table-column width="50">
          <template slot-scope="scope">
            <span class="table_index">{{ scope.$index + 1 }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="name" :label="$t('支付方式')"> </el-table-column>
        <el-table-column prop="name" :label="$t('支付图标')"> </el-table-column>
        <el-table-column prop="switch" :label="$t('是否开启')">
          <template slot-scope="scope">
            {{scope.row.switch ? '是' : '否'}}
          </template>
        </el-table-column>
        <el-table-column :label="$t('操作')" width="150">
          <template>
            <el-button type="text" @click="dialogFormVisible = true">
              {{$t('编辑')}}
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-dialog :title="$t('编辑')" :visible.sync="dialogFormVisible" width="30%">
        <el-form :model="form" :rules="rules" label-position="top">
          <el-form-item :label="$t('支付名称')" prop="payName">
            <el-input v-model="form.payName" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item :label="`*${$t('支付图标')}`">
            <el-upload action="#">
              <el-button>{{ $t('点击上传') }}</el-button>
              <span> &nbsp;&nbsp;({{ $t('建议尺寸') }}300*300px)</span>
            </el-upload>
            <!-- <div class="config_ball">
              <img class="padding_top_10" width="400px" />
            </div> -->
          </el-form-item>
          <el-form-item :label="`*${$t('是否启动')}`">
            <el-switch
              v-model="enabled"
              :active-text="$t('是')"
              :inactive-text="$t('否')"
              :active-value="1"
              :inactive-value="0"
              active-color="#13ce66"
              inactive-color="#bfcfd9">
            </el-switch>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">{{ $t('取消') }}</el-button>
          <el-button type="primary" @click="dialogFormVisible = false">
            {{$t('确定')}}
          </el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      enabled: false,
      dialogFormVisible: false,
      tableData: [],
      form: {
        payName: ''
      },
      rules: {
        payName: [{ required: true }]
      }
    }
  },
  created() {
    this.getPaymentList()
  },
  methods: {
    // 获取支付列表
    getPaymentList() {
      this.$http.get('api/shop/payment').then(res => {
        if (res.ret) {
          this.tableData = res.data.data
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.payment_settings {
  .table-main {
    background-color: #fff;
    padding: 15px;
  }
}

/deep/ .el-dialog__header {
  border-bottom: 1px solid #dcdfe6;
}
/deep/ .el-dialog__body {
  padding: 20px 40px;
}
/deep/ .el-dialog__footer {
  border-top: 1px solid #dcdfe6;
}

/deep/ .el-switch__label * {
  width: 21px;
  line-height: 1;
  font-size: 12px;
  display: inline-block;
  margin-left: 10px;
}
/deep/ .el-switch__label {
  position: absolute;
  display: none;
  color: #fff !important;
  font-size: 12px !important;
}
/*打开时文字位置设置*/
/deep/ .el-switch__label--right {
  z-index: 1;
  right: 22px;
}
/*关闭时文字位置设置*/
/deep/ .el-switch__label--left {
  z-index: 1;
  left: 20px;
}
/*显示文字*/
/deep/ .el-switch__label.is-active {
  display: block;
}
/*开关宽度*/
/deep/ .el-switch .el-switch__core,
.el-switch .el-switch__label {
  width: 50px !important;
}
</style>
