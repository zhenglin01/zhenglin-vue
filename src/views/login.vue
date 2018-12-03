<template>
  <el-form ref='AccountFrom' :model='account' :rules='rules' class='FormStyle' >
    <h2 class="title">用户登录</h2>
    <el-form-item prop="username">
      <el-input type="text" v-model="account.username" class="inputStyle" auto-complete="off" placeholder="请输入账号"></el-input>
    </el-form-item>
    <el-form-item prop="password">
      <el-input type="password" v-model="account.password" class="inputStyle" auto-complete="off" placeholder="请输入密码"></el-input>
    </el-form-item>
    <el-form-item style="width:100%;">
      <el-button type="primary" class="buttonStyle" @click.native.prevent='Login' :loading='logining'>登录
      </el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import UserApi from '@/api/user'
export default {
  name: 'login',
  data () {
    return {
      logining: false,
      account: {
        username: '',
        password: ''
      },
      rules: {
        username: [{
          required: true,
          message: '请输入账号',
          trigger: 'blur'
        }],
        password: [{
          required: true,
          message: '请输入密码',
          trigger: 'blur'
        }]
      },
      checked: true
    }
  },

  methods: {
    Login () {
      this.$refs.AccountFrom.validate((valid) => {
        if (valid) {
          // 验证通过 可以提交
          this.logining = true
          // 将提交的数据进行封装
          var loginParams = {username: this.account.username, password: this.account.password}
          // 调用函数  传递参数 获取结果
          console.log(loginParams)
          UserApi.login(loginParams).then(resp => {
            console.log(resp.data.state)
            this.logining = false
            if (resp.data.state === 1) {
              // 登录成功
              sessionStorage.setItem('EMPNAME', resp.data.data)
              // 用vue路由跳转到后台主界面
              this.$message({
                message: '登录成功！',
                type: 'success'
              })
              this.$router.push({path: '/manager'})
            } else {
              this.$message({
                message: resp.data.message,
                type: 'error'
              })
            }
          })
        } else {
          console.log('error submit')
          return false
        }
      })
    }
  }
}
</script>

<style scoped>
  .inputStyle{
    width: 300px
  }
  .buttonStyle{
    width:70px;
  }
  .FormStyle{
    text-align: center
  }
</style>
