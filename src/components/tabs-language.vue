<template>
  <el-tabs
    class="tabs"
    v-model="activeName"
    :style="{ 'margin-left': `${marginLeft}px` }"
  >
    <el-tab-pane
      :label="item"
      :name="index"
      v-for="(item, index) in languageArr"
      :key="item"
    />
  </el-tabs>
</template>

<script>
export default {
  name: 'TabsLanguage',
  props: {
    marginLeft: {
      type: Number
    },
    ifOut: {
      // 是否从外部传入数据
      type: Boolean,
      default: () => false
    },
    outerObject: {
      type: Object
    }
  },
  data() {
    return {
      activeName: 'cn',
      languageArr: {}
    }
  },
  watch: {
    activeName: {
      handler(newValue) {
        this.modifyLanguage(newValue)
      },
      immediate: true
    },
    outerObject: {
      handler(newValue) {
        if (this.ifOut) {
          this.languageArr = newValue
        }
      }
    }
  },
  mounted() {
    this.ifOut || this.getLanguage()
  },
  methods: {
    // 获取语言种类
    async getLanguage() {
      const res = await this.$http(`api/language`)
      if (res.ret) {
        this.languageArr = res.data
      }
    },
    modifyLanguage(language) {
      this.$emit('update', language)
    }
  }
}
</script>
<style scoped lang='scss'>
// .tabs {
//   margin-left: 120px;
// }
</style>
