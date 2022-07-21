import React,{useEffect} from 'react'
import {useSelector,useDispatch} from 'react-redux';
import {getTemperaments,filterByTemperament,filterByTypeData,orderByName,orderByWeigth}
from '../../redux/action';

import s from './MenuSelect.module.css'

export default function MenuSelect({setOrder,setCurrentPage}) {
const temperaments=useSelector(state=>state.temperaments);
const dispatch=useDispatch();


 useEffect(()=>
 dispatch(getTemperaments()),[dispatch])
 
 const handleChangeFilterTemp=(e)=>{
  dispatch(filterByTemperament(e.target.value));
  setCurrentPage(1);
 }
const handleChangeFilterData=(e)=>{
  dispatch(filterByTypeData(e.target.value));
  setCurrentPage(1);
 }
 const handleChangeSortByName=(e)=>{
  dispatch(orderByName(e.target.value));
  setOrder(`Sort by Name ${e.target.value}`);
  setCurrentPage(1);
}
const handleChangeSortByWeight=(e)=>{
  dispatch(orderByWeigth(e.target.value));
  setOrder(`Sort by Weigth ${e.target.value}`);
  setCurrentPage(1);
}
  return (
    <div className={s.menu}>
      <div>
      <select onChange={(e)=>handleChangeFilterTemp(e)}>
            <option value='All-Temperaments'>All Temperaments</option>
            {temperaments&& temperaments?.map(t=>(<option key={t.id} value={t.name}>{t.name}</option>))}
        </select>
        <select onChange={(e)=>handleChangeFilterData(e)}>
            <option value='All-Data'>All Data</option>
            <option value='Api'>From Api</option>
            <option value='DataBase'>From DataBase</option>
        </select>
      </div>
       <div>
       <select onChange={(e)=>handleChangeSortByName(e)}>
            <option value=''>Sorted by Name</option>
            <option value='A-Z'>From A to Z</option>
            <option value='Z-A'>From Z to A</option>
        </select>
        <select onChange={(e)=>handleChangeSortByWeight(e)}>
            <option value=''>Sorted by weight</option>
            <option value='lower-higher'>Lower to Higher  ⬇</option>
            <option value='higher-lower'>Higher to Lower  ⬆</option>
        </select>
       </div>
        
    </div>
  )
}
