import { useState, useEffect } from "react";

import IndexNavbar from "components/Navbars/IndexNavbar.jsx";
import Footer from "components/Footers/Footer.jsx";

function ToDoList() {

  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem("my-tasks");
    return saved ? JSON.parse(saved) : [];
  });

  const [input, setInput] = useState("");

  useEffect(() => {
    localStorage.setItem("my-tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (!input.trim()) return;
    setTasks([...tasks, { 
      id: Date.now(),
      text: input, 
      done: false,
      priority: priorityLevel,
      createdAt: new Date().toLocaleString()
    }]);
    setInput("");
    setPriority("low")
  };

  const toggleTask = (id) => {
    const newTasks = [...tasks];
    newTasks[id].done = !newTasks[id].done;
    setTasks(newTasks);
  };

  const deleteTask = (id) => {
    const newTasks = tasks.filter((_, i) => i !== id);
    setTasks(newTasks);
  };

  const [editingIndex, setEditingIndex] = useState(null);
  const [editedText, setEditedText] = useState("");

  const saveEditedTask = (id) => {
    const updatedTasks = [...tasks];
    updatedTasks[id].text = editedText;
    setTasks(updatedTasks);
    setEditingIndex(null);
  };
  
  const [filter, setFilter] = useState("all");

  const[priorityLevel,setPriority] = useState("low");

  const [key, setKey] = useState("");

  const priorityMap={
    high:3,
    medium:2,
    low:1
  }

  const [sorted,setIsSorted] = useState(true);
  
  const toggleSortOrder = () => {
    setIsSorted(prevIsSorted => {
      const sortedTasks = !prevIsSorted
        ? tasks.slice().sort((a, b) => priorityMap[b.priority] - priorityMap[a.priority]) // Desc
        : tasks.slice().sort((a, b) => priorityMap[a.priority] - priorityMap[b.priority]); // Asc
  
      setTasks(sortedTasks);
      return !prevIsSorted;
    });
  };
  
  const handleKeyDown = (event) => {
    setKey(event.key); 
    if (event.key === "Enter") {
      addTask(); // Call the addTask function when Enter is pressed
    }
  };

  return (
    <>
    <IndexNavbar fixed />
    <div className="p-4 mt-20 max-w-md mx-auto bg-white shadow-md rounded-md">
      <h1 className="text-xl font-bold mb-4">📝 My To-Do List</h1>
      
      <div className="flex mb-4">
        <input
          className="flex-grow border px-2 py-1 rounded-l"
          placeholder="Type a task..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        
        <button
          className="bg-blue-500 text-black px-4 shadow-md rounded-md "
          onClick={addTask}
         
        >
          +
        </button>
       
        
      </div>
      <p>
          Priority Levels:
          <label className="ml-2"><input type="radio" name="myRadio" value="low" checked={priorityLevel === "low"} onChange={(e) => setPriority(e.target.value)}  defaultChecked/> Low</label>
          <label className="ml-2"><input type="radio" name="myRadio" value="medium"  checked={priorityLevel === "medium"} onChange={(e) => setPriority(e.target.value)} /> Medium</label>
          <label className="ml-2"><input type="radio" name="myRadio" value="high" checked={priorityLevel === "high"}  onChange={(e) => setPriority(e.target.value)}/> High</label>
         
        </p>
        
      <br></br>

      <div className="flex justify-center gap-2 mb-4 ">
        <button 
            onClick={() => setFilter("all")} 
            className="px-2 py-1 bg-gray-200 rounded shadow-md">All
        </button>
        <button 
            onClick={() => setFilter("active")} 
            className="px-2 py-1 bg-gray-200 rounded shadow-md">Active
        </button>
        <button 
            onClick={() => setFilter("done")} 
            className="px-2 py-1 bg-gray-200 rounded shadow-md">Done
        </button>
        <button 
            onClick= {toggleSortOrder}
            className="px-2 py-1 bg-gray-200 rounded shadow-md">{sorted? "Sort Ascending" : "Sort Descending"}
        </button>
    </div>

      
      <ul>
      {tasks
        .filter(task => {
            if (filter === "active") return !task.done;
            if (filter === "done") return task.done;
            
            return true; // all
        })
        .map((task, id) => (
          <li key={id} className="mb-4 flex items-center">
            <input
              type="checkbox"
              checked={task.done}
              onChange={() => toggleTask(id)}
              className="mr-2"
            />

            {task.priority === 'low' ? 
              <span>🟢</span>
              : task.priority === 'medium' ? 
              <span>🟡</span>
              : task.priority === 'high' ? 
              <span>🔴</span>
              : null}
            {editingIndex === id ? (
              <>
                <input className="border px-2 py-2 bg-gray-100 rounded shadow-lg" value={editedText} onChange={(e) => setEditedText(e.target.value)} />
                <button onClick={() => saveEditedTask(id)}>💾</button>
              </>
            ) : (
              <span>{task.text}</span>
            )}

            <span className={task.done ? "line-through text-gray-500" : ""}>
            
               <span className="ml-2 text-sm text-gray-500">{formatDate(task.createdAt)}</span>
               <button
                  onClick={() => {
                    setEditingIndex(id);
                    setEditedText(task.text);
                  }}
                >
                  ✏️ 
                </button>

            </span>

            <button
            onClick={() => deleteTask(id)}
            className="ml-auto text-red-500 hover:text-red-700"
            >
            ❌
            </button>

          </li>
        ))}
      </ul>
      </div>
      </>
    
   
  );
}



function formatDate(createdAt) {
  const now =new Date();
  const createdDate = new Date(createdAt);

  const yesterday = new Date(now);
  yesterday.setDate(now.getDate()-1);


  if(
    now.getFullYear() === createdDate.getFullYear() &&
    now.getMonth() === createdDate.getMonth() &&
    now.getDate() === createdDate.getDate()
  ){
    return `Today at ${createdDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`
  }

  if(yesterday.getFullYear() === createdDate.getFullYear() &&
    yesterday.getMonth() === createdDate.getMonth() &&
    yesterday.getDate() === createdDate.getDate()
  ){
    return `Yesterday at ${createdDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`
  }
  
  return `${createdDate.toLocaleDateString([], { month: 'long', day: 'numeric' })} at ${createdDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;

}

export default ToDoList;
