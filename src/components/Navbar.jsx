import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../redux/authSlice";
import { Menu, X } from "lucide-react"; // for hamburger icon

function Navbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem("token");
    navigate("/login");
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav className="bg-blue-600 text-white p-4 shadow-lg">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link to="/dashboard" className="text-2xl font-bold tracking-wide">
          TaskNest
        </Link>

        {/* Hamburger Icon (visible on small screens) */}
        <button
          className="md:hidden text-white focus:outline-none cursor-pointer"
          onClick={toggleMenu}
        >
          {menuOpen ? <X size={26} /> : <Menu size={26} />}
        </button>

        {/* Desktop Links */}
        <div className="hidden md:flex space-x-4">
          <Link
            to="/dashboard"
            className="hover:bg-blue-700 px-3 py-2 rounded-lg transition"
          >
            Dashboard
          </Link>
          <Link
            to="/add-task"
            className="hover:bg-blue-700 px-3 py-2 rounded-lg transition"
          >
            Add Task
          </Link>
          <Link
            to="/profile"
            className="hover:bg-blue-700 px-3 py-2 rounded-lg transition"
          >
            Profile
          </Link>
          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded cursor-pointer transition"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {menuOpen && (
        <div className="md:hidden mt-3 space-y-2 flex flex-col bg-blue-500 rounded-lg p-3">
          <Link
            to="/dashboard"
            className="hover:bg-blue-700 px-3 py-2 rounded-lg transition"
            onClick={() => setMenuOpen(false)}
          >
            Dashboard
          </Link>
          <Link
            to="/add-task"
            className="hover:bg-blue-700 px-3 py-2 rounded-lg transition"
            onClick={() => setMenuOpen(false)}
          >
            Add Task
          </Link>
          <Link
            to="/profile"
            className="hover:bg-blue-700 px-3 py-2 rounded-lg transition"
            onClick={() => setMenuOpen(false)}
          >
            Profile
          </Link>
          <button
            onClick={() => {
              handleLogout();
              setMenuOpen(false);
            }}
            className="bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded-lg transition"
          >
            Logout
          </button>
        </div>
      )}
    </nav>
  );
}

export default Navbar;

