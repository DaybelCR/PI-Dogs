import React, { useState,useEffect } from 'react';
import {useSelector,useDispatch} from 'react-redux';
import { getAllDogs } from '../../redux/action';

import MenuSelect from '../MenuSelect/MenuSelect';
import NavBar from '../NavBar/NavBar';
import CardsDogs from '../CardsDogs/CardsDogs';

import s from './Home.module.css';


export default function Home() {
const dogs=useSelector(state=>state.dogs);
const dispatch=useDispatch();
useEffect(()=>
 dispatch(getAllDogs()),[dispatch])

 const [loading,setLoading]=useState(true);
 // eslint-disable-next-line
useEffect(()=>{setTimeout(()=>{setLoading(!loading)},2000)},[setLoading])

  // eslint-disable-next-line
const[order,setOrder]=useState('');
const [currentPage,setCurrentPage]=useState(1);
// eslint-disable-next-line
const [perPage,setPerPage]=useState(8);

const max= Math.ceil(dogs.length/perPage);
const dogsPerPage=dogs.slice((currentPage-1)*perPage,(currentPage-1)*perPage+perPage); //0,8//8,16//16,32...
let arr=[];
     for(let i=1;i<=max;i++){
        arr.push(i)
      }
     const goPreviusPage=()=>{setCurrentPage(()=>currentPage-1)};
     const handleClick=(pag)=>{setCurrentPage(()=>pag)};
     const goNextPage=()=>{setCurrentPage(()=>currentPage+1)};
    return (
      <main className={s.main}>
      <NavBar
       setCurrentPage={setCurrentPage}
      />
      <MenuSelect 
      setCurrentPage={setCurrentPage}
      setOrder={setOrder}
      />

      <div className={max?s.pages:null}>
      {currentPage===1||currentPage<1?null:(<button onClick={goPreviusPage}className={s.button}>Previus</button>)} 
       {arr.map(page=><button className={page===currentPage?`${s.button} ${s.active}`:s.button} key={page} onClick={()=>handleClick(page)}>{page}</button>)} 
      {currentPage===max||currentPage>max?null:(<button onClick={goNextPage} className={s.button}>Next</button>)} 
      </div>

      {loading?
       (<div className={s.loading}>
        <img src='https://static.solvpath.com/media/images/8/processing_gif_petjoy.gif' 
         alt='gif-loading'/>
        </div>):
       <CardsDogs
       dogsPerPage={dogsPerPage}
       />
      }
      </main>
    )
  }
