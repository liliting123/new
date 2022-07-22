<template>
  <el-dialog
    :title="$t('添加EAN')"
    :visible="dialogENATable"
    width="40%">
    <el-form :model="formEAN" :rules="rulesEan" ref="formEAN">
      <el-table :data="formEAN.specEan">
        <el-table-column width="50" label="#">
          <template slot-scope="scope">
            <span class="table_index">{{scope.$index + 1}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="ean"  :label="`*${$t('EAN')}`" width="150">
          <template slot-scope="scope">
            <el-form-item :prop="'specEan.'+scope.$index+'.ean'" :rules="rulesEan.ean">
              <el-input size="small" v-model="scope.row.ean"></el-input>
            </el-form-item>
          </template>
        </el-table-column>
        <el-table-column  :label="$t('添加时间')" width="250">
          {{ dateStrFormat(new Date()) }}
        </el-table-column>
        <el-table-column :label="$t('操作')">
          <template slot-scope="scope">
            <el-button type="text" @click="deleteEan(scope.$index)">{{$t('删除')}}</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-form>
    <div class="bottom-text">
      <button @click="addEAN()">{{'+'+$t('EAN')}}</button>
    </div>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogENATable = false">{{$t('取消')}}</el-button>
      <el-button type="primary" @click="saveEAN()">{{$t('确定')}}</el-button>
    </div>
  </el-dialog>
</template>

<script>
import moment from 'moment'
export default {
  name: 'addEANDialog',
  props: {
    visible: {
      type: Boolean,
      require: true
    }
  },
  data() {
    return {
      formEAN: {
        specEan: [{
          ean: ''
        }]
      },
      rulesEan: {
        ean: [{ required: true, message: '请输入EAN', trigger: 'blur' }]
      }
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
  methods: {
    saveEAN() {
      this.$http.post('api/shop/goods/store_ean', {
        spec_ean: JSON.stringify(this.formEAN.specEan)
      }).then(res => {
        if (res.ret) {
          console.log(1)
          // this.dialogENATable = false
        }
      })
    },
    // 时间格式化
    dateStrFormat(strTime) {
      if (strTime === undefined) {
        return ''
      }
      return moment(strTime).format('YYYY-MM-DD HH:mm:ss')
    },
    // 添加EAN
    addEAN() {
      this.formEAN.specEan.push({
        ean: ''
      })
    },
    // 删除EAN
    deleteEan (index) {
      this.formEAN.specEan.splice(index, 1)
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
