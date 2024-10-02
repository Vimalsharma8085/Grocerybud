
import  { useState, useEffect } from 'react';

const TaskApp = () => {
  const [tasks, setTasks] = useState([]);
  const [taskInput, setTaskInput] = useState('');

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem('tasks'));
    if (storedTasks) {
      setTasks(storedTasks);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

const addTask = () => {
    if (!taskInput.trim()) {
      alert("Please enter a task.");
      return;
    }
    
    const newTask = { text: taskInput.trim(), completed: false };
    setTasks((prevTasks) => [...prevTasks, newTask]);
    setTaskInput('');
  };
  

  const toggleTaskCompletion = (index) => {
    const newTasks = [...tasks];
    newTasks[index].completed = !newTasks[index].completed;
    setTasks(newTasks);
  };

const deleteTask = (index) => {
    const newTasks = tasks.filter((_, i) => i !== index);
    setTasks(newTasks);
  };
  
  const clearCompletedTasks = () => {
    const newTasks = tasks.filter((task) => !task.completed);
    setTasks(newTasks);
  };
  
  return (
    <div style={{ backgroundColor: 'lightblue' }} className="max-w-md mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">LocalTasker</h1>
      <div className="flex mb-4">
        <input
          type="text"
          value={taskInput}
          onChange={(e) => setTaskInput(e.target.value)}
          className="border p-2 flex-grow"
          placeholder="Add a new task"
        />
        <button onClick={addTask} className="bg-blue-500 text-white px-4 ml-2">
          Add Task
        </button>
      </div>
      <ul className="list-disc pl-5 mb-4">
        {tasks.map((task, index) => (
          <li key={index} onClick={() => toggleTaskCompletion(index)} className={`cursor-pointer ${task.completed ? 'line-through text-gray-500' : ''}`}>
            {task.text}
            <button onClick={() => deleteTask(index)} className="ml-2 text-red-500">Delete</button>
          </li>
        ))}
      </ul>
      <button onClick={clearCompletedTasks} className="bg-red-500 text-white px-4">
        Clear Completed
      </button>
    </div>
  );
};

export default TaskApp;


