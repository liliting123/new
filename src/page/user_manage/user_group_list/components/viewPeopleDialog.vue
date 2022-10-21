<template>
  <el-dialog :title="$t('查看人员')" :visible.sync="dialogViewPeople" width="40%">
    <el-table :data="peopleData">
      <el-table-column width="80" align="center">
        <template slot-scope="scope">
          <span class="table_index">{{ scope.$index + 1 }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="name" :label="$t('员工名称')"></el-table-column>
      <el-table-column prop="email" :label="$t('邮箱')"></el-table-column>
    </el-table>
    <PaginationAndButtons :pageParams="page_params" />
  </el-dialog>
</template>
<script>
import PaginationAndButtons from '@/components/pagination_and_buttons.vue'
import pagination from '@/mixin/pagination'
export default {
  components: {
    PaginationAndButtons
  },
  mixins: [pagination],
  props: {
    visible: {
      type: Boolean,
      require: true
    },
    theUserGroupId: {
      type: Number
    }
  },
  computed: {
    dialogViewPeople: {
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
      peopleData: []
    }
  },
  mounted() {
    this.getList()
  },
  methods: {
    async getList() {
      const res = await this.$http.get(
        `api/shop/staff_group/${this.theUserGroupId}/staff`,
        {
          params: {
            page: this.page_params.page,
            size: this.page_params.size,
            keyword: ''
          }
        }
      )
      if (res.ret) {
        this.page_params.total = res.data.total
        this.peopleData = res.data.data
      }
    }
  }
}
</script>
<style scoped></style>
