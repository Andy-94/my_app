import axios from 'axios'
import qs from 'querystring'
import {message} from 'antd'
//初始化地址
axios.defaults.baseURL='http://localhost:3000'
//请求拦截器
axios.interceptors.request.use((config)=>{
  let {method,data} = config
  if(method.toLowerCase() === 'post' && data instanceof Object){
    config.data=qs.stringify(data)
  }
  return config
})
//相应拦截器
axios.interceptors.response.use(
  response =>{return response.data},
  error =>{
    message.error(error.message)
    return new Promise(()=>{})
  }
)
export default axios