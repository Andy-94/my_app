import React, { Component } from 'react';
import {Card,Button,Form,Input,Select, message} from 'antd'
import {ArrowLeftOutlined} from '@ant-design/icons'
import {createCategoryAsyncAction} from '../../redux/actions/category'
import { connect } from 'react-redux';
import {reqDetailInfo ,  reqCategoryDetail, reqUpdataInfo} from '../../ajax'
import Picture from './picture'
import RichEditor from './rich_editor'
const {Item} = Form
const {Option} = Select
class AddUpdate extends Component {
  myRefPicture = React.createRef()
  myRefEditor = React.createRef()
  myRefForm = React.createRef()
  state={
    isUpdate: false,
    _id:''
  }
  onFinish = async(value)=>{
    value.imgs = this.myRefPicture.current.getImgNames()
    value.detail = this.myRefEditor.current.onGetEdiotr()
    // console.log(value)
    let result
    if(this.state.isUpdate){
      value._id=this.state._id
      result = await reqUpdataInfo(value)
    }else{
      result = await reqDetailInfo(value)
    }
    const {status, msg} = result
    if(status===0){
      message.success(this.state.isUpdate ? 'product update success':'success')
      this.props.history.replace('/admin/prod_about/product')
    }else{
      message.error(msg)
    }
  }
  createOption =()=>{
    return this.props.categoryList.map((obj)=>{
      return <Option key={obj._id} value={obj._id}>{obj.name}</Option>
    })
  }
  getIdData = async(id)=>{
    let result = await reqCategoryDetail(id)
    const {status,data,msg} = result
    if(status ===0){
      //andt直接引入data的数据，只要原本form的数据和数据库的数据一致
      this.myRefForm.current.setFieldsValue(data)
      //图片回显
      this.myRefPicture.current.setImgs(data.imgs)
      //文字
      this.myRefEditor.current.setText(data.detail)
    }else{
      message.error(msg)
    }
  }
  componentDidMount(){
    if(!this.props.categoryList.length){
      this.props.saveCategoryList()
    }
    const id = this.props.location.pathname.split('/').reverse()[0]
    if(id !== 'addupdate'){
      this.setState({isUpdate: true,_id:id})
      //接送数据
      this.getIdData(id)
    }
  }

  render() {
    return (
      <Card title={
        <div>
          <Button onClick={()=>{this.props.history.goBack()}} type="link" icon={<ArrowLeftOutlined />} style={{marginRight:'10px'}}>Back</Button>
          <span>{this.state.isUpdate ? 'Product Modify':'Product AddList'}</span>
          </div>
      }>
        <Form ref={this.myRefForm} onFinish={this.onFinish}>
          <Item 
            name="name" 
            rules={[{required:true,message:'this cannot empty'}]}
            label="Product Name"
            wrapperCol ={{span:8}}
          >
            <Input placeholder="Please input product name"></Input>
          </Item>
          <Item 
          name="desc" 
          rules={[{required:true,message:'this cannot empty'}]}
          label="Product Describe"
          wrapperCol ={{span:8}}
          >
            <Input placeholder="Please input product describe"></Input>
          </Item>
          <Item 
          name="price" 
          rules={[{required:true,message:'this cannot empty'}]}
          label="Product Price"
          wrapperCol ={{span:8}}
          >
            <Input 
            addonAfter ="Dollor"
            addonBefore = "$"
            placeholder="Please input product Price"></Input>
          </Item>
          <Item 
          name="categoryId" 
          rules={[{required:true,message:'this cannot empty'}]}
          label="Product Category"
          wrapperCol ={{span:8}}
          >
            <Select>
              <Option value="Please select the category">Please select the category</Option>
              {this.createOption()}
            </Select>
          </Item>
          <Item label="Product Picture">
            <Picture ref={this.myRefPicture}/>
          </Item>
          <Item label="Product Detail" wrapperCol ={{span:20}}>
            <RichEditor ref={this.myRefEditor} />
          </Item>

          <Item >
            <Button htmlType="submit"  type="primary">Submit</Button>
          </Item>
        </Form>
      </Card>
    );
  }
}

export default connect(
  (state)=>({categoryList:state.categoryList}),
  {
    saveCategoryList:createCategoryAsyncAction
  }
)(AddUpdate)
