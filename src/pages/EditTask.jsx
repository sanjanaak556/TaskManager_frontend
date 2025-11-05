import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { fetchTasks, updateTask } from "../redux/taskSlice";

function EditTask() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { items, loading } = useSelector((state) => state.tasks);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [priority, setPriority] = useState("Low");

  useEffect(() => {
    if (items.length === 0) {
      dispatch(fetchTasks());
    }
  }, [dispatch, items.length]);

  useEffect(() => {
    const taskToEdit = items.find((t) => t._id === id);
    if (taskToEdit) {
      setTitle(taskToEdit.title);
      setDescription(taskToEdit.description || "");
      setDueDate(taskToEdit.dueDate ? taskToEdit.dueDate.split("T")[0] : "");
      setPriority(taskToEdit.priority || "Low");
    }
  }, [items, id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    const updates = { title, description, dueDate, priority };
    await dispatch(updateTask({ id, updates }));
    navigate("/dashboard");
  };

  if (loading) return <p className="text-center">Loading...</p>;

  return (
    <div className="p-6 max-w-md mx-auto">
      <h1 className="text-2xl font-semibold mb-4">Edit Task</h1>
      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          type="text"
          placeholder="Edit task title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full border p-2 rounded-lg"
        />

        <textarea
          placeholder="Edit task description"
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
          className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700"
        >
          Update Task
        </button>
      </form>
    </div>
  );
}

export default EditTask;


