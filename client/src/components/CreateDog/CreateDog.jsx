import React,{ useState,useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getTemperaments,postDog} from '../../redux/action';
import {connect} from 'react-redux';

import s from './CreateDog.module.css';

const validate=(input)=>{
  let errors={};
  if(!input.name) errors.name='Warning: name is required';
  else if(!/^([a-zA-ZñÑáéíóúÁÉÍÓÚ])+$/i.test(input.name)) errors.name='Warning: the name must only contain letters';
  else if(input.min_height==='0' && input.max_height==='0') errors.height='Warning: min and max height are required and can not be zero';
  else if(Number(input.min_height)>=Number(input.max_height)) errors.height='Warning: the [min height] must be less than [the max height]';
  else if(input.min_weight==='0' && input.max_weight==='0') errors.weight='Warning: min and max weight are required and can not be zero';
  else if(Number(input.min_weight)>=Number(input.max_weight)) errors.weight='Warning: the [min weight] must be less than the [max weight]';
  else if(input.min_lifeSpan==='0' && input.max_lifeSpan==='0') errors.life_span='Warning: min and max life span are required and can not be zero';
  else if(Number(input.min_lifeSpan)>=Number(input.max_lifeSpan)) errors.life_span='Warning: the [min life span] must be less than the [max life span]';
  else if(!input.image) errors.image='image is required';
  else if(!input.temperaments.length) errors.temperaments='Warning: temperament is required';
  else if(input.temperaments.length>6) errors.temperaments='Warning: you can only choose a maximum of 6 temperaments';
  return errors;
}
export  function CreateDog({temperaments,getTemperaments,postDog,history}) {
  const [input,setInput]=useState({
    name:'',
    min_height:"0",
    max_height:"0",
    min_weight:"0",
    max_weight:"0",
    min_lifeSpan:"0",
    max_lifeSpan:"0",
    image:'',
    temperaments:[]
  });
  const [errors,setErrors]=useState({});

  function handleInput(e){
    setInput({
      ...input,
      [e.target.name]:e.target.value
    })
    setErrors(validate( {...input,
      [e.target.name]:e.target.value}))
  }
  function handleSelect(e){
  if(input.temperaments.some(t=>t===e.target.value)){
   setInput({...input,temperaments:[...input.temperaments]})
   setErrors(validate( {...input,temperaments:[...input.temperaments]}))
  }else{
    setInput({
      ...input,
      temperaments:[...input.temperaments,e.target.value]
     })
     setErrors(validate( {
      ...input,
      temperaments:[...input.temperaments,e.target.value]
     }))
  }
  }

  function deleteTemperament(e,element){
    e.preventDefault();
    setInput({
      ...input,
      temperaments:input.temperaments.filter(t=>t!==element)
     })
     setErrors(validate( {
      ...input,
      temperaments:input.temperaments.filter(t=>t!==element)
     }))
  }
  function handleSubmit(e){
    e.preventDefault();
    let breedCreated={
      name:input.name,
      height:`${input.min_height} - ${input.max_height}`,
      weight:`${input.min_weight} - ${input.max_weight}`,
      life_span:`${input.min_lifeSpan} - ${input.max_lifeSpan}`,
      image:input.image,
      temperaments:input.temperaments
    }
    if (
      !input.name ||
      !input.image ||
      input.temperaments.length===0 ||
      input.min_height === "0" ||
      input.max_height === "0" ||
      input.min_weight === "0" ||
      input.max_weight === "0" ||
      input.max_lifeSpan === "0" ||
      input.min_lifeSpan === "0" ||
      Object.keys(errors).length !== 0
    ) {
      alert("Complete all the fields");
    } else {
      postDog(breedCreated);
      history.push("/home");
    }
  }
  function resetAllData(e){
  e.preventDefault();
  setInput({
    name:'',
    min_height:"0",
    max_height:"0",
    min_weight:"0",
    max_weight:"0",
    min_lifeSpan:"0",
    max_lifeSpan:"0",
    image:'',
    temperaments:[]
  })
  }
  useEffect(()=>{getTemperaments()},[getTemperaments])

  return (
    <div className={s.box}>
       <Link to='/home' className={s.link}>Go to Home</Link>
       <h3>Hi!! Here , can create a new breed</h3>
       <form onSubmit={(e)=>handleSubmit(e)}>
       <button onClick={(e)=>resetAllData(e)}>Reset data</button>
        <div>
        <label> Name : </label>
        <input type="text" name='name' placeholder='Breed' value={input.name} onChange={e=>handleInput(e)}/>
        {errors.name&&(<p className={s.danger}>{errors.name}</p>)}
        </div>
        <div>
        <label> Height : </label>
        <input type="number" min="0" name="min_height"  value={input.min_height} onChange={e=>handleInput(e)}/>
        <input type="number" min="0" name="max_height" value={input.max_height} onChange={e=>handleInput(e)}/> 
        <span> cm </span> 
        {errors.height&&(<p className={s.danger}>{errors.height}</p>)}
        </div>
       <div>
       <label> Weight : </label>
       <input type="number" min="0" name="min_weight"  value={input.min_weight}  onChange={e=>handleInput(e)}/>
       <input type="number" min="0" name="max_weight"  value={input.max_weight}  onChange={e=>handleInput(e)}/>
       <span> kg </span>
       {errors.weight&&(<p className={s.danger}>{errors.weight}</p>)}
       </div>
       <div>
       <label>Life Span : </label>
       <input type="number" min="0" name="min_lifeSpan"  value={input.min_lifeSpan} onChange={e=>handleInput(e)}/>
       <input type="number" min="0" name="max_lifeSpan"  value={input.max_lifeSpan} onChange={e=>handleInput(e)}/>
       <span> years </span>
       {errors.life_span&&(<p className={s.danger}>{errors.life_span}</p>)}
       </div>
       <div>
       <label>Image </label>
        <input type='url' name='image' placeholder='url of the image' value={input.image} onChange={e=>handleInput(e)}></input>
        {errors.image&&(<p className={s.danger}>{errors.image}</p>)}
       </div>
       <div>
        <div>
          <label>Select temperament/s </label>
        <select onChange={(e) =>handleSelect(e)}>
            {temperaments&& temperaments?.map(t=>(<option key={t.id} value={t.name}>{t.name}</option>))}
       </select>
         {errors.temperaments&&(<p className={s.danger}>{errors.temperaments}</p>)}
         <div className={s.boxtemp}>
       {input.temperaments.length > 0  
            ? input.temperaments.map((el, i) => (
              <div key={i}className={s.temp} ><p >{el}</p><button onClick={(e)=>deleteTemperament(e,el)}>X</button></div> ))
            : null} 
       </div>
        </div>
       </div>
       <input type="submit" value="Create" />
       </form>
    </div>
  )
}

const mapStateToProps=(state)=>{
  return{
    temperaments:state.temperaments,
  }
  }
const mapDispatchToProps=(dispatch)=>{
  return {
    getTemperaments:()=>dispatch(getTemperaments()),
    postDog:(obj)=>dispatch(postDog(obj))
  }
}
  export default connect(mapStateToProps,
    mapDispatchToProps)(CreateDog);

