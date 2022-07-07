import { GET_DOGDETAIL, GET_DOGS, GET_TEMPERAMENTS, ON_SEARCH_DOGS_BY_NAME } from "../action/actionTypes";

const initialState={
    dogs:[],
    temperaments:[],
    dogDetail:{}
}

const rootReducer=(state=initialState,{type,payload})=>{
switch(type){
    case GET_TEMPERAMENTS:
        return{
        ...state,
        temperaments:payload
        }
    case GET_DOGS:
        return{
        ...state,
        dogs:payload
    }
    case GET_DOGDETAIL:
        return{
        ...state,
        dogDetail:payload
        }
    case ON_SEARCH_DOGS_BY_NAME:
        return {
        ...state,
        dogs:payload
        }
    default:
     return {
        ...state
    }
}
}

export default rootReducer;