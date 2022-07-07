import React,{useEffect} from 'react';
import { Link } from 'react-router-dom';
import {useSelector,useDispatch} from 'react-redux';
import { getAllDogs } from '../../redux/action';
import imageNotFound from '../../assets/image_not_found.png';


export default function CardsDogs() {
const dogs=useSelector(state=>state.dogs);
const dispatch=useDispatch();
useEffect(()=>
 dispatch(getAllDogs()),[dispatch])

  return (
    <div>
      {dogs&&dogs?.map(objDogs=><CardDog
      key={objDogs.id}
      id={objDogs.id}
      name={objDogs.name}
      weight={objDogs.weight}
      image={objDogs.image}
      temperaments={objDogs.temperaments}
      />
      )}
    </div>
  )
}

export function CardDog({id,name,weight,image,temperaments}){
  return(
   <Link to={`/detailDog/${id}`}>
   <div>
      <p>{name}</p>
      <p>{weight}</p>
      <img src={image?image:imageNotFound}
      width="300" height="200" alt='dog'/>
      <p>{temperaments}</p>
    </div>
   </Link> 
  )
}


