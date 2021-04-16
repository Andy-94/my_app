import React, { Component } from 'react';
import {connect} from 'react-redux'
import { Redirect } from 'react-router-dom';

class Admin extends Component {
  render() {
    if(!this.props.isLogin) return <Redirect to="/login/"/>
    return (
      <div>
        Hello, this is {this.props.name}
      </div>
    );
  }
}
export default connect(
  (state)=>({
    name:state.userInfo.user.username,
    isLogin:state.userInfo.isLogin
  }),//引入state
  {}//引入function
)(Admin)