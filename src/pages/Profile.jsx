import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "../redux/authSlice";
import { useNavigate } from "react-router-dom";

function Profile() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate("/login");
  };

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center h-screen text-gray-600">
        <h2 className="text-2xl font-semibold">No user data found.</h2>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <div className="bg-white p-8 rounded-2xl shadow-md w-full max-w-md">
        <h1 className="text-3xl font-bold mb-6 text-center text-blue-600">
          Profile
        </h1>

        <div className="space-y-4 text-gray-700">
          <div>
            <p className="font-semibold text-sm text-gray-500">Name</p>
            <p className="text-lg">{user.name}</p>
          </div>

          <div>
            <p className="font-semibold text-sm text-gray-500">Email</p>
            <p className="text-lg">{user.email}</p>
          </div>

          {user.role && (
            <div>
              <p className="font-semibold text-sm text-gray-500">Role</p>
              <p className="text-lg capitalize">{user.role}</p>
            </div>
          )}
        </div>

        <button
          onClick={handleLogout}
          className="w-full mt-8 bg-red-500 hover:bg-red-600 text-white font-medium py-2 rounded-lg transition cursor-pointer"
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default Profile;

