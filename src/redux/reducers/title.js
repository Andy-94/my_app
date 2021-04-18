import {SAVE_USER_TITLE} from '../action_types.js'

export default function Login(preState ='',action){
  const {type,data} = action
  let newState 
  switch (type) {
    case SAVE_USER_TITLE:
        newState = data
        return newState
    default:
        return preState
  }
}