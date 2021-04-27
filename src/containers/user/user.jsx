import React, { Component } from 'react';
import { Button, Card, message, Table, Modal, Input, Form, Tree } from 'antd';
import {PlusCircleOutlined} from '@ant-design/icons'
import dayJS from 'dayjs'
import store from '../../redux/store'
import {Page_size} from '../../config'
import {reqRoleList,reqRoleName,reqAuthRole} from '../../ajax'
import TreeData from '../../config/TreeData'

const {Item} = Form
export default class User extends Component {
  myRef = React.createRef()
  state ={
    dataSource:[],
    visible: false,
    visibleAuth:false,
    TreeCheck:['home'],
    id:''
  }
  showModalAdd = () => {
    this.setState({
      visible: true,
    });
  };

  hideModalAdd = async() => {
    let value= this.myRef.current.getFieldValue()
    let result = await reqRoleName(value)
    const {status,data,msg} = result
    if(status ===0){
      message.success('success add role')
      //not use "let {datasource}= this.state"
      let dataSource = [...this.state.dataSource]
      dataSource.unshift(data)
      this.setState({dataSource})
      this.myRef.current.resetFields()
    }else{
      message.error(msg)
    }
    this.setState({visible: false,});
  };
  showModalAuth =(id)=>{
    let result = this.state.dataSource.find((roleObj)=>{
      return id === roleObj._id
    })
    console.log(result)
    let {menus} = result
    if(menus.indexOf('home')=== -1) menus.push('home')
    if(result){
      this.setState({visibleAuth:true,id,TreeCheck:result.menus})
    }
  }
  hideModalAuth = async()=>{
    this.setState({visibleAuth:false});
    const {username} = store.getState().userInfo.user
    const {id,TreeCheck} = this.state;
    let time =Date.now()
    let {status,msg} = await reqAuthRole(id,username,TreeCheck,time)
    if(status===0){
      message.success('success')
      this.getRoleListMethod()
    }else{
      message.error(msg)
    }
  }

  getRoleListMethod=async()=>{
    let result = await reqRoleList()
    const {status,data,msg} = result
    if(status===0){
      this.setState({dataSource:data.reverse()})
    }else{
      message.error(msg)
    }
  }
  demo =(checkedArr)=>{
    this.setState({TreeCheck:checkedArr})
  }

  componentDidMount(){
    this.getRoleListMethod()
  }
  render() {
    const columns = [
      {
        title: '角色名称',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: '创建时间',
        dataIndex: 'create_time',
        key: 'create_time',
        render:(create_time)=>dayJS(create_time).format('HH:mm:ss / MM-DD / YYYY')
      }, 
      {
        title: '授权时间',
        dataIndex: 'auth_time',
        key: '',
        render:(auth_time) => auth_time ? dayJS(auth_time).format('HH:mm:ss / MM-DD / YYYY') : '暂未授权'
      },
      {
        title: '授权人',
        dataIndex: 'auth_name',
        key: 'auth_name',
        render:(auth_name) => auth_name ? auth_name : '暂未授权'
      }, 
      {
        title: '操作',
        dataIndex: '_id',
        key: 'opera',
        width:'10%',
        align:'center',
        render:(id)=><Button type="link" onClick={()=>{this.showModalAuth(id)}}>设置权限</Button>
      },
    ];
    return (
      <div>
        <Card title={<Button onClick={this.showModalAdd} type="primary" icon={<PlusCircleOutlined />}>新增角色</Button>} >
          <Table 
          dataSource={this.state.dataSource} 
          columns={columns} 
          bordered
          rowKey="_id"
          pagination ={{
            pageSize: Page_size,
            showQuickJumper:true,
          }}
          />
        </Card>
        <Modal
          title="Add Role"
          visible={this.state.visible}
          onOk={this.hideModalAdd}
          onCancel={()=>{this.myRef.current.resetFields();this.setState({visible:false})}}
          okText="Confirm"
          cancelText="Cancel"
        >
          <Form ref={this.myRef}>
            <Item 
              name="roleName"
              rule={[{required:true,message:'Role name cannot empty'}]}>
              <Input placeholder="Please input your name" />
            </Item>     
          </Form>
        </Modal>
        <Modal
          title="Auth Role"
          visible={this.state.visibleAuth}
          onOk={this.hideModalAuth}
          onCancel={()=>{this.setState({visibleAuth:false})}}
          okText="Confirm"
          cancelText="Cancel"
        >
          <Form >
          <Tree
            checkable
            defaultExpandAll
            onCheck={this.demo}
            checkedKeys={this.state.TreeCheck}
            treeData={TreeData}
          />
          </Form>
        </Modal>
      </div>
      
    );
  }
}