import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/views/Login'
import Home from '@/views/Home'
import Welcome from '@/views/Welcome/Welcome.vue'
import Users from '@/views/Users/Users.vue'
import JurisdictionList from '@/views/JurisdictionManage/JurisdictionList.vue'
import RoleList from '@/views/JurisdictionManage/RoleList.vue'
import Category from '@/views/GoodsList/Category.vue'
import Goods from '@/views/GoodsList/Goods.vue'
import Toadd from '@/views/GoodsList/Toadd.vue'
import Params from '@/views/GoodsList/Params.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      name: 'Login',
      path: '/Login',
      component: Login
    },
    {
      path: '/',
      name: 'home',
      component: Home,
      redirect: {name: 'Welcome'},
      children: [
        {
          name: 'Welcome',
          path: 'Welcome',
          component: Welcome
        },
        {
          name: 'Users',
          path: 'users', // 用户管理 > 用户列表
          component: Users
        },
        {
          name: 'JurisdictionList',
          path: 'rights', // 权限管理 > 权限列表
          component: JurisdictionList
        },
        {
          name: 'RoleList',
          path: 'roles', // 权限管理 > 角色列表
          component: RoleList
        },
        {
          name: 'Category',
          path: 'categories', // 商品管理 > 商品分类
          component: Category
        },
        {
          name: 'Goods',
          path: 'goods', // 商品管理 > 商品列表
          component: Goods
        },
        {
          name: 'Toadd',
          path: 'toadd', // 商品管理 > 添加商品
          component: Toadd
        },
        {
          name: 'Params',
          path: 'params', // 商品管理 > 分类参数
          component: Params
        }
      ]
    }
  ]
})
