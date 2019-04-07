import React, {Component} from 'react'
//import '../style/Navbar.css';


class Landing extends Component{
    render(){
        const {data}=this.props;
        return(
            <div className="content">
                <div className="titleSection">
                    {data.title}
                </div>
                <div className="subSection">
                    <div>Publish Date: {data.year}-{data.month}-{data.day}</div>
                    <div>Page Number: {data.num}</div>
                    <div>Browsered: {data.count}</div>
                </div>
                <img src={data.img}/>
            </div>
        )
    }
}

export default Landing;