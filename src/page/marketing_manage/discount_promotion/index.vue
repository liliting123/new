<template>
  <div>
    <search-list>
      <div slot="left">
        <el-button
          type="primary"
          @click="insertDiscount">
          {{ $t('添加折扣促销') }}
        </el-button>
      </div>
      <div slot="right">
        <el-input v-model="searchValue" class="input-with-select">
          <el-button slot="append">
            {{ $t('搜索') }}
          </el-button>
        </el-input>
      </div>
    </search-list>
<!--    table表   -->
    <div class="table_list" style="padding-top: 10px">
      <marketingManageTable
        tableType="discount"
      />
    </div>
  </div>
</template>

<script>
import searchList from '@/components/searchList.vue'
import marketingManageTable from '@/page/marketing_manage/components/marketingManageTable'
export default {
  components: {
    searchList,
    marketingManageTable
  },
  name: 'index',
  data() {
    return {
      discount: 'discount',
      tableData: [{
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }],
      searchValue: ''
    }
  },
  methods: {
    // 添加折扣促销
    insertDiscount() {
        this.$router.push('discount_promotion/add_discount')
    }
  }
}
</script>

<style scoped>

</style>
