<template>
    <div>
      <el-table
        :header-cell-style="{ background: '#F7F7F7' }"
        :data="data"
        style="width: 100%">
        <el-table-column type="expand">
          <template slot-scope="scope">
            <el-table
              :header-cell-style="{ background: '#F7F7F7' }"
              :data="scope.row.item"
              border
              style="width: 95%;margin-left: 48px">
              <el-table-column width="50" label="#">
                <template slot-scope="scope">
                  <span class="table_index">{{ scope.$index + 1 }}</span>
                </template>
              </el-table-column>
              <el-table-column prop="name" :label="$t('商品名称')"></el-table-column>
              <el-table-column prop="code" :label="$t('商品编码')"></el-table-column>
              <el-table-column prop="spec_name" :label="$t('规格')"></el-table-column>
              <el-table-column prop="price" :label="$t('价格')"></el-table-column>
              <el-table-column v-if="tableType === 'pieceN'" prop="name" :label="$t('N件N折')">
                <template slot-scope="scope">
                  {{scope.row.number+'件'+scope.row.rate/10+'折'}}
                </template>
              </el-table-column>
              <el-table-column v-if="tableType != 'combination'" prop="discount_price" :label="$t('促销价格')"></el-table-column>
              <el-table-column v-if="tableType === 'combination'" prop="number" :label="$t('组合数量')"></el-table-column>
              <el-table-column prop="num" :label="$t('可售库存')"></el-table-column>
            </el-table>
          </template>
        </el-table-column>
        <el-table-column
          prop="name"
          :label="$t('活动名称')"
          width="180">
        </el-table-column>
        <el-table-column
          prop="status_id"
          :label="$t('状态')">
          <template slot-scope="scope">
            {{ scope.row.status_id === 1 ? $t('未开始') :
            scope.row.status_id === 2 ? $t('已开始'):
            scope.row.status_id === 3  ? $t('已结束') : $t('已失效') }}
          </template>
        </el-table-column>
        <el-table-column
          v-if="tableType === 'combination'"
          prop="price"
          :label="$t('组合价格')"
          width="180">
        </el-table-column>
        <el-table-column
          prop="start_time"
          :label="$t('开始时间')"
          width="180">
        </el-table-column>
        <el-table-column
          prop="over_time"
          :label="$t('结束时间')">
        </el-table-column>
        <el-table-column
          prop="created_at"
          :label="$t('创建时间')">
        </el-table-column>
        <el-table-column
          prop="address"
          :label="$t('操作')">
          <template slot-scope="scope">
            <el-button
              type="text"
              size="small"
              @click="editActivity(tableType,scope.row.id)">
              {{$t('编辑')}}
            </el-button>
            <el-button
              type="text"
              size="small"
              @click="invalid(scope.row.id)"
              v-if="scope.row.status_id === 1 || scope.row.status_id === 2">{{$t('失效')}}</el-button>
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
    },
    data: {
      type: Array
    }
  },
  data() {
    return {
    }
  },
  methods: {
    invalid(id) {
      this.$confirm(this.$t('您确认要失效此活动吗？'), this.$t('提示'), {
        confirmButtonText: this.$t('确定'),
        cancelButtonText: this.$t('取消'),
        type: 'warning'
      }).then(() => {
        let api
        if (this.tableType === 'discount') {
          api = `api/shop/discount_promotion/${id}`
        } else if (this.tableType === 'pieceN') {
          api = `api/shop/discount_plural/${id}`
        } else {
          api = `api/shop/discount_group/${id}`
        }
        this.$http.delete(api).then(res => {
          this.$notify({
            title: this.$t('success'),
            message: res.msg,
            type: 'success'
          })
        })
        this.$emit('getList')
      }).catch(() => {})
    },
    editActivity(tableType, id) {
      if (tableType === 'discount') {
        this.$router.push(`discount_promotion/edit_discount/${id}`)
      } else if (tableType === 'pieceN') {
        this.$router.push(`pieceN_foldN/edit_pieceN/${id}`)
      } else {
        this.$router.push(`combination_promotion/edit_combination/${id}`)
      }
    }
  }
}
</script>

<style scoped>

</style>
