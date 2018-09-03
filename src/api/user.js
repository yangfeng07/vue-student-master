/**
 * Created by jerry on 2017/11/13.
 * 用户相关api
 */
import * as API from './'

export default {
  //登录
  login: params => {
    return API.POST('/api/v1/user/login', params)
  },
  msgchange: params => {
    return API.POST('/api/v1/user/msgchange', params)
  },
  pswchange: params => {
    return API.POST('/api/v1/user/pswchange', params)
  }
  /*//登出
  logout: params => {
    return API.GET('/api/v1/users/logout', params)
  },
  //修改个人信息
  changeProfile: params => {
    return API.PATCH('/api/v1/users/profile', params)
  },

  //查询获取user列表(通过page分页)
  findList: params => {
    return API.GET('/api/v1/users', params)
  },*/
}