<template>
  <el-dialog
    title="库存记录"
    :visible="inventoryRecords"
    width="60%"
    :before-close="handleClose">
    <div class="top">
      <el-date-picker
        v-model="value1"
        type="daterange"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期">
      </el-date-picker>
      <el-select
        v-model="value1"
        placeholder="全部">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
    </div>
    <el-table
      :header-cell-style="{background:'#F7F7F7'}"
      :data="tableData"
      style="width: 100%">
      <el-table-column width="50" label="#">
        <template slot-scope="scope">
          <span class="table_index">1</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="date"
        label="类型"
        width="180">
      </el-table-column>
      <el-table-column
        prop="name"
        label="操作前库存">
      </el-table-column>
      <el-table-column
      prop="address"
      label="当前库存">
    </el-table-column>
      <el-table-column
        prop="date"
        label="操作库存"
        width="180">
      </el-table-column>
      <el-table-column
        prop="address"
        label="操作人">
      </el-table-column>
      <el-table-column
        prop="date"
        label="操作时间"
        width="180">
      </el-table-column>
      <el-table-column
        prop="name"
        label="关联单号">
      </el-table-column>
    </el-table>
    <span slot="footer" class="dialog-footer">
      <el-button @click="inventoryRecords = false">取 消</el-button>
      <el-button type="primary" @click="inventoryRecords = false">确 定</el-button>
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
      tableData: [{
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1517 弄'
      }],
      value1: '',
      options: [{
        value: '选项1',
        label: '黄金糕'
      }, {
        value: '选项2',
        label: '双皮奶'
      }, {
        value: '选项3',
        label: '蚵仔煎'
      }, {
        value: '选项4',
        label: '龙须面'
      }, {
        value: '选项5',
        label: '北京烤鸭'
      }]
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
