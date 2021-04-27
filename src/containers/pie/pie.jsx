import React, { Component } from 'react';
import ReactECharts from 'echarts-for-react'

export default class Pie extends Component {
  getOption=()=>{
    return (
      {
      title: {
          text: '用户访问来源',
          subtext: '虚构',
          left: 'center'
      },
      tooltip: {
        trigger: 'item'
      },
      legend: {
          orient: 'vertical',
          left: 'left',
      },
      toolbox:{
        show:true,
        feature:{
          saveAsImage:{},
          restore:{},
          dataView:{}
        }
      },
      series: [
          {
              name: '访问来源',
              type: 'pie',
              radius: '50%',
              data: [
                  {value: 1048, name: '搜索引擎'},
                  {value: 735, name: '直接访问'},
                  {value: 580, name: '邮件营销'},
                  {value: 484, name: '联盟广告'},
                  {value: 300, name: '视频广告'}
              ],
              emphasis: {
                  itemStyle: {
                      shadowBlur: 10,
                      shadowOffsetX: 0,
                      shadowColor: 'rgba(0, 0, 0, 0.5)'
                  }
              }
          }
      ]
  }
    )
  }
  render() {
    return (
      <div >
        <ReactECharts style={{width:'100%',height:'500px'}} option={this.getOption()}/>
      </div>
    );
  }
}