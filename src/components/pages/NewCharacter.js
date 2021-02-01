import React, { useState}  from 'react';
import {useForm}  from "react-hook-form";
import {Formik, useField} from 'formik';
import './NewCharacter.css';
import holder from '../../assets/imgholder.png';

function NewCharacter({setNewVisible, setNewCharacter, addCharacter, errorMessage}) {
  const {register, handleSubmit} = useForm();
  const {chr, setChr} = useState();
  const CustomTextInput= ({label, ...props}) =>{
    const [field, meta] = useField(props);
  }
  const numberInput = (e) =>{
    parseFloat(e);
    console.log(e);
  }
  const onSubmit = (data) =>{
    /*const formData = new FormData();
    formData.append("name", data.name);
    formData.append("blockpunish", JSON.stringify(data.blockpunish));
    formData.append("keymove", JSON.stringify(data.keymove));
    formData.append("difficulty", data.difficulty);
    formData.append("description", data.description);
    formData.append("characterImage", data.characterImage[0]);*/
    setNewCharacter(data);
    addCharacter();
  };
  return (
    <div className="characterForm">
      <Formik onSubmit={(values, {setSubmitting, resetForm}) => {
        setTimeout(() => {
          alert(JSON.stringify(values, null, 2));
          resetForm();
          setSubmitting(false);
        },3000)
      }}>

      </Formik>
      <span onClick={() => setNewVisible(false)}>x</span>
        <form encType="multipart/form-data" method="POST" onSubmit={handleSubmit(onSubmit)}>
          <legend>New character</legend>
          <p>{errorMessage}</p>
          <div className="characterName">
          <label for="name">Name: </label>
          <input type="text" name="name" ref={register}/>
          <input type="file" name="characterImage" ref={register}/><br/>
          </div>
            <div className="keymove">
            <h2>Key move</h2>
              <label for="Command">Command:</label>
              <input type="text" name="keymove[command]" ref={register} className="commandinput"/><br/>
              <label for="Hitlevel">Hitlevel: </label>
              <input type="text" name="keymove[hitlevel]" ref={register}/><br/>
              <label for="Damage">Damage:</label>
              <input type="number" name="keymove[damage]" ref={register}/><br/>
              <label for="Start up frame">Start up frame:</label>
              <input type="number" name="keymove[startupframe]" ref={register}/><br/>
              <label for="Block frame">Block frame:</label>
              <input type="number" name="keymove[blockframe]" ref={register}/><br/>
              <label for="Hit frame">Hit frame:</label>
              <input type="text" name="keymove[hitframe]" ref={register}/><br/>
              <label for="Counterhit frame">Counterhit frame:</label>
              <input type="text" name="keymove[counterhit]" ref={register}/><br/>
            </div>
          <div className="blockpunish">
            <h2>Block punish</h2>
            <label for="Command">Command:</label>
            <input type="text" name="blockpunish[command]" ref={register} className="commandinput"/><br/>
            <label for="Hitlevel">Hitlevel: </label>
            <input type="text" name="blockpunish[hitlevel]" ref={register}/><br/>
            <label for="Damage">Damage:</label>
            <input type="number" name="blockpunish[damage]" ref={register}/><br/>
            <label for="Frame">Frame:</label>
            <input type="number" name="blockpunish[frame]" ref={register}/><br/>
            <label for="Block frame">Block frame:</label>
            <input type="number" name="blockpunish[blockframe]" ref={register}/><br/>
            <label for="Hit frame">Hit frame:</label>
            <input type="text" name="blockpunish[hitframe]" ref={register}/><br/>
            <label for="Counterhit frame">Counterhit frame:</label>
            <input type="text" name="blockpunish[counterhit]" ref={register}/><br/>
          </div>
          <div className="difficulty">
          <h2>Difficulty</h2>
          <label for="difficulty">Difficulty: </label>
          <input type="Number" name="difficulty" ref={register} onChange={(e) => numberInput(e.target.value)} step="0.5" min="0" max="5"></input> <label>/ 5</label><br/>
          </div>
          <div className="description">
            <h2>Description</h2>
            <textarea rows="7" cols="80" ref={register} name="description"></textarea>
          </div>
          <button type="submit">DO IT</button>
        </form>
    </div>
  );
}

export default NewCharacter;