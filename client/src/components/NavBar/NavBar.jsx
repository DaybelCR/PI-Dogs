import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import Casa from '../../assets/casa.png';
import Writing from '../../assets/writing.png';
import Pawprint from '../../assets/pawprint.png';
import Search from '../../assets/search.png';

import s from './NavBar.module.css';

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
        <header className={s.header}>
        <nav className={s.nav}>
            <ul>
                <li ><Link to='/' className={s.link_img}><img src={Pawprint} width="45" height="45" alt="logo-pawprint"  /></Link></li>
                <li><Link to='/home' className={s.link}><img src={Casa} width="25" height="25" alt="logo-home"  /><span>Home</span></Link></li>
                {/* <li><Link to='/about'>About</Link></li> */}
                <li><Link to='/createDog'className={s.link}><img src={Writing} width="25" height="25" alt="logo-create" /><span>Create</span></Link></li>
            </ul>
        </nav>
        <form onSubmit={(e)=>this.handleSubmit(e)} >
            <input type="text" placeholder='Search By Breed' onChange={(e)=>this.handleOnChange(e)}
             value={this.state.name} />
            <button type='submit'><img src={Search} alt="logo-search" width="20" height="20"/></button>
        </form>
        <button onClick={(e)=>this.reloadDogs(e)}>Reload</button>
        </header>
    )
  }
}



export default connect(null,{onSearchByName,getAllDogs})(NavBar)

