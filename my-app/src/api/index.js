import http from '../utils/request'

//请求首页数据,axios二次封装
export const getData = () => {
    return http.get('/home/getData')
};

//user的crud模拟
export const getUser = (params) => {
    return http.get('/user/getUser',params)
};
export const addUser = (data) => {
    return http.post('/user/addUser',data)
};
export const editUser = (data) => {
    return http.post('/user/editUser',data)
};

export const deleteUser = (data) => {
    return http.post('/user/deleteUser',data)
};
export const getMenu = (data) => {
    return http.post('/permission/getMenu',data)
};














