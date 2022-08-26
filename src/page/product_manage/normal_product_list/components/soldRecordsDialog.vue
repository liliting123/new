<template>
  <el-dialog
    :title="$t('已售记录')"
    :visible="soldRecords"
    width="900px"
    :before-close="handleClose"
  >
    <div class="top">
      <el-date-picker
        v-model="time"
        type="daterange"
        :range-separator="$t('至')"
        :start-placeholder="$t('开始日期')"
        :end-placeholder="$t('结束日期')"
        value-format="yyyy-MM-dd"
        @change="getList"
      >
      </el-date-picker>
    </div>
    <el-table
      :header-cell-style="{ background: '#F7F7F7' }"
      :data="recordsData"
      style="width: 100%"
    >
      <el-table-column width="50" label="#">
        <template slot-scope="scope">
          <span class="table_index">{{scope.$index + 1}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="order.code" :label="$t('订单号')" width="180"></el-table-column>
      <el-table-column prop="num" :label="$t('已售数量')"> </el-table-column>
      <el-table-column prop="order.staff.name" :label="$t('操作人')"> </el-table-column>
      <el-table-column prop="created_at" :label="$t('创建时间')" width="180"> </el-table-column>
      <el-table-column :label="$t('操作')">
        <template slot-scope="scope">
          <el-button type="text" @click="showDetail(scope.row.order.id)">{{ $t('查看详情') }}</el-button>
        </template>
      </el-table-column>
    </el-table>
    <PaginationAndButtons :pageParams="page_params" />
    <span slot="footer" class="dialog-footer">
      <el-button @click="soldRecords = false">{{ $t('取消') }}</el-button>
      <el-button type="primary" @click="soldRecords = false">{{ $t('确定') }}</el-button>
    </span>
  </el-dialog>
</template>

<script>
import PaginationAndButtons from '@/components/pagination_and_buttons.vue'
import pagination from '@/mixin/pagination'
export default {
  name: 'soldRecordsDialog',
  components: {
    PaginationAndButtons
  },
  mixins: [pagination],
  props: {
    visible: {
      type: Boolean,
      require: true
    },
    recordsId: {
      type: Number
    },
    keyValue: {
      type: String
    },
    row: {
      type: Object
    }
  },
  computed: {
    soldRecords: {
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
      recordsData: [],
      time: ''
    }
  },
  mounted() {
    this.getList()
  },
  methods: {
    // 已售记录列表
    getList() {
      this.$http.get(`api/shop/goods/order/item`, {
          params: {
            page: this.page_params.page,
            size: this.page_params.size,
            created_at_start: this.time ? this.time[0] : '',
            created_at_end: this.time ? this.time[1] : '',
            goods_id: this.keyValue === 'goods_id' ? this.recordsId : this.row.goods_id,
            goods_spec_id: this.keyValue === 'goods_spec_id' ? this.row.id : undefined,
            goods_type: 'goods_spec_type'
          }
        }).then(res => {
          this.recordsData = res.data.data
          this.page_params.total = res.data.total
        })
    },
    // 跳转订单详情
    showDetail(id) {
      this.soldRecords = false
      this.$router.push({
        name: '订单详情',
        params: {
          id: id
        }
      })
    },
    // 关闭弹窗
    handleClose() {
      this.soldRecords = false
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
</style>
