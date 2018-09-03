<template>
  <div class="login-wrap">
    <div class="ms-title">管理员登陆</div>
    <div class="ms-login">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="0px" class="demo-ruleForm">
        <el-form-item prop="username">
          <el-input v-model="ruleForm.username" placeholder="username" lazy></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input type="password" placeholder="password" v-model="ruleForm.password" @keyup.enter.native="submitForm" lazy></el-input>
        </el-form-item>
        <div class="login-btn">
          <el-button type="primary" @click.native.prevent="submitForm" :loading="loading">登录</el-button>
        </div>
      </el-form>
    </div>
  </div>
</template>
<script type="text/javascript">
  import API from '../api/user';
  export default{
    data() {
      return{
        loading: false,
        ruleForm: {
          username: '',
          password: ''
        },
        rules: {
          username: [
            { required: true, message: '请输入用户名', trigger: 'blur' }
          ],
          password: [
            { required: true, message: '请输入密码', trigger: 'blur' }
          ]
        },
        checked: true
      }
    },
    methods: {
      submitForm: function(){
        var self = this;
        self.loading = true;
        let loginParams = {username: this.ruleForm.username};
        API.login(loginParams).then(function (data) {
          self.loading = false;
          if(data&&data[0].userpsw==self.ruleForm.password){
            localStorage.setItem('access-user', JSON.stringify(data));
            self.$router.push({path: '/home'});
          }else{
            self.$message.error({showClose: true, message: '登录名密码错误' || '登录失败', duration: 2000});
          }
        }).catch(function (error) {
          self.loading = false;
          self.$message.error({showClose: true, message: '请求出现异常', duration: 2000});
        });
      }
    }
  }
</script>
<style scoped>
  .login-wrap{
    position: relative;
    width:100%;
    height:100%;
  }
  .ms-title{
    position: absolute;
    top:50%;
    width:100%;
    margin-top: -230px;
    text-align: center;
    font-size:30px;
    color: #fff;

  }
  .ms-login{
    position: absolute;
    left:50%;
    top:50%;
    width:300px;
    height:160px;
    margin:-150px 0 0 -190px;
    padding:40px;
    border-radius: 5px;
    background: #fff;
  }
  .login-btn{
    text-align: center;
  }
  .login-btn button{
    width:100%;
  }
</style>
