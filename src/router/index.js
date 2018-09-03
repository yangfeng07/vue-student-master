import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import Home from '@/components/Home'
import Dashboard from '@/components/Dashboard'
import Scorelist from '@/components/studentManage/Scorelist'
import Studentlist from '@/components/studentManage/Studentlist'
import Usermsgchange from '@/components/userManage/Usermsgchange'
import pswchange from '@/components/userManage/pswchange'
Vue.use(Router)

let router = new Router({
  routes: [
    {
      path: '/',
      name: '登陆',
      redirect: '/login'
    },
    {
      path: '/login',
      name: '登陆',
      component: Login
    },
    {
      path: '/home',
      name: 'Home',
      component: Home,
      redirect: '/dashboard',
      leaf: true,// 只有一个节点
      menuShow: true,
      iconCls: 'iconfont icon-home',
      children: [
        {path: '/dashboard', component: Dashboard, name: '首页', menuShow: true}
      ]
    },
    {
      path: '/home',
      name: '学生管理',
      component: Home,
      menuShow: true,
      iconCls: 'iconfont icon-users',
      children: [
        {path: '/studentlist', component: Studentlist, name: '学生列表', menuShow: true},
        {path: '/scorelist', component: Scorelist, name: '学生成绩', menuShow: true}
      ]
    },
    {
      path: '/home',
      name: '设置',
      component: Home,
      menuShow: true,
      iconCls: 'iconfont icon-setting1',
      children: [
        {path: '/usermsgchange', component: Usermsgchange, name: '信息修改', menuShow: true},
        {path: '/pswchange', component: pswchange, name: '密码修改', menuShow: true}
      ]
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.path.startsWith('/login')) {
    window.localStorage.removeItem('access-user')
    next()
  } else {
    let user = JSON.parse(window.localStorage.getItem('access-user'))
    if (!user) {
      next({path: '/login'})
    } else {
      next()
    }
  }
})

export default router
