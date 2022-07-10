import React from 'react';
import { Link } from 'react-router-dom';

import imageNotFound from '../../assets/image_not_found.png';


export default function CardsDogs({dogsPerPage}) {


  return (
    <div>
      {dogsPerPage&&dogsPerPage?.map(objDogs=><CardDog
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
      <h2>{name}</h2>
      <p>Weight : {weight} kg</p>
      <img src={image?image:imageNotFound}
      width="300" height="200" alt='dog'/>
      {temperaments?(<p>{temperaments}</p>):(<p>Unknown</p>)}
    </div>
   </Link> 
  )
}

