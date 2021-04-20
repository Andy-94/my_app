import React, { Component } from 'react';


export default class Home extends Component {
  state={andy:[1,2,3,4,5,6,7,8]}
  render() {
    
    return (
      <div>
        home
        {
          this.state.andy.map((numberObj,index)=>{
            return <div key={index}>{numberObj}</div>
          })
        }
      </div>
    );
  }
}
