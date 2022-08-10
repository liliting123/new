<template>
  <div class="nav">
    <div class="toggle" style="width: 200px;">
      <h1>{{ $t('收银后台') }}</h1>
    </div>
    <div class="brand">
      <span style="padding: 10px;">Admin</span>
      <router-link to="" @click.native="onLoyout()">
        <i class="el-icon-switch-button"></i>
      </router-link>
    </div>
    <span @click="$store.state.sider_show_flag = !$store.state.sider_show_flag">
      <i class="el-icon-s-fold"></i>
    </span>
    <el-select
      v-model="shopValue"
      :placeholder="$t('请选择')"
      @change="selectShop()"
      class="shopSelect"
    >
      <el-option
        v-for="item in shopList"
        :key="item.id"
        :label="item.name"
        :value="item.id"
      >
      </el-option>
    </el-select>
    <el-popover placement="bottom" width="500" trigger="click">
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
            <el-button @click="onDownload(scope.row.file_url, scope.row.status)">
              {{ $t('Download') }}
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-button slot="reference" plain @click="getDownloads()">
        {{ $t('下载管理') }}
      </el-button>
    </el-popover>
  </div>
</template>
<script>
// import Project from '../api/project'
export default {
  data() {
    return {
      shopList: [],
      downloads: [],
      shopValue: +localStorage.getItem('shopId')
    }
  },
  mounted() {
    this.getShop()
  },
  methods: {
    selectShop() {
      localStorage.setItem('shopId', this.shopValue)
      location.reload()
    },
    getShop() {
      this.$http
        .get('api/shop/shop', {
          params: {
            keyword: localStorage.getItem('EMAIL'),
            password: localStorage.getItem('PASSWORD')
          }
        })
        .then(res => {
          if (res.ret) {
            this.shopList = res.data.data
            if (!this.shopValue) {
              this.shopValue = res.data.data[0].id
            }
          }
        })
    },
    // 注销
    onLoyout() {
      this.$confirm(this.$t('您确定要退出登录吗'), this.$t('提示'), {
        confirmButtonText: this.$t('确定'),
        cancelButtonText: this.$t('取消'),
        type: 'warning'
      }).then(() => {
        this.$notify({
          type: 'success',
          message: this.$t('success')
        })
        this.$store.commit('token/removeToken')
        this.$store.commit('switchPermissionMapFilterStatus', { status: false }) // 重新筛选路由
        this.$router.push('/login')
      })
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

  .toggle {
    font-size: 16px;
    height: 80px;
    padding-top: 12px;
    width: 172px;
    color: #fff;
    text-align: center;
    // background-color: #1c2c3c;
    background-color: #43495f;
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
