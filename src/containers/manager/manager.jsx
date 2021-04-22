import React, { Component } from 'react';
import {Card, Button, Input, Select, Table, message} from 'antd'
import {SearchOutlined , PlusCircleOutlined} from '@ant-design/icons'
import {reqCategoryListData,reqCategoryUpdateStatus} from '../../ajax'
import {Page_size} from '../../config'

const { Option } = Select;
export default class Manager extends Component {
  state ={
    prdocutList:[],
    total:[],
    isloading: true
  }
  //更新页面，updatastate
  getChangeStatus = async({_id,status})=>{
    if(status === 1) status = 2
    else status = 1
    let result = await reqCategoryUpdateStatus(_id,status)
    const _status = result.status
    if(_status === 0){
      message.success('success')
      let arr = [...this.state.prdocutList]
      arr.forEach((item)=>{
        if(item._id === _id){
          item.status = status
        }
      })
      this.setState({prdocutList:arr})
      // let arr = [...this.state.prdocutList]
      // arr.forEach((item)=>{
      //   if(item._id ===_id){
      //     item.status = status
      //   }
      // })
      // this.setState({prdocutList:arr})
    }else{
      message.error(result.msg)
    }

  }
  getCategoryListData = async(number)=>{
    this.setState({isloading:true})
    let result = await reqCategoryListData(number,Page_size)
    const {status,data,msg} = result
    if(status === 0){
      const {total,list} = data
      this.setState({prdocutList:list,total,isloading:false})
      // console.log(pages)
    }else{
      this.setState({isloading:false})
      message.error(msg)
    }
  }

  componentDidMount(){
    this.getCategoryListData(1)
  }
  render() {
    const dataSource = this.state.prdocutList
    
    const columns = [
      {
        title: 'Product Brand',
        dataIndex: 'name',
        key: 'name',
        width:'16%'
      },
      {
        title: 'Product Describe',
        dataIndex: 'desc',
        key: 'desc',
        width:'70%'
      },
      {
        title: 'Price',
        dataIndex: 'price',
        key: 'price',
        align:'center',
        render:(price)=> '$' + price
      },
      {
        title: 'Status',
        // dataIndex: 'status',
        key: 'status',
        align:'center',
        render:(item)=>(
          <div>
            <Button onClick={()=>{this.getChangeStatus(item)}} type={item.status === 1 ? "danger" : "primary"}>{item.status === 1? '下架':'上架'}</Button><br/>
            <span>{item.status === 1 ? "在售" : "售完"}</span>
          </div>
        )
      },
      {
        title: 'Operation',
        //dataIndex: 'address',
        key: 'operation',
        align:'center',
        render: ()=>(
          <div>
            <Button type="link">Detail</Button><br/>
            <Button type="link">Modify</Button>
          </div>
        )
      },
    ];
    return (
      <Card 
        title={
          <div>
             <Select defaultValue="CategoryName">
              <Option value="CategoryName">按名称搜索</Option>
              <Option value="CategoryDescribe">按描述搜索</Option>
            </Select>
            <Input style={{width:'30%',margin:'0 10px'}} placeholder="Please input key words"/>
            <Button type="primary" icon={<SearchOutlined />}>搜索</Button>
          </div>
        }
        extra={<Button type="primary" icon={<PlusCircleOutlined />}>Add Button</Button>}>
     <Table 
      bordered
      loading = {this.state.isloading}
      rowKey = '_id' 
      dataSource={dataSource} 
      columns={columns} 
      pagination={{
        pageSize:Page_size,
        total:this.state.total,
        onChange:(number)=>{this.getCategoryListData(number)}
      }
      }
      />
    </Card>
    );
  }
}