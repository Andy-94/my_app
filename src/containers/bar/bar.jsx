import React, { Component } from 'react';
import ReactECharts from 'echarts-for-react';

export default class Bar extends Component {
  getOption =()=>{
    return(
      {
        title: {
            text: 'Product Sale Bar Chart'
        },
        tooltip: {
          
        },
        toolbox:{
          show:true,
          feature:{
            saveAsImage:{},
            restore:{},
            dataView:{}
          }
        },
        legend: {
            data:['销量','价格']
        },
        xAxis: {
            data: ["衬衫","羊毛衫","雪纺衫","裤子","高跟鞋","袜子"]
        },
        yAxis: {},
        series: [{
            name: '销量',
            type: 'bar',
            data: [5, 20, 36, 10, 10, 20]
        },
        {
          name: '价格',
          type: 'bar',
          data: [15, 25, 15, 20, 12, 24]
      }]
    }
    )
  }
  render() {
    return (
      <div>
       <ReactECharts style={{width:'100%',height:'500px'}} option={this.getOption()} />
      </div>
    );
  }
}