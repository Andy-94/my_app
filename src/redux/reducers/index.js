import {combineReducers} from 'redux'
import Login from './login'
import Title from './title'

export default combineReducers({
  userInfo:Login, //必须为key:value组合
  title:Title
})