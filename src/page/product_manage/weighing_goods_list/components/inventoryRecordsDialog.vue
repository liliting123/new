<template>
  <el-dialog
    :title="$t('库存记录')"
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
      >
      </el-date-picker>
      <el-select v-model="type_id" :placeholder="$t('全部')">
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
      style="width: 100%">
      <el-table-column width="50">
        <template slot-scope="scope">
          <span class="table_index">{{ scope.$index + 1 }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="date" :label="$t('类型')" width="180"> </el-table-column>
      <el-table-column prop="old_num" :label="$t('操作前库存')"> </el-table-column>
      <el-table-column prop="new_num" :label="$t('当前库存')"> </el-table-column>
      <el-table-column prop="num" :label="$t('操作库存')" width="180"> </el-table-column>
      <el-table-column prop="staff.name" :label="$t('操作人')"> </el-table-column>
      <el-table-column prop="updated_at" :label="$t('操作时间')" width="180"> </el-table-column>
      <el-table-column prop="external_code" :label="$t('关联单号')"> </el-table-column>
    </el-table>
    <span slot="footer" class="dialog-footer">
      <el-button @click="inventoryRecords = false">{{ $t('取消') }}</el-button>
      <el-button type="primary" @click="inventoryRecords = false">{{
        $t('确定')
      }}</el-button>
    </span>
  </el-dialog>
</template>

<script>
export default {
  name: 'inventoryRecordsDialog',
  props: {
    visible: {
      type: Boolean,
      require: true
    },
    recordsData: {
      type: Array
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
      value1: '',
      options: [
        {
          value: '1',
          label: '已售库存'
        },
        {
          value: '2',
          label: '编辑库存'
        }],
      type_id: '',
      time: ''
    }
  },
  methods: {
    // 关闭弹窗
    handleClose() {
      this.inventoryRecords = false
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
