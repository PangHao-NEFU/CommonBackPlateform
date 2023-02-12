//模拟后端接口,可以理解为模拟Controller
import Mock from 'mockjs'
import homeApi from './mockServeData/home'
import user from './mockServeData/user'
import permission from "@/api/mockServeData/permission";

Mock.mock('/api/home/getData',homeApi.getStatisticalData)

//模拟user
Mock.mock('/api/user/addUser','post',user.createUser)      //增
Mock.mock('/api/user/deleteUser','post',user.deleteUser)   //删
Mock.mock('/api/user/editUser','post',user.updateUser)     //改
Mock.mock(/api\/user\/getUser/,'get',user.getUserList)     //查

Mock.mock(/api\/permission\/getMenu/,'post',permission.getMenu)
