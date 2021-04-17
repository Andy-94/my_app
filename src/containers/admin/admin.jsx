import React, { Component } from 'react';
import {connect} from 'react-redux'
import { Redirect } from 'react-router-dom';
import { Layout,} from 'antd';
import {createDeleteAction} from '../../redux/actions/login';
import './css/admin.less';
import Header from '../header/header.jsx'
const { Footer, Sider, Content } = Layout;
class Admin extends Component {

  render() {
    if(!this.props.isLogin) return <Redirect to="/login/"/>
    return (
      <Layout className="admin-root">
        <Sider className="admin-sider">Sider</Sider>
        <Layout>
          <Header/>
          <Content>Content</Content>
          <Footer>Footer</Footer>
        </Layout>
      </Layout>
    );
  }
}
export default connect(
  (state)=>({
    name:state.userInfo.user.username,
    isLogin:state.userInfo.isLogin //防止回调地狱
  }),//引入state
  {
    logout: createDeleteAction
  }//引入function
)(Admin)