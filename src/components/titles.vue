<template>
  <div style="height:71px">
    <div class="my-title">
      <div class="title_main">
        <!-- <el-tag closable type="">
          {{ $t($route.name) }}
        </el-tag> -->
        <el-tabs
          closable
          v-model="active"
          type="editable-card"
          @contextmenu.prevent.native="openContextMenu($event)"
          @tab-remove="removeTab"
          @tab-click="tabClick"
        >
          <el-tab-pane
            class="isActive"
            v-for="item in tabList"
            :key="item.name"
            :label="$t(item.name)"
            :name="item.path"
          >
          </el-tab-pane>
        </el-tabs>
        <!-- <div class="back" @click="$router.go(-1)">
          <div class="icon-box">
            <i class="iconfont icon-fanhui"></i>
          </div>
          <span>{{ $t('back') }}</span>
        </div> -->
        <!-- 右键菜单 -->
        <ul
          v-show="contextMenu.isShow"
          :style="{ left: contextMenu.menuLeft + 'px', top: '45px' }"
          class="el-dropdown-menu el-popper"
          x-placement="bottom-end"
        >
          <li class="el-dropdown-menu__item" @click="closeRightTag">关闭右侧</li>
          <li class="el-dropdown-menu__item" @click="closeLeftTag">关闭左侧</li>
          <li class="el-dropdown-menu__item" @click="closeOtherTag">关闭其它</li>
          <li
            v-if="this.active == this.contextMenu.name"
            class="el-dropdown-menu__item"
            @click="refresh"
          >
            刷新页面
          </li>
          <div x-arrow="" class="popper__arrow" style="left: 44px"></div>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      format_router_map: {}, // 格式化后的侧边栏路由表
      active: '/',
      tabList: [],
      // 右键的元素
      contextMenu: {
        name: '',
        menuLeft: 0,
        isShow: false,
        label: ''
      }
    }
  },
  watch: {
    $route() {
      this.getThisPage()
    }
  },
  mounted() {
    var that = this
    document.addEventListener('click', function(e) {
      that.contextMenu.isShow = false
    })
  },
  created() {
    // 监听页面刷新
    window.addEventListener('beforeunload', e => {
      localStorage.setItem(
        'tagInfo2',
        JSON.stringify({
          active: this.active,
          tabList: this.tabList
        })
      )
    })
    let tagInfo2 = localStorage.getItem('tagInfo2')
      ? JSON.parse(localStorage.getItem('tagInfo2'))
      : { active: '/', tabList: [{ name: this.$t('首页'), path: '/' }] }
    this.active = tagInfo2.active
    this.tabList = tagInfo2.tabList
  },

  methods: {
    // showOfHiddenSider() {
    //   this.$nextTick(() => {
    //     if (this.$store.state.sider_show_flag) {
    //       this.$store.commit('switchSiderFlag', { res: false })
    //     } else {
    //       this.$store.commit('switchSiderFlag', { res: true })
    //     }
    //   })
    // },
    showTips() {
      this.$nextTick(() => {
        let tips = document.querySelector('#tips')
        tips.style.display = 'inline-block'
      })
    },
    hidderTips() {
      this.$nextTick(() => {
        let tips = document.querySelector('#tips')
        tips.style.display = 'none'
      })
    },
    // 移除
    removeTab(targetPath) {
      let tabs = this.tabList
      if (tabs.length <= 1) {
        this.$message.warning(this.$t('这是最后一页, 不能在关闭了'))
      } else {
        let activePath = this.active
        if (activePath === targetPath) {
          tabs.forEach((tab, index) => {
            if (tab.path === targetPath) {
              let nextTab = tabs[index + 1] || tabs[index - 1]
              if (nextTab) {
                activePath = nextTab.path
              }
            }
          })
        }
        this.active = activePath
        if (!this.$route.path.includes(activePath)) {
          this.$router.push(activePath)
        }

        this.tabList = tabs.filter(tab => tab.path !== targetPath)
      }
    },
    // 右键
    openContextMenu(e) {
      if (e.srcElement.id) {
        this.contextMenu.name = e.srcElement.id.substr(4)
        this.contextMenu.menuLeft = e.clientX - 235
        this.contextMenu.isShow = true
        this.contextMenu.label = e.srcElement.innerText
      }
    },
    // 点击
    tabClick(tab) {
      if (!this.$route.path.includes(tab.name)) {
        this.$router.push(tab.name)
        this.active = tab.name
      }
    },
    // 判断当前页
    getThisPage() {
      let index = this.tabList.findIndex(tag => tag.path === this.$route.path)
      if (index === -1) {
        this.tabList.push({
          name: this.$t(this.$route.name),
          path: this.$route.path
        })
      }
      // 当前选择页
      this.active = this.$route.path
    },
    // 刷新
    refresh() {
      this.$router.go(0)
    },
    // 关闭右侧
    closeRightTag() {
      let index = this.tabList.findIndex(tag => tag.path === this.contextMenu.name)
      this.tabList.splice(index + 1, this.tabList.length - index)
      this.active = this.contextMenu.name
      if (!this.$route.path.includes(this.contextMenu.name)) {
        this.$router.push(this.contextMenu.name)
      }
    },
    // 关闭左侧
    closeLeftTag() {
      let index = this.tabList.findIndex(tag => tag.path === this.contextMenu.name)
      this.tabList.splice(0, index)
      this.active = this.contextMenu.name
      if (!this.$route.path.includes(this.contextMenu.name)) {
        this.$router.push(this.contextMenu.name)
      }
    },
    // 关闭其它
    closeOtherTag() {
      this.tabList = [
        {
          name: this.contextMenu.label,
          path: this.contextMenu.name
        }
      ]
      this.active = this.contextMenu.name
      if (!this.$route.path.includes(this.contextMenu.name)) {
        this.$router.push(this.contextMenu.name)
      }
    }
  }
}
</script>
<style lang="scss" scoped>
@import '../style/communalVariate.scss';
.my-title {
  width: 100%;
  background: $white;
  border-bottom: 1px $hr solid;
  position: relative;
  z-index: 999;
  .title_main {
    padding: 18px 0;
    padding-left: 25px;
    border-top: 1px solid #ccc;
    border-bottom: 1px solid #ccc;
    h3 {
      font-size: 16px;
      font-weight: normal;
      line-height: 2em;
      color: $font-color;
    }
    .back {
      position: absolute;
      right: 3%;
      top: 50%;
      user-select: none;
      transform: translateY(-50%);
      cursor: pointer;
      &:hover {
        .icon-box {
          transform: translateX(0);
          .iconfont {
            color: $light-blue;
          }
        }
        span {
          color: $light-blue;
          opacity: 1;
          transform: translate(10%, -80%);
        }
      }
      .icon-box {
        transform: translateX(110%);
        transition: all 0.2s ease-in-out;
        position: relative;
        z-index: 2;
        display: inline-block;
        border-radius: 50%;
        border: 1px $hr solid;
        text-align: center;
        width: 30px;
        height: 30px;
        line-height: 30px;
        overflow: hidden;
        background: $white;
        box-shadow: $hr 1px 1px 1px;
        .iconfont {
          transition: all 0.2s ease-in-out;
          display: inline-block;
          font-size: 15px;
          color: $font-color;
        }
      }
      span {
        transition: all 0.2s ease-in-out;
        display: inline-block;
        transform: translate(100%, -80%);
        color: $font-color;
        opacity: 0;
      }
    }
  }
}

