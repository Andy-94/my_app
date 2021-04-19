import {combineReducers} from 'redux'
import Login from './login'
import Title from './title'
import CategoryRoute from './category'

export default combineReducers({
  userInfo:Login, //必须为key:value组合
  title:Title,
  categoryList:CategoryRoute
})