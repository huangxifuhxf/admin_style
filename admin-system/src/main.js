// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from '@/store'
import ElementUI from 'element-ui'
import VueQuillEditor from 'vue-quill-editor' // 富文本编辑器
import 'element-ui/lib/theme-chalk/index.css'
import '@/styles/index.scss'

// 富文本样式
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

// 时间过滤器
import moment from 'moment/moment'
// 添加时间过滤器
Vue.filter('moment', function (value, formatString) {
  formatString = formatString || 'YYYY-MM-DD HH:mm:ss'
  // return moment(value).format(formatString); // value可以是普通日期 20170723
  return moment.unix(value).format(formatString) // 这是时间戳转时间
})

// 路由拦截在 导航守卫
router.beforeEach((to, from, next) => {
  // 拿到 本地的值 token  如有没有没有登录 就没有这个值 就是 undefined 为false
  let token = localStorage.getItem('loginToken')
  if (token) {
    next()
  } else {
    if (to.path !== '/Login') {
      // 如果没有登录但你访问其他需要登录的页面，那我就让你跳到登录页面去
      next({path: '/Login'})
    } else {
      // 如果没有登录，但你访问的login，那就不干涉你，让你访问
      next()
    }
  }
})

Vue.config.productionTip = false
Vue.use(VueQuillEditor)
Vue.use(ElementUI)
/* eslint-disable no-new */
new Vue({
  // 这个是在index.html 里面的#app
  el: '#app',
  router,
  store,
  components: {
    App
  },
  // 渲染到el：#app 里面了
  template: '<App/>'
})

// 这个会经过 webpack 文件处理
