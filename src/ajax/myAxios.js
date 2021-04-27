import axios from 'axios'
import qs from 'querystring'
import store from '../redux/store'
import Nprogress from 'nprogress'
import {createDeleteAction} from '../redux/actions/login'
import {createSaveTitlerAction} from '../redux/actions/title'
import {message} from 'antd'
import 'nprogress/nprogress.css'
//初始化地址
// axios.defaults.baseURL='http://localhost:3000'
axios.defaults.baseURL=''
//请求拦截器
axios.interceptors.request.use((config)=>{
  Nprogress.start()
  let {method,data} = config
  //获取token
  let {token} = store.getState().userInfo
  if(token){
    config.headers.Authorization = 'atguigu_'+token
  }
  //携带token
  
  if(method.toLowerCase() === 'post' && data instanceof Object){
    config.data=qs.stringify(data)
  }
  return config
})
//相应拦截器
axios.interceptors.response.use(
  response =>{
    Nprogress.done();
    return response.data},
  error =>{
    Nprogress.done();
    if(error.response.status === 401){
      message.error('Please login again')
      store.dispatch(createDeleteAction)
      store.dispatch(createSaveTitlerAction(''))
    }else{
      message.error(error.message)
    }
    return new Promise(()=>{})
  }
)
export default axios