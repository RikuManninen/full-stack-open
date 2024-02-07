import BlogForm from "../components/BlogForm";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import Blog from "../components/Blog";
import blogService from "../services/blogs";
import { useAuth } from "../AuthContext";
import useNotification from "../hooks/useNotification";

const baseUrl = "/api/blogs";

const BlogView = () => {
  const queryClient = useQueryClient();
  const { user, logout } = useAuth();
  const showNotification = useNotification();

  const mutation = useMutation({
    mutationFn: blogService.create,
    onSuccess: (returnedBlog) => {
      console.log("Blog added:", returnedBlog);
      queryClient.invalidateQueries({ queryKey: ["blogData"] });
      showNotification({
        message: `a new blog ${returnedBlog.title} by ${returnedBlog.author} added`,
        type: "success",
      });
    },
  });
  const createBlog = async (blogObject) => {
    mutation.mutate(blogObject);
  };
  const {
    data: blogs,
    error,
    isPending,
  } = useQuery({
    queryKey: ["blogData"],
    queryFn: () => axios.get(baseUrl).then((res) => res.data),
  });

  if (isPending) return "Loading...";

  if (error) return "An error has occurred: " + blogs.error.message;

  const sortedBlogs = [...blogs].sort((a, b) => b.likes - a.likes);

  return (
    <div>
      <h2>blogs</h2>
      {user && (
        <p>
          {user.name} logged in <button onClick={logout}>logout</button>
        </p>
      )}
      <BlogForm createBlog={createBlog} />

      {sortedBlogs?.map((blog) => (
        <Blog key={blog.id} blog={blog} user={user}/>
      ))}
    </div>
  );
};

export default BlogView;
