import { Navigate, Route, Routes } from 'react-router-dom';
import './App.css'
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import AddTask from "./pages/AddTask";
import EditTask from "./pages/EditTask";
import Profile from "./pages/Profile";
import ProtectedRoute from "./components/ProtectedRoute";
import { useSelector } from 'react-redux';
import Home from './pages/Home';



function App() {
  const { token } = useSelector((state) => state.auth)

  return (
    <div className="min-h-screen bg-gray-100">
      {token && <Navbar />}
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected Routes */}
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/add-task" element={<AddTask />} />
          <Route path="/edit-task/:id" element={<EditTask />} />
          <Route path="/profile" element={<Profile />} />
        </Route>

        {/* Default */}
        <Route path='*' element={<Navigate to={token ? "/dashboard" : "/login"} />} />
      </Routes>
    </div>
  );
}

export default App;

