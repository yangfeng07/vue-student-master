<template>
  <el-row>
    <el-col :span="24" class="warp-breadcrum">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item><i class="el-icon-menu"></i><span style="margin-left: 5px">设置</span></el-breadcrumb-item>
        <el-breadcrumb-item>密码修改</el-breadcrumb-item>
      </el-breadcrumb>
    </el-col>

    <el-col :span="24">
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item prop="userpsw" label="原密码">
          <el-input v-model="form.userpsw"></el-input>
        </el-form-item>
        <el-form-item prop="newpsw" label="新密码">
          <el-input v-model="form.newpsw"></el-input>
        </el-form-item>
        <el-form-item prop="checknewpsw" label="确认密码">
          <el-input v-model="form.checknewpsw"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="pswchange">修改并保存</el-button>
        </el-form-item>
      </el-form>
    </el-col>
  </el-row>
</template>

<script>
    import API from '../../api/user';
    export default {
      name: "userlist",
      data() {
        var validatePass = (rule, value, callback) => {
          if (value === '') {
            callback(new Error('请输入新密码'));
          } else {
            if (this.form.checknewpsw !== '') {
              this.$refs.form.validateField('checknewpsw');
            }
            callback();
          }
        };
        var validatePass2 = (rule, value, callback) => {
          if (value === '') {
            callback(new Error('请再次输入密码'));
          } else if (value !== this.form.newpsw) {
            callback(new Error('两次输入密码不一致!'));
          } else {
            callback();
          }
        };
        var pswblur = (rule, value, callback) => {
          if (value === '') {
            callback(new Error('请输入原密码'));
          } else if (value !== JSON.parse(localStorage.getItem('access-user'))[0].userpsw) {
            callback(new Error('原密码错误!'));
          } else {
            callback();
          }
        };
        return {
          form: {
            userpsw: '',
            newpsw: '',
            checknewpsw: ''
          },
          rules: {
            userpsw: [
              { validator: pswblur, trigger: 'blur'}
            ],
            newpsw: [
              { validator: validatePass, trigger: 'blur' }
            ],
            checknewpsw: [
              { validator: validatePass2, trigger: 'blur' }
            ],
          }
        }
      },
      methods: {
        pswchange() {
          var that = this;
          var params = {
            userpsw: that.form.newpsw,
            id: JSON.parse(localStorage.getItem('access-user'))[0].id
          }
          API.pswchange(params).then(data=>{
            if(data){
              this.$alert('修改成功，请重新登陆', '提示', {
                confirmButtonText: '确定',
                callback: () => {
                  localStorage.removeItem('access-user');
                  that.$router.go('/login'); //用go刷新
                }
              });
            }else{
              that.$message.error({showClose: true, message: '修改失败', duration: 2000});
            }
          }).catch((error)=>{
            that.$message.error({showClose: true, message: '请求出现异常', duration: 2000});
          })
        }
      }
    }
</script>

<style scoped>

</style>
