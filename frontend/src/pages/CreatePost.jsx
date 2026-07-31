import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

console.log(api.defaults.baseURL);

function CreatePost() {
  const navigate = useNavigate();

  const [image, setImage] = useState(null);
  const [caption, setCaption] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!image) {
      return alert("Please select an image.");
    }

    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("image", image);
      formData.append("caption", caption);

      await api.post("/posts", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      alert("Post created successfully!");

      navigate("/home");
    } catch (error) {
      alert(error.response?.data?.message || "Failed to create post");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center">

      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-lg">

        <h2 className="text-3xl font-bold text-center mb-6">
          📸 Create Post
        </h2>

        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >

          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
            className="w-full"
          />

          <textarea
            rows="4"
            placeholder="Write a caption..."
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            className="w-full border rounded-lg p-3 outline-none"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700"
          >
            {loading ? "Uploading..." : "Create Post"}
          </button>

        </form>

      </div>

    </div>
  );
}

export default CreatePost;