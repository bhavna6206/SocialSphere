import { useEffect, useState } from "react";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";
import Navbar from "../components/Navbar";

function Profile() {
  const { user } = useAuth();
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await api.get("/posts");

        const myPosts = res.data.filter(
          (post) => post.user._id === user?._id
        );

        setPosts(myPosts);
      } catch (error) {
        console.log(error);
      }
    };

    if (user) {
      fetchPosts();
    }
  }, [user]);

  const handleDeletePost = async (postId) => {
  const confirmDelete = window.confirm(
    "Are you sure you want to delete this post?"
  );

  if (!confirmDelete) return;

  try {
    await api.delete(`/posts/${postId}`);

    setPosts((prevPosts) =>
      prevPosts.filter((post) => post._id !== postId)
    );

    alert("Post deleted successfully!");
  } catch (error) {
    console.log(error);
    alert("Failed to delete post");
  }
};

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      {/* Profile Card */}

      <div className="bg-white shadow-md rounded-xl max-w-3xl mx-auto mt-10 p-8">

        <div className="flex items-center gap-6">

          <img
            src={
              user?.profilePic ||
              "https://via.placeholder.com/120"
            }
            alt="Profile"
            className="w-28 h-28 rounded-full object-cover border"
          />

          <div>

            <h1 className="text-3xl font-bold">
              {user?.fullName}
            </h1>

            <p className="text-gray-500 text-lg">
              @{user?.username}
            </p>

            <p className="mt-3">
              {user?.bio || "No bio yet."}
            </p>

            <div className="flex gap-8 mt-5 font-semibold">

              <span>
                Followers: {user?.followers?.length || 0}
              </span>

              <span>
                Following: {user?.following?.length || 0}
              </span>

            </div>

          </div>

        </div>

      </div>

      {/* My Posts */}

      <div className="max-w-3xl mx-auto mt-10">

        <h2 className="text-2xl font-bold mb-6">
          My Posts
        </h2>

        <div className="space-y-8">

          {posts.map((post) => (

            <div
              key={post._id}
              className="bg-white rounded-xl shadow-md overflow-hidden"
            >

              <img
                src={post.image}
                alt="post"
                className="w-full max-h-[500px] object-cover"
              />

              <div className="p-4">

                <p className="mb-4">
                  {post.caption}
                </p>

                <div className="flex justify-between items-center">

                  <div className="flex gap-6 text-gray-600">

                    <span>
                      ❤️ {post.likes.length} Likes
                    </span>

                    <span>
                      💬 {post.comments.length} Comments
                    </span>

                  </div>

                  <button
                    onClick={() => handleDeletePost(post._id)}
                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
                  >
                    🗑 Delete
                  </button>

                </div>

              </div>

            </div>

          ))}

        </div>

      </div>

    </div>
  );
}

export default Profile;