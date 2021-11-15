import Header from "./components/Header";
import Tasks from "./components/Tasks";
import AddTask from "./components/AddTask";
import { v4 as uuidv4 } from 'uuid';

import { useState ,useEffect } from "react";
const App = () => {
  const [tasks, setTasks] = useState([]);
  
  const loadData= async ()=>{
    const response=await fetch('http://localhost:3000/tasks')
    const data=await response.json()
    return data;

  }
  const displayTask= async ()=>{
    const taskFromServer=await loadData();
    setTasks(taskFromServer)
  }
  useEffect(()=>{
    displayTask();
  },[])
  //Add task
  const addTask = async(task) => {
    // console.log(task)
    // const id= uuidv4();
    // const newTask={id,...task}
    // setTasks([...tasks, newTask])
    const res=await fetch('http://localhost:3000/tasks',{
      method:'POST',
      headers:{
        'Content-type':'application/json'
      },
      body: JSON.stringify(task)
    })
    const data=await res.json()

    setTasks([...tasks,data])

  };


  //delete task
  const deleteTask = async (id) => {
    // console.log('delete',id);

    await fetch(`http://localhost:3000/tasks/${id}`,{
      method:'DELETE',
    })
    setTasks(tasks.filter((task) => 
        task.id !== id ));
  };
  return (
    <div className="container">
      <Header title="Task Tracker" />
      <AddTask onAdd={addTask}/>

      {tasks.length > 0 ? (
        <Tasks tasks={tasks} onDelete={deleteTask}/>
      ) : (
        "No tasks"
      )}
      
    </div>
  );
};

export default App;
