require('dotenv').config();

const axios= require('axios');
const {Dog,Temperament}=require('../db.js');

const getDogsApi=async()=>{
const {data}=await axios.get("https://api.thedogapi.com/v1/breeds");
const arrayDogsApi=data.map(objDog=>{
    return{
        id:objDog.id,
        name:objDog.name,
        height:objDog.height.metric,
        weight:objDog.weight.metric==='NaN'?'21 - 28':
        (objDog.weight.metric==='NaN - 8')?'6 - 8':objDog.weight.metric,
        life_span:objDog.life_span,
        image:objDog.reference_image_id?`https://cdn2.thedogapi.com/images/${objDog.reference_image_id}.jpg`:null,
        temperaments:objDog.temperament?objDog.temperament:null
    }
})
return arrayDogsApi;
}

const getDogsDb=async()=>{
const dogsDb=await Dog.findAll({include:{model:Temperament,
                                       attributes:["name"]}});
const arrayDogsDb=dogsDb.map(r=>{
    r.dataValues.temperaments=r.dataValues.temperaments
                                          .map(s=>s.name)
                                          .join(', ')
    return r.dataValues;
})
return arrayDogsDb;
}

const getDogs=async()=>{
    const api= await getDogsApi();
    const db=await getDogsDb();
    return api.concat(db);
}

const searchName=async (name)=>{
   const {data}= await axios.get(`https://api.thedogapi.com/v1/breeds/search?q=${name}`)
   const arrayDogsByName=data.map(objDog=>{
    return{
        id:objDog.id,
        name:objDog.name,
        height:objDog.height.metric,
        weight:objDog.weight.metric==='NaN'?'21 - 28':
        (objDog.weight.metric==='NaN - 8')?'6 - 8':objDog.weight.metric,
        life_span:objDog.life_span,
        image:`https://cdn2.thedogapi.com/images/${objDog.reference_image_id}.jpg`,
        temperaments:objDog.temperament?objDog.temperament:null
    }
 })
   return arrayDogsByName;
}

module.exports={getDogs,searchName};
