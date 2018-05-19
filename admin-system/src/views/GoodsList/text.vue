<template>
  <a :href="url" class="collection">
    <img :src="imgSrc" alt="">
    <div class="name">{{name}}</div>
  </a>
</template>
<script>
export default {
  props: {
    url: {
      type: String,
      default: 'http://www.baidu.com'
    },
    imgSrc: {
      type: String,
      default: 'https://www.baidu.com/img/baidu_jgylogo3.gif'
    },
    name: {
      type: String,
      default: 'itcast'
    }
  }
}
</script>

<style scoped>
.collection {
  display: inline-block;
  margin: 0 18px 18px 0;
  min-height: 32px;
  background-color: #f7f7f7;
  border: 1px solid #dcdcdc;
  border-radius: 4px;
  vertical-align: top;
  overflow: hidden;
}
img {
  width: 32px;
  height: 32px;
  vertical-align: middle;
}
.name {
  display: inline-block;
  padding: 0 11px 0 6px;
  font-size: 14px;
}
</style>
