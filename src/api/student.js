import * as API from './'

export default {
  findscoreList: params=> {
    return API.POST('/api/v1/student/scoreList',params)
  },
  updatescoreList: params=> {
    return API.POST('/api/v1/student/updatescoreList',params)
  },
  addscoreList: params=> {
    return API.POST('/api/v1/student/addscoreList',params)
  },
  deletescoreList: params=> {
    return API.POST('/api/v1/student/deletescoreList',params)
  },
  findstudentList: params=> {
    return API.POST('/api/v1/student/studentList',params)
  },
  updatestudentList: params=> {
    return API.POST('/api/v1/student/updatestudentList',params)
  },
  addstudentList: params=> {
    return API.POST('/api/v1/student/addstudentList',params)
  },
  deletestudentList: params=> {
    return API.POST('/api/v1/student/deletestudentList',params)
  },
}
