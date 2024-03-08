require('dotenv').config();
const axios= require('axios');

const getTemperaments=async()=>{
    const {data}=await axios.get("https://api.thedogapi.com/v1/breeds");
    const temperamentData=data.map(objDog=> objDog.temperament?.split(', '));
    const joinTemperamentsData=temperamentData.flat();
    return joinTemperamentsData.filter(r=>r!==undefined);
}

module.exports=getTemperaments;
