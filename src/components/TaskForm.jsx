import { useState } from "react";

export default function TaskForm({ addTask }) {

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("Medium");

  function handleSubmit(e) {
    e.preventDefault();

    if (!title) return;

    addTask(title, description, priority);

    setTitle("");
    setDescription("");
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white dark:bg-purple-900 p-4 rounded-xl shadow mb-6"
    >

      <div className="grid md:grid-cols-3 gap-3">

        <input
          placeholder="Task title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border p-2 rounded"
        />

        <input
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="border p-2 rounded"
        />

        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          className="border p-2 rounded"
        >
          <option>Low</option>
          <option>Medium</option>
          <option>High</option>
        </select>

      </div>

      <button
        type="submit"
        className="mt-3 bg-pink-400 px-4 py-2 rounded-lg"
      >
        Add Task
      </button>

    </form>
  );
}