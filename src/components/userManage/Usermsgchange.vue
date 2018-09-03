<template>
  <el-row>
    <el-col :span="24" class="warp-breadcrum">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item><i class="el-icon-menu"></i><span style="margin-left: 5px">设置</span></el-breadcrumb-item>
        <el-breadcrumb-item>信息修改</el-breadcrumb-item>
      </el-breadcrumb>
    </el-col>

    <el-col :span="24">
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="账号">
          <el-input v-model="form.username" disabled></el-input>
        </el-form-item>
        <el-form-item prop="nickname" label="姓名">
          <el-input v-model="form.nickname"></el-input>
        </el-form-item>
        <el-form-item prop="email" label="邮箱">
          <el-input v-model="form.email"></el-input>
        </el-form-item>
        <el-form-item prop="class" label="班级">
          <el-input v-model="form.class"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="msgchange">修改并保存</el-button>
        </el-form-item>
      </el-form>
    </el-col>
  </el-row>
</template>

<script>
    import API from '../../api/user';
    import {bus} from '../../bus.js'
    export default {
      name: "usermsgchange",
      data() {
        return {
          loading: false,
          form: {
            username: '',
            nickname: '',
            email: '',
            class: ''
          },
          rules: {
            nickname: [
              {required: true, message: '请输入昵称', trigger: 'blur'}
            ],
            email: [
              {required: true, message: '请输入邮箱', trigger: 'blur'},
              {type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur,change'}
            ],
            class: [
              {required: true, message: '请输入班级', trigger: 'blur'}
            ],
          },
        }
      },
      methods: {
        msgchange() {
          let that = this;
          API.msgchange(that.form).then(data=>{
            if(data){
              let user = JSON.parse(window.localStorage.getItem('access-user'));
              user[0].nickname = that.form.nickname;
              user[0].class = that.form.class;
              user[0].email = that.form.email;
              localStorage.setItem('access-user', JSON.stringify(user));
              bus.$emit('setNickName', that.form.nickname);
              that.$message.success({showClose: true, message: '修改成功', duration: 2000});
            }else{
              that.$message.error({showClose: true, message: '修改失败', duration: 2000});
            }
          }).catch((error)=>{
            that.$message.error({showClose: true, message: '请求出现异常', duration: 2000});
          })
        }
      },
      mounted() {
        let user = localStorage.getItem('access-user');
        if (user) {
          user = JSON.parse(user);
          this.form.username = user[0].username;
          this.form.nickname = user[0].nickname || '';
          this.form.email = user[0].email || '';
          this.form.class = user[0].class || '';
        }
      }
    }
</script>

<style scoped>

</style>
