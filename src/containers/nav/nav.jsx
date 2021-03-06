import React,{Component} from 'react'
import { Menu} from 'antd';
import {Link, withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import {createSaveTitlerAction} from '../../redux/actions/title'
import './css/nav.less'
import meuns from '../../config/menu_config'

const { SubMenu, Item } = Menu;
class Nav extends Component{

  //验证用户权限
  RoleAuth =(menuObj)=>{
    const {rolePin} = this.props
    if(this.props.userName ==='admin') return true
    if(!menuObj.children){
      return rolePin.find((item)=> item === menuObj.key)
    }else{
      return menuObj.children.some((item2)=>rolePin.indexOf(item2.key) !== -1 )
    }
  }
  createMenu = (menuArr)=>{
    return menuArr.map((menuObj)=>{
      if(this.RoleAuth(menuObj)){
        if(!menuObj.children){
          return (
            <Item key={menuObj.key} icon={<menuObj.icon/>} onClick={()=>{this.props.titler(menuObj.title)}}>
                <Link to={menuObj.path}>{menuObj.title}</Link>
            </Item>
          )
        }else{
          return(
            <SubMenu key={menuObj.key} icon={<menuObj.icon/>} title={menuObj.title}>
              {this.createMenu(menuObj.children)}
           </SubMenu>
          )
        }
      }
    })
  }
  getTitlerByPath =()=>{
    let arr =this.props.location.pathname.split('/')
    let key = arr.reverse()[0]
    if(!key) key = 'home'
    //路由nav同步
    if(arr.indexOf('product') !== -1) key='product'
    let title =''
    meuns.forEach((meunObj)=>{
      if(meunObj.children instanceof Array){
        let result = meunObj.children.find((childrenObj)=>{
          return childrenObj.key === key
        })
        if(result) return title = result.title
      }else{
        if(meunObj.key === key) return title = meunObj.title
      }
    })
    this.props.titler(title)
  }
  componentDidMount(){
    if(!this.props.titler.name){
      this.getTitlerByPath()
    }
  }
  render(){
    const selectedKeys = this.props.location.pathname.split("/")
    let selectedOpenkey = selectedKeys.reverse()[0]
    //路由跳转时，nav会高亮
    if(selectedKeys.indexOf('product') !== -1) selectedOpenkey ='product'

    return (
      <div className="Nav">
        <div className="Nav-header">
          <img src="https://z3.ax1x.com/2021/04/05/cMnci8.png" alt="logo"/>
          <span>Manager System</span>
        </div>
        <div className="Nav_container">
          <Menu
            selectedKeys={[selectedOpenkey]}
            defaultOpenKeys={selectedKeys}
            mode="inline"
            theme="dark"
          >
            {this.createMenu(meuns)}
            {/* 递归
            <Item key="home" icon={<HomeOutlined />}>
              首页
            </Item>
            <SubMenu key="prod_about" icon={<AppstoreOutlined />} title="商品">
              <Menu.Item key="9" icon={<AlignCenterOutlined />}>分类管理</Menu.Item>
              <Menu.Item key="10"icon={<ToolOutlined />}>商品管理</Menu.Item>
            </SubMenu>
            <Item key="2" icon={<UserOutlined />}>
              用户管理
            </Item>
            <Item key="3" icon={<UsergroupAddOutlined />}>
              角色管理
            </Item>
            <SubMenu key="Chart_info" icon={<MailOutlined />} title="图形信息">
              <Item key="5" icon={<BarChartOutlined />}>Bar Chart</Item>
              <Item key="6" icon={<LineChartOutlined />}>Line Chart</Item>
              <Item key="7" icon={<PieChartOutlined />}>Pie Chart</Item>
            </SubMenu> */}
            
          </Menu>
        </div>
      </div>
    )
  }
}
export default connect(
  (state)=>({
    rolePin:state.userInfo.user.role.menus,
    userName: state.userInfo.user.username
  }),
  {
    titler:createSaveTitlerAction
  }
)(withRouter(Nav))