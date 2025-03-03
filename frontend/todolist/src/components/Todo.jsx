import React, { useEffect, useState } from 'react'
import { getTodo ,setTodo} from '../api/todoapi'


const Todo = () => {
  const [tasks, setTasks] = useState([
  ]);
  const [taskText, setTaskText] = useState("");


  useEffect(()=>{
    fetchTodo();
  },[])
  const fetchTodo = async () =>{
    try{

      const data =  await getTodo();
      console.log(data)
      setTasks(data)
    } catch(error){
      console.error('Failed to fetch data')
    }

  }


  const addTask = async () => {
    if (taskText.trim()) {
      const response = await  setTodo({"task":taskText,"status":"pending"})
      setTasks([...tasks, response]);
      console.log(response)


    }
  };
  
  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const markFinished = (id) => {
    setTasks(
      tasks.map((task) => (task.id === id ? { ...task, status: "complete" } : task))
    );
  };

  return (
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
          <button className="get-tasks-button">Get tasks</button>
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
            {tasks && tasks.map((task) => (
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
  );
};

export default Todo;
