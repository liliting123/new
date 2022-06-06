<template>
  <el-dialog
    title="拉取后台商品"
    :visible="dialogPullGoods"
    :before-close="handleClose"
    width="500px">
    <div style="padding: 0 40px 0 40px">
      <el-form :model="form" label-position="top">
        <el-form-item label="店铺名称:">
          <el-select v-model="form.name" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="商品编号:">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
      </el-form>
    </div>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogPullGoods = false">取 消</el-button>
      <el-button type="primary" @click="dialogPullGoods = false">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
export default {
  name: 'pullGoods',
  props: {
    visible: {
      type: Boolean,
      require: true
    }
  },
  computed: {
    dialogPullGoods: {
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
      form: {
        name: '',
        value: false
      },
      options: [{
        value: '选项1',
        label: '黄金糕'
      }, {
        value: '选项2',
        label: '双皮奶'
      }, {
        value: '选项3',
        label: '蚵仔煎'
      }, {
        value: '选项4',
        label: '龙须面'
      }, {
        value: '选项5',
        label: '北京烤鸭'
      }]
    }
  },
  methods: {
    handleClose() {
      this.dialogPullGoods = false
    }
  }
}
</script>

<style scoped>
.el-select {
  width: 377px;
}
</style>
