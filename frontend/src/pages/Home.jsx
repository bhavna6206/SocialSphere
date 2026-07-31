import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";
import Navbar from "../components/Navbar";

function Home() {
  // const navigate = useNavigate();
  const { user } = useAuth();
  const [posts, setPosts] = useState([]);
  const [commentText, setCommentText] = useState("");

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await api.get("/posts");
        setPosts(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchPosts();
  }, []);

  const handleLike = async (postId) => {
  try {
    await api.put(`/posts/like/${postId}`);

    const res = await api.get("/posts");
    setPosts(res.data);

  } catch (error) {
    console.log(error);
  }
};

const handleComment = async (postId) => {
  if (!commentText.trim()) return;

  try {
    await api.post(`/posts/comment/${postId}`, {
      text: commentText,
    });

    const res = await api.get("/posts");
    setPosts(res.data);

    setCommentText("");
  } catch (error) {
    console.log(error);
  }
};

  // const handleLogout = async () => {
  //   try {
  //     await api.post("/users/logout");

  //     alert("Logged out successfully");

  //     navigate("/");
  //   } catch (error) {
  //     alert("Logout failed");
  //   }
  // };

  return (
    <div className="min-h-screen bg-gray-100">

      <Navbar />
      {/* Header

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

      </div> */}

      {/* Welcome */}

      <div className="flex flex-col items-center py-10">

        <h2 className="text-4xl font-bold">
          Welcome, {user?.fullName} 👋
        </h2>

        <p className="text-gray-600 mt-3 text-xl">
          @{user?.username}
        </p>

      </div>

      {/* Feed */}

      <div className="max-w-2xl mx-auto pb-10 space-y-8">

        {posts.map((post) => (

          <div
            key={post._id}
            className="bg-white rounded-xl shadow-md overflow-hidden"
          >

            {/* User */}

            <div className="flex items-center gap-3 p-4">

              <img
                src={
                  post.user.profilePic ||
                  "https://via.placeholder.com/50"
                }
                alt="profile"
                className="w-12 h-12 rounded-full object-cover"
              />

              <div>

                <h3 className="font-bold">
                  {post.user.fullName}
                </h3>

                <p className="text-gray-500 text-sm">
                  @{post.user.username}
                </p>

              </div>

            </div>

            {/* Image */}

            <img
              src={post.image}
              alt="post"
              className="w-full max-h-[500px] object-cover"
            />

            {/* Caption */}

            <div className="p-4">

              <p className="mb-4">
                {post.caption}
              </p>

              <div className="flex justify-between text-gray-600 font-medium">

                <button
                  onClick={() => handleLike(post._id)}
                  className="hover:text-red-500 transition"
                >
                  ❤️ {post.likes.length} Likes
                </button>

                <span>
                  💬 {post.comments.length} Comments
                </span>

              </div>

              <div className="mt-4 flex gap-2">

                <input
                  type="text"
                  placeholder="Write a comment..."
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  className="flex-1 border rounded-lg px-3 py-2"
                />

                <button
                  onClick={() => handleComment(post._id)}
                  className="bg-blue-600 text-white px-4 rounded-lg hover:bg-blue-700"
                >
                  Post
                </button>

              </div>

              <div className="mt-4 space-y-2">

                {post.comments.map((comment) => (

                  <div
                    key={comment._id}
                    className="bg-gray-100 rounded-lg p-3"
                  >

                    <span className="font-semibold">
                      @{comment.user.username}
                    </span>

                    <span className="ml-2">
                      {comment.text}
                    </span>

                  </div>

                ))}

              </div>

            </div>

          </div>

        ))}

      </div>

    </div>
  );
}

export default Home;