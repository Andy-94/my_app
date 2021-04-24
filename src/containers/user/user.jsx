import React, { Component } from 'react';
import { Button, Card,message,Table } from 'antd';
import {PlusCircleOutlined} from '@ant-design/icons'
import dayJS from 'dayjs'
import {reqRoleList} from '../../ajax'

export default class User extends Component {
  state ={
    dataSource:[]
  }
  getRoleListMethod=async()=>{
    let result = await reqRoleList()
    const {status,data,msg} = result
    if(status===0){
      this.setState({dataSource:data})
    }else{
      message.error(msg)
    }
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
        // dataIndex: 'address',
        key: 'opera',
        width:'10%',
        align:'center',
        render:()=><Button type="link">设置权限</Button>
      },
    ];
    return (
      <Card title={<Button type="primary" icon={<PlusCircleOutlined />}>新增角色</Button>} >
      <Table 
      dataSource={this.state.dataSource} 
      columns={columns} 
      bordered
      />
    </Card>
    );
  }
}