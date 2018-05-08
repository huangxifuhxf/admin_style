<template>
<div class="params">
  <!-- 导航地址（面包屑） -->
  <el-breadcrumb separator="/">
    <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
    <el-breadcrumb-item><a href="javascript:;">商品管理</a></el-breadcrumb-item>
    <el-breadcrumb-item>分类参数</el-breadcrumb-item>
  </el-breadcrumb>

  <svg class="icon ico_size" aria-hidden="true">
    <use xlink:href="#icon-jiangsuyinhang"></use>
  </svg>
  <svg class="icon ico_size" aria-hidden="true">
    <use xlink:href="#icon-pufayinhang"></use>
  </svg>
  <svg class="icon ico_size" aria-hidden="true">
    <use xlink:href="#icon-zhongguoyouzheng"></use>
  </svg>
  <svg class="icon ico_size" aria-hidden="true">
    <use xlink:href="#icon-zhongguojiansheyinhang"></use>
  </svg>
</div>
</template>
<style lang="scss" scoped>
.ico_size {
  font-size: 30px;
  border: 1px solid #000;
}
</style>
