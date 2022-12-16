<template>
  <el-dialog
    :title="$t('添加EAN')"
    :visible="dialogENATable"
    :before-close="handleClose"
    width="40%"
  >
    <el-table :data="eanData">
      <el-table-column width="50" label="#">
        <template slot-scope="scope">
          <span class="table_index">{{ scope.$index + 1 }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="ean" :label="`*${$t('EAN')}`" width="150">
        <template slot-scope="scope">
          <el-input
            size="small"
            v-model="scope.row.ean"
            :disabled="scope.row.id && scope.row.id !== ''"
          >
          </el-input>
        </template>
      </el-table-column>
      <el-table-column prop="created_at" :label="$t('添加时间')" width="250">
        <template slot-scope="scope">
          {{ scope.row.created_at ? scope.row.created_at : getNowFormatDate() }}
        </template>
      </el-table-column>
      <el-table-column :label="$t('操作')">
        <template slot-scope="scope">
          <el-button type="text" @click="deleteEan(scope.$index, scope.row.id)">{{
            $t('删除')
          }}</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="bottom-text">
      <button @click="addEAN()">{{ '+' + $t('EAN') }}</button>
    </div>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogENATable = false">{{ $t('取消') }}</el-button>
      <el-button type="primary" @click="saveEAN()">{{ $t('确定') }}</el-button>
    </div>
  </el-dialog>
</template>

<script>
// import moment from 'moment'
export default {
  name: 'addEANDialog',
  props: {
    visible: {
      type: Boolean,
      require: true
    },
    id: ''
  },
  data() {
    return {
      eanData: []
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
  },
  mounted() {
    this.getList()
  },
  methods: {
    getList() {
      this.$http.get(`api/shop/goods_spec_ean/${this.id}`).then(res => {
        if (res.ret) {
          this.eanData = res.data.data
        }
      })
    },
    saveEAN() {
      let eanArry = this.eanData.filter(item => {
        return !item.id
      })
      this.$http
        .post(`api/shop/goods_spec_ean/${this.id}`, {
          spec_ean: eanArry
        })
        .then(res => {
          if (res.ret) {
            this.$notify({
              title: this.$t('success'),
              message: res.msg,
              type: 'success'
            })
            this.dialogENATable = false
          }
        })
    },

    getNowFormatDate() {
      var date = new Date()

      var year = date.getFullYear()
      var month = date.getMonth() + 1
      var d = date.getDate()
      var hour = date.getHours()
      var minute = date.getMinutes()
      var second = date.getSeconds()

      if (month < 10) {
        month = '0' + month
      }

      if (d < 10) {
        d = '0' + d
      }

      if (hour < 10) {
        hour = '0' + hour
      }

      if (minute < 10) {
        minute = '0' + hour
      }

      if (second < 10) {
        second = '0' + second
      }

      return year + '-' + month + '-' + d + ' ' + hour + ':' + minute + ':' + second
    },
    // 时间格式化
    // dateStrFormat(strTime) {
    //   if (strTime === undefined) {
    //     return ''
    //   }
    //   return moment(strTime).format('YYYY-MM-DD HH:mm:ss')
    // },
    // 添加EAN
    addEAN() {
      this.eanData.push({
        ean: ''
      })
    },
    // 删除EAN
    deleteEan(index, id) {
      if (id) {
        this.$confirm(this.$t('确认要删除吗?'), this.$t('提示'), {
          confirmButtonText: this.$t('确定'),
          cancelButtonText: this.$t('取消'),
          type: 'warning'
        }).then(async () => {
          const res = await this.$http.delete(`api/shop/goods_spec_ean/${id}`)
          if (res.ret === 1) {
            this.$notify({
              title: this.$t('success'),
              message: res.msg,
              type: 'success'
            })
            this.getList()
          }
        })
      } else {
        this.eanData.splice(index, 1)
      }
    },
    // 关闭弹窗
    handleClose() {
      this.dialogENATable = false
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
