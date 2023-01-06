<template>
  <div>
    <search-list>
      <div slot="left">
        <el-button
          type="primary"
          @click="insertCombination">
          {{ $t('添加组合促销') }}
        </el-button>
      </div>
      <div slot="right">
        <el-input v-model="searchValue" class="input-with-select">
          <el-button slot="append" @click="getList">
            {{ $t('搜索') }}
          </el-button>
        </el-input>
      </div>
    </search-list>
    <!--    table表   -->
    <div class="table_list" style="padding-top: 10px">
      <marketingManageTable
        tableType="combination"
        :data="tableData"
        @getList="getList"/>
    </div>
  </div>
</template>

<script>
import searchList from '@/components/searchList.vue'
import marketingManageTable from '@/page/marketing_manage/components/marketingManageTable'
import PaginationAndButtons from '@/components/pagination_and_buttons.vue'
import pagination from '@/mixin/pagination'
export default {
  components: {
    searchList,
    marketingManageTable,
    PaginationAndButtons
  },
  mixins: [pagination],
  name: 'index',
  data() {
    return {
      tableData: [],
      searchValue: ''
    }
  },
  created() {
    this.getList()
  },
  methods: {
    // 添加组合促销
    insertCombination() {
      this.$router.push('combination_promotion/add_combination')
    },
    // 获取列表数据
    getList() {
      this.$http.get('api/shop/discount_group', {
        params: {
          keyword: this.searchValue,
          page: this.page_params.page,
          size: this.page_params.size
        }
      }).then(res => {
        if (res.ret) {
          this.tableData = res.data.data
          this.page_params.total = res.data.total
        }
      })
    }
  }
}
</script>

<style scoped>

</style>
