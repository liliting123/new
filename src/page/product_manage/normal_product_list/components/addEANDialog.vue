<template>
  <el-dialog
    :title="$t('添加EAN')"
    :visible="dialogENATable"
    width="30%">
    <el-table :data="gridData">
      <el-table-column width="50" label="#">
        <template slot-scope="scope">
          <span class="table_index">1</span>
        </template>
      </el-table-column>
      <el-table-column prop="date"  :label="`*${$t('EAN')}`" width="150"></el-table-column>
      <el-table-column prop="name"  :label="$t('添加时间')" width="200"></el-table-column>
      <el-table-column prop="address" :label="$t('操作')">
        <template slot-scope="scope">
          <el-button type="text">{{$t('删除')}}</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="bottom-text">
      <button>{{'+'+$t('EAN')}}</button>
    </div>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogENATable = false">{{$t('取消')}}</el-button>
      <el-button type="primary" @click="dialogENATable = false">{{$t('确定')}}</el-button>
    </div>
  </el-dialog>
</template>

<script>
export default {
  name: 'addEANDialog',
  props: {
    visible: {
      type: Boolean,
      require: true
    }
  },
  data() {
    return {
      gridData: [{
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }]
    }
  },
  computed: {
    dialogENATable: {
      get() {
        return this.visible
      },
      set(val) {
        this.$emit('update:visible', val)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.bottom-text {
  padding: 10px;
  button {
    height: 50px;
    width: 100%;
    border: 1px dashed gainsboro;
    background: white;
    color: #32bceb;
  }
}
</style>
