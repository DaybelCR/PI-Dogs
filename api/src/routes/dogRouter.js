require('dotenv').config();
const{API_KEY}=process.env;

const {Router}=require("express");
dogRouter=Router();

const getDogs=require('../utils/getDogs.js');
const {Dog}=require('../db.js');

const axios= require('axios');

dogRouter.get('/',async(req,res)=>{
const {name}=req.query;
if(name){
getDogs()
.then(arrayDogs=>{
    const nameFound=arrayDogs.filter(dogObj=>dogObj.name.toLowerCase().includes(name.toLowerCase()));
  if(!nameFound.length){
    axios.get(`https://api.thedogapi.com/v1/breeds/search?q=${name}&&api_key=${API_KEY}`)
    .then(({data})=>data.map(objDog=>{
       return{
           id:objDog.id,
           name:objDog.name,
           height:objDog.height.metric,
           weigth:objDog.weight.metric,
           life_span:objDog.life_span,
           temperaments:objDog.temperament?.split(', ')
       }
    })).then(result=>{
     if(!result.length) return res.status(404).json({message:"The data was not found"});
     else return res.json(result);
 })
  }else{
    return res.json(nameFound)
  }
})
.catch(e=>console.log(e))

}else{
    getDogs()
    .then(result=>res.json(result))
    .catch(e=>console.log(e));
}
 
})

dogRouter.get('/:idRaza',async(req,res)=>{
    const{idRaza}=req.params; 
getDogs()
.then(arrayDogs=>{
    const dogId=arrayDogs.find(dogObj=>String(dogObj.id)===idRaza);
    if(!dogId){
     return res.status(404).json({message:'The data was not found'})
    }
    return res.json(dogId);
})
.catch(e=>console.log(e))
})

dogRouter.post('/',async(req,res)=>{
const{name,height,weigth,life_span,image,temperament}=req.body;
try{
let dogCreated=await Dog.create({
    name,
    height,
    weigth,
    life_span,
    image
});
dogCreated.addTemperament(temperament);
return res.json({message: 'Dog created,successfully'})
}catch(e){
    return res.status(500).json({message:e.message});
}
})

module.exports=dogRouter;
