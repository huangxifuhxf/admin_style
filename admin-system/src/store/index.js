import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
// 设置要共享的值
const state = {
  username: ''
}

// 设置定义方法的
const mutations = {
  // 在登录成功后调用 传值进去
  setUserName: (state, uname) => {
    // 让数据持久化 保存到 localStorage 中
    localStorage.setItem('usearname', uname)
    state.username = uname
  }
}

// 触发 mutaions 方方法改变值
const actions = {}

const getters = {
  // 这是一个变量  后面是接一个函数
  getLocalName: state => {
    // 获取到这个值返回给 这个变量
    return localStorage.getItem('usearname')
  }
}

export default new Vuex.Store({
  state,
  getters,
  actions,
  mutations
})
