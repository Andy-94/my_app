import {SAVE_USER_INFO,DELETE_USER_INFO} from '../action_types.js'

export const createSaveUserAction =(userObj)=>{
  localStorage.setItem('user',JSON.stringify(userObj.user))
  localStorage.setItem('token',userObj.token)
  return {type:SAVE_USER_INFO,data:userObj}
}
export const createDeleteAction = ()=>{
  localStorage.clear()
  return {type:DELETE_USER_INFO,data:''}
}