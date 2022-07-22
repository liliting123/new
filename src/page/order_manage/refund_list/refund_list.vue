<template>
  <div>
    <!--    筛选条件-->
    <search-list>
      <div slot="left">
        <el-date-picker
          v-model="slectTime"
          type="daterange"
          :range-separator="$t('至')"
          :start-placeholder="$t('开始日期')"
          :end-placeholder="$t('结束日期')"
        >
        </el-date-picker>
        <el-select
          style="margin-left: 20px;"
          v-model="refundValue"
          :placeholder="$t('退款状态')"
        >
          <el-option
            v-for="item in refundSelect"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
        <el-select
          style="margin-left: 20px;"
          v-model="IsRefundedValue"
          :placeholder="$t('是否已退款')"
        >
          <el-option
            v-for="item in IsRefundedSelect"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </div>
      <div slot="right">
        <el-input v-model="inputValue" class="input-with-select">
          <el-select v-model="orderNoValue" slot="prepend" :placeholder="$t('订单编号')">
            <el-option
              v-for="item in orderNoSelect"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
          <el-button slot="append">{{ $t('搜索') }}</el-button>
        </el-input>
      </div>
    </search-list>
    <!--    table列表-->
    <div class="table_list">
      <el-table
        class="order-table"
        :header-cell-style="{ background: '#F7F7F7' }"
        :data="tableData"
        style="width: 100%;margin-bottom: 20px;"
        row-key="id"
        :default-expand-all="false"
        :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
      >
        <el-table-column type="expand">
          <template slot-scope="">
            <el-table
              :header-cell-style="{ background: '#F7F7F7' }"
              :data="tableData"
              style="width: 90%;margin-left: 48px"
            >
              <el-table-column prop="name" :label="$t('商品图片')"> </el-table-column>
              <el-table-column prop="name" :label="$t('商品名称')"> </el-table-column>
              <el-table-column prop="address" :label="$t('商品编号')"> </el-table-column>
              <el-table-column prop="name" :label="$t('EAN')"> </el-table-column>
              <el-table-column prop="address" :label="$t('规格')"> </el-table-column>
              <el-table-column prop="address" :label="$t('单价')"> </el-table-column>
              <el-table-column prop="name" :label="$t('数量')"> </el-table-column>
              <el-table-column prop="address" :label="$t('退款金额')"> </el-table-column>
            </el-table>
          </template>
        </el-table-column>
        <el-table-column prop="date" :label="$t('会员ID')" width="130"> </el-table-column>
        <el-table-column prop="name" :label="$t('订单编号')" width="180">
        </el-table-column>
        <el-table-column prop="address" :label="$t('退款状态')" width="130">
        </el-table-column>
        <el-table-column prop="name" :label="$t('退款金额')" width="180">
        </el-table-column>
        <el-table-column prop="address" :label="$t('退款备注')"> </el-table-column>
        <el-table-column prop="name" :label="$t('申请时间')"> </el-table-column>
        <el-table-column prop="address" :label="$t('是否已退款')" width="100">
        </el-table-column>
        <el-table-column prop="name" :label="$t('操作人')" width="100"> </el-table-column>
        <el-table-column prop="address" :label="$t('操作')" width="200">
          <template slot-scope="">
            <el-button type="text" size="small">{{ $t('重推') }}</el-button>
            <el-button type="text" size="small">{{ $t('确认已退款') }}</el-button>
            <el-button type="text" size="small" @click="dialogRefund = true">{{
              $t('退款审核')
            }}</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!--    退款审核弹窗-->
    <el-dialog :title="$t('退款审核')" :visible.sync="dialogRefund" width="400px">
      <div style="padding: 0 40px 0 40px">
        <el-form :model="form" label-position="top" :rules="formRules">
          <el-form-item :label="`${$t('审核状态')}:`" prop="region">
            <el-select style="width: 280px" v-model="form.region">
              <el-option label="区域一" value="shanghai" />
              <el-option label="区域二" value="beijing" />
            </el-select>
          </el-form-item>
          <el-form-item :label="`${$t('退款金额')}:`" prop="name">
            <el-input v-model="form.name">
              <span slot="suffix" style="font-size: 16px">€</span>
            </el-input>
          </el-form-item>
          <el-form-item :label="`${$t('退款备注')}:`">
            <el-input type="textarea" :rows="3" v-model="form.desc"> </el-input>
          </el-form-item>
        </el-form>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogRefund = false">{{ $t('取消') }}</el-button>
        <el-button type="primary" @click="dialogRefund = false">{{
          $t('确定')
        }}</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import searchList from '@/components/searchList.vue'
export default {
  name: 'refundList',
  components: {
    searchList
  },
  data() {
    return {
      slectTime: '',
      refundSelect: [
        {
          value: '',
          label: '退款状态'
        },
        {
          value: '1',
          label: '退款成功'
        },
        {
          value: '2',
          label: '退款失败'
        },
        {
          value: '3',
          label: '待审核'
        }
      ],
      IsRefundedSelect: [
        {
          value: '',
          label: '退款状态'
        },
        {
          value: '1',
          label: '是'
        },
        {
          value: '2',
          label: '否'
        }
      ],
      orderNoSelect: [
        {
          value: '1',
          label: '订单编号'
        },
        {
          value: '2',
          label: '会员名称'
        },
        {
          value: '3',
          label: '会员ID'
        },
        {
          value: '4',
          label: '操作人'
        },
        {
          value: '5',
          label: '退款备注'
        },
        {
          value: '6',
          label: '商品编号'
        }
      ],
      refundValue: '',
      IsRefundedValue: '',
      orderNoValue: '',
      inputValue: '',
      tableData: [
        {
          id: 1,
          date: '2016-05-02',
          name: '王小虎',
          address: '是'
        },
        {
          id: 2,
          date: '2016-05-04',
          name: '王小虎',
          address: '是'
        },
        {
          id: 3,
          date: '2016-05-01',
          name: '王小虎',
          address: '否'
        },
        {
          id: 4,
          date: '2016-05-03',
          name: '王小虎',
          address: '是'
        }
      ],
      form: {
        name: '',
        region: '',
        desc: ''
      },
      dialogRefund: false,
      formRules: {
        region: [{ required: true, message: '请输入活动名称', trigger: 'blur' }],
        name: [{ required: true, message: '请输入退款金额', trigger: 'blur' }]
      }
    }
  },
  methods: {}
}
</script>
<style lang="scss" scoped>
.input-with-select {
  width: 400px;
}
.order-table {
  border-radius: 8px;
}
/deep/ .el-date-editor .el-range-separator {
  padding: 0 0px;
}
/deep/ .el-input-group__prepend {
  width: 100px;
  background: white;
  padding: 0 10px;
}
</style>
