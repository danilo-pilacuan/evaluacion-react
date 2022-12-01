import axios from 'axios';

import {useState, useEffect,useReducer} from "react";
import Task from './Task';
import AddTask from './AddTask';

function reducer(state, action) {
    switch (action.type) {
      case 'get':
        return  action.payload;
      default:
        throw new Error();
    }
  }

const TodoList=()=>
{
    //const {dataList,setDataList} = useState([]);
    //const [colorStatus, dispatch] = useReducer(reducer, "#17a2b8");
    const [dataList, dispatch] = useReducer(reducer,[]);

    const items = dataList.map((item) => <Task key={item.id} props={item}/>);

  useEffect(() => {
    axios.get("https://bp-todolist.herokuapp.com/?id_author=11")
    .then((response) => {
        dispatch({type: 'get',payload:response.data.data});
    })

    .catch((error) => console.log(error));

    
  },[]);
    
    return <div>
        <h1>Todo List</h1>
        <AddTask/><br/>
        {dataList.length>0?(<table>
            <tbody>
            {items}
            </tbody>
        </table>):<p>La lista se encuentra vacía</p>}
        
    </div>
}

export default TodoList;