import {FILTER_BY_TEMPERAMENT, FILTER_BY_TYPE_DATA, GET_DOGDETAIL,
        GET_DOGS, 
        GET_TEMPERAMENTS, 
        ON_SEARCH_DOGS_BY_NAME,
        ORDER_BY_NAME,
        ORDER_BY_WEIGTH}
 from './actionTypes.js';

import axios from 'axios';

export function getAllDogs(){
    return async function(dispatch){
        return fetch('http://localhost:3001/dogs')
                .then(response=>response.json())
                .then(arrayDogs=>dispatch({
                    type:GET_DOGS,
                    payload:arrayDogs
                }))
    }
}

export  function onSearchByName(name){
    return async function(dispatch){
        const response=await fetch(`http://localhost:3001/dogs?name=${name}`);
        const data=await response.json();
        if(Array.isArray(data)){
            return dispatch({
                type:ON_SEARCH_DOGS_BY_NAME,
                payload:data
            })
        }else{
            return alert(data.message);
        }
       
    }
}

export function getTemperaments(){
    return async function(dispatch){
        return fetch('http://localhost:3001/temperaments')
               .then(response=>response.json())
               .then(data=>dispatch({
                type:GET_TEMPERAMENTS,
                payload:data
               }))
    }
}

export function getDogDetail(idRaza){
    return async function(dispatch){
         return axios.get(`http://localhost:3001/dogs/${idRaza}`)
                     .then(({data})=>dispatch({
                        type:GET_DOGDETAIL,
                        payload:data
                     }))
    }
}

export function filterByTemperament(payload){
        return {
            type:FILTER_BY_TEMPERAMENT,
            payload
        }

}

export function filterByTypeData(payload){
        return {
            type:FILTER_BY_TYPE_DATA,
            payload
        }
    }
   

export function orderByName(payload){
        return {
            type:ORDER_BY_NAME,
            payload
        }
    
}

export function orderByWeigth(payload){
        return {
            type: ORDER_BY_WEIGTH,
            payload
        }
    
}

export function postDog(payload){
    return async function(dispatch){
        axios.post('http://localhost:3001/dogs',payload)
            .then(response=>response)
   }
}