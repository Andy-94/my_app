import React, { Component} from 'react';
import {connect} from 'react-redux'
import {reqCategoryAdd,reqCategoryChange} from '../../ajax'
import {createCategoryAsyncAction} from '../../redux/actions/category'
import {PlusCircleOutlined} from '@ant-design/icons'
import {Page_size} from '../../config'
import { Card, Button, Table, Modal, Form, Input, message  } from 'antd';
const {Item} = Form
class Category extends Component {
  myRef = React.createRef()
  state = { visible: false };

  showModal = (categoryObj) => {
    let {_id,name} = categoryObj
    if(_id && name){
      this.name = name
      this._id =_id
      this.isUpdate = true
      if(this.myRef.current){
        this.myRef.current.setFieldsValue({categoryName:name})
      }
    }
    this.setState({visible: true,});
  };
  handleOk =  async() => {
    const {categoryName} = this.myRef.current.getFieldsValue()
    if(!categoryName) {message.warning('input cannot empty');return}
    let result
    if(this.isUpdate){
      result = await reqCategoryChange(this._id,categoryName)
    }else{
      result = await reqCategoryAdd(categoryName)
    }
    const {status, msg} = result
    if(status === 0){
      message.success('success')
      this.props.saveCategory()
      this.hideModal()
    }else{
      message.warning(msg)
    }
  };
  hideModal = () => {
    this.isUpdate = false
    this.name = ''
    this._id =''
    // this.myRef.current.resetFields() //隐藏重制
    this.myRef.current.setFieldsValue({categoryName:''}) //隐藏重制
    this.setState({visible: false})
  };
  componentDidMount(){
    this.props.saveCategory()
  }
    
  render() {
    const columns = [
      {
        title: 'Category Name',
        dataIndex: 'name',
        key: 'CategoryName',
      },
      {
        title: 'Operate',
        // dataIndex: '_id',
        key: 'OperateItem',
        align: 'center',
        width: '15%',
        render: (item) => <Button onClick={()=>{this.showModal(item)}} type="link">修改分类</Button>
      },
    ];
    return (
      <div>
        <Card  extra={<Button onClick={this.showModal} type="primary" icon={<PlusCircleOutlined />}>Add Item</Button>} >
            <Table 
            bordered 
            dataSource={this.props.category} 
            columns={columns} 
            pagination ={{
              pageSize: Page_size,
              showQuickJumper:true,
            }}
            rowKey = '_id'
            />
        </Card>
        <Modal
          title={this.isUpdate ? 'Change Category':'Add Category'}
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.hideModal}
          okText="confirm"
          cancelText="Delete"
        >
          <Form initialValues={{categoryName:this.name}} ref={this.myRef}>
            <Item  name="categoryName" rules={[
              {required:true, message:"please input category name"}
            ]}>
              <Input placeholder="Please input category name"/>
            </Item>
          </Form>      
        </Modal>
      </div>
    );
  }
}

export default connect(
  (state)=>({
    category:state.categoryList
  }),
  {
    saveCategory:createCategoryAsyncAction
  }
)(Category)