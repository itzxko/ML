import { Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Users from "./pages/Users";
import History from "./pages/History";
import Register from "./pages/Register";
import Trucks from "./pages/Trucks";
import Charts from "./pages/Charts";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/users" element={<Users />} />
      <Route path="/history" element={<History />} />
      <Route path="/register" element={<Register />} />
      <Route path="/trucks" element={<Trucks />} />
      <Route path="/charts" element={<Charts />} />
    </Routes>
  );
}

export default App;
