import { useState, useEffect } from "react";

export default function App() {

  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem("kanbanTasks");
    return saved ? JSON.parse(saved) : [];
  });

  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [priority, setPriority] = useState("Medium");
  const [search, setSearch] = useState("");
  const [dark, setDark] = useState(false);

  useEffect(() => {
    localStorage.setItem("kanbanTasks", JSON.stringify(tasks));
  }, [tasks]);

  function addTask() {
    if (!title) return;

    const newTask = {
      id: Date.now(),
      title,
      desc,
      priority,
      status: "todo"
    };

    setTasks([...tasks, newTask]);
    setTitle("");
    setDesc("");
  }

  function deleteTask(id) {
    setTasks(tasks.filter(t => t.id !== id));
  }

  function editTask(id) {
    const newTitle = prompt("Edit title");
    const newDesc = prompt("Edit description");

    setTasks(tasks.map(t =>
      t.id === id ? {...t, title:newTitle, desc:newDesc} : t
    ));
  }

  function moveTask(id, status) {
    setTasks(tasks.map(t =>
      t.id === id ? {...t, status} : t
    ));
  }

  function allowDrop(e){
    e.preventDefault();
  }

  function drop(e,status){
    const id = e.dataTransfer.getData("id");
    moveTask(Number(id),status);
  }

  function drag(e,id){
    e.dataTransfer.setData("id",id);
  }

  const columns = ["todo","progress","done"];

  const pastel = {
    todo:"#fff9c4",
    progress:"#bbdefb",
    done:"#f8bbd0"
  };

  const darkCols = {
    todo:"#4a044e",
    progress:"#6b21a8",
    done:"#9d174d"
  };

  return (
    <div style={{
      minHeight:"100vh",
      padding:"30px",
      fontFamily:"Poppins, sans-serif",
      background: dark
      ? "linear-gradient(135deg,#2e003e,#6a0572)"
      : "linear-gradient(135deg,#fff7ed,#e0f2fe)",
      color: dark ? "white":"black"
    }}>

      <h1 style={{
        textAlign:"center",
        fontSize:"42px",
        marginBottom:"25px"
      }}>
        Kanban Task Board
      </h1>

      <div style={{
        display:"flex",
        gap:"10px",
        justifyContent:"center",
        flexWrap:"wrap",
        marginBottom:"20px"
      }}>

        <input
        placeholder="Task title"
        value={title}
        onChange={(e)=>setTitle(e.target.value)}
        style={{padding:"10px",borderRadius:"8px"}}
        />

        <input
        placeholder="Description"
        value={desc}
        onChange={(e)=>setDesc(e.target.value)}
        style={{padding:"10px",borderRadius:"8px"}}
        />

        <select
        value={priority}
        onChange={(e)=>setPriority(e.target.value)}
        style={{padding:"10px",borderRadius:"8px"}}
        >
          <option>Low</option>
          <option>Medium</option>
          <option>High</option>
        </select>

        <button
        onClick={addTask}
        style={{
          padding:"10px 16px",
          borderRadius:"8px",
          background:"#60a5fa",
          border:"none"
        }}>
          Add Task
        </button>

        <button
        onClick={()=>setDark(!dark)}
        style={{
          padding:"10px 16px",
          borderRadius:"8px",
          background:"#f472b6",
          border:"none"
        }}>
          Toggle Theme
        </button>

      </div>

      <div style={{textAlign:"center",marginBottom:"20px"}}>
        <input
        placeholder="Search tasks..."
        onChange={(e)=>setSearch(e.target.value)}
        style={{padding:"10px",borderRadius:"8px"}}
        />
      </div>

      <div style={{
        display:"flex",
        gap:"20px",
        flexWrap:"wrap"
      }}>

        {columns.map(col=>(
          <div
          key={col}
          onDragOver={allowDrop}
          onDrop={(e)=>drop(e,col)}
          style={{
            flex:"1",
            minWidth:"260px",
            padding:"15px",
            borderRadius:"12px",
            background: dark ? darkCols[col] : pastel[col]
          }}
          >

          <h2 style={{textAlign:"center"}}>
            {col.toUpperCase()}
          </h2>

          {tasks
          .filter(t=>t.status===col)
          .filter(t=>t.title.toLowerCase().includes(search.toLowerCase()))
          .map(task=>(
            <div
            key={task.id}
            draggable
            onDragStart={(e)=>drag(e,task.id)}
            style={{
              background: dark ? "#ec4899":"white",
              padding:"12px",
              borderRadius:"10px",
              marginBottom:"10px"
            }}
            >

              <b>{task.title}</b>
              <p style={{fontSize:"13px"}}>{task.desc}</p>

              <span style={{
                fontSize:"11px",
                background:"#facc15",
                padding:"3px 7px",
                borderRadius:"6px"
              }}>
                {task.priority}
              </span>

              <div style={{
                display:"flex",
                gap:"6px",
                marginTop:"6px"
              }}>

                <button
                onClick={()=>editTask(task.id)}
                style={{
                  background:"#34d399",
                  border:"none",
                  padding:"5px 10px",
                  borderRadius:"6px"
                }}>
                  Edit
                </button>

                <button
                onClick={()=>deleteTask(task.id)}
                style={{
                  background:"#f87171",
                  border:"none",
                  padding:"5px 10px",
                  borderRadius:"6px"
                }}>
                  Delete
                </button>

              </div>

            </div>
          ))}

          </div>
        ))}

      </div>

    </div>
  );
}