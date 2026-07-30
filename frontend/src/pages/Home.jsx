import { useNavigate } from "react-router-dom";
import api from "../services/api";

function Home() {
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
    <div className="min-h-screen bg-gray-100">

      <div className="flex justify-between items-center p-6 bg-white shadow">

        <h1 className="text-3xl font-bold text-blue-600">
          🚀 SocialSphere
        </h1>

        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
        >
          Logout
        </button>

      </div>

      <div className="flex justify-center items-center h-[80vh]">

        <h2 className="text-4xl font-bold">
          Welcome to SocialSphere 🎉
        </h2>

      </div>

    </div>
  );
}

export default Home;