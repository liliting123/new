<template>
  <div>
    <div class="info-top">
      <div class="title">{{$t('基本信息')}}</div>
      <div class="nav">
<!--        <tabsLanguage></tabsLanguage>-->
      </div>
      <div class="form-content">
        <el-form
          ref="form"
          :model="form"
          :rules="rules"
          label-width="80px"
          size="small"
          label-position="top">
          <el-row :gutter="20">
            <el-col :span="6">
              <el-form-item :label="`${$t('商品名称')}:`" prop="name">
                <el-input v-model="form.name"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8" :offset="6">
              <el-form-item :label="`${$t('是否有会员价')}:`">
                <el-switch v-model="form.delivery"></el-switch>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="6">
              <el-form-item :label="`${$t('商品分类')}:`">
                <el-select v-model="form.region" :label="$t('请选择分类')">
                  <el-option label="区域一" value="shanghai"></el-option>
                  <el-option label="区域二" value="beijing"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8" :offset="6">
              <el-form-item :label="`${$t('商品图片')}:`">
                <el-upload
                  class="upload-demo"
                  action="https://jsonplaceholder.typicode.com/posts/"
                  multiple
                  :limit="3">
                  <el-button size="small">{{$t('点击上传')}}</el-button>
                  <span>{{`（${$t('建议尺寸')} 500*500px）`}}</span>
                </el-upload>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="6">
              <el-form-item :label="`${$t('分类标签')}:`">
                <el-select v-model="form.region">
                  <el-option label="区域一" value="shanghai"></el-option>
                  <el-option label="区域二" value="beijing"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
    </div>
    <div class="info-top">
      <div class="title">
        <span>{{$t('规格信息')}}</span>
      </div>
      <div class="table">
        <el-form
          ref="specForm"
          :model="specForm">
          <el-table
            :header-cell-style="{background:'#F7F7F7'}"
            :data="specForm.tableData"
            style="width: 100%">
            <el-table-column
              prop="date"
              label="#"
              width="80">
              <template slot-scope="scope">
                <span class="table_index">{{scope.$index+1}}</span>
              </template>
            </el-table-column>
            <el-table-column
              prop="name"
              :label="`*${$t('商品编码')}`"
              width="180">
              <template slot-scope="scope">
                <el-input size="small"></el-input>
              </template>
            </el-table-column>
            <el-table-column
              prop="address"
              :label="`*${$t('EAN')}`">
              <template slot-scope="scope">
                <el-input size="small"></el-input>
              </template>
            </el-table-column>
            <el-table-column
              prop="date"
              :label="`*${$t('供应商')}`"
              width="180">
              <template slot-scope="scope">
                <el-select v-model="value" size="small">
                  <el-option
                    v-for="item in specForm.options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </template>
            </el-table-column>
            <el-table-column
              prop="name"
              :label="`*${$t('规格')}`"
              width="180">
              <template slot-scope="scope">
                <el-input size="small"></el-input>
              </template>
            </el-table-column>
            <el-table-column
              prop="address"
              :label="`*${$t('价格')}`">
              <template slot-scope="scope">
                <el-input size="small"></el-input>
              </template>
            </el-table-column>
            <el-table-column
              prop="date"
              :label="`*${$t('会员价')}`"
              width="180">
              <template slot-scope="scope">
                <el-input size="small"></el-input>
              </template>
            </el-table-column>
            <el-table-column
              prop="name"
              :label="`*${$t('税率')}`"
              width="180">
              <template slot-scope="scope">
                <el-select v-model="value" size="small">
                  <el-option
                    v-for="item in specForm.options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </template>
            </el-table-column>
            <el-table-column
              prop="name"
              :label="$t('操作')"
              width="100px">
              <template slot-scope="scope">
                <el-button type="text" size="small" @click="showEAN()">{{$t('EAN')}}</el-button>
                <el-button type="text" size="small" @click="deleteRow(scope.$index)">{{$t('删除')}}</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-form>
      </div>
      <div class="bottom-text">
        <button @click="addSpec()">{{'+'+$t('添加规格')}}</button>
      </div>
    </div>
    <div class="info-top">
      <div class="title">
        <span>{{$t('WMS分类（选择后将商品同步至WMS）')}}</span>
      </div>
      <div style="padding: 15px">
        <el-select v-model="value" size="small">
          <el-option
            v-for="item in specForm.options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </div>
    </div>
    <div class="bottom-btn">
      <el-button type="primary" style="width: 180px">{{$t('保存')}}</el-button>
    </div>
<!--    EAN弹窗-->
    <addEANDialog
      :visible.sync="dialogENATable"/>
  </div>
</template>

<script>
// import tabsLanguage from '@/components/tabs-language.vue'
import addEANDialog from './components/addEANDialog.vue'
export default {
  name: 'add_product',
  components: {
    // tabsLanguage,
    addEANDialog
  },
  data() {
    return {
      specForm: {
        tableData: [{
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄'
        }, {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        }],
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
      },
      value: '',
      form: {
        name: '',
        region: '',
        delivery: false
      },
      rules: {
        name: [{ required: true, message: '请填写商品名称', trigger: 'change' }]
      },
      dialogENATable: false // EAN弹窗
    }
  },
  methods: {
    // EAN弹窗
    showEAN() {
      console.log(111)
      this.dialogENATable = true
    },
    // 添加规格
    addSpec() {
      this.specForm.tableData.push({
        date: '',
        name: '',
        address: ''
      })
    },
    // 删除行
    deleteRow(index) {
      this.specForm.tableData.splice(index, 1)
    }
  }
}
</script>

<style lang="scss" scoped>
  .info-top {
    background: #ffffff;
    border-radius: 8px;
    margin-top: 10px;
    .title {
      padding: 20px;
      line-height: 15px;
      font-weight: bold;
      border-bottom: 1px solid rgba(196, 196, 196, 0.76);
      display: flex;
      justify-content: space-between;
    }
    .form-content {
      padding: 15px;
    }
    .content {
      display: inline-block;
      padding: 20px;
      width: 500px;
      margin-right: 200px;
      .conten-item {
        span {
          display: inline-block;
          margin-bottom: 10px;
        }
      }
    }
    .table {
      padding: 20px;
    }
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
    .bottom-sum {
      height: 50px;
      line-height: 30px;
      font-size: 16px;
      font-weight: bold;
      margin-left: 87%;
    }
  }
.bottom-btn {
  width: 100%;
  text-align: center;
  padding: 20px
}
</style>
