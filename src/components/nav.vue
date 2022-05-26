<template>
  <div class="nav">
    <div
      class="toggle"
      style="
    width: 200px;"
    >
      <h1>收银后台</h1>
    </div>
    <div class="brand">
      <el-popover placement="bottom" width="500" trigger="click" class="download-box">
        <el-table :data="downloads" border stripe>
          <el-table-column prop="name" :label="$t('Name')"></el-table-column>
          <el-table-column prop="updated_at" :label="$t('time')"></el-table-column>
          <el-table-column :label="$t('state')" width="90">
            <template slot-scope="scope">
              {{ scope.row.status ? $t('complete') : $t('inComplete') }}
            </template>
          </el-table-column>
          <el-table-column :label="$t('operate')">
            <template slot-scope="scope">
              <el-button @click="onDownload(scope.row.file_url, scope.row.status)">{{
                $t('Download')
              }}</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-popover>
      <span style="padding: 10px;">Admin</span>
      <router-link to="#" @click.native="onLoyout()">
        <i class="el-icon-switch-button"></i>
      </router-link>
    </div>

    <span><i class="el-icon-s-fold"></i></span>
    <el-select v-model="value" placeholder="请选择" class="shopSelect">
      <el-option
        v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      >
      </el-option>
    </el-select>
    <el-button slot="reference" size="medium" plain @click="getDownloads()">
      下载管理
    </el-button>
  </div>
</template>
<script>
// import Project from '../api/project'
export default {
  data() {
    return {
      options: [
        {
          value: '1',
          label: '欧亚超市一号店'
        },
        {
          value: '2',
          label: '欧亚超市二号店'
        }
      ],
      value: '1',
      downloads: []
    }
  },
  methods: {
    // 注销
    onLoyout() {
      this.$emit('forLoyout')
    },
    // 获取下载列表
    getDownloads(flag) {
      if (flag) {
        this.page++
      }
      // Project.getDownloads({ size: 5 }).then(res => {
      //   if (res.ret) {
      //     if (flag) {
      //       this.downloads = this.downloads.concat(res.data.data)
      //     } else {
      //       this.downloads = res.data.data
      //     }
      //   }
      // })
    },
    // 下载
    onDownload(url, status) {
      if (status) {
        window.location.href = url
      } else {
        this.$message.error(this.$t('statusUncomplete'))
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.nav {
  background-color: #fff;
  width: 100%;
  height: 76px;
  & > div {
    display: inline-block;
  }
  .download-box {
    margin-right: 20px;
    position: relative;
    bottom: 10px;
  }
  .toggle {
    font-size: 16px;
    height: 76px;
    padding-top: 12px;
    width: 172px;
    color: #fff;
    text-align: center;
    background-color: #1c2c3c;
    h1 {
      padding-top: 10px;
      font-size: 27px;
    }
    p {
      padding-top: 5px;
    }
  }
  .brand {
    float: right;
    padding-top: 18px;
    font-size: 21px;
    padding-right: 30px;
    margin-top: 13px;
    div {
      padding-top: 10px;
      float: right;
    }
    a {
      padding-right: 40px;
      display: inline-block;
      text-align: center;
      color: #879db2;
      span {
        display: block;
        margin-top: 1px;
        font-size: 14px;
      }
      &:not(.router-link-active):hover {
        animation: shake 0.2s ease-out;
      }
      @keyframes shake {
        0% {
          color: #1a79eb;
          transform: rotate(-8deg);
        }
        33% {
          transform: rotate(8deg);
        }
        66% {
          transform: rotate(-8deg);
        }
        100% {
          color: #879db2;
          transform: rotate(0deg);
        }
      }
    }
    .router-link-active {
      color: #1a79eb;
    }
  }
  span {
    padding: 25px;
    font-size: 25px;
  }
  .shopSelect {
    width: 150px;
    margin-right: 15px;
  }
}
</style>
