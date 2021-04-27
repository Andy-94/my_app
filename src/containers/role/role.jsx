import React, { Component } from 'react';
import {reqUserList,reqAddUser,reqUpdateUserList} from '../../ajax'
import dayJS from 'dayjs'
import { Card, Button, Table, Modal,Form ,Input, Select, message } from 'antd';
import {PlusOutlined} from '@ant-design/icons'

const {Item} = Form
const { Option } = Select

export default class Role extends Component {
  myRef = React.createRef()
  state = { 
    visible: false,
    roles:[],
    users:[],
  };
  showModal = (item) => {
    let {...obj} = item
    if(obj._id && obj.phone && obj.email){
      this.username = obj.username
      this.phone = obj.phone
      this.email = obj.email
      console.log(obj)
      this.isUpdate = true
      if(this.myRef.current){
        this.myRef.current.setFieldsValue({username:this.username,phone:this.phone,email:this.email})
      }
    }
    this.setState({visible: true,});
  };

  handleOk = async()=>{
    let UserObj = this.myRef.current.getFieldValue()
    let result
    if(this.isUpdate){
      result = await reqUpdateUserList(this.obj)
    }else{
      result = await reqAddUser(UserObj)
    }
    const {status,msg} =result
    if(status===0){
      message.success('add user success')
      //刷新
      this.props.getValueList()
      this.handModal()
    }else{
      message.error(msg)
    }
  };
  handModal =()=>{
    this.isUpdate = false
    this.username=''
    this.phone=''
    this.email=''
    // this.myRef.current.resetFields()
    this.myRef.current.setFieldsValue({username:'',phone:'',email:''})
    this.setState({visible:false})
  }

  getRoleName =(id)=>{
    let result = this.state.roles.find((obj)=>{
      return obj._id ===id
    })
    if(result) return result.name
  }
  getValueList = async()=>{
    let {status,data,msg} = await reqUserList()
    if(status === 0){
      const {roles,users} = data
      this.setState({roles,users:users.reverse()})
    }else{
      message.error(msg)
    }
  }
  componentDidMount(){
    this.getValueList()
  }
  render() {
    const columns = [
      {
        title: '用户名',
        dataIndex: 'username',
        key: 'username',
      },
      {
        title: '邮箱',
        dataIndex: 'email',
        key: 'email',
      },
      {
        title: '电话',
        dataIndex: 'phone',
        key: 'phone',
      },
      {
        title: '注册时间',
        dataIndex: 'create_time',
        key: 'create_time',
        render:(create_time)=>dayJS(create_time).format('HH:mm:ss / MM-DD / YYYY')
      },
      {
        title: '所属角色',
        dataIndex: 'role_id',
        key: 'role_id',
        render:(id)=> this.getRoleName(id)
      },
      {
        title: '操作',
        // dataIndex: 'address',
        key: 'opera',
        align:'center',
        render:(item)=>{
          return (
              <div>
                  <Button onClick={()=>{this.showModal(item)}} type="link">修改</Button>
                  <Button type="link">设置权限</Button>
                </div>
          )
        }
      },
    ];
    return (
      <div>
       <Card title={<Button onClick={this.showModal} icon={<PlusOutlined />} type="primary">Create User</Button>} >
        <Table 
        rowKey="_id"
        bordered
        dataSource={this.state.users} 
        columns={columns} />
      </Card>
      <Modal
          title={this.isUpdate ? "Modity User":"Create User"}
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handModal}
          okText="Confile"
          cancelText="Cancel"
        >
         <Form
            ref = {this.myRef}
            name="RoleForm" 
            initialValues={{
              username:this.username,
              phone:this.phone,
              email:this.email
            }}
          >
            <Item
              label="Username"
              name="username"
              labelAlign="right"
              labelCol ={{span:7}}
              wrapperCol = {{span:16}}
              rules={[{ required: true, message: 'Please input your username!' }]}
            >
              <Input/>
            </Item>
            <Item
              label="Password"
              name="password"
              labelAlign="right"
              labelCol ={{span:7}}
              wrapperCol = {{span:16}}
              rules={[{ required: true, message: 'Please input your password!' }]}
            >
              <Input />
            </Item>
            <Item
              label="Phone Number"
              name="phone"
              labelAlign="right"
              labelCol ={{span:7}}
              wrapperCol = {{span:16}}
              rules={[{ required: true, message: 'Please input your phone number!' }]}
            >
              <Input />
            </Item>
            <Item
              label="Email"
              name="email"
              labelAlign="right"
              labelCol ={{span:7}}
              wrapperCol = {{span:16}}
              rules={[{ required: true, message: 'Please input your email address!' }]}
            >
              <Input />
            </Item>
            <Item
              label="Role"
              name="role_id"
              labelAlign="right"
              labelCol ={{span:7}}
              wrapperCol = {{span:16}}
              rules={[{ required: true, message: 'Please select your Role!' }]}
            >
              <Select >
                <Option value=" ">请选择一个角色</Option>
                {
                  this.state.roles.map((obj)=>{
                    return <Option key={obj._id} value={obj._id}>{obj.name}</Option>
                  })
                }
              </Select>
            </Item>
          </Form>
        </Modal>
      </div>
    );
  }
}