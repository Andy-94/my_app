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

//请求商品列表  
export const reqCategoryListData =(pageNum,pageSize)=> myAxios.get('/manage/product/list',{params:{pageNum,pageSize}})
//更新商品updatestatus
export const reqCategoryUpdateStatus =(productId,status)=> myAxios.post('/manage/product/updateStatus',{productId,status})
//搜索商品
export const reqCategorySearch = (searchType,keyword,pageNum,pageSize )=> myAxios.get('/manage/product/search',{params:{[searchType]:keyword,pageNum,pageSize}})

//商品ID接收detail
export const reqCategoryDetail = (productId)=> myAxios.get('/manage/product/info',{params:{productId}})
//图片上传后删除
export const reqUpdataRemove = (name)=> myAxios.post('/manage/img/delete',{name})
//上传信息
export const reqDetailInfo = (ProductObj) => myAxios.post('/manage/product/add',ProductObj)

//更新商品
export const reqUpdataInfo =(ProductObj) => myAxios.post('/manage/product/update',ProductObj)
//获取用户list
export const reqRoleList =()=> myAxios.get('/manage/role/list',)
//获取用户名字 roleName是个数组必须解构付值
export const reqRoleName =({roleName})=>myAxios.post('/manage/role/add',{roleName})
//更新角色权限
export const reqAuthRole =(_id,auth_name,menus,auth_time) => myAxios.post('/manage/role/update',{_id,auth_name,menus,auth_time})
//请求角色信息
export const reqUserList =()=>myAxios.get('/manage/user/list')
//添加用户
export const reqAddUser =(UserObj)=> myAxios.post('/manage/user/add',UserObj)
//更新用户
export const reqUpdateUserList =(UserObj)=>myAxios.post('/manage/user/update',UserObj)
//删除用户
export const reqDeleteUser =(userId)=>myAxios.post('/manage/user/delete',{userId})