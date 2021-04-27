import React, { Component } from 'react';
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import { Form, Input, Button, message} from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import './less/login.less'
import {createSaveUserAction} from '../../redux/actions/login'
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
    // console.log(this.props.isLogin)
    if(this.props.isLogin) return <Redirect to="/admin/"/>
    return ( 
      <div className="loginPage">
        <div className="header">
          <img src="https://z3.ax1x.com/2021/04/05/cMnci8.png" alt="logo"/>
          <h2>Product Manager System</h2>
        </div>
        <div className="loginBlock">
          <div className="loginBlockRound">
            <h2>Customer Login</h2>
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
                    message: 'Please input your username!',
                  },
                  {
                    min:5,
                    message:'please input more than five words',
                  },
                  {
                    max:12,
                    message:'please input less than twelve words',
                  },
                  {
                    pattern: '[A-Za-z0-9_\-\u4e00-\u9fa5]+',
                    message:'please input correct username',
                  }
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
                  {
                    min:4,
                    message:'please input more than four words',
                  },
                  {
                    whitespace: true,
                    message: 'Password is not white space!',
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
                  Log On
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

