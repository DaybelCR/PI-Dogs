import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';

import {onSearchByName,getAllDogs} from '../../redux/action';

export class NavBar extends Component {
    constructor(props){
        super(props);
        this.setCurrentPage=this.props.setCurrentPage;
        this.state={
            name:'',
        }
    }
    handleOnChange=(e)=>{
        this.setState({name:e.target.value})
      }
    
    handleSubmit=(e)=>{
    e.preventDefault();
      if(!this.state.name) return alert ('Please,write a name !!!');
      this.props.onSearchByName(this.state.name);
      this.setState({name:''});
      this.setCurrentPage(1);
    }
   
    reloadDogs=(e)=>{
    e.preventDefault();
    this.props.getAllDogs()
    this.setCurrentPage(1);
    }
  render() {
    return (
        <header>
        <h2>Dogs App</h2>
        <nav>
            <ul>
                <li><Link to='/home'>Home</Link></li>
                {/* <li><Link to='/about'>About</Link></li> */}
                <li><Link to='/createDog'>Create a new breed</Link></li>
                <li><Link to='/'>Go Back</Link></li>
            </ul>
        </nav>
        <form onSubmit={(e)=>this.handleSubmit(e)}>
            <input type="text" placeholder='Search By Breed' onChange={(e)=>this.handleOnChange(e)}
             value={this.state.name} />
            <input type="submit" value="Search" />
        </form>
        <button onClick={(e)=>this.reloadDogs(e)}>Reload all dogs</button>
        </header>
    )
  }
}


export default connect(null,{onSearchByName,getAllDogs})(NavBar)

