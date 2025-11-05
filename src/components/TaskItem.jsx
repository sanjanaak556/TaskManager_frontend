import { Pencil, Trash2 } from "lucide-react";

function TaskItem({ task, onToggle, onDelete, onEdit }) {
  return (
    <div className="flex items-center justify-between bg-white p-3 rounded-xl shadow-sm border hover:shadow-md transition">
      <div className="flex items-center space-x-3">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => onToggle(task.id)}
          className="w-4 h-4"
        />
        <span
          className={`text-base ${task.completed ? "line-through text-gray-400" : "text-gray-800"
            }`}
        >
          {task.title}
        </span>
      </div>

      <div className="flex items-center space-x-2">
        <button
          onClick={() => onEdit(task.id)}
          className="text-blue-600 hover:text-blue-800"
        >
          <Pencil size={18} />
        </button>
        <button
          onClick={() => onDelete(task.id)}
          className="text-red-600 hover:text-red-800"
        >
          <Trash2 size={18} />
        </button>
      </div>
    </div>
  );
}

export default TaskItem;
