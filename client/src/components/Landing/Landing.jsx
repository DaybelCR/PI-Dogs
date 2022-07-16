import React from 'react';
import { Link } from 'react-router-dom';

import s from './Landing.module.css';

export default function Landing() {
  return (<div className={s.landing}>
           <div className={s.div}>
           <h1>Welcome to Dogs App .<span>&#160;</span></h1>
           <Link to='/home' className={s.link}>Start</Link>
           </div>
          </div>
          )
}
