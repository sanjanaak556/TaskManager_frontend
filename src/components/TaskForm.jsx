import { useState, useEffect } from "react";

function TaskForm({ onSave, editTask }) {
  const [title, setTitle] = useState("");

  useEffect(() => {
    if (editTask) setTitle(editTask.title);
  }, [editTask]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title.trim() === "") return;
    onSave(title);
    setTitle("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-center gap-2 bg-white p-3 rounded-xl shadow-sm border"
    >
      <input
        type="text"
        placeholder="Enter task..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="flex-1 p-2 border rounded-lg"
      />
      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
      >
        {editTask ? "Update" : "Add"}
      </button>
    </form>
  );
}

export default TaskForm;
