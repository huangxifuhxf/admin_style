<template>
  <div class="home">
   <el-container>
    <!-- 左侧导航栏 -->
    <el-aside width='auto'>
      <el-menu
      default-active="2"
      class="el-menu-admin"
      background-color="#f9f9f9"
      :collapse="isCollapse"
      :router="true"
      :unique-opened='true'
      @open="handleOpen"
      @close="handleClose">
        <div class="logo"></div>

        <el-submenu :index="index.toString()" v-for="(item, index) in LeftMenuList" :key="index">
          <template slot="title">
            <i class="el-icon-location"></i>
            <span>{{item.authName}}</span>
          </template>
          <el-menu-item :index="item1.path" v-for="(item1, index) in item.children" :key="index">
            <i class="el-icon-menu"></i>
            <span slot="title">{{item1.authName}}</span>
          </el-menu-item>
        </el-submenu>

      </el-menu>
    </el-aside>

    <!-- 右边部分 -->
    <el-container>
      <!-- 头部 -->
      <el-header>
        <el-button type="primary" class="toggle-btn" @click="toggleCollapse()" icon="el-icon-menu"></el-button>
        <div class="system-title">电商后台管理系统</div>
        <div>
          <span class="welcome">
            <!-- 您好，{{$store.getters.getLocalName}} -->
            您好，{{idItem}}
          </span>
          <el-button type="warning" round @click="loginOut()">退出</el-button>
        </div>
      </el-header>
      <!-- 主体 -->
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
  </div>
</template>

<script>
import {getLeftMenu} from '@/api'
export default {
  data () {
    return {
      // 这是改变全屏 侧边栏打开和伸缩
      isCollapse: false,
      LeftMenuList: [], // 左侧菜单权限列表
      idItem: localStorage.getItem('usearname')
    }
  },
  created () {
    getLeftMenu().then(result => {
      this.LeftMenuList = result.data
    })
  },
  methods: {
    handleOpen (key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose (key, keyPath) {
      console.log(key, keyPath)
    },
    // 切换左侧的展开显示 伸缩和打开
    toggleCollapse () {
      this.isCollapse = !this.isCollapse
    },
    // 退出登录
    loginOut () {
      // 删除这个属性
      localStorage.removeItem('loginToken')
      // 删除这个 vueX 设置的值
      localStorage.removeItem('usearname')
      // 回到登录页面
      this.$router.push({name: 'Login'})
    }
  }
}
</script>
<style lang="scss" scoped>
.home {
  height: 100%;
  .el-menu-admin:not(.el-menu--collapse) {
    width: 200px;
    min-height: 100%;
  }
  .el-container {
    height: 100%;
  }
  .el-aside {
    background-color: #F9F9F9;
  }
  .el-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #cccccc;
  }
  .logo {
    height:60px;
    background: url("../assets/logo.png");
    background-size: cover;
    background-color: white;
  }
  .toggle-btn {
    padding: 10px;
    font-size: 20px;
  }
  .system-title {
    font-size: 28px;
    color: black;
    font-weight: bold;
  }
  .welcome, {
    color: red;
  }
}
</style>
