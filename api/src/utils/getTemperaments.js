require('dotenv').config();
const{API_KEY}=process.env;
const axios= require('axios');

const getTemperaments=async()=>{
    const {data}=await axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`);
    const temperamentData=data.map(objDog=> objDog.temperament?.split(', '));
    const joinTemperamentsData=temperamentData.flat();
    return joinTemperamentsData.filter(r=>r!==undefined);
}

module.exports=getTemperaments;
