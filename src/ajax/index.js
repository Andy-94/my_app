//项目发请求的方法
import myAxios from './myAxios'
//登陆请求
export const reqLogin =(username,password) => myAxios.post('/login',{username,password})