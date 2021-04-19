import {SAVE_CATEGORY_LIST} from '../action_types.js'

export default function Category(preState=[],action){
  const {type,data} = action
  let newState
  switch (type) {
    case SAVE_CATEGORY_LIST:
      newState = [...data.reverse()]
      return newState
    default:
      return preState
  }
}