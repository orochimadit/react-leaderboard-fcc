import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import Table from 'react-bootstrap/lib/Table';
import Image from 'react-bootstrap/lib/Image';

class App extends Component {
 state ={
   top100Days:[],
   top100AllTime:[],
   current:true
 }
 getFccData(url,stateName){
 axios.get(url).then(({data}) => {
   this.setState({[stateName]:data});
   
  console.log(this.state.top100Days);
 // console.log(this.state.top100AllTime);
});
}
pointChange(value){
  if(this.state.current !== value){
      this.setState({current :value});
  }
}
componentDidMount(){
  this.getFccData('https://fcctop100.herokuapp.com/api/fccusers/top/recent','top100Days');
  this.getFccData('https://fcctop100.herokuapp.com/api/fccusers/top/alltime','top100AllTime');
}

render() {
  const {top100Days,top100AllTime,current}=this.state;
    return (
      <div className="App container">
          <Table stripped bordered condensed hover className="colorBlack">
            <thead>
              <tr>
                <th>#</th>
                <th>Camper Name</th>
                <th onClick={(event) => this.pointChange(true)}>Points in 30 days{current && (<i className="fa fa-caret-down"></i>)}</th>
                <th onClick={(event) => this.pointChange(false)}>All time points{current===false && (<i className="fa fa-caret-down"></i>)}</th>
              </tr>
            </thead>
            <tbody>
              {current===true && (top100Days.map((row,index)=>(
                <tr key={row.username}>
                  <td>{index+1}</td>
                  <td><a href={'https://www.freecodecamp.org/${row.username}'}>
                    <Image src={row.img} className="imgHeight" circle/>{row.username}
                  </a></td>
                  <td>{row.recent}</td>
                  <td>{row.alltime}</td>
                </tr>
              )))}

              {current===false && (top100AllTime.map((row,index)=>(
                <tr key={row.username}>
                  <td>{index+1}</td>
                  <td><a href={'https://www.freecodecamp.org/${row.username}'}>
                    <Image src={row.img} className="imgHeight" circle/>{row.username}
                  </a></td>
                  <td>{row.recent}</td>
                  <td>{row.alltime}</td>
                </tr>
              )))}
            </tbody>
          </Table>
      </div>
    );
  }
}

export default App;
