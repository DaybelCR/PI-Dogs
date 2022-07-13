import React from 'react';
import { Link } from 'react-router-dom';

import imageNotFound from '../../assets/image_not_found.png';


export default function CardsDogs({dogsPerPage}) {

  if(dogsPerPage.length>0){
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
  }else{
    return(
       <div>
        <img src="https://cdn.dribbble.com/users/440966/screenshots/5367124/404-error-luckydog.gif" 
        width="600" height="350" alt="gif-error-404" />
        <h3>ERROR 404</h3>
        <p>We can't find what you are looking for :{"("} </p>
       </div>
    )
  }
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
