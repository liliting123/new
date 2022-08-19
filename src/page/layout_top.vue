<template>
  <div class="nav">
    <div class="toggles">
      <h1>MyEUShop</h1>
      <p>{{ $t('shopmanage') }}</p>
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
        <el-button slot="reference" size="medium" plain @click="getDownloads()">{{
          $t('downloads')
        }}</el-button>
      </el-popover>
      <router-link :to="{ name: 'message' }">
        <i class="iconfont_20 icon-line-ling-sm"></i>
        <span>{{ $t('message') }}</span>
      </router-link>
      <router-link to="#" @click.native="onLoyout()">
        <i class="iconfont_20 icon-zhuxiao"></i>
        <span>{{ $t('lagout') }}</span>
      </router-link>
    </div>
  </div>
</template>
<script>
// import Project from '../api/project'
export default {
  data() {
    return {
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
  background-color: #27283a;
  width: 100%;

  // & > div {
  //   display: inline-block;
  // }
  .download-box {
    margin-right: 20px;
    position: relative;
    bottom: 10px;
  }
  .toggles {
    font-size: 16px;
    width: 172px;
    color: #fff;
    text-align: center;
    line-height: 80px;
    p {
      padding-top: 5px;
    }
  }
  .brand {
    float: right;
    padding-top: 18px;
    font-size: 16px;
    padding-right: 30px;
    div {
      // padding-top: 10px;
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
}
</style>
