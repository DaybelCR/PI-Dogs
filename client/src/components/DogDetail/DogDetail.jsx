import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getDogDetail } from '../../redux/action';


export class DogDetail extends Component {
  constructor(props){
    super(props);
    this.state={
        loading:true,
    }
}
  componentDidMount(){
    setTimeout(()=>{this.setState({loading:!this.state.loading})}
    ,2000)
  const id=this.props.match.params.idDog;
   this.props.getDogDetail(id);
  }

  render() {
   const {name,height,weight,image,life_span,temperaments}=this.props.dogDetail;
   return(
    <div>
      <Link to='/home'>Go to Home</Link>
       {this.state.loading?
      (<div>
          <img src='https://static.solvpath.com/media/images/8/processing_gif_petjoy.gif' 
           alt='gif-loading'/>
      </div>)
     :(<div>
        <img src={image?image:
          'https://www.seekpng.com/png/full/360-3605845_dog-holding-paper-in-mouth.png'}
           width="600" height="400" alt='dog-detail'/>
           <h2>Name : {name}</h2>
           <p>Height : {height} cm</p>
           <p>Weight : {weight} kg</p>
         <p>Life Span : {life_span}</p>
         {temperaments?(<p>Temperaments : {temperaments} </p>):null}
      </div>
    )}
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