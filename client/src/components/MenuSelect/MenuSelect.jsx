import React,{useEffect} from 'react'
import {useSelector,useDispatch} from 'react-redux';
import {getTemperaments} from '../../redux/action';

export default function MenuSelect() {
const temperaments=useSelector(state=>state.temperaments);
const dispatch=useDispatch();
 useEffect(()=>
 dispatch(getTemperaments()),[dispatch])

  return (
    <div>
        FILTRAR
        <select>
            <option>All Temperaments</option>
            {temperaments&& temperaments?.map(t=>(<option key={t.id} value={t.name}>{t.name}</option>))}
        </select>
        <select>
            <option>All Data</option>
            <option>From Api</option>
            <option>From DataBase</option>
        </select>
        ORDENAR  
        <select>
            <option>Sort name from A to Z</option>
            <option>Sort name from Z to A</option>
        </select>
        <select>
            <option>Higher to Lower weight ⬆</option>
            <option>Lower to Higher weight ⬇</option>
        </select>
    </div>
  )
}
