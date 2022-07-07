import React from 'react';
import { Link } from 'react-router-dom';
import imageDog from '../../assets/dog.jpg';

export default function Landing() {
  return (<div>
           <h1>Dog App</h1>
           <img src={imageDog} width="700" height="500" alt='img-dog'/>
           <Link to='/home'>Go Home</Link>
          </div>
          )
}
