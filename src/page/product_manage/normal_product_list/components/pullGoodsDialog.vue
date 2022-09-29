<template>
  <el-dialog
    :title="$t('拉取后台商品')"
    :visible="dialogPullGoods"
    :before-close="handleClose"
    width="500px"
  >
    <div style="padding: 0 40px 0 40px">
      <el-form :model="form" label-position="top">
        <el-form-item :label="`${$t('店铺名称')}:`">
          <el-select v-model="form.relevance_code">
            <el-option
              v-for="item in MesShopList"
              :key="item.shop_id"
              :label="language === 'cn' ? item.cn_name : item.en_name"
              :value="item.shop_id"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item :label="`${$t('商品编号')}:`">
          <el-input v-model="form.shop_id"></el-input>
        </el-form-item>
      </el-form>
    </div>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogPullGoods = false">{{ $t('取消') }}</el-button>
      <el-button type="primary" @click="getProductInfo">{{ $t('确定') }}</el-button>
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
        shop_id: '',
        relevance_code: ''
      },
      MesShopList: [],

      language: localStorage.getItem('myLanguage')
    }
  },
  created() {
    this.getMesShopList()
  },
  methods: {
    getMesShopList() {
      this.$http.get(`api/shop/goods/mes_shop`).then(res => {
        this.MesShopList = res.data
      })
    },
    getProductInfo() {
      this.$http
        .get(`api/shop/goods/mes_goods`, {
          params: {
            ...this.form
          }
        })
        .then(res => {
          if (res.ret) {
            this.$router.push({
              name: this.$t('添加商品'),
              params: { id: res.data.relevance_code, shops: res.data }
            })
          }
        })
    },
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
