const {Router}=require("express");
temperamentRouter=Router();
const {Temperament}=require('../db.js');
const getTemperaments=require('../utils/getTemperaments.js');

temperamentRouter.get('/',async(req,res)=>{
const dataTemp= await getTemperaments();
try{
    const temperamentsDb=await Temperament.findAll({order:  [['name', 'ASC']]});
    if(!temperamentsDb.length){
        dataTemp.forEach(temp=>
            {Temperament.findOrCreate(
               {where:{name:temp}}
               )})
    }
   return res.json(temperamentsDb);
}catch(e){
    return res.status(500).json({message:e.message});
}
})

module.exports=temperamentRouter;
