import React from 'react';
import { Link } from 'react-router-dom';
import s from './CardsDogs.module.css';

import imageNotFound from '../../assets/image_not_found.png';


export default function CardsDogs({dogsPerPage}) {

  if(dogsPerPage.length>0){
    return (
   <div className={s.cards}>
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
       <div className={s.error}>
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
   
   <div className={s.card} title='Go Details'>
     <Link to={`/detailDog/${id}`} className={s.link}>
      <h2>{name}</h2>
      <p>Weight : {weight} kg</p>
      <div> <img src={image?image:imageNotFound}
      width="200" height="150" alt='dog'/></div>
      {temperaments?(<p>{temperaments}</p>):(<p>Unknown</p>)}
      </Link> 
    </div>
   
  )
}
