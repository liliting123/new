<template>
    <div>
      <el-dialog
        :title="$t('批量上传')"
        :visible="dialogBatchUpload"
        width="500px"
        center
        :before-close="handleClose">
        <div style="text-align: center;padding-bottom: 20px">
          <el-upload
            class="uploaddemo"
            name="excel"
            :headers="{Authorization: $store.state.token.token,'shop-id': shopId, language: $store.state.lang}"
            :action="importProductApi"
            :on-success="handleSuccess"
            :show-file-list="false">
            <el-button slot="trigger" size="medium" type="primary">
              {{ $t('导入促销商品') }}
            </el-button>
          </el-upload>
          <el-button
            size="medium"
            type="success"
            class="uploadbutton"
            @click="downloadTemplate">
            {{ $t('下载模板') }}
          </el-button>
        </div>
      </el-dialog>
    </div>
</template>

<script>
export default {
  name: 'batchUploadDialog',
  props: {
    visible: {
      type: Boolean,
      require: true
    },
    tableType: {
      type: String
    }
  },
  data() {
    return {
      shopId: localStorage.getItem('shopId'),
      importProduct: []
    }
  },
  computed: {
    dialogBatchUpload: {
      get() {
        return this.visible
      },
      set(val) {
        this.$emit('update:visible', val)
      }
    },
    importProductApi() {
      if (this.tableType === 'discount') {
        return this.$baseUrl.BASE_API_URL + '/api/shop/discount_promotion/import'
      } else if (this.tableType === 'pieceN') {
        return this.$baseUrl.BASE_API_URL + `/api/shop/discount_plural/import`
      } else {
        return this.$baseUrl.BASE_API_URL + `/api/shop/discount_group/import`
      }
    }
  },
  methods: {
    // 导入成功的回调
    handleSuccess(res) {
      if (res.ret) {
        if (res.data.length) {
          res.data.forEach(item => {
            item.id = item.goods_id
          })
          this.$emit('getData', res.data)
        }
      }
      this.$message({
        message: res.msg,
        type: 'success'
      })
      this.dialogBatchUpload = false
    },
    handleClose() {
      this.dialogBatchUpload = false
    },
    // 下载模板
    downloadTemplate() {
      if (this.tableType === 'discount') {
        window.open('/static/discount_goods_template.xlsx')
      } else if (this.tableType === 'pieceN') {
        window.open('/static/Npiece_N-fold_goods_template.xlsx')
      } else {
        window.open('/static/combination_goods_template.xlsx')
      }
    }
  }
}
</script>

<style scoped>
.uploaddemo {
  display: inline-block;
}
.uploadbutton {
  display: inline-block;
  margin-left: 40px;
}
</style>