.tabList-view-container {
  // height: 40px;
  width: 100%;
  background: #f0f2f5;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 8px;
}
.tabs_content {
  width: 100%;
  padding: 0 8px;
  box-sizing: border-box;
}
/deep/ .el-tabs__header {
  margin: 0px;
}
/deep/ .el-tabs--card > .el-tabs__header {
  border: 0px !important;
}
/deep/ .el-tabs__nav {
  border: 0px !important;
}
/deep/ .el-tabs__nav-wrap::after {
  height: 0px;
}
/deep/ .el-tabs__item {
  margin-right: 10px;
  border-radius: 4px;
  height: 32px;
  line-height: 33px;
  background: #f7f7f8;
  border: 1px solid #e6e6e9;
  padding: 0 10px !important;
}
/deep/ .el-tabs__item.is-active {
  background-color: #ecf5ff;
  border: 1px solid #d9ecff;
  outline-color: #fff;
}
/deep/ .el-tabs__item .el-icon-close {
  margin-left: 16px;
}
/deep/ .el-tabs__nav-next,
/deep/ .el-tabs__nav-prev {
  line-height: 46px;
  width: 30px;
  text-align: center;
}
/deep/ .el-tabs__nav-wrap.is-scrollable {
  padding: 0 30px;
}
</style>
