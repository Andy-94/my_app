import React, { Component } from 'react';
import {Card,Button,List, message} from 'antd'
import {connect} from 'react-redux'
import {createCategoryAsyncAction} from '../../redux/actions/category'
import {reqCategoryDetail} from '../../ajax'
import {ArrowLeftOutlined} from '@ant-design/icons'
import './css/detail.less'
const {Item} = List
class Detail extends Component {
  state={
    productDetail:{
      desc: '',
      detail: '',
      imgs : [],
      name : '',
      price : 0,
      caregoryID: '',
    }
  }
  getDetailID = async()=>{
    const {id} = this.props.match.params
    let result = await reqCategoryDetail(id)
    const {status, data, msg} = result
    if(status === 0){
      this.setState({productDetail:data})
    }else{
      message.error(msg)
    }
  }
  getCategoryName = (id)=>{
    const {categoryList} = this.props
    let result=categoryList.find((obj)=>{
      return obj._id === id  
    })
    if(result) return result.name
  }
  componentDidMount(){
    if(!this.props.categoryList.length){
      this.props.saveCategory()
    }
    this.getDetailID()
  }

  render() {
    let {desc,detail,imgs,name,price,categoryId} = this.state.productDetail
    return (
      <Card title={
        <div>
          <Button onClick={()=>{this.props.history.goBack()}} type="link" icon={<ArrowLeftOutlined />} style={{marginRight:'10px'}}>Back</Button>
          <span>Product Detail</span>
          </div>
      }>
        <List>
          <Item className="detail-item">
            <span className="detail-title">Prodoct Name:</span>
            <span>{name}</span>
          </Item>
          <Item className="detail-item">
            <span className="detail-title">Product Descible:</span>
            <span>{desc}</span>
          </Item>
          <Item className="detail-item">
            <span className="detail-title">Product Price:</span>
            <span>{`$`+price}</span>
          </Item>
          <Item className="detail-item">
            <span className="detail-title">Product Category:</span>
            <span>{this.getCategoryName(categoryId)}</span>
          </Item>
          <Item className="detail-item">
            <span className="detail-title">Product Picture:</span>
            {
              imgs.map((imgName)=>{
                return <img src={`http://localhost:4000/upload/${imgName}`} alt="imgs"/>
              })
            }
          </Item>
          <Item className="detail-item">
            <span className="detail-title">Product Detail:</span>
            <span dangerouslySetInnerHTML={{__html:detail}}></span>
          </Item>
        </List>
    </Card>
    );
  }
}
export default connect(
  (state)=>({
    categoryList: state.categoryList,
    state
  }),
  {
    saveCategory:createCategoryAsyncAction
  }
)(Detail)
