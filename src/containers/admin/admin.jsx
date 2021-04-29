import React, { Component } from 'react';
import {connect} from 'react-redux'
import { Redirect, Route, Switch} from 'react-router-dom';
import { Layout,} from 'antd';
import {createDeleteAction} from '../../redux/actions/login';
import './css/admin.less';
import Home from '../../components/home/home'
import Category from '../category/category'
import Manager from '../../components/manager/manager'
import AddUpdate from '../add_update/addUpdate'
import Detail from '../detail/detail'
import User from '../../components/user/user'
import Role from '../../components/role/role'
import Line from '../../components/Line/line'
import Bar from '../../components/bar/bar'
import Pie from '../../components/pie/pie'
import Nav from '../nav/nav'
import Header from '../header/header.jsx'
const { Footer, Sider, Content } = Layout;
class Admin extends Component {

  render() {
    if(!this.props.isLogin) return <Redirect to="/login/"/>
    return (
      <Layout className="admin-root">
        <Sider className="admin-sider">
          <Nav/>
        </Sider>
        <Layout>
          <Header/>
          <Content className="admin-content">
          <Switch>
            <Route path={"/admin/home"} component={Home} />
            <Route path={"/admin/prod_about/category"} component={Category} />
            <Route path={"/admin/prod_about/product"} component={Manager} exact/>
            <Route path={"/admin/prod_about/product/detail/:id"} component={Detail}/>
            <Route path={"/admin/prod_about/product/addupdate"} component={AddUpdate}/>
            <Route path={"/admin/prod_about/product/addupdate/:id"} component={AddUpdate}/>
            <Route path={"/admin/user"} component={User} />
            <Route path={"/admin/role"} component={Role} />
            <Route path={"/admin/charts/bar"} component={Bar} />
            <Route path={"/admin/charts/line"} component={Line} />
            <Route path={"/admin/charts/pie"} component={Pie} />
            <Redirect to={"/admin/home"}/>
          </Switch>
          </Content>
          <Footer className="admin-footer">
            <span>E-system©2021 Created by Yuan(Andy) Qian</span>
          </Footer>
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