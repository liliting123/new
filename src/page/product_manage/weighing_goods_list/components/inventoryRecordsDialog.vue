<template>
  <el-dialog
    :title="'(' + this.records.name + ')' + $t('库存记录')"
    :visible="inventoryRecords"
    width="60%"
    :before-close="handleClose"
  >
    <div class="top">
      <el-date-picker
        v-model="time"
        type="daterange"
        range-separator="-"
        :start-placeholder="$t('开始日期')"
        :end-placeholder="$t('结束日期')"
        value-format="yyyy-MM-dd"
        @change="getList()"
      >
      </el-date-picker>
      <el-select v-model="type_id" :placeholder="$t('全部')" @change="getList()">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>
    </div>
    <el-table
      :header-cell-style="{ background: '#F7F7F7' }"
      :data="recordsData"
      style="width: 100%"
    >
      <el-table-column width="50" label="#">
        <template slot-scope="scope">
          <span class="table_index">{{ scope.$index + 1 }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('类型')">
        <template slot-scope="scope">
          {{ scope.row.type_id === 1 ? $t('已售库存') : $t('编辑库存') }}
        </template>
      </el-table-column>
      <el-table-column :label="$t('操作前库存')">
        <template slot-scope="scope"> {{ scope.row.old_num }}KG </template>
      </el-table-column>
      <el-table-column :label="$t('当前库存')">
        <template slot-scope="scope"> {{ scope.row.new_num }}KG </template>
      </el-table-column>
      <el-table-column :label="$t('操作库存')">
        <template slot-scope="scope"> {{ scope.row.num }}KG </template>
      </el-table-column>
      <el-table-column prop="staff.name" :label="$t('操作人')"> </el-table-column>
      <el-table-column prop="updated_at" :label="$t('操作时间')"> </el-table-column>
      <el-table-column prop="external_code" :label="$t('关联单号')"> </el-table-column>
    </el-table>
    <PaginationAndButtons :pageParams="page_params" />
  </el-dialog>
</template>

<script>
import PaginationAndButtons from '@/components/pagination_and_buttons.vue'
import pagination from '@/mixin/pagination'
export default {
  name: 'inventoryRecordsDialog',
  components: {
    PaginationAndButtons
  },
  mixins: [pagination],
  props: {
    visible: {
      type: Boolean,
      require: true
    },
    records: {
      type: Object
    }
  },
  computed: {
    inventoryRecords: {
      get() {
        return this.visible
      },
      set(val) {
        this.$emit('update:visible', val)
      }
    }
  },
  data() {
    return {
      options: [
        {
          value: '',
          label: this.$t('全部')
        },
        {
          value: 1,
          label: this.$t('已售库存')
        },
        {
          value: 2,
          label: this.$t('编辑库存')
        }
      ],
      type_id: '',
      time: '',
      recordsData: []
    }
  },
  mounted() {
    this.getList()
  },
  methods: {
    // recordSymbol(before, after, news) {
    //   if (news === before - after) {
    //     return '-'
    //   } else {
    //     return '+'
    //   }
    // },
    // 关闭弹窗
    handleClose() {
      this.inventoryRecords = false
    },
    // 获取库存记录
    getList() {
      this.$http
        .get(`api/shop/weigh_goods_record?weigh_goods_id=${this.records.id}`, {
          params: {
            page: this.page_params.page,
            size: this.page_params.size,
            start_time: this.time ? this.time[0] : '',
            end_time: this.time ? this.time[1] : '',
            type_id: this.type_id
          }
        })
        .then(res => {
          if (res.ret) {
            this.page_params.total = res.data.total
            this.recordsData = res.data.data
          }
        })
    }
  }
}
</script>

<style lang="scss" scoped>
.top {
  height: 40px;
  display: flex;
  line-height: 40px;
  justify-content: space-between;
  margin-bottom: 15px;
}
/deep/ .el-dialog__header {
  border-bottom: 1px solid #dcdfe6;
}
</style>
