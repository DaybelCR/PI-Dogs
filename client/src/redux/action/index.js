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
        return fetch('https://pi-dogs-7.herokuapp.com/dogs')
                .then(response=>response.json())
                .then(arrayDogs=>dispatch({
                    type:GET_DOGS,
                    payload:arrayDogs
                }))
                .catch(e=>console.log(e))
    }
}

export  function onSearchByName(name){
    return async function(dispatch){
        const response=await fetch(`https://pi-dogs-7.herokuapp.com/dogs?name=${name}`);
        const data=await response.json();
        try{
            if(Array.isArray(data)){
                return dispatch({
                    type:ON_SEARCH_DOGS_BY_NAME,
                    payload:data
                })
            }else{
                return alert(data.message);
            }
        }catch(e){
            console.log(e)
        }
       
    }
}

export function getTemperaments(){
    return async function(dispatch){
        return fetch('https://pi-dogs-7.herokuapp.com/temperaments')
               .then(response=>response.json())
               .then(data=>dispatch({
                type:GET_TEMPERAMENTS,
                payload:data
               }))
               .catch(e=>console.log(e))
    }
}

export function getDogDetail(idRaza){
    return async function(dispatch){
         return axios.get(`https://pi-dogs-7.herokuapp.com/dogs/${idRaza}`)
                     .then(({data})=>dispatch({
                        type:GET_DOGDETAIL,
                        payload:data
                     }))
                     .catch(e=>console.log(e))
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
        axios.post('https://pi-dogs-7.herokuapp.com/dogs',payload)
            .then(response=>{return alert(response.data.message)})
            .catch(e=>{return alert(e.response.data.message)})
   }
}
