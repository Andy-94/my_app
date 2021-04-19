import React, { Component} from 'react';
import {connect} from 'react-redux'
import {reqCategoryAdd} from '../../ajax'
import {createCategoryAsyncAction} from '../../redux/actions/category'
import {PlusCircleOutlined} from '@ant-design/icons'
import { Card, Button, Table, Modal, Form,Input, message  } from 'antd';
const {Item} = Form
class Category extends Component {
  myRef = React.createRef()
  state = { visible: false };

  showModal = () => {
    this.setState({
      visible: true,
    });
  };
  handleOk =  async() => {
    const {categoryName} = this.myRef.current.getFieldsValue()
    if(!categoryName) {message.warning('input cannot empty');return}
    let result = await reqCategoryAdd(categoryName)
    const {status, msg} = result
    if(status === 0){
      message.success('success')
      this.props.saveCategory()
      this.setState({visible: false});
      this.myRef.current.resetFields() //隐藏重制
    }else{
      message.warning(msg)
    }
  };
  hideModal = () => {
    this.setState({visible: false});
    this.myRef.current.resetFields()
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
        render: (item) => <Button onClick={()=>{this.showModal()}} type="link">修改分类</Button>
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
              pageSize:'4',
              showQuickJumper:true,
            }}
            rowKey = '_id'
            />
        </Card>
        <Modal
          title="Add Category"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.hideModal}
          okText="confirm"
          cancelText="Delete"
        >
          <Form ref={this.myRef}>
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