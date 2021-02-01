import React, { useState, useEffect, useCallback } from 'react';
import {useForm}  from "react-hook-form";
import axios from 'axios';
import deleteIcon from '../../assets/delete.png';
import editIcon from '../../assets/editIcon.png';
import kazuya from '../../assets/kazuyafull.png';
import './chosenCharacter.css';
function ChosenPage({match, updateCharacter, setKeymove}) {
  const [character, setCharacter] = useState({});
  const [tableVisible, setTableVisible] = useState(false);
  const [showKeymoveAddRow, setShowKeymoveAddRow] = useState(false);
  const [showBlockpunishAddRow, setShowBlockpunishAddRow] = useState(false);
  const {register, handleSubmit} = useForm();
  function deleteKeymoveRow(el) {
    var keymoveArray = [...character.keymove];
    var index = keymoveArray.indexOf(el);
    keymoveArray.splice(index, 1);
    character.keymove = keymoveArray;
    updateCharacter(character._id, character);
  }
  useEffect(() =>{
    console.log(match);
  })
  function deleteBlockpunishRow(el) {
    var blockpunishArray = [...character.blockpunish];
    var index = blockpunishArray.indexOf(el);
    blockpunishArray.splice(index, 1);
    character.blockpunish = blockpunishArray;
    updateCharacter(character._id, character);
  }
  function addKeymoveRow(data){
    var keymoveArray = [...character.keymove];
    keymoveArray.push(data);
    character.keymove = keymoveArray;
    updateCharacter(character._id, character);
  }
  function addBlockpunishRow(data){
    var blockpunishArray = [...character.blockpunish];
    blockpunishArray.push(data);
    character.blockpunish = blockpunishArray;
    updateCharacter(character._id, character);
  }
  function showTable(){
    if(tableVisible === false){
      setShowKeymoveAddRow(false);
      setTableVisible(true);
    }
    else{
      setShowBlockpunishAddRow(false);
      setTableVisible(false);
    }
  }
  const getCharacter = useCallback(() => {
    axios.get(`http://localhost:2000/characters/${match.params.id}`)
    .then(res => setCharacter(res.data))

  }, [match.params.id])

  useEffect(() => {
    getCharacter();
    console.log(match);
  }, [getCharacter, match])
  return (
    <div>
      <div className="title-container">
      <h1>{character.name}</h1>
      </div>
      <div className="ptw-container">
        <h2>Players To Watch</h2>
        <ul>
          <li>TheMainManSWE</li>
          <li>That Blasted Salami</li>
          <li>Cassan</li>
        </ul>
      </div>
      <h2>Gameplan</h2>
      <div className="guide-content">
        <div className="chosen-image">
            <img src={kazuya} alt="chosenImg" />
        </div>
        <div className="chosen-summary">
          <article>
          In venenatis metus vel eleifend varius. Aliquam vitae lorem a libero interdum tincidunt. Sed interdum augue at mauris tristique pharetra. 
          Sed non nisi non lorem convallis auctor. Suspendisse eget justo ut purus congue posuere. Sed at eros et tortor mollis rutrum sodales eget orci. Proin placerat eget mi nec accumsan. Vestibulum at libero mattis,
          In venenatis metus vel eleifend varius. Aliquam vitae lorem a libero interdum tincidunt. Sed interdum augue at mauris tristique pharetra. 
          Sed non nisi non lorem convallis auctor. Suspendisse eget justo ut purus congue posuere. Sed at eros et tortor mollis rutrum sodales eget orci. Proin placerat eget mi nec accumsan. Vestibulum at libero mattis 
          tempus eros quis, laoreet leo. Curabitur porttitor placerat malesuada. Phasellus eu ipsum sit amet diam maximus blandit ut ut nulla. 
          tempus eros quis, laoreet leo. Curabitur porttitor placerat malesuada. Phasellus eu ipsum sit amet diam maximus blandit ut ut nulla.
          </article>
        </div>
      </div>
        <div className="table-content">
          <h2>Top moves</h2>
        <div className="tables">
      <table style={{ display: tableVisible === false ? "table" : "none" }}>
     <thead>
       <tr className="tabs">
         <th colSpan="5" style={{backgroundColor: tableVisible === true ? "" : "rgb(41, 41, 129)", borderRight: "1px solid" }}>Key moves</th>
         <th colSpan="4" onClick={showTable}>Block punishes</th>
       </tr>
     <tr>
       <th>Command</th>
       <th>Hitlevel</th>
       <th>Damage</th>
       <th>Startup frame</th>
       <th>Block frame</th>
       <th>Hit frame</th>
       <th>Counterhit frame</th>
       <th>Action</th>
     </tr>
    </thead>
    <tbody>
      {character.keymove && Object.values(character.keymove).map((chosen, index) => (
             <tr key={index}>
             <td>{chosen.command}</td>
             <td>{chosen.hitlevel}</td>
             <td>{chosen.damage}</td>
             <td>{chosen.startupframe}</td>
             <td>{chosen.blockframe}</td>
             <td>{chosen.hitframe}</td>
             <td>{chosen.counterhit}</td>
             <td>
              <img src={editIcon} alt="edit row" id="editIcon"/>
              <img src={deleteIcon} alt="delete row" onClick={() => deleteKeymoveRow(chosen)}/>
             </td>
           </tr>
      ))}
    </tbody>
    <tfoot>
      <tr>
        <td colSpan="100%" onClick={() => setShowKeymoveAddRow(true)} className="newMove">New key move +</td>
      </tr>
    </tfoot>
    </table>
    { showKeymoveAddRow === true ? <form method="POST" onSubmit={handleSubmit(addKeymoveRow)} className="keymoveForm">
              <div className="formInputs">
              <label for="command">Command:</label>
              <input type="text" name="command" ref={register}/>
              <label for="hitlevel">Hitlevel: </label>
              <input type="text" name="hitlevel" ref={register}/>
              <label for="damage">Damage:</label>
              <input type="number" name="damage" ref={register}/>
              <label for="startupframe">Start up frame:</label>
              <input type="number" name="startupframe" ref={register}/>
              <label for="blockframe">Block frame:</label>
              <input type="number" name="blockframe" ref={register}/>
              <label for="hitframe">Hit frame:</label>
              <input type="text" name="hitframe" ref={register}/>
              <label for="counterhit">Counterhit frame:</label>
              <input type="text" name="counterhit" ref={register}/>
              </div>
              <button type="submit">Add</button>
      </form> : null}
   <table style={{ display: tableVisible === true ? "table" : "none" }}>
   <thead>
       <tr className="tabs">
         <th colSpan="4" onClick={showTable} style={{borderRight: "1px solid"}} >Key moves</th>
         <th colSpan="4" style={{backgroundColor: tableVisible === true ? "rgb(41, 41, 129)" : ""}}>Block punishes</th>
       </tr>     
    <tr>
      <th>Command</th>
      <th>Frame</th>
      <th>Damage</th>
      <th>Hit level</th>
      <th>Block frame</th>
      <th>Hit frame</th>
      <th>Counterhit frame</th>
      <th>Action</th>
    </tr>
  </thead>
  <tbody>
  { character.blockpunish && Object.values(character.blockpunish).map((chosen,index) => (
             <tr key={index}>
             <td>{chosen.command}</td>
             <td>{chosen.frame}</td>
             <td>{chosen.damage}</td>
             <td>{chosen.hitlevel}</td>
             <td>{chosen.blockframe}</td>
             <td>{chosen.hitframe}</td>
             <td>{chosen.counterhit}</td>
             <td>
              <img src={editIcon} alt="edit row" id="editIcon"/>
              <img src={deleteIcon} alt="delete" onClick={e => deleteBlockpunishRow(chosen)}/>
            </td>
           </tr>
      ))}
  </tbody>
  <tfoot>
      <tr>
        <td colSpan="100%" className="newMove" onClick={() => setShowBlockpunishAddRow(true)}>New block punish +</td>
      </tr>
    </tfoot>
  </table>
  {showBlockpunishAddRow === true ? <form method="POST" onSubmit={handleSubmit(addBlockpunishRow)} className="keymoveForm">
              <div className="formInputs">
              <label for="command">Command:</label>
              <input type="text" name="command" ref={register}/>
              <label for="hitlevel">Hitlevel: </label>
              <input type="text" name="hitlevel" ref={register}/>
              <label for="damage">Damage:</label>
              <input type="number" name="damage" ref={register}/>
              <label for="frame">Start up frame:</label>
              <input type="number" name="frame" ref={register}/>
              <label for="blockframe">Block frame:</label>
              <input type="number" name="blockframe" ref={register}/>
              <label for="hitframe">Hit frame:</label>
              <input type="text" name="hitframe" ref={register}/>
              <label for="counterhit">Counterhit frame:</label>
              <input type="text" name="counterhit" ref={register}/>
              </div>
              <button type="submit">Add</button>
      </form> : null}
  </div>
    </div>
    </div>
  );
}

export default ChosenPage;