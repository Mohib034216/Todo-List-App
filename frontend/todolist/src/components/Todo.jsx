import React, { useEffect, useState } from 'react'
// import { setTodo,  updateTodo} from '../api/todoapi'
import {getTodo, addTodo, removeTodo, updateTodo}  from '../redux/todoSlice';
import { useDispatch, useSelector } from 'react-redux';


console.log(localStorage.getItem('user') || "{}")
const Todo = () => {
  const [tasks, setTasks] = useState([
  ]);
  const [taskText, setTaskText] = useState("");
  const [users, setUsers] = useState("");
  const dispatch = useDispatch()
  const {items} = useSelector((state) => (state.todo))
  console.log(items)


  useEffect(()=>{
    fetchTodo();

    
  },[])
  const fetchTodo = async () =>{
    try{

      const data =  await dispatch(getTodo());
      console.log(data)
      setTasks(data)
    } catch(error){
      console.error('Failed to fetch data')
    }

  }
  // const fetchUsers = async () =>{
  //   try{

  //     const response =  await Users();
  //     console.log(response.data.data)
  //     setUsers(response.data.data)
      
  //   } catch(error){
  //     console.error('Failed to fetch data')
  //   }
    
  // }


  const addTask = async () => {
    if (taskText.trim()) {
      const response = await  dispatch(addTodo({"task":taskText,"status":"PENDING"}))
      // setTasks([...tasks, response]);
      console.log(response)


    }
  };
  
  const deleteTask = async (id) => {
    const response = await dispatch(removeTodo(id))
    // alert(response.message);
    // console.log(response.message);
    // setTasks(tasks.filter((task) => task.id !== id));
  };

  const markFinished = async (id) => {
    const response = await dispatch(updateTodo({'id':id,status:"FINISHED"}))
    // alert(response.message);
    // setTasks(
    // tasks.map((task) => (task.id === id ? { ...task, status: "complete" } : task))
    // );
  };

  return (
    <>
    <div className="app-container">
      <div className="todo-container">
        <h1 className="title">To Do App</h1>
        <input
          type="text"
          value={taskText}
          onChange={(e) => setTaskText(e.target.value)}
          className="task-input"
          placeholder="Enter a task here"
        />
        <div className="button-container">
          <button onClick={addTask} className="save-button">Save</button>
         </div>
        <table className="todo-table">
          <thead>
            <tr>
              <th>No.</th>
              <th>Todo item</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {items && items.map((task) => (
              <tr >
                <td>{task.id}</td>
                <td>{task.task}</td>
                <td>{task.status}</td>
                <td className="action-buttons">
                  <button onClick={() => deleteTask(task.id)} className="delete-button">Delete</button>
                  <button onClick={() => markFinished(task.id)} className="finished-button">Finished</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    </>

  );
};

export default Todo;
