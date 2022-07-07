import React, { Component } from 'react';
import MenuSelect from '../MenuSelect/MenuSelect';
import NavBar from '../NavBar/NavBar';
import CardsDogs from '../CardsDogs/CardsDogs';


export default class Home extends Component {
  render() {
    return (
      <>
      <NavBar/>
      <MenuSelect/>
      <CardsDogs/>
      </>
    )
  }
}
