<template>
  <el-container>
    <el-aside :style='{width:"auto"}'>
      <div class="logo"></div>
      <el-menu router default-active="12" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" :collapse="isCollapse" :unique-opened='uniqueFlag' background-color="#F9F9F9" text-color="#000000" active-text-color="#409EFF">
        <el-submenu :key='item.id' :index='item.id' v-for='item in menuData'>
          <template slot="title">
            <i class="el-icon-location"></i>
            <span slot="title">{{item.authName}}</span>
          </template>
          <el-menu-item :key='tag.id' v-for='tag in item.children' :index="tag.path">
            <i class="el-icon-menu"></i>
            <span>{{tag.authName}}</span>
          </el-menu-item>
        </el-submenu>
      </el-menu>
    </el-aside>
    <el-container>
      <el-header>
        <i @click="toggleFlag" class="myicon myicon-menu btnsize"></i>
        <div class="stitle">电商后台管理系统</div>
        <div>
          <el-button type="warning" round @click.native="handleLogout">退出</el-button>
        </div>
      </el-header>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import { getMenus } from '../api/index.js'
export default {
  data () {
    return {
      isShowPopover: true,
      isCollapse: false,
      uniqueFlag: true,
      menuData: []
    }
  },
  methods: {
    handleOpen (key, keyPath) {
      // console.log(key, keyPath)
    },
    handleClose (key, keyPath) {
      // console.log(key, keyPath)
    },
    handleLogout () {
      // 清除token
      localStorage.removeItem('mytoken')
      // 跳转到登录页面
      this.$router.push({path: 'login'})
    },
    toggleFlag () {
      this.isCollapse = !this.isCollapse
    }
  },
  created () {
    getMenus().then(res => {
      if (res.meta.status === 200) {
        console.log(res)
        this.menuData = res.data
      }
    })
  }
}
</script>

<style scoped>
  .btnsize {
    font-size: 36px;
    padding: 12px 12px;
    margin-left: -20px;
    color: #ffffff;
    cursor: pointer;
  }
  .btnsize:hover {
    background-color: #4292CF;
  }
 .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
  }
  .el-container{
    height: 100%;
  }
  .el-header, .el-footer {
    background-color: #409EFF;
    color: #333;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .el-aside {
    background-color: #F9F9F9;
    color: #000000;
    text-align: left;
    display: block;
  }
  .el-main {
    background-color: #ffffff;
    color: #333;
    text-align: left;
  }
  .logoutbtn {
    right: 10px;
    color: #f79b9b;
  }
  .logo {
    height:60px;
    background: url(../assets/logo.png);
    background-size: cover;
    background-color: #ffffff;
  }
  .stitle {
    font-size: 28px;
    width: 300px;
    color: #fff;
    text-align: center;
  }
  
</style>