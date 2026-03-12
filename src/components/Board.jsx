import Column from "./Column";

export default function Board({ tasks, moveTask, deleteTask, editTask }) {

  const columns = ["todo", "inprogress", "done"];

  return (
    <div className="grid md:grid-cols-3 gap-6 mt-6">

      {columns.map((status) => (
        <Column
          key={status}
          status={status}
          tasks={tasks.filter((task) => task.status === status)}
          moveTask={moveTask}
          deleteTask={deleteTask}
          editTask={editTask}
        />
      ))}

    </div>
  );
}