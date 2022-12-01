import axios from 'axios';
import {useState, useEffect,useReducer} from "react";
function reducer(state, action) {
    switch (action.type) {
      case 'checked':
        console.log(action.payload)
        return  action.payload;
      default:
        throw new Error();
    }
  }
function TodoList({props})
{
    const [checked, dispatch] = useReducer(reducer,[]);

    const {
        id,
        description,
        status,
        id_author,
        finish_at,
        created_at
    } = props;

    const handleEliminar=(id)=>{
        console.log("Eliminar "+id)
        axios.delete("https://bp-todolist.herokuapp.com/"+id)
        .then((response) => {
            dispatch({type: 'get',payload:response.data.data});
        })

        .catch((error) => console.log(error));
    }
    const handleChange=() => {
        dispatch({type: 'checked',payload:!checked});
        axios.put("https://bp-todolist.herokuapp.com/"+id,{
            "description": description,
            "status": status==0?0:1,
            "id_author": 11,
            "finish_at": (new Date()).toISOString()
        })
        .then((response) => {
            dispatch({type: 'get',payload:response.data.data});
        })        
    }

    useEffect(() => {
        dispatch({type: 'checked',payload:status});
    
        
      },[]);


    return <tr>
        <td><input
          type="checkbox"
          checked={checked}
          onChange={handleChange}
        /></td>
        <td>{description}</td>
        {/* <td>{status}</td>
        <td>{id_author}</td>
        <td>{finish_at}</td>
        <td>{created_at}</td> */}
        <td><button onClick={() => handleEliminar(id)}>Eliminar</button></td>
        
    </tr>
}

export default TodoList;