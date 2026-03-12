export default function Column({ status, tasks, moveTask, deleteTask }) {

  function allowDrop(e) {
    e.preventDefault();
  }

  function drop(e) {
    const id = e.dataTransfer.getData("id");
    moveTask(id, status);
  }

  return (
    <div
      onDragOver={allowDrop}
      onDrop={drop}
      className="p-4 rounded-xl shadow bg-white dark:bg-purple-900 min-h-[300px]"
    >
      <h2 className="text-xl font-bold capitalize mb-4">
        {status}
      </h2>

      {tasks.map((task) => (
        <div
          key={task.id}
          draggable
          onDragStart={(e) => e.dataTransfer.setData("id", task.id)}
          className="bg-pink-200 dark:bg-purple-700 p-3 mb-3 rounded-lg cursor-grab"
        >
          <h3 className="font-semibold">{task.title}</h3>

          <p className="text-sm">{task.description}</p>

          <div className="flex justify-between mt-2">

            <span className="text-xs bg-yellow-200 px-2 py-1 rounded">
              {task.priority}
            </span>

            <button
              onClick={() => deleteTask(task.id)}
              className="text-red-500 text-sm"
            >
              Delete
            </button>

          </div>
        </div>
      ))}

    </div>
  );
}