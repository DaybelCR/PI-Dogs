const {Router}=require("express");
dogRouter=Router();

const {getDogs,searchName}=require('../utils/getDogs.js');
const {Dog}=require('../db.js');

let arrayResult=[];
dogRouter.get('/',async(req,res)=>{
const {name}=req.query;
if(name){
getDogs()
.then(arrayDogs=>{
    const nameFound=arrayDogs.filter(dogObj=>dogObj.name.toLowerCase().includes(name.toLowerCase()));
    if(!nameFound.length){
        searchName(name)
        .then(result=>{
            if(!result.length){return res.status(404).json({message:"The data was not found"})} 
            else{
                arrayResult=[...result];
                return res.json(result)
            } 
         })
    }else{
        return res.json(nameFound);
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
        if(arrayResult.length>0){
            const objId=arrayResult.find(obj=>String(obj.id)===idRaza);
            return res.json(objId);
        }else{
            return res.status(404).json({message:'The data was not found'})
        }
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