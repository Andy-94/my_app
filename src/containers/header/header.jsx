import React, { Component } from 'react';
import {Modal, Button, Space} from 'antd'
import {connect} from 'react-redux'
import {FullscreenOutlined, FullscreenExitOutlined,ExclamationCircleOutlined} from '@ant-design/icons'
import screenfull from 'screenfull'
import dayjs from 'dayjs'
import {createDeleteAction} from '../../redux/actions/login'
import {createSaveTitlerAction} from '../../redux/actions/title'
import './css/header.less'

const { confirm } = Modal;
class header extends Component {
  //退出icon变化，全屏
  state = {
    isFull:false,
    date: dayjs().format('HH:mm:ss / MM-DD / YYYY')
  }
  fullScreen=()=>{
    screenfull.toggle();
  }
  componentDidMount(){
    screenfull.onchange(()=>{
      let isFull = !this.state.isFull
      this.setState({isFull})
    });
    this.timer = setInterval(() => {
      this.setState({date:dayjs().format('HH:mm:ss / MM-DD / YYYY')})

    },1000);
  }
  componentWillUnmount(){
    clearInterval(this.timer)
  }
  logOut =()=>{
    confirm({
      title: 'Do you Want to Log out your account?',
      icon: <ExclamationCircleOutlined />,
      content: 'Log out',
      onOk:()=> {
        this.props.logout()
        this.props.deleterTitle('')
      },
      onCancel() {
      },
    });
    // this.props.logout()
  }
  render() {
    return (
      <div className="header">
        <div className="header-top">
          <Button size="small" onClick={this.fullScreen} icon={this.state.isFull ? <FullscreenExitOutlined/> : <FullscreenOutlined /> }>
          </Button>
          <span className="header-user">Welcome, {this.props.name}</span>
          <Space>
            <Button type="link" onClick={this.logOut}>Log out</Button>
          </Space>
        </div>
        <div className="header-bottom">
          <div className="bottom-left">
            <h1>{this.props.title} Page</h1>
          </div>
          <div className="bottom-right">
            <h3>{this.state.date}</h3>
          </div>
        </div>
      </div>
    );
  }
}
export default connect(
  (state)=>({
    name:state.userInfo.user.username,
    title:state.title
  }),
  {
    logout:createDeleteAction,
    deleterTitle:createSaveTitlerAction
  }
)(header)
