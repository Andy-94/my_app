import React,{Component} from 'react'
import { Menu} from 'antd';
import {Link} from 'react-router-dom'
import './css/nav.less'
import meuns from '../../config/menu_config'

const { SubMenu, Item } = Menu;
export default class Nav extends Component{
  createMenu = (menuArr)=>{
    return menuArr.map((menuObj)=>{
      if(!menuObj.children){
        return (
          <Item key={menuObj.key} icon={<menuObj.icon/>}>
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
    })
  }
  

  render(){
    return (
      <div className="Nav">
        <div className="Nav-header">
          <img src="https://z3.ax1x.com/2021/04/05/cMnci8.png" alt="logo"/>
          <span>商品管理系统</span>
        </div>
        <div className="Nav_container">
          <Menu
            defaultSelectedKeys={['home']}
            defaultOpenKeys={['Chart_info']}
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