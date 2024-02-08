import BlogForm from "../components/BlogForm";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import Blog from "../components/Blog";
import blogService from "../services/blogs";
import { useAuth } from "../AuthContext";
import useNotification from "../hooks/useNotification";
import { Link } from "react-router-dom";
import { Paper } from "@mui/material";

const baseUrl = "/api/blogs";

const BlogView = () => {
  const queryClient = useQueryClient();
  const { user } = useAuth();
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

  if (error) return "An error has occurred: " + error.message;

  const sortedBlogs = [...blogs].sort((a, b) => b.likes - a.likes);

  return (
    <div>
      <Paper elevation={2} sx={{ maxWidth: 600, margin: 'auto', mt: 4, p: 3 }}>
      <BlogForm createBlog={createBlog} />

      {sortedBlogs?.map((blog) => (
        <Link key={blog.id} to={`/blogs/${blog.id}`} state={blog}>
          <Blog key={blog.id} blog={blog} user={user}/>
        </Link>
      ))}
      </Paper>
    </div>
  );
};

export default BlogView;
