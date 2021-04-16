import {combineReducers} from 'redux'
import Login from './login'

export default combineReducers({
  userInfo:Login //必须为key:value组合
})