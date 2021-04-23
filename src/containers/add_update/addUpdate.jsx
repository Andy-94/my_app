import React, { Component } from 'react';
import {Card,Button,Form,Input,Select} from 'antd'
import {ArrowLeftOutlined} from '@ant-design/icons'
import {createCategoryAsyncAction} from '../../redux/actions/category'
import { connect } from 'react-redux';
import Picture from './picture'
const {Item} = Form
const {Option} = Select
class AddUpdate extends Component {

  onFinish=(value)=>{
    console.log(value)
  }
  createOption =()=>{
    return this.props.categoryList.map((obj)=>{
      return <Option key={obj._id} value={obj._id}>{obj.name}</Option>
    })
  }
  componentDidMount(){
    if(!this.props.categoryList.length){
      this.props.saveCategoryList()
    }
  }

  render() {
    return (
      <Card title={
        <div>
          <Button onClick={()=>{this.props.history.goBack()}} type="link" icon={<ArrowLeftOutlined />} style={{marginRight:'10px'}}>Back</Button>
          <span>Product AddList</span>
          </div>
      }>
        <Form onFinish={this.onFinish}>
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
            <Select defaultValue="">
              <Option value="Please select the category">Please select the category</Option>
              {this.createOption()}
            </Select>
          </Item>
          <Item label="Product Picture">
            <Picture/>
          </Item>
          <Item label="Product Detail">
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
