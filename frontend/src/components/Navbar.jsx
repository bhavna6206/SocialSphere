import { Link, useNavigate } from "react-router-dom";
import api from "../services/api";

function Navbar() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await api.post("/users/logout");

      alert("Logged out successfully");

      navigate("/");
    } catch (error) {
      alert("Logout failed");
    }
  };

  return (
    <nav className="bg-white shadow-md">

      <div className="max-w-6xl mx-auto flex justify-between items-center p-5">

        <h1 className="text-3xl font-bold text-blue-600">
          🚀 SocialSphere
        </h1>

        <div className="flex gap-8 items-center">

          <Link
            to="/home"
            className="font-semibold hover:text-blue-600"
          >
            🏠 Home
          </Link>

          <Link
            to="/create"
            className="font-semibold hover:text-blue-600"
          >
            ➕ Create
          </Link>

          <Link
            to="/profile"
            className="font-semibold hover:text-blue-600"
          >
            👤 Profile
          </Link>

          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
          >
            Logout
          </button>

        </div>

      </div>

    </nav>
  );
}

export default Navbar;