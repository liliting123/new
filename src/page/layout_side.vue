<template>
  <div class="layout-side">
    <div class="layout-top">
      <my-top v-on:forLoyout="showLoyout = !showLoyout"></my-top>
    </div>
    <div>
      <slide class="layout-side-left" :structure="navData"></slide>
    </div>

    <div
      :class="{
        'layout-side-right': true,
        'side-show': $store.state.sider_show_flag,
        'side-hidden': !$store.state.sider_show_flag
      }"
      id="layout-sideRight"
    >
      <my-title
        :class="{
          'title-class': true,
          'title-show': $store.state.sider_show_flag,
          'title-hidden': !$store.state.sider_show_flag
        }"
      ></my-title>
      <transition name="fade" mode="out-in">
        <keep-alive :include="/List/">
          <router-view class="layout-main-view"></router-view>
        </keep-alive>
      </transition>
      <m-copy-right></m-copy-right>
    </div>
    <!-- <el-dialog :title="$t('warmprompt')" v-model="showLoyout" size="tiny">
      <span>{{ $t('confirmlogout') }}</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="showLoyout = false">{{ $t('cancel') }}</el-button>
        <el-button type="primary" @click="onComfirm()">{{ $t('confirm') }}</el-button>
        :loading="$store.state.btn_loading"
      </span>
    </el-dialog> -->
  </div>
</template>
<script>
import Slide from '../components/slide.vue'
import MyTop from '../components/nav.vue'
import navData from './navData.js'
import MCopyRight from '../components/copyright.vue'
import MyTitle from '../components/titles.vue'

// import {NLE} from '../../api/constant'
export default {
  components: { Slide, MyTop, MCopyRight, MyTitle },
  data() {
    return {
      navData,
      showLoyout: false
    }
  },
  methods: {
    // 确定 注销
    // onComfirm () {
    //   this.showLoyout = false
    //   localStorage.removeItem(NLE.TOKEN)
    //   this.$router.push({name: 'login'})
    // }
  }
}
</script>
<style lang="scss">
@import '../style/communalVariate.scss';
.layout-side {
  width: 100%;
  height: 100%;
  .layout-top {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 76px;
    z-index: 88;
  }
  .layout-side-left {
    width: 200px;
    background-color: #304156;
    z-index: 10;
    overflow-x: hidden;
    overflow-y: auto;
    position: fixed;
    top: 26px;
    left: 0px;
    bottom: 0px;
    right: 0px;
    padding-top: 50px;
  }
  .layout-side-right {
    padding-top: 76px;
    margin-left: 200px;
    z-index: 88;
    font-size: 14px;
  }
  .layout-main-view {
    min-height: 67vh;
  }
  .dialog {
    border: 15px solid #c4e0d4;
    border-radius: 8px;
    position: absolute;
    height: 280px;
    top: 240px;
    bottom: 20px;
    left: 0;
    right: 0;
    margin: auto;
    .dialog_box {
      position: absolute;
      height: 280px;
      top: 0px;
      bottom: 0;
      left: 0;
      right: 0;
      margin: 0 -1px;
      background-color: white;
      text-align: center;
      .dialog_box_top {
        margin: 0 -1px;
        padding: 10px;
        font-size: 18px;
        color: #d3443b;
        background-color: #c4e0d4;
      }
      .dialog_box_middle {
        margin-top: 60px;
        font-size: 18px;
        color: #ee837a;
      }
      .dialog_box_bt {
        background-color: #d97a5e;
        color: #fff;
        border: none;
        outline: none;
      }
    }
  }
}
</style>
