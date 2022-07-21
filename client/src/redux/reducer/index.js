import { FILTER_BY_TEMPERAMENT, FILTER_BY_TYPE_DATA, GET_DOGDETAIL, GET_DOGS, GET_TEMPERAMENTS, ON_SEARCH_DOGS_BY_NAME, ORDER_BY_NAME, ORDER_BY_WEIGTH ,POST_DOG} from "../action/actionTypes";

const initialState={
    dogs:[],
    alldogs:[],
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
        dogs:payload,
        alldogs:payload
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
    case FILTER_BY_TEMPERAMENT:
        const alldogs=state.alldogs;
        const dogFilteredByTemperament=payload==="All-Temperaments"?
        alldogs:
        alldogs.filter(obj=>obj.temperaments?.includes(payload));
        return {
            ...state,
        dogs:dogFilteredByTemperament
        }
    case FILTER_BY_TYPE_DATA:
        const alldogsTwo=state.alldogs;
        const dogFilteredByData=payload==="Api"?
        alldogsTwo.filter(obj=>!obj.created):
        alldogsTwo.filter(obj=>obj.created)
        return {
            ...state,
            dogs:payload==="All-Data"?alldogsTwo:dogFilteredByData
        }
    case ORDER_BY_NAME:
        const dogsSortByName=payload==='A-Z'?
        state.dogs.sort((a,b)=>{
            if(a.name.toLowerCase()<b.name.toLowerCase()) return -1;
            if(a.name.toLowerCase()>b.name.toLowerCase()) return 1;
            return 0;  //  
        }):
        state.dogs.sort((a,b)=>{
            if(a.name.toLowerCase()<b.name.toLowerCase()) return 1;
            if(a.name.toLowerCase()>b.name.toLowerCase()) return -1;
            return 0;
        })
        return{
            ...state,
            dogs:dogsSortByName
        }
    case ORDER_BY_WEIGTH:
        const dogsSortByWeigth=payload==='lower-higher'?
        state.dogs.sort((a,b)=>Number(a.weight?.split('-')[0])-Number(b.weight?.split('-')[0])):
        state.dogs.sort((a,b)=>Number(b.weight?.split('-')[0])-Number(a.weight?.split('-')[0]))
        return{
            ...state,
            dogs:dogsSortByWeigth
        }
    case POST_DOG:
        return{
            ...state
        }
    default:
     return state;
}
}

export default rootReducer;