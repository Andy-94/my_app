import React, { Component } from 'react';
import {connect} from 'react-redux'
import {createSaveUserAction} from '../../redux/actions/login'
import {Redirect} from 'react-router-dom'
import { Form, Input, Button, message} from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import './less/login.less'
import { reqLogin } from '../../ajax';

const {Item} = Form
//ui component
class Login extends Component {
    onFinish =async(values)=>{
      // console.log('Received values of form: ', values);
      const {username,password} = values
      let result = await reqLogin(username,password)
      const {status,data,msg} = result
      if(status===0){
        message.success('success')
        this.props.save(data) //向redux存入data数据
        this.props.history.replace('/admin')
      }else{
        message.warning(msg)
      }
    }
  render() {
    console.log(this.props.isLogin)
    if(this.props.isLogin) return <Redirect to="/admin/"/>
    return ( 
      <div className="loginPage">
        <div className="header">
          <img src="https://z3.ax1x.com/2021/04/05/cMnci8.png" alt="logo"/>
          <h2>商品管理系统</h2>
        </div>
        <div className="loginBlock">
          <div className="loginBlockRound">
            <h2>用户登陆</h2>
            <Form
              name="normal_login"
              className="login-form"
              onFinish={this.onFinish}
            >
              <Item
                name="username"
                rules={[
                  {
                    required: true,
                    message: 'Please input your Username!',
                  },
                ]}
              >
                <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
              </Item>
              <Item
                name="password"
                rules={[
                  {
                    required: true,
                    message: 'Please input your Password!',
                  },
                ]}
              >
                <Input
                  prefix={<LockOutlined className="site-form-item-icon" />}
                  type="password"
                  placeholder="Password"
                />
              </Item>

              <Item>
                <Button type="primary" htmlType="submit" className="login-form-button">
                  登陆
                </Button>
              </Item>
            </Form>
          </div>
        </div>
      </div>
    );
  }
}
//container component
export default connect(
  (state)=>({
    isLogin:state.userInfo.isLogin,
  }),
  {
    save:createSaveUserAction
  }
)(Login)

