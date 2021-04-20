//项目发请求的方法
import myAxios from './myAxios'
//登陆请求
export const reqLogin =(username,password) => myAxios.post('/login',{username,password})
//接受category数据
export const reqCategoryList =() => myAxios.get('/manage/category/list')
//接受category添加
export const reqCategoryAdd =(categoryName) => myAxios.post('/manage/category/add',{categoryName})

//修改category
export const reqCategoryChange =(categoryId, categoryName) => myAxios.post('/manage/category/update',{categoryId, categoryName})
