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
export default {}
</script>

<style lang="scss" scoped>
.search {
  width: 100%;
  /*height: 100px;*/
  background: white;
  margin-bottom: 15px;
  display: flex;
  justify-content: space-between;
  padding: 0 15px 0 15px;
  line-height: 50px;
}
.left {
  padding: 20px 0;
}
.right {
  line-height: 90px;
}
</style>
