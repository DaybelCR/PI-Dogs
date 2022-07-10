import React, { useState,useEffect } from 'react';
import {useSelector,useDispatch} from 'react-redux';
import { getAllDogs } from '../../redux/action';
import MenuSelect from '../MenuSelect/MenuSelect';
import NavBar from '../NavBar/NavBar';
import CardsDogs from '../CardsDogs/CardsDogs';


export default function Home() {
const dogs=useSelector(state=>state.dogs);
const dispatch=useDispatch();
useEffect(()=>
 dispatch(getAllDogs()),[dispatch])

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
      <>
      <NavBar/>
      <MenuSelect 
      setOrder={setOrder}
      />
      <div>
      {currentPage===1||currentPage<1?null:(<button onClick={goPreviusPage}>Previus</button>)} 
       {arr.map(page=><button key={page} onClick={()=>handleClick(page)}>{page}</button>)} 
      {currentPage===max||currentPage>max?null:(<button onClick={goNextPage}>Next</button>)} 
      </div>
      <CardsDogs
       dogsPerPage={dogsPerPage}
       />
      </>
    )
  }

