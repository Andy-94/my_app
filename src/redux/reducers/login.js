import {SAVE_USER_INFO} from '../action_types.js'

let initState ={
  user:{},
  token:''
}
export default function(preState =initState,action){
  const {type,data} = action
  switch (type) {
    case SAVE_USER_INFO:
        const {user,token} = data
        NewState = {user,token}
        return NewState
    default:
        return preState
  }
}