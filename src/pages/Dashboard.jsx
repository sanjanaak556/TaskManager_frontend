import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTasks, deleteTask, updateTask } from "../redux/taskSlice";
import { Link, useNavigate } from "react-router-dom";
import { CheckCircle, Trash2, Pencil } from "lucide-react";

function Dashboard() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { items, loading } = useSelector((state) => state.tasks);
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [priorityFilter, setPriorityFilter] = useState("all");
  const [sortOrder, setSortOrder] = useState("none");
  const [expandedTasks, setExpandedTasks] = useState({}); // for show details

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  const handleDelete = (id) => {
    dispatch(deleteTask(id));
  };

  const handleToggleComplete = (task) => {
    dispatch(updateTask({ id: task._id, updates: { completed: !task.completed } }));
  };

  const handleEdit = (id) => {
    navigate(`/edit-task/${id}`);
  };

  const toggleDetails = (id) => {
    setExpandedTasks((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  // Filtering and sorting
  const filteredTasks = items
    .filter((task) =>
      filter === "all"
        ? true
        : filter === "completed"
          ? task.completed
          : !task.completed
    )
    .filter((task) =>
      priorityFilter === "all" ? true : task.priority === priorityFilter
    )
    .filter((task) => task.title.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => {
      if (sortOrder === "asc") {
        return new Date(a.dueDate) - new Date(b.dueDate);
      } else if (sortOrder === "desc") {
        return new Date(b.dueDate) - new Date(a.dueDate);
      }
      return 0;
    });

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-semibold">My Tasks</h1>
        <Link
          to="/add-task"
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          + Add Task
        </Link>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-2 mb-4">
        <input
          type="text"
          placeholder="Search tasks..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border p-2 rounded-lg flex-grow"
        />
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="border p-2 rounded-lg"
        >
          <option value="all">All</option>
          <option value="pending">Pending</option>
          <option value="completed">Completed</option>
        </select>

        <select
          value={priorityFilter}
          onChange={(e) => setPriorityFilter(e.target.value)}
          className="border p-2 rounded-lg"
        >
          <option value="all">All Priorities</option>
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>

        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
          className="border p-2 rounded-lg"
        >
          <option value="none">Sort by Due Date</option>
          <option value="asc">Due Date ↑ (Oldest First)</option>
          <option value="desc">Due Date ↓ (Newest First)</option>
        </select>
      </div>

      {loading ? (
        <p>Loading tasks...</p>
      ) : filteredTasks.length === 0 ? (
        <p className="text-gray-500 text-center">No tasks found.</p>
      ) : (
        <ul className="space-y-3">
          {filteredTasks.map((task) => (
            <li
              key={task._id}
              className={`p-3 rounded-lg shadow ${task.completed ? "bg-green-50" : "bg-white"
                }`}
            >
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleToggleComplete(task)}
                    className="text-green-600 hover:text-green-800 cursor-pointer"
                  >
                    <CheckCircle />
                  </button>
                  <span
                    className={`${task.completed
                      ? "line-through text-gray-500"
                      : "text-gray-800"
                      }`}
                  >
                    {task.title}
                  </span>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => handleEdit(task._id)}
                    className="text-yellow-600 hover:text-yellow-800 cursor-pointer"
                    title="Edit Task"
                  >
                    <Pencil />
                  </button>

                  <button
                    onClick={() => handleDelete(task._id)}
                    className="text-red-600 hover:text-red-800 cursor-pointer"
                    title="Delete Task"
                  >
                    <Trash2 />
                  </button>
                </div>
              </div>

              {/* Show Details Button */}
              <button
                onClick={() => toggleDetails(task._id)}
                className="text-blue-600 text-sm mt-2 cursor-pointer"
              >
                {expandedTasks[task._id] ? "Hide Details" : "Show Details"}
              </button>

              {/* Details Section */}
              {expandedTasks[task._id] && (
                <div className="mt-2 text-sm text-gray-700 border-t pt-2">
                  {task.description && (
                    <p className="mb-1">
                      <strong>Description:</strong> {task.description}
                    </p>
                  )}
                  {task.dueDate && (
                    <p className="mb-1">
                      <strong>Due Date:</strong>{" "}
                      {new Date(task.dueDate).toLocaleDateString()}
                    </p>
                  )}
                  <p>
                    <strong>Priority:</strong>{" "}
                    <span
                      className={`px-2 py-1 rounded text-white ${task.priority === "High"
                        ? "bg-red-500"
                        : task.priority === "Medium"
                          ? "bg-yellow-500"
                          : "bg-green-500"
                        }`}
                    >
                      {task.priority}
                    </span>
                  </p>
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Dashboard;






