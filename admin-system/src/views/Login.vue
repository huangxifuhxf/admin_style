<template>
  <div class="login">
    <el-form ref="DOMlogin" :model="login" class="container" :rules="loginRules">
      <el-form-item>
        <div class="avatar">
          <img src="../assets/老实人.jpg" alt="" class="loginImg">
        </div>
      </el-form-item>
      <el-form-item prop="name">
        <el-input v-model="login.name"  placeholder="输入用户名" prefix-icon="myicon myicon-user"></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input v-model="login.password" @keyup.enter.native="clickLogin('DOMlogin')" placeholder="输入密码" type="password" prefix-icon="myicon myicon-key"></el-input>
      </el-form-item>
      <el-form-item>
        <!-- 点击触发登录事件 -->
        <el-button type="primary" class="login-btn" @click="clickLogin('DOMlogin')">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
// 引入登录请求接口
import {eheckLogin} from '@/api'
export default {
  data () {
    return {
      login: {
        name: 'admin',
        password: '123456'
      },
      loginRules: {
        name: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
        password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
      }
    }
  },
  methods: {
    clickLogin (formName) {
      this.$refs['DOMlogin'].validate((valid) => {
        if (valid) {
          // 调用登入验证的请求
          eheckLogin({username: this.login.name, password: this.login.password}).then(result => {
            if (result.meta.status === 200) {
              console.log(result)
              // 在登录成功的时候带上 token
              // 设置 localStorage 值
              localStorage.setItem('loginToken', result.data.token)
              this.$router.push({name: 'home'})
              // 调用vuex 全局 设置 vuex 的全局变量 把用户名
              this.$store.commit('setUserName', result.data.username)
            } else {
              this.$message.error(result.meta.msg)
            }
          })
        } else {
          console.log('没有进登入请求')
          return false
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.login {
  position: fixed;
  width: 100%;
  height: 100%;
  background-color: #2f4050;
  .container {
    position: absolute;
    left: 0;
    right: 0;
    width: 400px;
    padding: 0px 40px 15px 40px;
    margin: 200px auto;
    background: white;
    .avatar {
      position: relative;
      left: 50%;
      width: 120px;
      height: 120px;
      margin-left: -60px;
      margin-top: -60px;
      box-sizing: border-box;
      border-radius: 50%;
      border: 10px solid #fff;
      box-shadow: 0 1px 5px #ccc;
      overflow: hidden;
    }
    .loginImg{
      width: 100%;
    }
    .login-btn {
      width: 100%;
    }
  }
}
</style>
