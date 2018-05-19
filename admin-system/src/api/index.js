import axios from 'axios'
// 定义基准路径 全局变量
const URL = 'http://localhost:8888/api/private/v1/'
// 定义基路径 每次请求必须经过这个路径
axios.defaults.baseURL = URL

// 添加 axios 请求拦截器
axios.interceptors.request.use(
  function (config) {
    // 将token给到一个前后台约定好的key中，作为请求发送
    // 这个是在登录成功后设置了这个值
    let token = localStorage.getItem('loginToken')
    if (token) {
      // 将token给到一个前后台约定好的key中，作为请求发送
      // 设置在请求求里面
      config.headers['Authorization'] = token
    }
    return config
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error)
  }
)

// 请求登录
export const eheckLogin = obj => {
  return axios.post('login', obj).then(function (result) {
    return result.data
  })
}
// ---------------------------------------------------------------------------------------------------
// 用户管理 > 用户数据列表
export const queryUserDataList = (quesyValue, pagenum, pagesize) => {
  return axios
    .get('users', {
      params: {
        query: quesyValue,
        pagenum: pagenum,
        pagesize: pagesize
      }
    })
    .then(function (result) {
      return result.data
    })
    .catch(function (error) {
      return error
    })
}

// 用户管理 > 修改用户状态
export const changeUserState = (uId, type) => {
  return axios.put(`users/${uId}/state/${type}`).then(result => result.data)
}

// 用户管理 > 添加用户
export const addUserData = obj => {
  return axios
    .post('users', {
      username: obj.username,
      password: obj.password,
      email: obj.email,
      mobile: obj.mobile
    })
    .then(result => result.data)
}

// 用户管理 > 删除单个用户
export const deleteUserData = id => {
  return axios.delete(`users/${id}`).then(result => result.data)
}

// 用户管理 >  根据ID查询用户信息（编辑数据填充）
export const idQueryUserData = id => {
  return axios.get(`users/${id}`).then(result => result.data)
}

// 用户管理 >  编辑用户提交
export const editUserDataUp = obj => {
  return axios
    .put(`users/${obj.id}`, {
      id: obj.id,
      email: obj.email,
      mobile: obj.mobile
    })
    .then(result => result.data)
}

// 用户管理 >  分配用户角色
export const allotUserRole = obj => {
  return axios
    .put(`users/${obj.id}/role`, {
      id: obj.id,
      rid: obj.rid
    })
    .then(result => result.data)
}

// ---------------------------------------------------------------------------------------------------
// 权限管理 > 所有权限列表
export const jurisdictionList = type => {
  return axios.get(`rights/${type}`).then(result => result.data)
}

// 权限管理 > 角色列表
export const roleList = () => {
  return axios.get(`roles`).then(result => result.data)
}

// 权限管理 > 左侧菜单权限
export const getLeftMenu = () => {
  return axios.get(`menus`).then(result => result.data)
}

// 角色管理 > 删除角色指定权限
export const deleteRole = (roleId, rightId) => {
  return axios
    .delete(`roles/${roleId}/rights/${rightId}`)
    .then(result => result.data)
}

// 角色管理 > 角色授权
export const submitRole = (roleId, rids) => {
  return axios
    .post(`roles/${roleId}/rights`, {
      rids: rids
    })
    .then(result => result.data)
}

// ---------------------------------------------------------------------------------------------------
// 商品管理 > 商品分类 > 商品数据列表
export const getCategoryList = (pagenum, pagesize) => {
  return axios
    .get(`categories`, {
      params: {
        type: 3,
        pagenum: pagenum,
        pagesize: pagesize
      }
    })
    .then(result => result.data)
}

// 商品管理 > 商品分类 > 添加分类下拉列表选项
export const getCategoryData = () => {
  return axios
    .get(`categories`, {
      params: {
        type: 2
      }
    })
    .then(result => result.data)
}

// 商品管理 > 商品分类 > 添加分类上传
export const addCategoryData = obj => {
  return axios.post(`categories`, obj).then(result => result.data)
}

// 商品管理 > 商品列表 > 表格初始化
export const initListData = obj => {
  return axios
    .get(`goods`, {
      params: obj
    })
    .then(result => result.data)
}
