import React ,{useState,useEffect}from 'react';
import axios from 'axios';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import { makeStyles } from '@material-ui/core/styles';
import Tablescore from "./components/table/Tablescore";
import './app.css';

function App() {

  const [acticeKey,setacticeKey]= useState(11);
  const [gameSatatus,setGameStatus]= useState([])

  const handleClick =(id)=>{
    
    axios.post('http://127.0.0.1:4000/bowling', {scoreRoll: id})
    .then(res => {
      // console.log(res.data)
      setGameStatus(res.data.data);
    
      setacticeKey(res.data.countActiveKeys)
    })  
   }

  return (
    <div  className="wrapper">
       <h2 className="header">BOWLING SPILE</h2>
       <div className="buttom-container">
       <ButtonGroup variant="contained" color="primary" aria-label="contained primary button group">
          {
            [...Array(acticeKey).keys()].map(id=><Button style={{margin:"10px"}} onClick={() =>handleClick(id)}>{id}</Button>)
          }
        </ButtonGroup>
       </div>
       <div className="table-container">
             <Tablescore data = {gameSatatus} />
       </div>
         <Button style={{margin:"40px"}} variant="contained" color="secondary" onClick={() =>handleClick("RESTART")}>Restart</Button>
    </div> 

  );
}

export default App;
