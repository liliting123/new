<template>
  <div class="search">
    <div class="left">
      <slot name="left"></slot>
    </div>
    <div class="right">
      <slot name="right"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'searchList'
}
</script>

<style lang="scss" scoped>
.search {
  width: 100%;
  /*height: 100px;*/
  background: white;
  line-height: 100px;
  margin-bottom: 15px;
  display: flex;
  justify-content: space-between;
  padding: 0 15px 0 15px;
}
</style>
