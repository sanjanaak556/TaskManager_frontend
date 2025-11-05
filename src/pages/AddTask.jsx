import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTask, updateTask } from "../redux/taskSlice";
import { useNavigate, useParams } from "react-router-dom";

function AddTask() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [priority, setPriority] = useState("Low");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const { items } = useSelector((state) => state.tasks);

  useEffect(() => {
    if (id) {
      const existingTask = items.find((task) => task._id === id);
      if (existingTask) {
        setTitle(existingTask.title);
        setDescription(existingTask.description || "");
        setDueDate(existingTask.dueDate ? existingTask.dueDate.split("T")[0] : "");
        setPriority(existingTask.priority || "Low");
      }
    }
  }, [id, items]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    const taskData = { title, description, dueDate, priority };

    if (id) {
      await dispatch(updateTask({ id, updates: taskData }));
    } else {
      await dispatch(addTask(taskData));
    }

    setTitle("");
    setDescription("");
    setDueDate("");
    setPriority("Low");
    navigate("/dashboard");
  };

  return (
    <div className="p-6 max-w-md mx-auto">
      <h1 className="text-2xl font-semibold mb-4">
        {id ? "Edit Task" : "Add New Task"}
      </h1>

      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          type="text"
          placeholder="Enter task title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full border p-2 rounded-lg"
        />

        <textarea
          placeholder="Enter task description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full border p-2 rounded-lg"
          rows="3"
        ></textarea>

        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          className="w-full border p-2 rounded-lg"
        />

        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          className="w-full border p-2 rounded-lg"
        >
          <option value="Low">Low Priority</option>
          <option value="Medium">Medium Priority</option>
          <option value="High">High Priority</option>
        </select>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
        >
          {id ? "Update Task" : "Add Task"}
        </button>
      </form>
    </div>
  );
}

export default AddTask;



