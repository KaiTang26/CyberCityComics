import React, { Component } from 'react';
import './App.css';
import Landing from './components/layout/Landing';
import api from './utils/api';

class App extends Component {
  constructor(props){
      super(props);
      this.state={
        data:{},
        page:0,
        maxPage:0
      }
  }

  componentDidMount(){
    api.fetchHome()
        .then(res => {
          console.log(res);
          if (res){
            this.setState({
              data:res,
              page:res.num,
              maxPage:res.num
            })
          }
         
        })
  }
  clickHome=()=>{
    if (this.state.page>0){
      api.fetchHome()
      .then(res=>{
        this.setState({
          data:res,
          page:res.num
        })
      })
    }
  }
  clickPrev=()=>{
    if (this.state.page>0){
      this.setState({page:this.state.page-1},()=>{
        api.fetchPage(this.state.page)
        .then(res=>{
          this.setState({
            data:res
          })
        })
      })
    }
  }
  clickNext=()=>{
    if (this.state.page<this.state.maxPage){
      this.setState({page:this.state.page+1},()=>{
        api.fetchPage(this.state.page)
        .then(res=>{
          this.setState({
            data:res
          })
        })
      })
    }
  }
  clickRandom=()=>{
    const number=this.state.maxPage*Math.random();
    this.setState({page:Math.round(number)},()=>{
      api.fetchPage(this.state.page)
      .then(res=>{
        this.setState({
          data:res
        })
      })
    })
  }

  handleKeyDown=(event)=>{
    const key = event.keyCode || event.which
    if(key===13){
      const value = event.target.value;
      if(!isNaN(value)){
        if(value>0 && value<=this.state.maxPage){
          this.setState({page:value},()=>{
            api.fetchPage(this.state.page)
            .then(res=>{
              this.setState({
                data:res
              })
            })
          })

        } 
      }
    }
    
  }

  

  render() {

    return (
      <div className="App">
        <div className="topnav">
          <div className="leftBar">
            <div onClick={this.clickHome}>Home</div>
            <div onClick={this.clickPrev}>Back</div>
            <div onClick={this.clickNext}>Next</div>
          </div>
          <div className="rightBar">
            <input placeholder="Enter page to search" type="text"  onKeyDown={this.handleKeyDown}/>
            <div onClick={this.clickRandom}>Random</div>
          </div>
        </div>
        <Landing data={this.state.data}/>
      </div>
    );
  }
}

export default App;
