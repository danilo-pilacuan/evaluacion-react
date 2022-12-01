import axios from 'axios';
import {useState, useEffect,useReducer} from "react";
function reducer(state, action) {
    switch (action.type) {
      case 'change':
        //console.log(action.payload)
        return  action.payload;
      default:
        throw new Error();
    }
  }

function AddTask()
{
    const [texto, dispatch] = useReducer(reducer,"");

    function handleChange(event){
        console.log("🚀 ~ file: AddTask.js:10 ~ handleChange ~ event", event)
        dispatch({type: 'change',payload:event.target.value});        
      }
    
      const handlePost=(id)=>{
        axios.post("https://bp-todolist.herokuapp.com/?id_author=11",{
            "description": texto,
            "status": 0,
            "id_author": 11,
            "finish_at": (new Date()).toISOString()
        })
        .then((response) => {
            
        })

        .catch((error) => console.log(error));
    }
        

    return <div>
        <input type="text" value={texto} onChange={handleChange}/>
        <button onClick={() => handlePost()}>Agregar</button>
    </div>
}

export default AddTask;