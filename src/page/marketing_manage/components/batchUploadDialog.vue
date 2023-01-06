<template>
    <div>
      <el-dialog
        :title="$t('批量上传')"
        :visible="dialogBatchUpload"
        width="25%"
        center
        :before-close="handleClose">
        <div style="text-align: center;padding-bottom: 20px">
          <el-upload
            class="uploaddemo"
            name="file"
            action="https://jsonplaceholder.typicode.com/posts/"
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
    }
  },
  data() {
    return {
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
    }
  },
  methods: {
    handleClose() {
      this.dialogBatchUpload = false
    },
    // 下载模板
    downloadTemplate() {
      // window.open('/static/goodsList.zip');
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
