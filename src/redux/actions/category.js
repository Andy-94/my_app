import {SAVE_CATEGORY_LIST} from '../action_types.js'
import {message} from 'antd'
import {reqCategoryList} from '../../ajax'

const createCategoryAction = (category) =>({type:SAVE_CATEGORY_LIST,data:category})


export const createCategoryAsyncAction = () =>{
  return async(dispatch)=>{
    let result = await reqCategoryList()
    const {status, data, msg} = result
    if(status === 0){
      dispatch(createCategoryAction(data))
    }else{
      message.error(msg)
    }
  }
}