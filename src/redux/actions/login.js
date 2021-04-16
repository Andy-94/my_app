import {SAVE_USER_INFO} from '../action_types.js'

export const createSaveUserAction =(userObj)=>({type:SAVE_USER_INFO,data:userObj})