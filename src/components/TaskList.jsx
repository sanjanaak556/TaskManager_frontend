import { useState, useMemo } from "react";
import TaskItem from "./TaskItem";
import TaskForm from "./TaskForm";

function TaskList() {
  const [tasks, setTasks] = useState([
    { id: 1, title: "Learn React", completed: false },
    { id: 2, title: "Finish TaskNest UI", completed: true },
  ]);

  const [filter, setFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [editTask, setEditTask] = useState(null);

  const handleAddOrEdit = (title) => {
    if (editTask) {
      setTasks(
        tasks.map((t) => (t.id === editTask.id ? { ...t, title } : t))
      );
      setEditTask(null);
    } else {
      const newTask = {
        id: Date.now(),
        title,
        completed: false,
      };
      setTasks([...tasks, newTask]);
    }
  };

  const handleToggle = (id) => {
    setTasks(
      tasks.map((t) =>
        t.id === id ? { ...t, completed: !t.completed } : t
      )
    );
  };

  const handleDelete = (id) => {
    setTasks(tasks.filter((t) => t.id !== id));
  };

  const handleEdit = (id) => {
    const taskToEdit = tasks.find((t) => t.id === id);
    setEditTask(taskToEdit);
  };

  const filteredTasks = useMemo(() => {
    return tasks
      .filter((t) => {
        if (filter === "pending") return !t.completed;
        if (filter === "completed") return t.completed;
        return true;
      })
      .filter((t) =>
        t.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
  }, [tasks, filter, searchTerm]);

  return (
    <div className="max-w-3xl mx-auto mt-6 space-y-6">
      <TaskForm onSave={handleAddOrEdit} editTask={editTask} />

      <div className="flex justify-between items-center bg-white p-3 rounded-xl border shadow-sm">
        <input
          type="text"
          placeholder="Search tasks..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border p-2 rounded-lg w-1/2"
        />

        <div className="flex gap-2">
          <button
            onClick={() => setFilter("all")}
            className={`px-3 py-1 rounded-lg ${filter === "all" ? "bg-blue-600 text-white" : "bg-gray-200"
              }`}
          >
            All
          </button>
          <button
            onClick={() => setFilter("pending")}
            className={`px-3 py-1 rounded-lg ${filter === "pending" ? "bg-blue-600 text-white" : "bg-gray-200"
              }`}
          >
            Pending
          </button>
          <button
            onClick={() => setFilter("completed")}
            className={`px-3 py-1 rounded-lg ${filter === "completed" ? "bg-blue-600 text-white" : "bg-gray-200"
              }`}
          >
            Completed
          </button>
        </div>
      </div>

      <div className="space-y-3">
        {filteredTasks.length > 0 ? (
          filteredTasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              onToggle={handleToggle}
              onDelete={handleDelete}
              onEdit={handleEdit}
            />
          ))
        ) : (
          <p className="text-center text-gray-500">No tasks found</p>
        )}
      </div>
    </div>
  );
}

export default TaskList;
