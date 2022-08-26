<template>
  <div>
    <ul class="slide" v-for="item in structure" :key="item.name">
      <li class="slide-title" v-bind:class="{ expanded: item.expanded }">
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
              ><router-link :to="{ name: subItem.name }">{{
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
import store from '@/store'
export default {
  props: ['structure'],
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
  },
  mounted() {
    let permission = store.state.permission.permission
    // permission.push('web')
    console.log(this.structure)
    console.log(permission)
    // this.routers(this.structure, permission)
  },
  methods: {
    toggle(name) {
      this.structure.forEach(function(item, index) {
        if (item.name === name) {
          item.expanded = !item.expanded
        } else {
          item.expanded = false
        }
      })
    },

    routers(router, roles) {
      for (var i = 0; i < router.length; i++) {
        if (router[i].subRoutes.length > 0) {
          for (var j = 0; j < router[i].subRoutes.length; j++) {
            if (
              router[i].subRoutes[j].subname &&
              roles.indexOf(router[i].subRoutes[j].subname) === -1
            ) {
              console.log(router[i].subRoutes[j].subname)

              router[i].subRoutes.splice(j, 1)
              j--
              if (router[i].subRoutes.length === 0) {
                router.splice(i, 1)
              }
            }
          }
        }
      }
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
  background: #1c2c3c;
  display: block;
  padding-left: 12px;
  line-height: 50px;
  font-size: 16px;
}
.titleColor {
  background-color: #1c2c3c;
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
  background: #1c2c3c;
  border-left: #1c2c3c 5px solid;
  font-weight: bold;
  &:not(.router-link-active):hover {
    background: #409eff;
    border-left: #409eff 5px solid;
    color: #fff;
  }
}
.slide-nav-title-sub-item a.router-link-active {
  background: #409eff;
  border-left: #409eff 5px solid;
  color: #fff;
  cursor: default;
}
.slide-nav-title:hover {
  background: #434a50;
}
</style>
