<template>
  <div class="user-list">
    <div></div>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column
        type="index"
        width="50"
        style="width：30px;height:30px;background:#ccc"
      >
      </el-table-column>
      <el-table-column prop="date" label="员工名称" width="180"> </el-table-column>
      <el-table-column prop="name" label="员工邮箱" width="180"> </el-table-column>
      <el-table-column prop="address" label="员工组"> </el-table-column>
      <el-table-column prop="address" label="创建时间"> </el-table-column>
      <el-table-column prop="address" label="备注"> </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="">
          <el-button type="text" size="small">查看</el-button>
          <el-button type="text" size="small">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
export default {
  data() {
    return {
      tableData: [
        {
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        },
        {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        },
        {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄'
        },
        {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        }
      ]
    }
  }
}
</script>

<style lang="scss" scoped></style>
