import { Link } from "react-router-dom";

function Login() {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">

        <h1 className="text-4xl font-bold text-center text-blue-600 mb-2">
          🚀 SocialSphere
        </h1>

        <p className="text-center text-gray-500 mb-8">
          Welcome Back 👋
        </p>

        <form className="space-y-5">

          <div>
            <label className="block mb-2 font-medium">
              Email
            </label>

            <input
              type="email"
              placeholder="Enter your email"
              className="w-full border rounded-lg p-3 outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block mb-2 font-medium">
              Password
            </label>

            <input
              type="password"
              placeholder="Enter your password"
              className="w-full border rounded-lg p-3 outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold"
          >
            Login
          </button>

        </form>

        <p className="text-center mt-6 text-gray-600">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="text-blue-600 font-semibold"
          >
            Register
          </Link>
        </p>

      </div>
    </div>
  );
}

export default Login;