<template>
  <div class="allContainer">
    <el-container>
      <!--头部-->
      <el-header style="height: 50px;">
        <div class="topbar-logo">
          <a href="/"></a>
        </div>
        <div class="topbar-logotxt" v-show="!collapsed">
          <a href="/"></a>
        </div>
        <div class="topbar-title">
          <span>学生管理系统</span>
        </div>
        <div class="topbar-userwrap">
          <el-dropdown trigger="click">
            <span class="el-drapdown-link userinfo-inner"><i class="iconfont icon-user"></i>{{nickname}}<i class="iconfont icon-down"></i></span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>
                <div @click="jumpTo('/usermsgchange')"><span>信息修改</span></div>
              </el-dropdown-item>
              <el-dropdown-item>
                <div @click="jumpTo('/pswchange')"><span>密码修改</span></div>
              </el-dropdown-item>
              <el-dropdown-item>
                <div @click="logout()"><span>退出登录</span></div>
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </el-header>
      <el-container>
        <!--左侧菜单栏-->
        <el-aside :class="{showSidebar:!collapsed}">
          <!--展开折叠开关-->
          <div class="menu-toggle" @click.prevent="collapse">
            <i class="iconfont icon-menufold" v-show="!collapsed"></i>
            <i class="iconfont icon-menuunfold" v-show="collapsed"></i>
          </div>
          <el-menu :default-active="defaultActiveIndex" :collapse="collapsed" router @select="handleSelect">
            <template v-for="(item,index) in $router.options.routes" v-if="item.menuShow">
              <el-submenu v-if="!item.leaf" :index="index+''">
                <template slot="title"><i :class="item.iconCls"></i><span slot="title">{{item.name}}</span></template>
                <el-menu-item v-for="term in item.children" :key="term.path" :index="term.path"  v-if="term.menuShow" :class="$route.path==term.path?'is-active':''">
                  <i :class="term.iconCls"></i><span slot="title">{{term.name}}</span>
                </el-menu-item>
              </el-submenu>
              <el-menu-item v-else-if="item.leaf&&item.children&&item.children.length" :index="item.children[0].path"
                            :class="$route.path==item.children[0].path?'is-active':''">
                <i :class="item.iconCls"></i><span slot="title">{{item.children[0].name}}</span>
              </el-menu-item>
            </template>
          </el-menu>
        </el-aside>
        <!--右侧路由页面-->
        <el-main>
          <transition name="fade" mode="out-in">
            <router-view></router-view>
          </transition>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
  import {bus} from '../bus.js'

  export default {
    name: "home",
    created() {
      bus.$on('setNickName', (text) => {
        this.nickname = text;
      })

      bus.$on('goto', (url) => {
        if (url === "/login") {
          localStorage.removeItem('access-user');
        }
        this.$router.push(url);
      })
    },
    data() {
      return {
        defaultActiveIndex: "1",
        collapsed: false,
        nickname: ''
      }
    },
    methods: {
      // 选中菜单刷新不变
      handleSelect(index){
        this.defaultActiveIndex = index;
      },
      //折叠导航栏
      collapse: function () {
        this.collapsed = !this.collapsed;
      },
      jumpTo(url){
        this.defaultActiveIndex = url;
        this.$router.push(url); //用go刷新
      },
      logout() {
        let that = this;
        this.$confirm('确认退出吗?', '提示', {
          confirmButtonClass: 'el-button--warning'
        }).then(() => {
          //确认
          localStorage.removeItem('access-user');
          that.$router.go('/login'); //用go刷新
        }).catch(() => {});
      }
    },
    mounted() {
      let user = window.localStorage.getItem('access-user');
      if (user) {
        user = JSON.parse(user);
        this.nickname = user[0].nickname;
      }
    }
  }

</script>

<style scoped lang="scss">
  .allContainer{
    position: absolute;
    top: 0px;
    bottom: 0px;
    width: 100%;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    .el-container{
      .el-header{
        padding: 0;
        background: #373d41;
        .topbar-logo{
          float: left;
          width: 50px;
          height: 50px;
          background: url("../assets/logo.png") no-repeat center center;
          background-size: 40px 40px;
        }
        a{
          display: block;
          width: 100%;
          height: 100%;
        }
        .topbar-logotxt{
          float: left;
          width: 120px;
          height: 50px;
          background: url("../assets/logotxt.png") no-repeat center center;
          background-size: 66px 40px;
        }
        .topbar-title{
          width: 200px;
          line-height: 50px;
          float: left;
          color: #fff;
          border-left: 1px solid #000;
          text-indent: 10px;
          font-size: 20px;
        }
        .topbar-userwrap{
          /*width: 90px;*/
          padding-right: 10px;
          float: right;
          color: #fff;
          line-height: 50px;
          .userinfo-inner{
            cursor: pointer;
          }
        }
        .el-dropdown{
          color: #fff;
          font-size: 16px;
        }
      }
      .el-container{
        width: 100%;
        display: flex;
        position: absolute;
        top: 50px;
        bottom: 0px;
        overflow: hidden;
        .el-aside{
          width: 50px!important;
          background: #333744;
          overflow-x: hidden;
          overflow-y: auto;
          .menu-toggle{
            color: #fff;
            line-height: 30px;
            text-align: center;
            cursor: pointer;
            background: #4A5064;
            min-width: 50px;
          }
          .el-menu{
            background-color: transparent;
            border: 0;
            .el-menu-item{
              min-width: 100%;
            }
          }
          .el-menu--collapse{
            width: 50px;
          }
        }
        .showSidebar{
          width: 170px !important;
        }
        .el-main{
          padding: 10px;
        }
      }
    }
  }
</style>
