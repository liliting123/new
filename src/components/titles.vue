<template>
  <div style="height:71px">
    <div class="my-title">
      <div class="title_main">
        <h3>{{ $t($route.name) }}</h3>
        <div class="back" @click="$router.go(-1)">
          <div class="icon-box">
            <i class="iconfont icon-fanhui"></i>
          </div>
          <span>{{ $t('back') }}</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      format_router_map: {} // 格式化后的侧边栏路由表
    }
  },
  methods: {
    showOfHiddenSider() {
      this.$nextTick(() => {
        // if (this.$store.state.sider_show_flag) {
        //   this.$store.commit('switchSiderFlag', { res: false })
        // } else {
        //   this.$store.commit('switchSiderFlag', { res: true })
        // }
      })
    },
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
  position: fixed;
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
</style>
