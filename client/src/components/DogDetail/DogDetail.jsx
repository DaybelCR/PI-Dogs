import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getDogDetail } from '../../redux/action';


export class DogDetail extends Component {
  componentDidMount(){
  const id=this.props.match.params.idDog;
   this.props.getDogDetail(id);
  }

  render() {
   const {name,height,weight,image,life_span}=this.props.dogDetail;
    return (
      <div>
        <img src={image?image:
          'https://www.seekpng.com/png/full/360-3605845_dog-holding-paper-in-mouth.png'}
           width="600" height="400" alt='dog-detail'/>
         <p>Name : {name}</p>
         <p>Height : {height}</p>
         <p>Weight : {weight}</p>
         <p>Life Span : {life_span}</p>
      </div>
    )
  }
}

const mapStateToProps=(state)=>{
return{
  dogDetail:state.dogDetail,
}
}
const mapDispatchToProps=(dispatch)=>{
return {
  getDogDetail:(id)=>dispatch(getDogDetail(id)),
}
}

export default connect(mapStateToProps,
  mapDispatchToProps)(DogDetail);