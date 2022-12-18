<template>
    <div>
      <el-table
        :header-cell-style="{ background: '#F7F7F7' }"
        :data="tableData"
        style="width: 100%">
        <el-table-column type="expand">
          <template slot-scope="scope">
            <el-table
              :header-cell-style="{ background: '#F7F7F7' }"
              :data="scope.row.spec"
              border
              style="width: 95%;margin-left: 48px">
              <el-table-column width="50" label="#">
                <template slot-scope="scope">
                  <span class="table_index">{{ scope.$index + 1 }}</span>
                </template>
              </el-table-column>
              <el-table-column prop="code" :label="$t('商品名称')"></el-table-column>
              <el-table-column prop="ean" :label="$t('商品编码')"></el-table-column>
              <el-table-column prop="supplier.name" :label="$t('规格')"></el-table-column>
              <el-table-column prop="name" :label="$t('价格')"></el-table-column>
              <el-table-column v-if="tableType === 'pieceN'" prop="name" :label="$t('N件N折')"></el-table-column>
              <el-table-column v-if="tableType != 'combination'" :label="$t('促销价格')"></el-table-column>
              <el-table-column v-if="tableType === 'combination'" :label="$t('组合数量')"></el-table-column>
              <el-table-column :label="$t('可售库存')"></el-table-column>
            </el-table>
          </template>
        </el-table-column>
        <el-table-column
          prop="date"
          label="活动名称"
          width="180">
        </el-table-column>
        <el-table-column
          v-if="tableType === 'combination'"
          prop="date"
          label="组合价格"
          width="180">
        </el-table-column>
        <el-table-column
          prop="name"
          label="开始时间"
          width="180">
        </el-table-column>
        <el-table-column
          prop="address"
          label="结束时间">
        </el-table-column>
        <el-table-column
          prop="address"
          label="创建时间">
        </el-table-column>
        <el-table-column
          prop="address"
          label="操作">
          <template slot-scope="scope">
            <el-button
              type="text"
              size="small"
              @click="editActivity(tableType)">
              {{$t('编辑')}}
            </el-button>
            <el-button type="text" size="small">{{$t('失效')}}</el-button>
            <el-button type="text" size="small">{{$t('导出数据')}}</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
</template>

<script>
  export default {
    name: 'marketingManageTable',
    props: {
      tableType: {
        type: String
      }
    },
    data() {
      return {
        tableData: [{
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }]
      }
    },
    methods: {
      editActivity(tableType) {
        if (tableType === 'discount') {
          this.$router.push('discount_promotion/edit_discount')
        } else if (tableType === 'pieceN') {
          this.$router.push('pieceN_foldN/edit_pieceN')
        } else {
          this.$router.push('combination_promotion/edit_combination')
        }
      }
    }
  }
</script>

<style scoped>

</style>
