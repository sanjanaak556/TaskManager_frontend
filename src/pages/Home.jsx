import React from "react";
import { Link } from "react-router-dom";
import taskImg from "../assets/task-img.avif"

function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center flex-grow text-center px-6 bg-gradient-to-b from-blue-100 to-white">
        <h1 className="text-5xl font-bold mb-4 text-gray-800">
          Welcome to <span className="text-blue-600">TaskNest</span>
        </h1>
        <p className="text-gray-600 max-w-xl mb-8">
          Organize your daily tasks efficiently. Add, track, and complete tasks with ease.
          Stay focused, stay productive — all in one place.
        </p>

        {/* Hero Buttons */}
        <div className="flex gap-4">
          <Link
            to="/register"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition"
          >
            Get Started
          </Link>
          <Link
            to="/login"
            className="border border-blue-600 text-blue-600 px-6 py-3 rounded-lg font-medium hover:bg-blue-50 transition"
          >
            Login
          </Link>
        </div>

        {/* Image */}
        <img
          src={taskImg}
          alt="Task management illustration"
          className="mt-10 w-80 rounded-xl shadow-md"
        />
      </section>

      {/* Footer */}
      <footer className="py-4 text-center text-gray-500 border-t">
        © {new Date().getFullYear()} TaskNest — All Rights Reserved.
      </footer>
    </div>
  );
}

export default Home;
