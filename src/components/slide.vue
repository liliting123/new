<template>
  <div>
    <ul class="slide" v-for="item in structure" :key="item.name">
      <li v-bind:class="{ expanded: item.expanded }">
        <a
          href="JavaScript:"
          class="slide-nav-title"
          v-bind:class="{ titleColor: item.expanded }"
          @click="toggle(item.name)"
        >
          <span v-if="!item.expanded" class="slide-nav-icon"
            ><i v-bind:class="item.iconClassNameTop"></i
          ></span>
          <span v-if="item.expanded" class="slide-nav-icon white"
            ><i v-bind:class="item.iconClassNameBottom"></i
          ></span>
          <span><i v-bind:class="['iconClass', item.iconClassName]"></i></span>
          <span style="padding-left:5px;">{{ $t(item.name) }}</span>
        </a>
        <transition-group name="fade" tag="ul">
          <ul
            class="slide-nav-title-sub"
            v-for="subItem in item.subRoutes"
            :key="subItem.subname"
          >
            <a class="slide-nav-title-sub-item" href="#"
              ><router-link :to="{ name: subItem.subname }">{{
                $t(subItem.name)
              }}</router-link></a
            >
          </ul>
        </transition-group>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  props: ['structure'],
  methods: {
    toggle(name) {
      this.structure.forEach(function(item, index) {
        if (item.name === name) {
          item.expanded = !item.expanded
        } else {
          item.expanded = false
        }
      })
    }
  },
  watch: {
    $route: {
      handler(newValue) {
        this.structure.forEach(function(items, indexs) {
          if (items.subRoutes.length) {
            items.subRoutes.forEach(function(item, index) {
              if (
                item.path.split('/')[1].toString() ===
                newValue.matched[1].path.split('/')[1].toString()
              ) {
                setTimeout(function() {
                  items.expanded = true
                }, 0)
              } else {
                items.expanded = false
              }
            })
          }
        })
      },
      immediate: true
    }
  }
}
</script>
<style lang="scss" scoped>
a {
  color: #879db2;
}
.slide-nav-title {
  position: relative;
  background: #304156;
  display: block;
  padding-left: 12px;
  line-height: 50px;
  font-size: 16px;
}
.titleColor {
  background-color: #304156;
  // color:#fff;
}
.iconClass {
  padding-right: 8px;
  padding-left: 10px;
}
.slide-nav-icon {
  position: absolute;
  top: 3px;
  right: 10px;
  margin-right: 9px;
  font-size: 15px;
}
.slide-nav-title-sub {
  height: 0;
  opacity: 0;
  // transition: all 1s ease;
}
.expanded .slide-nav-title-sub {
  height: 50px;
  opacity: 1;
  // transition: all 0.5s ease;
}
.slide-nav-title-sub-item a {
  display: block;
  font-size: 14px;
  line-height: 50px;
  color: #879db2;
  padding-left: 55px;
  background: #202231;
  border-left: #202231 5px solid;
  font-weight: bold;
  &:not(.router-link-active):hover {
    background: #232638;
    border-left: #98c1ff 5px solid;
    color: #98c1ff;
  }
}
.slide-nav-title-sub-item a.router-link-active {
  background: #232638;
  border-left: #98c1ff 5px solid;
  color: #98c1ff;
  cursor: default;
}
</style>
